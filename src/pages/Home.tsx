import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  ArrowRight,
  FileText,
  Terminal,
  ShieldCheck,
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
import OpenToWork from "../components/OpenToWork";

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
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-12 lg:pt-20 lg:pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div className="lg:col-span-7" initial={shouldReduceMotion ? 'show' : 'hidden'} animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
            <motion.div variants={heroItem} className="hero-content">
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 dark:bg-white/5 dark:border-white/10 rounded-full">
                  <img src={iitkgplogo} alt="IIT KGP" className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest">IIT Kharagpur // Dual Degree</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 dark:bg-blue-600/10 dark:border-blue-500/20 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
                  <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Active Researcher</span>
                </div>
              </div>

              <motion.h1 variants={heroItem} className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-2 leading-tight">
                Arpit Kumar
              </motion.h1>

              <motion.div variants={heroItem} className="h-10 flex items-center mb-2">
                <span className="text-lg md:text-2xl font-mono font-bold text-blue-600">
                  &gt; <AniText
                    texts={["Deep Learning Researcher", "Applied ML Researcher", "Production ML Engineer", "AI Systems Builder", "First-Principles Engineer"]}
                    typingSpeed={50}
                    pauseTime={1500}
                  />
                </span>
              </motion.div>

              <motion.p variants={heroItem} className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-4">
                <strong>Applied ML Engineer who ships code that matters.</strong> Built production systems serving high-traffic applications at IIT Kharagpur. Expert in PyTorch, TensorFlow, React, Node.js, and cloud infrastructure.
              </motion.p>

              <motion.h2 variants={heroItem} className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mb-4">Impact Metrics</motion.h2>
              <div role="list" className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 border-y border-slate-100 dark:border-white/10 py-6">
                {stats.map((s, i) => (
                  <div key={i} role="listitem" className="stat-card">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-1 tracking-tighter">{s.v}</h3>
                    <p className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest mb-1">{s.l}</p>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-500">{s.d}</p>
                    <div className="w-8 h-1 bg-blue-600 mt-2" aria-hidden="true" />
                  </div>
                ))}
              </div>

              <motion.p variants={heroItem} className="inline-flex items-center gap-2 text-sm md:text-base text-blue-600 dark:text-blue-400 font-semibold mb-4 bg-blue-50 dark:bg-blue-600/10 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-500/20">
                {/*<span>Seeking full-time roles in <strong>ML Engineering</strong> / <strong>Data Science</strong> (May 2027 grad) • Open to relocation</span> */}
                <span>Seeking Summer internship roles <strong>ML Engineering</strong> / <strong>Data Science</strong> • Open to relocation</span>
              </motion.p>

              <motion.div variants={heroItem} className="flex flex-col sm:flex-row flex-wrap gap-4">
                <a 
                  href="/Arpit_Kumar_Resume.pdf" 
                  download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
                  onClick={() => trackResumeDownload('hero_primary_cta')}
                  aria-label="Download resume PDF immediately" 
                  className="group px-4 py-3 bg-blue-600 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 animate-pulse hover:animate-none"
                >
                  <FileText size={15} className="group-hover:rotate-12 transition-transform" />
                  Download Resume
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link 
                  to="/projects" 
                  aria-label="Contact for opportunities" 
                  className="px-4 py-3 bg-slate-900 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  View Projects
                  {/* <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /> */}
                </Link>

                <Link to="/contact" className="px-4 py-3 bg-slate-900 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                  Contact Me
                </Link>
                <Link to="/aboutme" className="px-4 py-3 bg-slate-900 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                  My Story
                </Link>
              </motion.div>

              {/* <motion.div variants={heroItem} className="flex flex-wrap gap-4 mt-4">
                <Link to="/projects" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  View 15+ Projects →
                </Link>
                <Link to="/aboutme" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  My Story →
                </Link>
              </motion.div> */}
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-5 relative profile-image-container" initial={shouldReduceMotion ? 'show' : 'hidden'} animate="show" variants={{ show: { transition: { delay: 0.2 } } }}>
            <motion.div whileHover={!shouldReduceMotion ? { scale: 1.03 } : {}} className="relative z-10 mx-auto w-full max-w-[420px]">
              <div className="absolute -inset-4 border border-slate-100 dark:border-white/10 rounded-[3rem] -z-10" aria-hidden="true" />
              <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-[#111827] border-4 border-white dark:border-white/10 shadow-2xl aspect-[4/5]">
                <img 
                  src={myphoto} 
                  alt="Arpit Kumar" 
                  width={420}
                  height={525}
                  loading="lazy" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                />
              </div>

              <OpenToWork />

              <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {[
                  { icon: Github, href: "https://github.com/arpitkumar2004", label: 'GitHub', platform: 'github' },
                  { icon: Linkedin, href: "https://linkedin.com/in/arpit-kumar-shivam/", label: 'LinkedIn', platform: 'linkedin' },
                  { icon: SiKaggle, href: "https://kaggle.com/kumararpitiitkgp", label: 'Kaggle', platform: 'kaggle' },
                  { icon: GoogleScholar, href: "#", label: 'Google Scholar', platform: 'scholar' }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => trackExternalLink(item.platform, 'hero_sidebar')}
                    aria-label={item.label} 
                    className="p-4 bg-white dark:bg-[#161616] shadow-xl rounded-2xl text-slate-600 dark:text-slate-300 hover:text-blue-600 border border-slate-50 dark:border-white/10 transition-all hover:-translate-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  >
                    <item.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- QUICK FACTS FOR RECRUITERS (TL;DR) --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/20 dark:via-black dark:to-indigo-950/20"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border-2 border-blue-500/20 p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2 tracking-tight">
                  Why Recruiters Should Care
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  TL;DR — What makes me different from other ML candidates
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Production Experience, Not Just Theory</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Built production systems serving high-traffic applications. I ship code, not just papers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Proven Under Pressure</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Ranked 42nd/8,690 teams (Top 0.5%) in Amazon ML Challenge 2025. Proven ability to deliver under tight deadlines.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Full-Stack + ML = Rare Combo</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">React, Node.js, Docker, PyTorch, TensorFlow. I build the entire pipeline, end-to-end.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Leadership Experience</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Mentored 30+ developers, led technical roadmaps, shipped 8+ features per quarter as Technical Advisor.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">IIT Kharagpur Pedigree</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Dual Degree from India's top engineering institute with 7.86 CGPA. Rigorous training in first principles.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Available Summer internship 2026</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Open to summer internship roles globally. Can start full-time immediately after graduation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-slate-100">Bottom line:</strong> I'm a rare blend of ML researcher + production engineer + full-stack developer who actually ships.
              </p>
              <div className="flex gap-3 shrink-0">
                <a
                  href="/Arpit_Kumar_Resume.pdf"
                  download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
                  onClick={() => trackResumeDownload('recruiter_section_cta')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2"
                >
                  <FileText size={16} />
                  Get Resume
                </a>
                <Link
                  to="/contact"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2"
                >
                  Schedule Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- SOCIAL PROOF / TRUST SIGNALS SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-white dark:bg-black border-y border-slate-100 dark:border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
              Validated by Competition & Production
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
              Recognition & Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Competition Win */}
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-2xl border border-yellow-200 dark:border-yellow-800/30">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-bold mb-4">
                🏆 Competition
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">Top 0.5%</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Amazon ML Challenge 2025 (42nd/8,690 teams globally)
              </p>
            </div>

            {/* Production Scale */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl border border-green-200 dark:border-green-800/30">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 rounded-full text-xs font-bold mb-4">
                🚀 Production
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">Production Scale</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Built systems designed for high availability with zero critical bugs
              </p>
            </div>

            {/* Academic Excellence */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-bold mb-4">
                🎓 Academic
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">7.86 CGPA</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                IIT Kharagpur Dual Degree - Top cohort performance
              </p>
            </div>

            {/* Open Source */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl border border-purple-200 dark:border-purple-800/30">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-bold mb-4">
                👨‍💻 Leadership
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">30+ Devs</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Mentored engineers as Technical Advisor at DevSoc
              </p>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-10 p-6 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border border-slate-100 dark:border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-blue-600 mb-1">6+</div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Projects Shipped</div>
              </div>
              <div>
                <div className="text-3xl font-black text-green-600 mb-1">Reliable</div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">High Availability</div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-600 mb-1">8+</div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Features/Quarter</div>
              </div>
              <div>
                <div className="text-3xl font-black text-amber-600 mb-1">3+</div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Years Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

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
                <Link to="/contact" className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 shadow-xl shadow-blue-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">Let's Discuss Your Project</Link>
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