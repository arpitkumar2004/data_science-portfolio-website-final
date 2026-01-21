/**
 * Centralized Admin API Service
 * Single source of truth for all admin API calls.
 * Change backend URL in one place.
 */

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/+$/, "");

// ============= Types =============

export type LeadStatus = "unread" | "processing" | "contacted" | "archived";
export type LeadPriority = "low" | "medium" | "high" | "urgent";
export type LeadType = "contact" | "cv_request" | "collaboration";

export interface Lead {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  lead_type?: LeadType;
  status: LeadStatus;
  priority: LeadPriority;
  quality_score?: number;
  internal_notes?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  last_contacted?: string;
  follow_up_date?: string;
  contact_history?: any[];
  source?: string;
  role?: string;
  flagged?: boolean;
}

export interface LeadStats {
  total_leads: number;
  unread_count: number;
  processing_count: number;
  contacted_count: number;
  archived_count: number;
  leads_last_24h: number;
  leads_last_7d: number;
  avg_quality_score: number;
  high_priority_count: number;
  conversion_rate?: number;
  top_sources?: Array<{ source: string; count: number }>;
  role_distribution?: Record<string, number>;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// ============= API Client =============

class AdminAPIClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL.replace(/\/+$/, ""); // normalize to avoid double slashes
    this.loadToken();
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private loadToken() {
    this.token = sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
  }

  private saveToken(token: string) {
    this.token = token;
    sessionStorage.setItem("adminToken", token);
    localStorage.setItem("adminToken", token);
  }

  private clearToken() {
    this.token = null;
    sessionStorage.removeItem("adminToken");
    localStorage.removeItem("adminToken");
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    const retryableStatus = new Set([502, 503, 504]);

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch(url, config);

        if (!response.ok) {
          if (response.status === 401) {
            this.clearToken();
            throw new Error("Authentication expired. Please login again.");
          }

          // Retry once for transient server errors
          if (retryableStatus.has(response.status) && attempt === 0) {
            await this.delay(400);
            continue;
          }

          const error = await response.json().catch(() => ({ detail: response.statusText }));
          throw new Error(error.detail || "API request failed");
        }

        return response.json();
      } catch (err: any) {
        if (attempt === 0) {
          await this.delay(400);
          continue;
        }
        const msg = err?.message || "Network error";
        throw new Error(msg);
      }
    }

    // Fallback (should not reach here)
    throw new Error("API request failed");
  }

  // ============= Authentication =============

  async login(password: string): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append("password", password);

    const response = await fetch(`${this.baseURL}/admin/login`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data: AuthResponse = await response.json();
    this.saveToken(data.access_token);
    return data;
  }

  async validateToken(): Promise<boolean> {
    try {
      await this.request("/admin/me");
      return true;
    } catch {
      return false;
    }
  }

  logout() {
    this.clearToken();
  }

  // ============= Leads Management =============

  async getLeads(): Promise<Lead[]> {
    return this.request<Lead[]>("/admin/leads");
  }

  async getLead(id: number): Promise<Lead> {
    return this.request<Lead>(`/admin/leads/${id}`);
  }

  async getStats(): Promise<LeadStats> {
    return this.request<LeadStats>("/admin/leads/stats");
  }

  async updateLeadStatus(id: number, status: LeadStatus): Promise<Lead> {
    return this.request<Lead>(`/admin/leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async updateLeadPriority(id: number, priority: LeadPriority): Promise<Lead> {
    return this.request<Lead>(`/admin/leads/${id}/priority`, {
      method: "PATCH",
      body: JSON.stringify({ priority }),
    });
  }

  async updateLeadQualityScore(id: number, quality_score: number): Promise<Lead> {
    return this.request<Lead>(`/admin/leads/${id}/quality-score`, {
      method: "PATCH",
      body: JSON.stringify({ quality_score }),
    });
  }

  async updateLeadNotes(id: number, notes: string): Promise<Lead> {
    return this.request<Lead>(`/admin/leads/${id}/notes`, {
      method: "PATCH",
      body: JSON.stringify({ internal_notes: notes }),
    });
  }

  async updateLeadTags(id: number, tags: string[]): Promise<Lead> {
    return this.request<Lead>(`/admin/leads/${id}/tags`, {
      method: "PATCH",
      body: JSON.stringify({ tags }),
    });
  }

  async flagLead(id: number): Promise<Lead> {
    return this.request<Lead>(`/admin/leads/${id}/flag`, {
      method: "POST",
    });
  }

  async unflagLead(id: number): Promise<Lead> {
    return this.request<Lead>(`/admin/leads/${id}/unflag`, {
      method: "POST",
    });
  }

  async deleteLead(id: number): Promise<void> {
    await this.request(`/admin/leads/${id}`, {
      method: "DELETE",
    });
  }

  async bulkUpdateStatus(ids: number[], status: LeadStatus): Promise<void> {
    await this.request("/admin/leads/bulk-status", {
      method: "PATCH",
      body: JSON.stringify({ lead_ids: ids, status }),
    });
  }

  async bulkDelete(ids: number[]): Promise<void> {
    await this.request("/admin/leads/bulk-delete", {
      method: "DELETE",
      body: JSON.stringify({ lead_ids: ids }),
    });
  }

  async exportLeads(format: "json" | "csv" = "csv"): Promise<Blob> {
    const url = `${this.baseURL}/admin/leads/export?format=${format}`;
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Export failed");
    }

    return response.blob();
  }

  async searchLeads(query: string): Promise<Lead[]> {
    return this.request<Lead[]>(`/admin/leads/search?q=${encodeURIComponent(query)}`);
  }
}

// ============= Export Singleton =============

export const adminAPI = new AdminAPIClient(API_BASE_URL);
export default adminAPI;
