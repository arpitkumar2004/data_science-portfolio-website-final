/**
 * Centralized API Configuration
 * 
 * STANDARD: VITE_API_URL should NEVER include /api suffix
 * - Development: http://localhost:8000
 * - Production: https://your-backend-domain.com
 * 
 * All endpoints will automatically be prefixed with /api
 */

// Get base URL from environment (without /api)
const getBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  return url.replace(/\/api\/?$/, '').replace(/\/+$/, '');
};

export const API_BASE_URL = getBaseUrl();

/**
 * API Endpoints
 * All paths already include /api prefix as defined in backend routes
 */
export const API_ENDPOINTS = {
  // Health Check
  HEALTH: '/api/hello',
  
  // Public Lead Submission
  SUBMIT_CONTACT: '/api/submit-contact',
  REQUEST_CV: '/api/v1/request-cv',
  
  // Admin Authentication
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_LOGOUT: '/api/admin/logout',
  ADMIN_VALIDATE: '/api/admin/validate',
  ADMIN_ME: '/api/admin/me',
  
  // Admin Lead Management
  ADMIN_LEADS: '/api/admin/leads',
  ADMIN_LEADS_STATS: '/api/admin/leads/stats',
  ADMIN_LEADS_SEARCH: '/api/admin/leads/search',
  ADMIN_LEADS_FILTER: '/api/admin/leads/filter',
  ADMIN_LEADS_FILTERED: '/api/admin/leads/filtered',
  ADMIN_LEADS_EXPORT: '/api/admin/leads/export',
  ADMIN_LEADS_BULK_STATUS: '/api/admin/leads/bulk-status',
  ADMIN_LEADS_BULK_DELETE: '/api/admin/leads/bulk-delete',
  
  // Dynamic endpoints (use with ID)
  ADMIN_LEAD_BY_ID: (id: number) => `/api/admin/leads/${id}`,
  ADMIN_LEAD_FLAG: (id: number) => `/api/admin/leads/${id}/flag`,
  ADMIN_LEAD_UNFLAG: (id: number) => `/api/admin/leads/${id}/unflag`,
  ADMIN_LEAD_STATUS: (id: number) => `/api/admin/leads/${id}/status`,
  ADMIN_LEAD_PRIORITY: (id: number) => `/api/admin/leads/${id}/priority`,
  ADMIN_LEAD_QUALITY_SCORE: (id: number) => `/api/admin/leads/${id}/quality-score`,
  ADMIN_LEAD_NOTES: (id: number) => `/api/admin/leads/${id}/notes`,
  ADMIN_LEAD_TAGS: (id: number) => `/api/admin/leads/${id}/tags`,
} as const;

/**
 * Helper to build full URL
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Log API configuration on load (helpful for debugging)
 */
if (import.meta.env.DEV) {
  console.log('📡 API Configuration:', {
    baseUrl: API_BASE_URL,
    environment: import.meta.env.MODE,
    healthCheck: buildApiUrl(API_ENDPOINTS.HEALTH),
  });
}
