/**
 * Analytics utility for tracking user interactions
 * Supports Google Analytics 4 (GA4)
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track custom events
 * @param eventName - Name of the event (e.g., 'resume_download')
 * @param params - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
): void => {
  // Only track in production or if explicitly enabled
  if (typeof window === 'undefined') return;

  try {
    // Google Analytics 4
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        timestamp: new Date().toISOString(),
        ...params,
      });
    }

    // Console log in development for debugging
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', eventName, params);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

/**
 * Track page views
 * @param pagePath - Path of the page being viewed
 * @param pageTitle - Title of the page
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
};

/**
 * Track resume downloads
 * @param location - Where the download was initiated (e.g., 'hero_cta', 'sticky_mobile_cta')
 */
export const trackResumeDownload = (location: string): void => {
  trackEvent('resume_download', {
    location,
    file_name: 'Arpit_Kumar_Resume.pdf',
  });
};

/**
 * Track project views
 * @param projectId - Unique identifier for the project
 * @param projectTitle - Title of the project
 * @param viewType - Type of view ('card_click' or 'detail_view')
 */
export const trackProjectView = (
  projectId: number,
  projectTitle: string,
  viewType: 'card_click' | 'detail_view'
): void => {
  trackEvent('project_view', {
    project_id: projectId,
    project_title: projectTitle,
    view_type: viewType,
  });
};

/**
 * Track contact form interactions
 * @param action - Action taken ('form_opened', 'form_submitted', 'form_error')
 * @param additionalData - Additional context
 */
export const trackContactForm = (
  action: 'form_opened' | 'form_submitted' | 'form_error',
  additionalData?: Record<string, any>
): void => {
  trackEvent('contact_form_interaction', {
    action,
    ...additionalData,
  });
};

/**
 * Track external link clicks
 * @param platform - Platform being linked to (e.g., 'github', 'linkedin', 'kaggle')
 * @param location - Where the link was clicked from
 */
export const trackExternalLink = (
  platform: string,
  location: string
): void => {
  trackEvent('external_link_click', {
    platform,
    location,
  });
};

/**
 * Track scroll depth
 * @param percentage - Percentage of page scrolled
 */
export const trackScrollDepth = (percentage: number): void => {
  trackEvent('scroll_depth', {
    percentage,
  });
};

/**
 * Track errors caught by ErrorBoundary
 * @param error - Error object
 * @param errorInfo - Additional error information
 */
export const trackError = (
  error: Error,
  errorInfo?: Record<string, any>
): void => {
  trackEvent('error_boundary_triggered', {
    error_message: error.message,
    error_stack: error.stack?.substring(0, 500), // Limit stack trace length
    component: errorInfo?.componentStack?.split('\n')[1]?.trim(),
    ...errorInfo,
  });
};
