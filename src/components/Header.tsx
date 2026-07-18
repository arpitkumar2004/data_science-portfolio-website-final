import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ShieldCheck, Briefcase } from 'lucide-react';
import { getRecruiterProfile } from '../utils/recruiterProfile';
import { useRole } from '../context/RoleContext';

/* ─────────────────────── data ─────────────────────── */

const NAV_LINKS = [
  { href: '/',          label: 'Home'     },
  { href: '/projects',  label: 'Projects' },
  { href: '/aboutme',   label: 'About'    },
  { href: '/contact',   label: 'Contact'  },
] as const;

/* ─────────────────────── component ─────────────────────── */

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const { role } = useRole();
  const location = useLocation();

  const isAdmin     = role === 'Admin'     && !!sessionStorage.getItem('adminToken');
  const isRecruiter = role === 'Recruiter' && !!getRecruiterProfile();

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close menu on route change ── */
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  /* ── Body scroll-lock + Escape handler when menu is open ── */
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);

  /* ─────────── render ─────────── */
  return (
    <>
      {/* ───────── Fixed header shell ───────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-lg shadow-sm border-b border-slate-100 dark:bg-[#161616]/90 dark:border-white/10'
            : 'bg-transparent dark:bg-transparent'
        }`}
      >
        {/*
          Padding lives here — not split between header + inner div.
          py-4 when scrolled, py-6 when at top.
        */}
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? 'py-3' : 'py-5'
          }`}
        >

          {/* ── Brand ── */}
          <Link to="/" className="group flex items-center gap-2" aria-label="Go to homepage">
            <div className="flex flex-col">
              <span className="text-xl font-black leading-none tracking-widest text-blue-600">
                Arpit Kumar
              </span>
              {/* Added IIT Kharagpur — institutional credibility at first glance */}
              <span className="mt-0.5 text-[12px] font-semibold tracking-widest text-slate-700 dark:text-slate-200">
                ML Engineer &amp; AI Researcher @ IIT Kharagpur
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {/* Regular nav links */}
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:underline ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-blue-600"
                    />
                  )}
                </Link>
              );
            })}

            {/* Recruiter-only link */}
            {isRecruiter && (
              <Link
                to="/open-to-work"
                aria-current={location.pathname === '/open-to-work' ? 'page' : undefined}
                className={`relative px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:underline ${
                  location.pathname === '/open-to-work'
                    ? 'text-blue-600'
                    : 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300'
                }`}
              >
                <Briefcase size={13} className="mr-1 inline" aria-hidden="true" />
                Hire Me
                {location.pathname === '/open-to-work' && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-blue-600"
                  />
                )}
              </Link>
            )}

            {/* Admin-only link */}
            {isAdmin && (
              <Link
                to="/admin"
                aria-current={location.pathname === '/admin' ? 'page' : undefined}
                className={`relative px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:underline ${
                  location.pathname === '/admin'
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                <ShieldCheck size={14} className="mr-1 inline" aria-hidden="true" />
                Admin
                {location.pathname === '/admin' && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-blue-600"
                  />
                )}
              </Link>
            )}

            {/* Thin divider */}
            <div className="mx-3 h-4 w-px bg-slate-200 dark:bg-white/10" aria-hidden="true" />

            {/* Availability pulse pill — Summer '26 internship signal */}
            {/* <div
              className="hidden items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/8 px-2.5 py-1 lg:inline-flex"
              title="Open to Summer 2026 ML Engineering & AI Research Internship"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              <span className="whitespace-nowrap text-[9px] font-mono font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                Summer '26
              </span>
            </div> */}

            {/* Get CV Pack CTA */}
            <Link
              to="/request-cv"
              className="ml-2 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-colors hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:shadow-blue-900/30"
            >
              <Download size={15} aria-hidden="true" />
              Get CV Pack
            </Link>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="rounded-lg p-2 text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-200 dark:hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </header>

      {/* ───────── Mobile menu overlay ───────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-40 flex flex-col bg-white px-6 pb-12 pt-24 dark:bg-[#0a0a0a] md:hidden"
          >
            {/* Eyebrow label */}
            <span className="mb-6 block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              Navigation
            </span>

            {/* Main nav links
                BUG FIX: was `text-slate-300` in light mode — nearly invisible on white.
                Fixed to `text-slate-800 dark:text-slate-200`.
            */}
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`py-3 text-4xl font-black tracking-tighter transition-colors ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Recruiter — mobile */}
              {isRecruiter && (
                <Link
                  to="/open-to-work"
                  aria-current={location.pathname === '/open-to-work' ? 'page' : undefined}
                  className={`flex items-center gap-3 py-3 text-4xl font-black tracking-tighter transition-colors ${
                    location.pathname === '/open-to-work'
                      ? 'text-blue-600'
                      : 'text-emerald-600 hover:text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  <Briefcase size={28} aria-hidden="true" />
                  Hire Me
                </Link>
              )}

              {/* Admin — mobile */}
              {isAdmin && (
                <Link
                  to="/admin"
                  aria-current={location.pathname === '/admin' ? 'page' : undefined}
                  className={`flex items-center gap-3 py-3 text-4xl font-black tracking-tighter transition-colors ${
                    location.pathname === '/admin'
                      ? 'text-blue-600'
                      : 'text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400'
                  }`}
                >
                  <ShieldCheck size={28} aria-hidden="true" />
                  Admin
                </Link>
              )}
            </nav>

            <div className="my-6 h-px w-full bg-slate-100 dark:bg-white/10" aria-hidden="true" />

            {/* Availability status — mobile */}
            <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-green-500/25 bg-green-500/8 px-3 py-1.5">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                Open to Summer 2026 Internship
              </span>
            </div>

            {/* CTA — solid blue only (removed off-brand purple/indigo gradient)  */}
            <Link
              to="/request-cv"
              className="flex items-center justify-between rounded-2xl bg-blue-600 px-6 py-5 text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <div className="flex flex-col">
                <span className="text-base font-bold">Get CV + Deep-Dives</span>
                <span className="text-xs text-blue-200">Extended resource pack</span>
              </div>
              <Download size={22} aria-hidden="true" />
            </Link>

            {/* Footer note */}
            <p className="mt-auto pt-8 text-[10px] font-mono text-slate-400">
              © 2023–{new Date().getFullYear()} Arpit Kumar
            </p>

          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Dynamic spacer — tracks the header height so content doesn't
        jump when the header shrinks on scroll.
        BUG FIX: was a fixed h-24 regardless of scroll state.
      */}
      <div
        className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-24'}`}
        aria-hidden="true"
      />
    </>
  );
};

export default Header;