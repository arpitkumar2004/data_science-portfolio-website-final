import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  ArrowRight,
  FileText,
  Terminal,
  Briefcase,
  Mail,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { trackExternalLink, trackResumeDownload } from "../utils/analytics";
import { getRecruiterProfile } from "../utils/recruiterProfile";
import SEOHead from "../components/SEOHead";

import { SiGithub, SiKaggle, SiLinkedin, SiOrcid, SiPypi } from "react-icons/si";

// Components
import ProjectCard from "../components/ProjectCard";
import { WorkExperienceSection, PORSection } from "../components/Experience";
import Education from "../components/Education";
import ResearchComponent from "../components/research";
import TechnicalProficiencies from "../data/skillsData";
import Achievements from "../data/AchievementData";
import AniText from "../components/AniText";

// Data & Assets
import { useProjects } from "../context/ProjectsContext";
import { findProjectByKeyOrTitle } from "../data/openToWorkPageData";
import myphoto from "../data/img/me/my_photo2.png";

const Home: React.FC = () => {
  const { projects } = useProjects();

  const featuredHomeProjects = useMemo(() => {
    const titles = [
      "DocuReason RAG: Multimodal Document Retrieval & Reasoning Framework",
      "LLM-Powered Employee Support Platform with RAG and Scalable AI Infrastructure",
      "PrismPrice — Multimodal Price Prediction using Text, Image, and Tabular Data",
    ];
    const fallbackIds = [10, 9, 5];
    const result: typeof projects = [];

    titles.forEach((targetTitle, idx) => {
      let match = findProjectByKeyOrTitle(projects, targetTitle);
      if (!match && fallbackIds[idx]) {
        match = projects.find((p) => String(p.id) === String(fallbackIds[idx]));
      }
      if (match) {
        result.push(match);
      }
    });

    if (result.length < 3) {
      projects.forEach((p) => {
        if (result.length < 3 && !result.some((r) => r.id === p.id)) {
          result.push(p);
        }
      });
    }

    return result;
  }, [projects]);

  const GoogleScholar = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
    </svg>
  );

  const shouldReduceMotion = useReducedMotion();
  const heroItem = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stats = useMemo(() => {
    const nowYear = new Date().getFullYear();
    const startYears = projects
      .map((p) => {
        const dur = p.duration || "";
        const m = dur.match(/([A-Za-z]+)\s+(\d{4})/);
        if (m) return parseInt(m[2], 10);
        const y = dur.match(/(\d{4})/);
        if (y) return parseInt(y[1], 10);
        return null;
      })
      .filter(Boolean) as number[];

    const earliest = startYears.length ? Math.min(...startYears) : nowYear;
    const years = Math.min(1, nowYear - earliest);
    const yearsDisplay = String(years).padStart(2, "0") + "+";

    const projectsDeployedCount = projects.filter((p) =>
      p.tags?.some((t) => /(deployed|live|completed)/i.test(t)),
    ).length;

    const competitionsWonCount = projects.filter(
      (p) =>
        p.type?.toLowerCase() === "competition" &&
        p.results?.some((r) =>
          /(place|rank|ranked|gold|silver|bronze|1st|2nd|3rd)/i.test(r),
        ),
    ).length;

    const ongoingResearchCount = projects.filter(
      (p) =>
        (p.type && p.type.toLowerCase().includes("research")) ||
        p.tags?.some((t) => /ongoing/i.test(t)),
    ).length;

    return [
      { l: "Years Experienced", v: yearsDisplay, d: "Shipping Production" },
      {
        l: "Live Deployments",
        v: String(projectsDeployedCount).padStart(2, "0") + "+",
        d: "Real users & Impact",
      },
      {
        l: "Competition Wins",
        v: String(competitionsWonCount).padStart(2, "0") + "+",
        d: "Ranked outcomes",
      },
      {
        l: "Active Projects",
        v: String(ongoingResearchCount).padStart(2, "0") + "+",
        d: "Building & Learning",
      },
    ];
  }, [projects]);

  // Open-to-work logic moved to `OpenToWork` component.

  // Track if this visitor is a verified recruiter
  const [isRecruiter, setIsRecruiter] = useState(false);
  useEffect(() => {
    const checkRecruiter = () => {
      const role = localStorage.getItem("userRole");
      setIsRecruiter(role === "Recruiter" && !!getRecruiterProfile());
    };
    checkRecruiter();
    window.addEventListener("role:updated", checkRecruiter);
    return () => window.removeEventListener("role:updated", checkRecruiter);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 dark:selection:bg-blue-500/20 overflow-x-hidden dark:bg-black dark:text-slate-100">
      <SEOHead
        canonicalPath="/"
        description="ML Engineer & AI Researcher @ IIT Kharagpur specializing in Artificial Intelligence and Applications and High Performance Computing. Seeking full-time roles in ML engineering and research from May 2027."
      />
      {/* Recruiter Nudge — only visible to verified recruiters */}
      {isRecruiter && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800/40">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              <Briefcase size={14} className="inline mr-1.5 -mt-0.5" />
              <strong>Looking to hire?</strong>{" "}
              <span className="hidden sm:inline">
                View my availability, logistics, and complete candidate profile.
              </span>
            </p>
            <Link
              to="/open-to-work"
              className="shrink-0 text-xs font-bold bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
            >
              View Profile <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-12 lg:pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            className="lg:col-span-7"
            initial={shouldReduceMotion ? "show" : "hidden"}
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            <motion.div variants={heroItem} className="hero-content">
              <motion.h1
                variants={heroItem}
                className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-3 leading-tight"
              >
                Arpit Kumar
              </motion.h1>

              <motion.div
                variants={heroItem}
                className="max-w-2xl mb-6 space-y-3"
              >
                {/* <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Open for Production ML, AI Research, and LLM roles
                </div> */}
                <p className="text-slate-700 dark:text-slate-200 text-base md:text-lg leading-relaxed font-semibold max-w-3xl">
                  <span className="text-blue-600 dark:text-blue-400">
                    ML Engineer & AI Researcher @ IIT Kharagpur
                  </span>{" "}
                  researching NLP and speech/language models at the Advanced
                  Technology Development Center
                  {/* <p>
                   I am a final year dual degree student pursuing micro-specializing in Artificial Intelligence and Applications with High-Performance Computing,
                  </p> */}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
                  I am a Final-year Integrated Dual Degree student in Chemical
                  Engineering with micro-specializing in{" "}
                  <i>Artificial Intelligence & Applications</i> and{" "}
                  <i>High-Performance Computing</i>. Placed in the top 0.5%
                  globally in the Amazon ML Challenge'25 and won 1st place at GC OpenSoft'25
                  (Deloitte-sponsored) for a RAG-based mental health monitoring platform.
                  Comfortable across the ML lifecycle — PyTorch, TensorFlow, and
                  JAX for modeling; FastAPI for serving; MLflow and DVC for
                  experiment tracking and reproducibility. Seeking full-time ML
                  engineering and research roles starting May 2027.
                </p>
                <motion.h2
                  variants={heroItem}
                  className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-8 flex items-center gap-2"
                >
                  <span className="w-6 h-px bg-blue-600"></span>
                  Featured Skills
                </motion.h2>
                <p className="text-xs md:text-sm text-slate-900 dark:text-slate-400 font-mono">
                  Python • SQL • PyTorch • TensorFlow • CUDA • FastAPI • NLP •
                  MLflow • DVC
                </p>
              </motion.div>

              <motion.h2
                variants={heroItem}
                className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-3 flex items-center gap-2"
              >
                <span className="w-6 h-px bg-blue-600"></span>
                Impact Metrics
              </motion.h2>
              <div
                role="list"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 pb-6"
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    role="listitem"
                    whileHover={!shouldReduceMotion ? { y: -2 } : {}}
                    className="stat-card group cursor-default rounded-xl p-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-800/30 ring-1 ring-slate-900/5 dark:ring-white/10 hover:ring-blue-600/80 transition-all"
                  >
                    <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {s.v}
                    </h3>
                    <p className="text-[13px] font-bold text-blue-500 mb-1">
                      {s.l}
                    </p>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      {s.d}
                    </p>
                    <div
                      className="w-8 h-1 bg-blue-600 mt-2 group-hover:w-full transition-all duration-300"
                      aria-hidden="true"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Primary CTAs */}
              <motion.div
                variants={heroItem}
                className="flex flex-col items-center sm:flex-row flex-wrap gap-3 mb-6 mt-2 sm:mt-6 items-start sm:items-center"
              >
                <a
                  href="/Arpit_Kumar_Resume.pdf"
                  download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
                  onClick={() => trackResumeDownload("hero_primary_cta")}
                  aria-label="Download resume PDF immediately"
                  className="group relative px-6 py-3.5 bg-blue-600 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2.5 hover:bg-blue-700 transition-all hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <FileText
                    size={18}
                    className="relative group-hover:rotate-12 transition-transform"
                  />
                  <span className="relative">Download Resume</span>
                  <ArrowRight
                    size={18}
                    className="relative group-hover:translate-x-1 transition-transform"
                  />
                </a>

                <Link
                  to="/projects"
                  aria-label="View all projects"
                  className="group px-6 py-3.5 bg-slate-900 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2.5 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 hover:scale-[1.02]"
                >
                  View Projects
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>

              {/* Secondary Links */}
              <motion.div
                variants={heroItem}
                className="flex flex-wrap items-center gap-4 px-4"
              >
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                >
                  Contact Me
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <Link
                  to="/aboutme"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                >
                  My Story
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <Link
                  to="/request-cv"
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1.5 group"
                >
                  Full CV
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative"
            initial={shouldReduceMotion ? "show" : "hidden"}
            animate="show"
            variants={{ show: { transition: { delay: 0.2 } } }}
          >
            <div className="relative mx-auto w-full max-w-[420px]">
              {/* Background decorative elements */}
              <div
                className="absolute -inset-6 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-950/20 dark:to-slate-900/20 rounded-[3.5rem] -z-10 opacity-60"
                aria-hidden="true"
              />

              {/* Main image container */}
              <motion.div
                whileHover={!shouldReduceMotion ? { y: -4 } : {}}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                {/* Image wrapper with professional shadow */}
                <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 aspect-[4/5] ring-1 ring-slate-900/5 dark:ring-white/10">
                  <img
                    src={myphoto}
                    alt="Arpit Kumar - ML Engineer & AI Researcher at IIT Kharagpur"
                    width={420}
                    height={525}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover grayscale-[80%] group-hover:grayscale-0 group-focus-within:grayscale-0 transition-all duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Name overlay - visible on mobile by default, slides in on hover for desktop */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="bg-gradient-to-t from-slate-900/95 via-slate-900/90 to-transparent dark:from-black/95 dark:via-black/90 backdrop-blur-sm pt-12 pb-6 px-6">
                      <div className="text-center space-y-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <h3 className="text-2xl font-black text-white tracking-tight">
                          Arpit Kumar
                        </h3>
                        <p className="text-sm font-semibold text-blue-300 tracking-wide">
                          ML Engineer & AI Researcher @ IIT Kharagpur '27
                        </p>
                        <div className="flex items-center justify-center gap-2 pt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-medium text-emerald-300">
                            Available for full time Opportunities May 2027
                            onwards
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Links - Refined Side Bar */}
              <div className="absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-10">
                {[
                  {
                    icon: SiGithub,
                    href: "https://github.com/arpitkumar2004",
                    label: "GitHub",
                    platform: "github",
                    gradient: "from-slate-900 to-slate-700",
                  },
                  {
                    icon: SiLinkedin,
                    href: "https://linkedin.com/in/arpit-kumar-shivam/",
                    label: "LinkedIn",
                    platform: "linkedin",
                    gradient: "from-blue-600 to-blue-500",
                  },
                  {
                    icon: SiKaggle,
                    href: "https://kaggle.com/kumararpitiitkgp",
                    label: "Kaggle",
                    platform: "kaggle",
                    gradient: "from-cyan-500 to-blue-500",
                  },
                  // {
                  //   icon: GoogleScholar,
                  //   href: "https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID",
                  //   label: "Google Scholar",
                  //   platform: "scholar",
                  //   gradient: "from-blue-500 to-indigo-500",
                  // },
                  {
                    icon: SiOrcid,
                    href: "https://orcid.org/0009-0006-1391-6300",
                    label: "ORCID",
                    platform: "orcid",
                    gradient: "from-green-500 to-teal-500",
                  },
                  {
                    icon: SiPypi,
                    href: "https://pypi.org/user/kumararpit/",
                    label: "PyPI",
                    platform: 'pypi',
                    gradient: "from-green-600 to-teal-500",
                  },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackExternalLink(item.platform, "hero_sidebar")
                    }
                    aria-label={item.label}
                    className="group/social relative"
                  >
                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg opacity-0 group-hover/social:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                      {item.label}
                    </div>

                    {/* Icon Button */}
                    <div className="p-3.5 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl rounded-xl ring-1 ring-slate-900/5 dark:ring-white/10 hover:ring-slate-900/10 dark:hover:ring-white/20 transition-all duration-300 hover:-translate-x-1 hover:scale-105">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover/social:opacity-10 rounded-xl transition-opacity duration-300`}
                      />
                      <item.icon
                        size={18}
                        className="relative text-slate-700 dark:text-slate-300 group-hover/social:text-slate-900 dark:group-hover/social:text-white transition-colors duration-300"
                      />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- EDUCATION SECTION (ACADEMIC VALIDATION) --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <Education />
        </div>
      </motion.section>

      {/* --- WORK & RESEARCH EXPERIENCE (PLACED DIRECTLY BELOW ACADEMIC SECTION) --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <WorkExperienceSection />
      </motion.section>

      {/* --- ACHIEVEMENTS --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-black text-white py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <Achievements />
        </div>
      </motion.section>

      {/* --- POSITIONS OF RESPONSIBILITY (PLACED AFTER ACHIEVEMENTS SECTION) --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <PORSection />
      </motion.section>

      {/* --- PROJECTS --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-24 bg-white dark:bg-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mt-2 tracking-tighter">
                Shipped Systems &amp; Research
              </h2>
            </div>

            <Link
              to="/projects"
              className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-2xl hover:text-blue-600 transition-colors group"
            >
              View Full Portfolio{" "}
              <ArrowRight
                size={30}
                className="group-hover:translate-x-2 transition-transform"
              />
            </Link>
          </div>
          <div
            className="w-16 h-1.5 bg-blue-600 rounded-full mb-16"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {featuredHomeProjects.map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* --- RESEARCH SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-slate-50 dark:bg-black py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <ResearchComponent />
        </div>
      </motion.section>

      {/* --- SKILLS --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-24">
          <TechnicalProficiencies />
        </div>
      </motion.section>

      {/* ═══════════════ RECRUITER CTA / COLLABORATION ═══════════════ */}
      <section className="px-6 md:px-12 lg:px-20 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-950 p-8 sm:p-12 lg:p-14 text-white shadow-2xl shadow-blue-950/40">
            {/* Ambient background glows */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-600/15 blur-[100px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                  Let's Build &amp; Scale Next-Gen{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                    Production AI Systems
                  </span>
                </h2>

                {/* Subtitle */}
                <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed font-normal">
                  Whether you're looking for production ML engineering, high-throughput LLM architectures,
                  or rigorous AI research—I partner with engineering teams and founders to deliver measurable system performance.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-4 flex flex-col gap-3.5 sm:max-w-xs lg:max-w-none ml-auto w-full">
                <Link
                  to="/contact"
                  className="group relative px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl flex items-center justify-between shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      <Mail size={18} />
                    </div>
                    <span>Initiate Discussion</span>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>

                <a
                  href="/Arpit_Kumar_Resume.pdf"
                  download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
                  onClick={() => trackResumeDownload("hero_primary_cta")}
                  aria-label="Download resume PDF immediately"
                  className="group px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-base rounded-2xl flex items-center justify-between border border-white/15 hover:border-white/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      <FileText size={18} />
                    </div>
                    <span>Download Resume</span>
                  </div>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      {/* <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="pb-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[3rem] border border-blue-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-12 lg:p-20 text-white shadow-2xl shadow-blue-500/20">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-blue-300 mb-5">
                Strategic Collaboration
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                Scale Revenue with Production AI
              </h2>
              <p className="text-slate-200/80 max-w-6xl mx-auto mb-8 text-lg leading-relaxed ">
                Ship ML systems that reduce costs by 20-40%, accelerate
                decision-making by 10x, and unlock competitive intelligence. I
                build research-grade models that generate measurable ROI at
                industrial scale.
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                {[
                  { v: "20-40%", l: "Cost reduction" },
                  { v: "10x", l: "Faster decisions" },
                  { v: "Prod-ready", l: "End-to-end ML" },
                  { v: "Secure", l: "Enterprise-grade" },
                ].map((item) => (
                  <div
                    key={item.l}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="text-lg font-black text-white">
                      {item.v}
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
                      {item.l}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <a
                  href="https://calendly.com/kumararpit17773/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 shadow-xl shadow-blue-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                >
                  Let's Discuss Your Project
                </a>
                <Link
                  to="/projects"
                  className="px-10 py-4 bg-white/10 border border-white/15 text-white font-bold rounded-lg hover:border-blue-300 hover:text-blue-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                >
                  Explore Track Record
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section> */}
    </div>
  );
};

export default Home;
