import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield } from 'lucide-react';

const CONSENT_KEY = 'cookie_consent';
const GA_ID = 'G-Q9MPY458DW';

/**
 * Lightweight GDPR-compliant cookie consent banner.
 *
 * GA4 is loaded *only after* the user gives explicit consent.
 * The GA4 script tag in index.html is removed; instead we inject it
 * dynamically here once consent is granted.
 */
const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // On mount, check stored consent.  If already accepted, bootstrap GA4.
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      bootstrapGA4();
    } else if (stored !== 'declined') {
      // First visit — show the banner after a short delay so it doesn't
      // pile on top of other first-visit UI.
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const bootstrapGA4 = () => {
    // Don't double-inject
    if (document.getElementById('ga4-script')) return;

    // 1. Inject the gtag.js loader
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // 2. Initialize dataLayer + config
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure',
      custom_map: { dimension1: 'user_role', dimension2: 'visit_source' },
    });

    // Set user role if available
    try {
      const savedRole = localStorage.getItem('userRole');
      if (savedRole) {
        gtag('set', 'user_properties', { user_role: savedRole });
      }
    } catch {
      // ignore
    }
  };

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    bootstrapGA4();
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon + text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="shrink-0 p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                <Cookie size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Cookie & Analytics Notice
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  This site uses Google Analytics to understand how visitors interact with the portfolio.
                  No personal data is sold or shared. You can decline without any impact on functionality.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5"
              >
                <Shield size={12} />
                Accept
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={handleDecline}
              className="absolute top-2 right-2 sm:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close cookie banner"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
