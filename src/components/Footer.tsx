import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowUpRight,
  ChevronUp,
  Fingerprint,
  Microscope,
  Code2,
  FileText,
  Layout,
} from "lucide-react";
import { SiKaggle, SiCodeforces, SiLinkedin, SiGithub, SiOrcid} from "react-icons/si";
import { useRole } from "../context/RoleContext";

/* ─────────────────────── data ─────────────────────── */

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Layout },
  { to: "/projects", label: "Projects", icon: Code2 },
  { to: "/aboutme", label: "About Me", icon: Fingerprint },
  { to: "/request-cv", label: "CV Pack", icon: FileText },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

const RESEARCH_LINKS = [
  { href: "https://orcid.org/0009-0006-1391-6300",
    label: "ORCID",
    icon: SiOrcid },
  {
    href: "https://www.kaggle.com/kumararpitiitkgp",
    label: "Kaggle",
    icon: SiKaggle,
  },
  // {
  //   href: "https://medium.com/@kumararpit17773",
  //   label: "Medium",
  //   icon: SiMedium,
  // },
  
] as const;

const TECH_LINKS = [
  { href: "https://github.com/arpitkumar2004", 
    label: "GitHub", 
    icon: SiGithub },
  {
    href: "https://linkedin.com/in/arpit-kumar-shivam",
    label: "LinkedIn",
    icon: SiLinkedin,
  },
  {
    href: "https://codeforces.com/profile/kumararpit",
    label: "Codeforces",
    icon: SiCodeforces,
  },
] as const;

// const OPPORTUNITIES = [
//   {
//     icon: Briefcase,
//     title: "Summer 2026 Internship",
//     desc: "Seeking Data Science & Production ML roles — NLP, LLM/RAG engineering, scalable inference at MNC or R&D teams.",
//   },
//   {
//     icon: Users,
//     title: "Research Collaborations",
//     desc: "Applied deep learning, MLOps, and speech AI — research with measurable deployment impact.",
//   },
// ] as const;

// Key numbers pulled directly from the CV — do not approximate
const ACHIEVEMENT_STATS = [
  { value: "Top 0.5%", label: "Amazon ML", sub: "50K+ participants" },
  { value: "1612", label: "Codeforces", sub: "Expert · peak rating" },
  { value: "AIR 135", label: "Intgral Cup 2026 S1", sub: "Across 3 mathematical tracks" },
] as const;

/* ─────────────────────── helpers ─────────────────────── */

const ExternalLink: React.FC<{
  href: string;
  icon: React.ElementType;
  label: string;
}> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between rounded-xl border border-transparent bg-slate-100 p-3 text-xs font-bold text-slate-600 transition-colors hover:border-blue-500/20 hover:text-blue-500 dark:bg-white/5 dark:text-slate-400 dark:hover:text-blue-400"
  >
    <span className="flex items-center gap-2">
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
    <ArrowUpRight size={12} aria-hidden="true" />
  </a>
);

const SectionHeading: React.FC<{
  icon: React.ElementType;
  label: string;
}> = ({ icon: Icon, label }) => (
  <div className="mb-5 flex items-center gap-2">
    <Icon size={14} className="text-blue-500" aria-hidden="true" />
    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
      {label}
    </h4>
  </div>
);

/* ─────────────────────── component ─────────────────────── */

const Footer: React.FC = () => {
  const { role: userRole } = useRole();
  const [visitorCount, setVisitorCount] = useState(211);

  /* session-safe visitor counter */
  useEffect(() => {
    const counted = sessionStorage.getItem("arpit_session_counted");
    const total =
      Number(localStorage.getItem("arpit_total_access_logs")) || 211;
    if (!counted) {
      const next = total + 1;
      localStorage.setItem("arpit_total_access_logs", next.toString());
      sessionStorage.setItem("arpit_session_counted", "true");
      setVisitorCount(next);
    } else {
      setVisitorCount(total);
    }
  }, []);

  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [],
  );

  return (
    <footer
      className="relative overflow-hidden border-t border-slate-200 bg-gray-50 pt-16 pb-8 text-slate-900 dark:border-white/5 dark:bg-[#161616] dark:text-white"
      aria-label="Site footer"
    >
      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgb(37 99 235) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── MAIN GRID: 4 + 3 + 2 + 3 = 12 cols ── */}
        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* ── COL 1: Brand + Bio + Achievement Stats (4/12) ── */}
          <div className="space-y-6 lg:col-span-5">
            {/* Name */}
            <Link
              to="/"
              className="inline-block text-2xl font-black tracking-wider text-blue-600 transition-opacity hover:opacity-90"
            >
              Arpit Kumar
            </Link>

            {/* Bio — sourced from CV headline */}
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <strong className="font-bold text-slate-800 dark:text-slate-200">
                ML Engineer &amp; AI Researcher
              </strong>{" "}
              at IIT Kharagpur. Building production-grade NLP, LLM/RAG, and speech AI systems. Dual degree — Chemical Engineering + AI. Open to research collaborations and summer 2026 internship opportunities and for full time roles from May 2027 onwards.
            </p>

            {/* Achievement stat pills — CV-verified numbers only */}
            <div
              className="grid grid-cols-3 gap-2"
              role="list"
              aria-label="Key achievements"
            >
              {ACHIEVEMENT_STATS.map(({ value, label, sub }) => (
                <div
                  key={label}
                  role="listitem"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/5"
                >
                  <span className="block text-sm font-black leading-tight tracking-tight text-blue-600 dark:text-blue-400">
                    {value}
                  </span>
                  <span className="mt-0.5 block text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    {label}
                  </span>
                  <span className="block text-[9px] leading-tight text-slate-400 dark:text-slate-500">
                    {sub}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ── COL 3: Site Map (2/12) ── */}
          <div className="lg:col-span-3">
            <SectionHeading icon={Layout} label="Site Map" />
            <nav aria-label="Footer navigation">
              <ul className="space-y-3 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="group flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 focus-visible:outline-none focus-visible:underline"
                    >
                      <Icon
                        size={13}
                        className="transition-transform group-hover:scale-110"
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── COL 4: Research + Technical Profiles (3/12) ── */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* Technical */}
            <div>
              <SectionHeading icon={Code2} label="Technical" />
              <div className="flex flex-col gap-2.5">
                {TECH_LINKS.map((l) => (
                  <ExternalLink key={l.href} {...l} />
                ))}
              </div>
            </div>
          </div>

          {/* ── COL 4: Research + Technical Profiles (3/12) ── */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* Research */}
            <div>
              <SectionHeading icon={Microscope} label="Research" />
              <div className="flex flex-col gap-2.5">
                {RESEARCH_LINKS.map((l) => (
                  <ExternalLink key={l.href} {...l} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* /MAIN GRID */}

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-slate-100 pt-6 md:flex-row dark:border-white/5">
          {/* Copyright */}
          <p className="text-[12px] tracking-wide text-slate-400 dark:text-slate-500">
            &copy; 2023–{new Date().getFullYear()} Arpit Kumar. All rights
            reserved.
          </p>

          {/* Visitor counter */}
          <div
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-white/10 dark:bg-white/5"
            aria-label={`Visitor count: ${visitorCount}`}
          >
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              Visitors
            </span>
            <span className="font-mono text-sm font-black tracking-widest text-blue-500">
              {visitorCount.toString().padStart(6, "0")}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Role selector */}
            <button
              onClick={() => window.dispatchEvent(new Event("role:open"))}
              aria-label={
                userRole
                  ? `Current viewing role: ${userRole}. Click to change.`
                  : "Set your viewing role"
              }
              className="flex items-center gap-2 rounded-lg border border-transparent bg-slate-100 px-3 py-2 text-[12px] font-mono font-bold uppercase tracking-wide text-slate-700 transition-all hover:border-blue-500/30 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
            >
              <Fingerprint
                size={16}
                className="text-blue-400"
                aria-hidden="true"
              />
              {userRole ?? "Set role"}
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group flex items-center gap-2 rounded-lg border border-transparent bg-slate-100 px-3 py-2 text-[12px] font-mono font-bold uppercase tracking-wide text-slate-600 transition-all hover:border-blue-500/30 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-white/5 dark:text-slate-500 dark:hover:text-white"
            >
              <ChevronUp
                size={18}
                className="transition-transform group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              Top
            </button>
          </div>
        </div>
        {/* /BOTTOM BAR */}
      </div>

      {/* Blue accent line at the very bottom */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 opacity-40"
        aria-hidden="true"
      />
    </footer>
  );
};

export default Footer;
