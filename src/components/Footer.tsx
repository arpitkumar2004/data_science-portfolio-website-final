import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Github, Linkedin, Mail, Terminal,
  ArrowUpRight, ChevronUp, Fingerprint,
  Zap, Microscope, Code2, FileText, Layout,
  Briefcase, Calendar, Users
} from 'lucide-react';
import { SiKaggle, SiMedium } from 'react-icons/si';

/* ───────────────────── data ───────────────────── */

const NAV_LINKS = [
  { to: '/',           label: 'Home',     icon: Layout },
  { to: '/projects',   label: 'Projects', icon: Microscope },
  { to: '/aboutme',    label: 'About Me', icon: Fingerprint },
  { to: '/request-cv', label: 'CV Pack',  icon: FileText },
  { to: '/contact',    label: 'Contact',  icon: Mail },
] as const;

const RESEARCH_LINKS = [
  { href: 'https://www.kaggle.com/kumararpitiitkgp', label: 'Kaggle',          icon: SiKaggle },
  { href: 'https://medium.com/@kumararpit17773',     label: 'Medium Articles',  icon: SiMedium },
] as const;

const TECH_LINKS = [
  { href: 'https://github.com/arpitkumar2004',        label: 'GitHub',   icon: Github },
  { href: 'https://linkedin.com/in/arpit-kumar-shivam', label: 'LinkedIn', icon: Linkedin },
] as const;

const OPPORTUNITIES = [
  {
    icon: Briefcase,
    title: 'Summer 2026 Internships',
    desc: 'Industrial R&D & MNC ML teams — production ML, cost optimization, scalable inference.',
  },
  {
    icon: Users,
    title: 'Research Partnerships',
    desc: 'Deep learning, MLOps, latency & robustness — applied research with measurable impact.',
  },
] as const;

/* ───────────────────── helpers ───────────────────── */

const ExternalLink: React.FC<{
  href: string;
  icon: React.ElementType;
  label: string;
}> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between rounded-xl border border-transparent bg-slate-100 p-3 text-xs font-bold text-slate-600 transition-colors hover:border-blue-500/20 hover:text-blue-500 dark:bg-white/5 dark:text-slate-400"
  >
    <span className="flex items-center gap-2"><Icon size={14} /> {label}</span>
    <ArrowUpRight size={12} />
  </a>
);

const SectionHeading: React.FC<{
  icon: React.ElementType;
  label: string;
}> = ({ icon: Icon, label }) => (
  <div className="mb-5 flex items-center gap-2">
    <Icon size={14} className="text-blue-500" />
    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
      {label}
    </h4>
  </div>
);

/* ───────────────────── component ───────────────────── */

const Footer: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState(211);

  /* role listener */
  useEffect(() => {
    const read = () => setUserRole(localStorage.getItem('userRole'));
    read();
    window.addEventListener('storage', read);
    window.addEventListener('role:updated', read);
    return () => {
      window.removeEventListener('storage', read);
      window.removeEventListener('role:updated', read);
    };
  }, []);

  /* session-safe visitor counter (no per-second timer) */
  useEffect(() => {
    const counted = sessionStorage.getItem('arpit_session_counted');
    const total = Number(localStorage.getItem('arpit_total_access_logs')) || 211;
    if (!counted) {
      const next = total + 1;
      localStorage.setItem('arpit_total_access_logs', next.toString());
      sessionStorage.setItem('arpit_session_counted', 'true');
      setVisitorCount(next);
    } else {
      setVisitorCount(total);
    }
  }, []);

  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    [],
  );

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white pt-16 pb-8 text-slate-900 dark:border-white/5 dark:bg-[#161616] dark:text-white">
      {/* dot-grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(rgb(37 99 235) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── MAIN GRID ── */}
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">

          {/* COL 1 — Brand & Bio (3/12) */}
          <div className="space-y-5 lg:col-span-3">
            <Link to="/" className="group inline-flex items-center gap-3">
              <div className="rounded-xl bg-blue-600 p-2 shadow-lg shadow-blue-900/20 transition-transform group-hover:rotate-12">
                <Terminal size={22} className="text-white" />
              </div>
              <span className="text-2xl font-black uppercase tracking-tighter">Arpit Kumar</span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>AI / ML Systems & Applied Researcher</strong> at IIT Kharagpur.
              Building production-grade deep learning systems — cloud architecture,
              MLOps, distributed systems & research-to-deployment pipelines.
            </p>

            {/* Visitor counter */}
            <div className="inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-3 dark:border-white/10 dark:bg-white/5">
              <div>
                <p className="mb-0.5 text-[9px] font-mono font-bold uppercase tracking-tight text-slate-500">Visitors</p>
                <p className="font-mono text-base font-black tracking-widest text-blue-500">
                  {visitorCount.toString().padStart(6, '0')}
                </p>
              </div>
            </div>
          </div>

          {/* COL 2 — Opportunities CTA (3/12) */}
          <div className="lg:col-span-3">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-blue-600/10 bg-blue-600/5 p-5 dark:border-blue-600/20">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-blue-500" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500">
                    Opportunities
                  </h4>
                </div>

                <ul className="mb-6 space-y-4">
                  {OPPORTUNITIES.map(({ icon: Icon, title, desc }) => (
                    <li key={title} className="flex items-start gap-3">
                      <Icon size={18} className="mt-0.5 shrink-0 text-blue-400" />
                      <div>
                        <p className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200">{title}</p>
                        <p className="mt-0.5 text-[10px] leading-snug text-slate-500 dark:text-slate-400">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://calendly.com/kumararpit17773/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-xl bg-blue-600 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-blue-500"
              >
                <span className="flex items-center gap-2"><Calendar size={14} /> Schedule Meeting</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* COL 3 — Site Map (2/12) */}
          <div className="lg:col-span-2">
            <SectionHeading icon={Layout} label="Site Map" />
            <ul className="space-y-3 text-xs font-bold uppercase tracking-wider">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-400"
                  >
                    <Icon size={14} className="transition-transform group-hover:scale-110" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — Profiles (4/12, split into 2 sub-cols) */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-4">
            {/* Research */}
            <div>
              <SectionHeading icon={Microscope} label="Research" />
              <div className="flex flex-col gap-3">
                {RESEARCH_LINKS.map((l) => (
                  <ExternalLink key={l.href} {...l} />
                ))}
              </div>
            </div>

            {/* Technical */}
            <div>
              <SectionHeading icon={Code2} label="Technical" />
              <div className="flex flex-col gap-3">
                {TECH_LINKS.map((l) => (
                  <ExternalLink key={l.href} {...l} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-6 md:flex-row dark:border-white/5">
          {/* Status badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-green-500">
              <Zap size={12} /> Open to Internships 2026
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
              PyTorch · Docker · GCP · FastAPI · React
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new Event('role:open'))}
              aria-label={userRole ? `Current role ${userRole}. Click to change.` : 'Set viewing role'}
              title={userRole ? `Viewing as ${userRole} — click to change` : 'Set viewing role'}
              className="flex items-center gap-2 rounded-lg border border-transparent bg-slate-100 px-3 py-1.5 text-[9px] font-mono font-bold uppercase text-slate-700 transition-all hover:border-blue-500/30 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
            >
              <Fingerprint size={13} className="text-blue-400" />
              {userRole ?? 'Set role'}
            </button>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group flex items-center gap-2 rounded-lg border border-transparent bg-slate-100 px-3 py-1.5 text-[9px] font-mono font-bold uppercase text-slate-600 transition-all hover:border-blue-500/30 hover:text-slate-900 dark:bg-white/5 dark:text-slate-500 dark:hover:text-white"
            >
              <ChevronUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
              Back to top
            </button>

            <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
              &copy; {new Date().getFullYear()} Arpit Kumar
            </p>
          </div>
        </div>
      </div>

      {/* accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 opacity-40" />
    </footer>
  );
};

export default Footer;