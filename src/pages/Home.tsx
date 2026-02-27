import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  ArrowRight,
  FileText,
  Terminal,

} from "lucide-react";
import { trackResumeDownload, trackExternalLink } from "../utils/analytics";

import { SiKaggle} from "react-icons/si";

// Components
import ProjectCard from "../components/ProjectCard";
import Experience from "../components/Experience";
import Education from "../components/Education";
import ResearchComponent from "../components/research";
import TechnicalProficiencies from "../data/skillsData";
import Achievements from "../data/AchievementData";
import AniText from "../components/AniText";
import OpenToWorkBadge from "../components/OpenToWorkBadge";

// Data & Assets
import { projects } from "../data/projectsData";
import iitkgplogo from "../data/img/me/2.png";
import myphoto from "../data/img/me/my_photo2.png";

const Home: React.FC = () => {
  const GoogleScholar = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
    </svg>
  );

  const shouldReduceMotion = useReducedMotion();
  const heroItem = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  const stats = useMemo(() => {
    const nowYear = new Date().getFullYear();
    const startYears = projects.map(p => {
      const dur = p.duration || '';
      const m = dur.match(/([A-Za-z]+)\s+(\d{4})/);
      if (m) return parseInt(m[2], 10);
      const y = dur.match(/(\d{4})/);
      if (y) return parseInt(y[1], 10);
      return null;
    }).filter(Boolean) as number[];

    const earliest = startYears.length ? Math.min(...startYears) : nowYear;
    const years = Math.max(0, nowYear - earliest);
    const yearsDisplay = String(years).padStart(2, '0') + '+';

    const projectsDeployedCount = projects.filter(p => p.tags?.some(t => /(deployed|live|completed)/i.test(t))).length;

    const competitionsWonCount = projects.filter(p =>
      p.type?.toLowerCase() === 'competition' &&
      p.results?.some(r => /(place|rank|ranked|gold|silver|bronze|1st|2nd|3rd)/i.test(r))
    ).length;

    const ongoingResearchCount = projects.filter(p =>
      (p.type && p.type.toLowerCase().includes('research')) ||
      p.tags?.some(t => /ongoing/i.test(t))
    ).length;

    return [
      { l: 'Years Shipping ML', v: yearsDisplay, d: 'Production & Research' },
      { l: 'Live Deployments', v: String(projectsDeployedCount).padStart(2, '0') + '+', d: 'Real users & Impact' },
      { l: 'Competition Podiums', v: String(competitionsWonCount).padStart(2, '0') + '+', d: 'Ranked outcomes' },
      { l: 'Active Projects', v: String(ongoingResearchCount).padStart(2, '0') + '+', d: 'Building & Learning' },
    ];
  }, [projects]);

  // Open-to-work logic moved to `OpenToWork` component.


  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 dark:selection:bg-blue-500/20 overflow-x-hidden dark:bg-black dark:text-slate-100">
      
      {/* Open to Work Badge - Fixed Position */}
      <OpenToWorkBadge />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-12 lg:pt-20 lg:pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div className="lg:col-span-7" initial={shouldReduceMotion ? 'show' : 'hidden'} animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
            <motion.div variants={heroItem} className="hero-content">

              <motion.h1 variants={heroItem} className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-3 leading-tight">
                Arpit Kumar
              </motion.h1>

              <motion.div variants={heroItem} className="h-10 flex items-center mb-4">
                <span className="text-lg md:text-2xl font-mono font-bold text-blue-600">
                  &gt; <AniText
                    texts={["Deep Learning Researcher", "Applied ML Researcher", "Production ML Engineer", "AI Systems Builder", "First-Principles Engineer"]}
                    typingSpeed={50}
                    pauseTime={1500}
                  />
                </span>
              </motion.div>

              <motion.div variants={heroItem} className="max-w-2xl mb-6 space-y-3">
                <p className="text-slate-700 dark:text-slate-200 text-base md:text-lg leading-relaxed font-semibold">
                  Applied ML Engineer who builds end-to-end—from <span className="text-blue-600 dark:text-blue-400">research to production</span>.
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                  Full-stack systems architect • Deep learning + scalable infrastructure
                </p>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-mono">
                  PyTorch • TensorFlow • React • Node.js • Docker
                </p>
              </motion.div>

              <motion.h2 variants={heroItem} className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-blue-600"></span>
                Impact Metrics
              </motion.h2>
              <div role="list" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4 pb-6">
                {stats.map((s, i) => (
                  <motion.div 
                    key={i} 
                    role="listitem" 
                    whileHover={!shouldReduceMotion ? { y: -2 } : {}}
                    className="stat-card group cursor-default rounded-xl p-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-800/30 ring-1 ring-slate-900/5 dark:ring-white/10 hover:ring-blue-500/20 transition-all"
                  >
                    <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-1 tracking-tighter group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{s.v}</h3>
                    <p className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest mb-1">{s.l}</p>
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{s.d}</p>
                    <div className="w-8 h-1 bg-blue-600 mt-2 group-hover:w-full transition-all duration-300" aria-hidden="true" />
                  </motion.div>
                ))}
              </div>

              {/* Primary CTAs */}
              <motion.div variants={heroItem} className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
                <a 
                  href="/Arpit_Kumar_Resume.pdf" 
                  download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
                  onClick={() => trackResumeDownload('hero_primary_cta')}
                  aria-label="Download resume PDF immediately" 
                  className="group relative px-6 py-3.5 bg-blue-600 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2.5 hover:bg-blue-700 transition-all hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <FileText size={18} className="relative group-hover:rotate-12 transition-transform" />
                  <span className="relative">Download Resume</span>
                  <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
                </a>
                
                <Link 
                  to="/projects" 
                  aria-label="View all projects" 
                  className="group px-6 py-3.5 bg-slate-900 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2.5 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 hover:scale-[1.02]"
                >
                  View Projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Secondary Links */}
              <motion.div variants={heroItem} className="flex flex-wrap items-center gap-4 px-4">
                <Link 
                  to="/contact" 
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                >
                  Contact Me
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <Link 
                  to="/aboutme" 
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                >
                  My Story
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <Link 
                  to="/request-cv" 
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1.5 group"
                >
                  Get Extended CV Pack
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5 relative" 
            initial={shouldReduceMotion ? 'show' : 'hidden'} 
            animate="show" 
            variants={{ show: { transition: { delay: 0.2 } } }}
          >
            <div className="relative mx-auto w-full max-w-[420px]">
              {/* Background decorative elements */}
              <div className="absolute -inset-6 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-950/20 dark:to-slate-900/20 rounded-[3.5rem] -z-10 opacity-60" aria-hidden="true" />
              
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
                    alt="Arpit Kumar - ML Engineer & Applied AI Researcher at IIT Kharagpur" 
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
                          Applied ML Engineer • IIT Kharagpur '27
                        </p>
                        <div className="flex items-center justify-center gap-2 pt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-medium text-emerald-300">
                            Available for Opportunities
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
                  { icon: Github, href: "https://github.com/arpitkumar2004", label: 'GitHub', platform: 'github', gradient: 'from-slate-900 to-slate-700' },
                  { icon: Linkedin, href: "https://linkedin.com/in/arpit-kumar-shivam/", label: 'LinkedIn', platform: 'linkedin', gradient: 'from-blue-600 to-blue-500' },
                  { icon: SiKaggle, href: "https://kaggle.com/kumararpitiitkgp", label: 'Kaggle', platform: 'kaggle', gradient: 'from-cyan-500 to-blue-500' },
                  { icon: GoogleScholar, href: "https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID", label: 'Google Scholar', platform: 'scholar', gradient: 'from-blue-500 to-indigo-500' }
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackExternalLink(item.platform, 'hero_sidebar')}
                    aria-label={item.label}
                    className="group/social relative"
                  >
                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg opacity-0 group-hover/social:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                      {item.label}
                    </div>
                    
                    {/* Icon Button */}
                    <div className="p-3.5 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl rounded-xl ring-1 ring-slate-900/5 dark:ring-white/10 hover:ring-slate-900/10 dark:hover:ring-white/20 transition-all duration-300 hover:-translate-x-1 hover:scale-105">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover/social:opacity-10 rounded-xl transition-opacity duration-300`} />
                      <item.icon size={18} className="relative text-slate-700 dark:text-slate-300 group-hover/social:text-slate-900 dark:group-hover/social:text-white transition-colors duration-300" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* --- RESEARCH SECTION --- */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-slate-50 dark:bg-[#161517] py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <ResearchComponent />
        </div>
      </motion.section>

      {/* --- EXPERIENCE SECTION (PRIORITIZED FOR HIRING) --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto dark:bg-black px-6">
          <Experience />
        </div>
      </motion.section>

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

      {/* --- ACHIEVEMENTS --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-slate-50 dark:bg-[#161517] text-white py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <Achievements />
        </div>
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg text-blue-600">
                <Terminal size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-blue-600">
                Production Portfolio
              </span>
            </div>              
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mt-2 tracking-tighter">Shipped Systems & Research</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base mt-3 max-w-4xl font-medium">
            End-to-end ML projects demonstrating research-to-deployment rigor—from Kaggle competitions to production systems handling real users, with measurable impact and open-source contributions.
          </p>
            </div>
            <Link to="/projects" className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold hover:text-blue-600 transition-colors group">
              View Full Portfolio <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {[12, 7, 10].map((id) => {
                const p = projects.find((proj) => proj.id === id);
                return p ? <ProjectCard key={p.id} {...p} /> : null;
              })}
            </AnimatePresence>
          </div>
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

      {/* --- FOOTER CTA --- */}
      <motion.section
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
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-blue-300 mb-5">Strategic Collaboration</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Scale Revenue with Production AI</h2>
              <p className="text-slate-200/80 max-w-6xl mx-auto mb-8 text-lg leading-relaxed ">
                Ship ML systems that reduce costs by 20-40%, accelerate decision-making by 10x, and unlock competitive intelligence. I build research-grade models that generate measurable ROI at industrial scale.
              </p>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                {[
                  { v: "20-40%", l: "Cost reduction" },
                  { v: "10x", l: "Faster decisions" },
                  { v: "Prod-ready", l: "End-to-end ML" },
                  { v: "Secure", l: "Enterprise-grade" },
                ].map((item) => (
                  <div key={item.l} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="text-lg font-black text-white">{item.v}</div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-slate-300">{item.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <a href="https://calendly.com/kumararpit17773/30min" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 shadow-xl shadow-blue-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">Let's Discuss Your Project</a>
                <Link to="/projects" className="px-10 py-4 bg-white/10 border border-white/15 text-white font-bold rounded-lg hover:border-blue-300 hover:text-blue-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">Explore Track Record</Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
    </div>
  );
};

export default Home;