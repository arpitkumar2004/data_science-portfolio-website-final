import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Mail, User, ArrowRight, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { RecruiterProfile, saveRecruiterProfile } from '../utils/recruiterProfile';

/**
 * Free / disposable email domains that should be blocked.
 * Recruiters must use a corporate email.
 */
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'yahoo.co.uk',
  'hotmail.com', 'outlook.com', 'live.com', 'msn.com',
  'aol.com', 'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me', 'tutanota.com', 'tutamail.com',
  'zoho.com', 'yandex.com', 'mail.com', 'gmx.com', 'gmx.net',
  'fastmail.com', 'hushmail.com', 'mailinator.com',
  'guerrillamail.com', 'tempmail.com', 'throwaway.email',
  'yopmail.com', 'sharklasers.com', 'temp-mail.org',
  'rediffmail.com', 'inbox.com', 'mail.ru',
]);

/** What we store in localStorage when a recruiter is verified */
// Re-exported from utils for convenience (type only)
export type { RecruiterProfile } from '../utils/recruiterProfile';

interface RecruiterGateProps {
  /** Called after successful verification with the role string */
  onVerified: (role: 'Recruiter') => void;
  /** Called when user cancels / goes back */
  onCancel: () => void;
  /** Visual variant */
  variant?: 'modal' | 'inline';
}

const RecruiterGate: React.FC<RecruiterGateProps> = ({ onVerified, onCancel, variant = 'modal' }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus first field on mount
  useEffect(() => {
    const timer = setTimeout(() => nameRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const validate = (): string | null => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCompany = company.trim();

    if (!trimmedName || trimmedName.length < 2) {
      return 'Please enter your full name.';
    }
    if (!trimmedCompany || trimmedCompany.length < 2) {
      return 'Please enter your company name.';
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return 'Please enter a valid email address.';
    }

    // Extract domain
    const domain = trimmedEmail.split('@')[1];
    if (FREE_EMAIL_DOMAINS.has(domain)) {
      return 'Please use your company email. Personal emails (Gmail, Yahoo, etc.) are not accepted.';
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      trackEvent('recruiter_gate_validation_error', { error: validationError });
      return;
    }

    setSubmitting(true);

    const profile: RecruiterProfile = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      verifiedAt: new Date().toISOString(),
    };

    saveRecruiterProfile(profile);

    trackEvent('recruiter_verified', {
      company: profile.company,
      email_domain: profile.email.split('@')[1],
      source: variant,
    });

    // Small delay for feel
    setTimeout(() => {
      setSubmitting(false);
      onVerified('Recruiter');
    }, 400);
  };

  const isInline = variant === 'inline';

  const formContent = (
    <div className={isInline ? '' : 'w-full max-w-md mx-auto'}>
      <div className={`${isInline ? 'bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700' : 'bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isInline ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-blue-500/20'}`}>
              <ShieldCheck className={`h-6 w-6 ${isInline ? 'text-blue-600 dark:text-blue-400' : 'text-blue-400'}`} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isInline ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                Recruiter Verification
              </h2>
              <p className={`text-xs ${isInline ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400'}`}>
                Company email required
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className={`p-1.5 rounded-lg transition-colors ${isInline ? 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
            aria-label="Cancel verification"
          >
            <X size={18} />
          </button>
        </div>

        {/* Info box */}
        <div className={`flex items-start gap-2.5 p-3 rounded-lg mb-6 text-xs ${isInline ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800' : 'bg-amber-500/10 border border-amber-500/20'}`}>
          <Building2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${isInline ? 'text-amber-600 dark:text-amber-400' : 'text-amber-400'}`} />
          <p className={isInline ? 'text-amber-800 dark:text-amber-200' : 'text-amber-200/80'}>
            This section contains confidential availability details and compensation expectations. Access requires a <strong>company email address</strong> for verification.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="recruiter-name"
              className={`block text-xs font-semibold mb-1.5 ${isInline ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300'}`}
            >
              Full Name
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isInline ? 'text-slate-400' : 'text-slate-500'}`} aria-hidden="true" />
              <input
                ref={nameRef}
                id="recruiter-name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Jane Smith"
                autoComplete="name"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isInline
                    ? 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400'
                    : 'bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50'
                }`}
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="recruiter-company"
              className={`block text-xs font-semibold mb-1.5 ${isInline ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300'}`}
            >
              Company
            </label>
            <div className="relative">
              <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isInline ? 'text-slate-400' : 'text-slate-500'}`} aria-hidden="true" />
              <input
                id="recruiter-company"
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Acme Corp"
                autoComplete="organization"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isInline
                    ? 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400'
                    : 'bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50'
                }`}
              />
            </div>
          </div>

          {/* Work Email */}
          <div>
            <label
              htmlFor="recruiter-email"
              className={`block text-xs font-semibold mb-1.5 ${isInline ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300'}`}
            >
              Work Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isInline ? 'text-slate-400' : 'text-slate-500'}`} aria-hidden="true" />
              <input
                id="recruiter-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@company.com"
                autoComplete="email"
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isInline
                    ? 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-400'
                    : 'bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50'
                }`}
              />
            </div>
            <p className={`text-[11px] mt-1 ${isInline ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500'}`}>
              Personal emails (Gmail, Yahoo, etc.) are not accepted
            </p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`flex items-start gap-2 p-3 rounded-lg text-xs ${isInline ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300' : 'bg-red-500/10 border border-red-500/20 text-red-300'}`} role="alert">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed ${
              isInline
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                Verify & Continue
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Privacy note */}
        <p className={`text-[10px] text-center mt-4 ${isInline ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500'}`}>
          Your information is stored locally in your browser and is only used to personalise your experience. It is never shared with third parties.
        </p>
      </div>
    </div>
  );

  return formContent;
};

export default RecruiterGate;
