import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ChevronRight,
  Clock,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import {
  isOpenToWork,
  setOpenToWork,
  onOpenToWorkChange,
} from "../utils/openToWork";
import { trackResumeDownload} from "../utils/analytics";
import {
  openToWorkPositions,
  getSummerDeadlineInfo,
} from "../data/openToWorkData";

const ADMIN_PIN = "1234"; // Simple PIN as requested. Consider server-side validation for production.

const OpenToWork: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(isOpenToWork());
  const [open, setOpen] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [hasBeenViewed, setHasBeenViewed] = useState<boolean>(false);
  const [impressionTracked, setImpressionTracked] = useState<boolean>(false);
  const [dismissedThisSession, setDismissedThisSession] =
    useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Get deadline info for urgency messaging
  const deadlineInfo = getSummerDeadlineInfo();

  // Track analytics
  const trackEvent = useCallback((action: string, label?: string) => {
    try {
      if (
        typeof window !== "undefined" &&
        (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
      ) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
          "event",
          action,
          {
            event_category: "Open to Work",
            event_label: label || "",
          },
        );
      }
    } catch {
      // Silently fail - analytics is not critical
    }
  }, []);

  // Ensure the flag exists (set to true by default) so visibility persists across reloads
  useEffect(() => {
    try {
      const key = localStorage.getItem("openToWork");
      if (key === null) setOpenToWork(true);
    } catch {
      // ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onOpenToWorkChange((v) => setVisible(v));
    return unsubscribe;
  }, []);

  // Track impression when component becomes visible
  useEffect(() => {
    if (visible && !impressionTracked) {
      trackEvent("impression", "Badge Shown");
      setImpressionTracked(true);
    }
  }, [visible, impressionTracked, trackEvent]);

  // Auto-open after 3 seconds on first visit to grab attention
  useEffect(() => {
    if (!visible || hasBeenViewed) return;

    const autoOpenTimer = setTimeout(() => {
      setOpen(true);
      setHasBeenViewed(true);
      trackEvent("auto_open", "First Visit - 3s Delay");
    }, 3000);

    return () => clearTimeout(autoOpenTimer);
  }, [visible, hasBeenViewed, trackEvent]);

  // Track whether the current user is an Admin (set by RoleGateway)
  useEffect(() => {
    const read = () => setIsAdmin(localStorage.getItem("userRole") === "Admin");
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "userRole") read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Smart scroll-based re-appearance: show again after scrolling down 30% if not yet viewed
  useEffect(() => {
    if (!visible || dismissedThisSession) return;

    let lastScrollY = window.scrollY;
    const threshold = document.documentElement.scrollHeight * 0.3; // 30% instead of 50%
    let timeoutId: NodeJS.Timeout | null = null;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (
        currentScrollY > threshold &&
        currentScrollY > lastScrollY &&
        !hasBeenViewed
      ) {
        // Delay auto-open by 500ms for smoother UX
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setOpen(true);
          setHasBeenViewed(true);
          trackEvent("auto_open", "Scroll Triggered");
        }, 500);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [visible, dismissedThisSession, hasBeenViewed, trackEvent]);

  // Keyboard shortcuts: Escape closes dropdown/modal; Ctrl+R re-shows badge
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setShowPinModal(false);
      }

      // Ctrl+R to reappear
      if ((e.ctrlKey || e.metaKey) && (e.key === "r" || e.key === "R")) {
        e.preventDefault();
        setOpenToWork(true);
        setVisible(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleBadgeClick = () => {
    setOpen(!open);
    if (!open) {
      trackEvent("badge_click", "User Clicked Badge");
      setHasBeenViewed(true);
    }
  };

  const handleRoleClick = (roleTitle: string) => {
    trackEvent("role_click", roleTitle);
  };

  const handleGetCVClick = () => {
    trackEvent("cta_click", "Get CV Button");
  };

  const handleQuickDismiss = () => {
    setOpen(false);
    setDismissedThisSession(true);
    trackEvent("dismiss", "User Dismissed Dropdown");
  };

  const submitPin = () => {
    if (pin === ADMIN_PIN) {
      setOpenToWork(false);
      setVisible(false);
      setShowPinModal(false);
      setPin("");
      setPinError(null);
      setAttempts(0);
      trackEvent("admin_hide", "Badge Hidden by Admin");
    } else {
      setAttempts((a) => a + 1);
      setPinError("Incorrect PIN");
      setPin("");
    }
  };

  const handleHideClick = () => {
    setPin("");
    setPinError(null);
    setShowPinModal(true);
  };

  if (!visible) return null;

  return (
    <>
      {/* Improved positioning: fixed to top-right with better spacing and mobile support */}
      <div className="fixed top-20 md:top-24 right-4 md:right-6 z-50 pointer-events-auto">
        <div
          ref={containerRef}
          className="relative inline-block"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* Badge with pulse animation and better styling */}
          <button
            onClick={handleBadgeClick}
            onFocus={() => setOpen(true)}
            onBlur={(e) => {
              const related = e.relatedTarget as Node | null;
              if (
                !related ||
                (containerRef.current &&
                  !containerRef.current.contains(related))
              )
                setOpen(false);
            }}
            aria-haspopup="true"
            aria-expanded={open}
            className="group relative inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 dark:focus-visible:ring-emerald-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
            title="Seeking Summer 2026 Internship — click to see details"
          >
            {/* Multi-layer pulse animation */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 opacity-75 animate-ping" />
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 opacity-50 animate-pulse" />

            {/* Shimmer effect */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </span>

            {/* Content */}
            <span className="relative flex items-center gap-2.5">
              <Briefcase
                size={18}
                className="group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="text-sm font-bold tracking-wide">
                Seeking Internship
              </span>
              {deadlineInfo.isUrgent && (
                <span className="ml-0.5 px-2 py-0.5 bg-white/25 backdrop-blur-sm rounded-full text-[11px] font-mono font-bold animate-pulse">
                  {deadlineInfo.daysLeft}d
                </span>
              )}
            </span>
          </button>

          {/* Enhanced Dropdown Menu */}
          <div
            id="open-to-work-list"
            role="menu"
            aria-label="Open to work menu"
            className={`absolute right-0 mt-3 w-[420px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] bg-white dark:bg-[#161616] text-slate-700 dark:text-slate-200 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 transform origin-top-right transition-all duration-300 ease-out overflow-y-auto ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            style={{ scrollbarWidth: 'thin' }}
          >
            {/* Header with urgency messaging - Sticky on scroll */}
            <div className="sticky top-0 z-10 p-4 border-b border-slate-100 dark:border-white/10 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-blue-950/20 rounded-t-2xl backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles
                      size={16}
                      className="text-emerald-600 dark:text-emerald-400 animate-pulse"
                    />
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      Available for Hire
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Summer 2026 Internship
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    IIT Kharagpur • Dual Degree • Ready to contribute
                  </p>
                </div>
                <button
                  onClick={handleQuickDismiss}
                  className="p-1.5 hover:bg-white/70 dark:hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X
                    size={16}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  />
                </button>
              </div>

              {/* Urgency indicator */}
              {deadlineInfo.isUrgent && (
                <div className="flex items-center gap-2 text-xs text-orange-800 dark:text-orange-200 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800/30">
                  <Clock size={14} className="animate-pulse" />
                  <span className="font-semibold">
                    Application deadline in {deadlineInfo.daysLeft} days •{" "}
                    {deadlineInfo.deadline}
                  </span>
                </div>
              )}

              {/* Social proof - candidate perspective */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold">Responding within 24hrs</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
                  <TrendingUp size={12} className="" />
                  <span className="font-medium">Multiple offers in review</span>
                </div>
              </div>
            </div>

            {/* Roles list with improved styling */}
            <div className="p-3">
              <div className="mb-2 px-3">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Interested in these roles:
                </p>
              </div>
              <ul className="space-y-2">
                {openToWorkPositions.map((p, i) => (
                  <li key={i}>
                    <Link
                      to="/request-cv"
                      state={{ role: p.title }}
                      role="menuitem"
                      onClick={() => handleRoleClick(p.title)}
                      className="group relative flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:via-teal-50 hover:to-blue-50 dark:hover:from-emerald-950/30 dark:hover:via-teal-950/30 dark:hover:to-blue-950/30 transition-all duration-300 border border-slate-100 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:shadow-md"
                      aria-label={`View details for ${p.title} in ${p.field}`}
                    >
                      {/* Gradient hover accent */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-teal-500/0 to-blue-500/0 group-hover:from-emerald-500/5 group-hover:via-teal-500/5 group-hover:to-blue-500/5 transition-all duration-300" />

                      <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                            {p.title}
                          </span>
                          {p.level && (
                            <span className="text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-2 py-0.5 rounded-md font-semibold shadow-sm">
                              {p.level}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                          {p.field}
                        </div>
                        {p.description && (
                          <div className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed mb-2">
                            {p.description}
                          </div>
                        )}
                        {p.tags && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {p.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-1 bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded-md font-medium border border-slate-200 dark:border-white/10 group-hover:border-emerald-300 dark:group-hover:border-emerald-700/50 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer with CTA - Sticky at bottom */}
            <div className="sticky bottom-0 z-10 p-4 border-t border-slate-100 dark:border-white/10 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-white/5 dark:via-transparent dark:to-white/5 rounded-b-2xl backdrop-blur-sm">
              <div className="flex gap-2">
                <a
                  href="/Arpit_Kumar_Resume.pdf"
                  download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
                  onClick={() => {
                    trackResumeDownload("open_to_work_cta");
                    handleGetCVClick();
                  }}
                  aria-label="Download resume PDF immediately"
                  className="flex-1 group relative overflow-hidden flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 dark:focus-visible:ring-blue-500/50"
                >
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                  <Briefcase
                    size={18}
                    className="relative group-hover:rotate-12 transition-transform duration-300"
                  />
                  <span className="relative text-sm font-bold">Download My Resume</span>
                  <ChevronRight
                    size={18}
                    className="relative group-hover:translate-x-1 transition-transform duration-300"
                  />
                </a>
                {isAdmin && (
                  <button
                    type="button"
                    className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/5 transition-colors"
                    onClick={handleHideClick}
                  >
                    Hide
                  </button>
                )}
              </div>

              {/* Additional context */}
              <div className="mt-3 text-center">
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1">
                  ⚡ Instant download • 📄 Role-specific versions available
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500">
                  Updated Feb 2026 • Available to start immediately
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-30"
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative bg-white dark:bg-[#161616] rounded-lg shadow-xl p-6 w-full max-w-sm z-70"
          >
            <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">
              Confirm Hide
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Enter admin PIN to hide the Open-to-work badge.
            </p>
            <label className="sr-only" htmlFor="pin-input">
              Admin PIN
            </label>
            <input
              id="pin-input"
              autoFocus
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              type="password"
              inputMode="numeric"
              className="w-full px-3 py-2 border rounded-md mb-2 bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 border-slate-200 dark:border-white/10"
              placeholder="Enter PIN"
              onKeyDown={(e) => {
                if (e.key === "Enter") submitPin();
              }}
            />
            {pinError && (
              <div className="text-sm text-red-600 mb-2">{pinError}</div>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-2 rounded-md bg-slate-100 dark:bg-white/10"
                onClick={() => setShowPinModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded-md bg-emerald-600 text-white"
                onClick={submitPin}
              >
                Confirm
              </button>
            </div>
            {attempts > 0 && (
              <div className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                Attempts: {attempts}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OpenToWork;
