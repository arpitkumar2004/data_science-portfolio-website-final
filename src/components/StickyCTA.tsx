import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Mail, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackResumeDownload } from '../utils/analytics';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the CTA in this session
    const dismissed = sessionStorage.getItem('cta_dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show CTA after scrolling down 300px on mobile only
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      const isMobile = window.innerWidth < 768;
      setIsVisible(scrolled && isMobile);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('cta_dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[60] md:hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white px-4 py-3 shadow-2xl border-t-4 border-blue-400">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">Interested in hiring?</p>
                <p className="text-xs text-blue-100 truncate">IIT KGP • ML Engineer • May 2027</p>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/Arpit_Kumar_Resume.pdf"
                  download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
                  onClick={() => trackResumeDownload('sticky_mobile_cta')}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 hover:bg-blue-50 transition-colors shadow-lg"
                  aria-label="Download resume"
                >
                  <FileText size={16} />
                  Resume
                </a>
                <a
                  href="https://calendly.com/kumararpit17773/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 hover:bg-slate-800 transition-colors shadow-lg"
                  aria-label="Schedule Meeting"
                >
                  <Mail size={16} />
                  Schedule
                </a>
                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
