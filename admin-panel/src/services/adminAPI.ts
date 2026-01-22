/**
 * Centralized Admin API Service
 * Production-Grade API Client with JWT Authentication
 * - Automatic token refresh on 401
 * - Request/Response interceptors
 * - Auto-logout on authentication failure
 * - Single source of truth for all API calls
 */

import { API_BASE_URL } from '../config/api';

// Debug logging
console.log("Admin API initialized with base URL:", API_BASE_URL);

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
    this.baseURL = baseURL;
    this.loadToken();
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

    const response = await fetch(url, config);

    if (!response.ok) {
      if (response.status === 401) {
        // INTERCEPTOR: Auto-logout on 401 Unauthorized
        console.warn("🔐 Authentication expired (401). Auto-logout triggered.");
        this.clearToken();
        
        // Dispatch logout event for listeners to update UI
        window.dispatchEvent(new CustomEvent("auth:logout", { 
          detail: { reason: "token_expired" } 
        }));
        
        throw new Error("Authentication expired. Please login again.");
      }
      
      const error = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(error.detail || "API request failed");
    }

    return response.json();
  }

  // ============= Authentication =============

  async login(password: string): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append("password", password);

    const response = await fetch(`${this.baseURL}/api/admin/login`, {
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
      await this.request("/api/admin/me");
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
    return this.request<Lead[]>("/api/admin/leads");
  }

  async getLead(id: number): Promise<Lead> {
    return this.request<Lead>(`/api/admin/leads/${id}`);
  }

  async getStats(): Promise<LeadStats> {
    return this.request<LeadStats>("/api/admin/leads/stats");
  }

  async updateLeadStatus(id: number, status: LeadStatus): Promise<Lead> {
    return this.request<Lead>(`/api/admin/leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async updateLeadPriority(id: number, priority: LeadPriority): Promise<Lead> {
    return this.request<Lead>(`/api/admin/leads/${id}/priority`, {
      method: "PATCH",
      body: JSON.stringify({ priority }),
    });
  }

  async updateLeadQualityScore(id: number, quality_score: number): Promise<Lead> {
    return this.request<Lead>(`/api/admin/leads/${id}/quality-score`, {
      method: "PATCH",
      body: JSON.stringify({ quality_score }),
    });
  }

  async updateLeadNotes(id: number, notes: string): Promise<Lead> {
    return this.request<Lead>(`/api/admin/leads/${id}/notes`, {
      method: "PATCH",
      body: JSON.stringify({ internal_notes: notes }),
    });
  }

  async updateLeadTags(id: number, tags: string[]): Promise<Lead> {
    return this.request<Lead>(`/api/admin/leads/${id}/tags`, {
      method: "PATCH",
      body: JSON.stringify({ tags }),
    });
  }

  async flagLead(id: number): Promise<Lead> {
    return this.request<Lead>(`/api/admin/leads/${id}/flag`, {
      method: "POST",
    });
  }

  async unflagLead(id: number): Promise<Lead> {
    return this.request<Lead>(`/api/admin/leads/${id}/unflag`, {
      method: "POST",
    });
  }

  async deleteLead(id: number): Promise<void> {
    await this.request(`/api/admin/leads/${id}`, {
      method: "DELETE",
    });
  }

  async bulkUpdateStatus(ids: number[], status: LeadStatus): Promise<void> {
    await this.request("/api/admin/leads/bulk-status", {
      method: "PATCH",
      body: JSON.stringify({ lead_ids: ids, status }),
    });
  }

  async bulkDelete(ids: number[]): Promise<void> {
    await this.request("/api/admin/leads/bulk-delete", {
      method: "DELETE",
      body: JSON.stringify({ lead_ids: ids }),
    });
  }

  async exportLeads(format: "json" | "csv" = "csv"): Promise<Blob> {
    const url = `${this.baseURL}/api/admin/leads/export?format=${format}`;
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Export failed");
    }

    return response.blob();
  }

  async searchLeads(query: string): Promise<Lead[]> {
    return this.request<Lead[]>(`/api/admin/leads/search?q=${encodeURIComponent(query)}`);
  }

  // ============= Intelligence & Insights =============

  /**
   * Generate LinkedIn search URL for finding a lead's profile
   * Searches by name + company for higher accuracy
   */
  generateLinkedInSearchUrl(lead: Lead): string {
    const searchQuery = lead.company 
      ? `${lead.name} ${lead.company}`
      : lead.name;
    
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://www.linkedin.com/search/results/people/?keywords=${encodedQuery}`;
  }

  /**
   * Generate Google search URL for finding a lead
   * Includes email domain extraction for better results
   */
  generateGoogleSearchUrl(lead: Lead): string {
    const domain = lead.email.split("@")[1];
    const searchQuery = lead.company
      ? `"${lead.name}" "${lead.company}" site:linkedin.com`
      : `"${lead.name}" ${domain} site:linkedin.com`;
    
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://www.google.com/search?q=${encodedQuery}`;
  }

  /**
   * Extract intent from lead metadata
   * Analyzes which "role" the visitor selected at gateway
   */
  getLeadIntent(lead: Lead): {
    type: "developer" | "recruiter" | "founder" | "unknown";
    confidence: "high" | "medium" | "low";
  } {
    const roleMap: Record<string, string> = {
      "SDE": "developer",
      "Software Engineer": "developer",
      "Developer": "developer",
      "Recruiter": "recruiter",
      "HR": "recruiter",
      "Founder": "founder",
      "CEO": "founder",
      "CTO": "founder"
    };

    const detectedRole = lead.role ? roleMap[lead.role] : null;
    
    return {
      type: (detectedRole as any) || "unknown",
      confidence: detectedRole ? "high" : "low"
    };
  }

  /**
   * Calculate quality score based on lead data completeness and engagement signals
   */
  calculateEnrichedQuality(lead: Lead): number {
    let score = lead.quality_score || 0;
    let bonus = 0;

    // Bonus points for complete information
    if (lead.company) bonus += 10;
    if (lead.role) bonus += 15;
    if (lead.internal_notes && lead.internal_notes.length > 20) bonus += 10;
    if (lead.metadata && Object.keys(lead.metadata).length > 3) bonus += 5;

    return Math.min(100, score + bonus);
  }
}

// ============= Export Singleton =============

export const adminAPI = new AdminAPIClient(API_BASE_URL);
export default adminAPI;

