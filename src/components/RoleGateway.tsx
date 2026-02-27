import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Binary, FileSearch, Globe, Lock, ArrowRight, Building2, CheckCircle2, X, Sparkles, ShieldCheck, Download, Briefcase, BookOpen, Code2, Eye } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { trackEvent } from '../utils/analytics';
import RecruiterGate from './RecruiterGate';
import { getRecruiterProfile, clearRecruiterProfile } from '../utils/recruiterProfile';

// Resolve admin panel target once.
const getAdminPanelUrl = (): string => {
  const fromEnv = import.meta.env.VITE_ADMIN_PANEL_URL as string | undefined;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/+$|$/, "/");
  }
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5174/';
    }
  }
  return 'https://admin.arpitkumar.dev/';
};

const roles = [
  {
    id: 'Recruiter',
    icon: <Building2 className="h-6 w-6" />,
    title: 'Recruiter / Hiring',
    desc: 'Everything you need to evaluate candidacy and make a hiring decision.',
    color: 'amber' as const,
    access: [
      { icon: <Briefcase size={14} />, text: 'Open-to-work page with availability & preferences' },
      { icon: <Download size={14} />, text: 'Downloadable CV & portfolio package' },
      { icon: <Sparkles size={14} />, text: 'Impact metrics & career highlights' },
      { icon: <Eye size={14} />, text: 'Compensation expectations & logistics' },
    ],
  },
  {
    id: 'Researcher',
    icon: <FileSearch className="h-6 w-6" />,
    title: 'Research Peer',
    desc: 'Deep dive into research methodology and academic contributions.',
    color: 'purple' as const,
    access: [
      { icon: <BookOpen size={14} />, text: 'Research papers & publications' },
      { icon: <Code2 size={14} />, text: 'Technical methodology breakdowns' },
      { icon: <Eye size={14} />, text: 'Experiment results & datasets' },
      { icon: <Sparkles size={14} />, text: 'Novelty highlights & key findings' },
    ],
  },
  {
    id: 'Developer',
    icon: <Binary className="h-6 w-6" />,
    title: 'Developer',
    desc: 'Explore system design, code architecture, and tech stack choices.',
    color: 'cyan' as const,
    access: [
      { icon: <Code2 size={14} />, text: 'Architecture & system design docs' },
      { icon: <Eye size={14} />, text: 'Live project demos & source code' },
      { icon: <BookOpen size={14} />, text: 'Tech stack deep dives' },
      { icon: <Sparkles size={14} />, text: 'Engineering impact & performance wins' },
    ],
  },
  {
    id: 'Guest',
    icon: <Globe className="h-6 w-6" />,
    title: 'General Visitor',
    desc: 'Browse the portfolio with a high-level overview of everything.',
    color: 'slate' as const,
    access: [
      { icon: <Eye size={14} />, text: 'Projects showcase & case studies' },
      { icon: <BookOpen size={14} />, text: 'About page & contact info' },
      { icon: <Sparkles size={14} />, text: 'Featured highlights & achievements' },
      { icon: <Code2 size={14} />, text: 'Simple overview of skills & tools' },
    ],
  },
];

const colorMap = {
  amber: { text: 'text-amber-400', iconBg: 'bg-amber-500/15' },
  purple: { text: 'text-purple-400', iconBg: 'bg-purple-500/15' },
  cyan: { text: 'text-cyan-400', iconBg: 'bg-cyan-500/15' },
  slate: { text: 'text-slate-400', iconBg: 'bg-white/10' },
};

const RoleGateway = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [showFullModal, setShowFullModal] = useState(false);
  const [showRecruiterGate, setShowRecruiterGate] = useState(false);
  const [recruiterGateSource, setRecruiterGateSource] = useState<'banner' | 'modal'>('banner');
  const [isReady, setIsReady] = useState(false);
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  const { showToast } = useToast();

  // Initialize from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      // Returning visitor — use their saved role
      setRole(savedRole);
      setIsReady(true);
    } else {
      // First-time visitor — render the page but show the role picker after 2s
      // Do NOT set Guest yet; only persist a role when the user makes a choice
      setRole('Guest');       // in-memory only so children can render
      setIsReady(true);
      const timer = setTimeout(() => setShowFullModal(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Mark ready after role is set
  useEffect(() => {
    if (role) setIsReady(true);
  }, [role]);

  // Listen for re-open event (from footer "Set role" button)
  useEffect(() => {
    const openHandler = () => {
      setShowFullModal(true);
      setTimeout(() => firstBtnRef.current?.focus(), 50);
    };
    window.addEventListener('role:open', openHandler);
    return () => window.removeEventListener('role:open', openHandler);
  }, []);

  // Show info toast on first session visit
  useEffect(() => {
    if (role && role !== 'Guest' && !sessionStorage.getItem('roleNotifShown')) {
      showToast(`Viewing as ${role}`, 'info', 4000, 'top');
      sessionStorage.setItem('roleNotifShown', '1');
    }
  }, [role, showToast]);

  // Close the modal and commit Guest role to localStorage
  const handleCloseModal = useCallback(() => {
    setShowFullModal(false);
    // If user has never explicitly chosen a role, persist Guest now
    if (!localStorage.getItem('userRole')) {
      localStorage.setItem('userRole', 'Guest');
      window.dispatchEvent(new Event('role:updated'));
      trackEvent('role_modal_dismissed', { defaulted_to: 'Guest' });
    }
  }, []);

  // Escape key to close modal
  useEffect(() => {
    if (!showFullModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleCloseModal(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showFullModal, handleCloseModal]);

  const handleSelect = useCallback((selectedRole: string) => {
    // If selecting Recruiter and not already verified, show the gate form
    if (selectedRole === 'Recruiter' && !getRecruiterProfile()) {
      setRecruiterGateSource(showFullModal ? 'modal' : 'banner');
      setShowRecruiterGate(true);
      return;
    }

    // If switching AWAY from Recruiter, clear the stored profile
    if (selectedRole !== 'Recruiter') {
      clearRecruiterProfile();
    }

    localStorage.setItem('userRole', selectedRole);
    setRole(selectedRole);
    setShowFullModal(false);
    setShowRecruiterGate(false);
    sessionStorage.setItem('roleNotifShown', '1');
    showToast(`Viewing as ${selectedRole}`, 'success', 4000, 'top');
    window.dispatchEvent(new Event('role:updated'));
    trackEvent('role_selected', { role: selectedRole, source: showFullModal ? 'modal' : 'banner' });
  }, [showToast, showFullModal]);

  /** Called after recruiter passes the gate form */
  const handleRecruiterVerified = useCallback(() => {
    localStorage.setItem('userRole', 'Recruiter');
    setRole('Recruiter');
    setShowFullModal(false);
    setShowRecruiterGate(false);
    sessionStorage.setItem('roleNotifShown', '1');
    showToast('Verified! Viewing as Recruiter', 'success', 4000, 'top');
    window.dispatchEvent(new Event('role:updated'));
    trackEvent('role_selected', { role: 'Recruiter', source: recruiterGateSource, verified: true });
  }, [showToast, recruiterGateSource]);

  if (!isReady) return null;

  return (
    <>
      {children}

      {/* FULL-SCREEN MODAL — first visit or footer "Set role" */}
      <AnimatePresence>
        {showFullModal && !showRecruiterGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-[#060b16]/95 backdrop-blur-md text-white font-sans"
            role="dialog"
            aria-modal="true"
            aria-label="Select interaction mode"
          >
            <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6 overflow-y-auto">
              {/* Close */}
              <motion.button
                onClick={handleCloseModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 z-10"
                aria-label="Close role selection"
              >
                <X size={20} />
              </motion.button>

              <div className="w-full max-w-7xl">
                {/* Header — compact */}
                <motion.div
                  className="text-center mb-5"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-blue-400/80 text-[10px] font-mono uppercase tracking-[0.25em] mb-2">Portfolio</p>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-snug">
                    How would you like to{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
                      explore?
                    </span>
                  </h2>
                  <p className="mt-1.5 text-slate-400 text-xs max-w-md mx-auto">
                    Choose a role to personalize your experience.
                  </p>
                </motion.div>

                {/* Cards — simplified and professional */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {roles.map((r, idx) => {
                    const c = colorMap[r.color];
                    const isCurrent = role === r.id;
                    return (
                      <motion.button
                        key={r.id}
                        ref={idx === 0 ? firstBtnRef : undefined}
                        onClick={() => handleSelect(r.id)}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.08 + idx * 0.05,
                          duration: 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        className={`group relative flex items-start gap-3 text-left p-3 rounded-lg border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                          ${isCurrent ? 'border-blue-500/70 bg-blue-500/10 ring-1 ring-blue-500/30' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}
                        `}
                      >
                        {/* Icon */}
                        {/* <div className={`p-2 rounded-md ${c.iconBg} shrink-0`}>
                          <span className={c.text}>{r.icon}</span>
                        </div> */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-md font-semibold text-white leading-tight truncate">{r.title}</h3>
                            {r.id === 'Recruiter' && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide bg-blue-500/20 text-blue-300">
                                <ShieldCheck size={10} /> Verified
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] text-slate-400 mt-0.5 line-clamp-2">{r.desc}</p>
                          <ul className="mt-1.5 space-y-1">
                            {r.access.slice(0, 4).map((item, index) => (
                              <li key={index} className="flex items-center gap-1.5 text-[12px] text-slate-300">
                                <CheckCircle2 className="h-5 w-5 text-emerald-400/90 shrink-0" />
                                <span className="line-clamp-2">{item.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="shrink-0">
                          {isCurrent ? (
                            <CheckCircle2 className="h-4 w-4 text-blue-400" />
                          ) : (
                            <ArrowRight size={14} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Admin link */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <a
                    href={getAdminPanelUrl()}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-400 transition-colors font-mono text-[10px] uppercase tracking-widest"
                  >
                    <Lock size={10} /> Admin
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RECRUITER VERIFICATION GATE — shown when user clicks "Recruiter" */}
      <AnimatePresence>
        {showRecruiterGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[85] bg-[#060b16]/95 backdrop-blur-sm overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Recruiter verification"
          >
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6">
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <RecruiterGate
                  variant="modal"
                  onVerified={handleRecruiterVerified}
                  onCancel={() => setShowRecruiterGate(false)}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoleGateway;