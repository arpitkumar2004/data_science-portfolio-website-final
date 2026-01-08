import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  FileText,
  Terminal,
  ShieldCheck,
  History,
  GraduationCap,
  Award,
  ChevronRight
} from "lucide-react";
import { SiKaggle, SiMedium } from "react-icons/si";

// Components
import ProjectCard from "../components/ProjectCard";
import Experience from "../components/Experience";
import Education from "../components/Education";
import ResearchComponent from "../components/research";
import TechnicalProficiencies from "../data/skillsData";
import Achievements from "../data/AchievementData";
import AniText from "../components/AniText";

// Data & Assets
import { projects } from "../data/projectsData";
import iitkgplogo from "../data/img/me/2.png";
import myphoto from "../data/img/me/my_photo2.png";

const Home: React.FC = () => {
  const brandBlue = "rgb(37 99 235)";

  useEffect(() => {
    // Register ScrollTrigger in a client-only lifecycle to prevent errors during module evaluation
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (err) {
      // If registration fails, log and continue; this prevents the whole page from crashing
      console.warn('gsap.registerPlugin failed', err);
    }

    // Hero Entrance
    const tl = gsap.timeline();
    tl.fromTo(".hero-content", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })
      .fromTo(".profile-image-container", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, "-=0.7")
      .fromTo(".stat-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.5");

    // Section Reveals
    const sections = gsap.utils.toArray('.reveal-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  const GoogleScholar = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
    </svg>
  );

  const shouldReduceMotion = useReducedMotion();
  const heroItem = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-12 lg:pt-20 lg:pb-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div className="lg:col-span-7" initial={shouldReduceMotion ? 'show' : 'hidden'} animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }}>
            <motion.div variants={heroItem} className="hero-content">
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                  <img src={iitkgplogo} alt="IIT KGP" className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">IIT Kharagpur // Dual Degree</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-widest">Active Researcher</span>
                </div>
              </div>

              <motion.h1 variants={heroItem} className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
                Arpit Kumar
              </motion.h1>

              <motion.div variants={heroItem} className="h-10 flex items-center mb-6">
                <span className="text-lg md:text-2xl font-mono font-bold text-blue-600">
                  &gt; <AniText
                    texts={["Deep Learning Researcher", "Applied ML Specialist", "Quantitative Strategist", "Mathematical Modeler"]}
                    typingSpeed={50}
                    pauseTime={1500}
                  />
                </span>
              </motion.div>

              <motion.p variants={heroItem} className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                Developing high-fidelity AI systems by bridging <strong>First-Principles Engineering</strong> and <strong>Neural Architectures</strong>. Specializing in scalable optimization and predictive modeling.
              </motion.p>

              <div role="list" className="grid grid-cols-4 gap-6 mb-8 border-y border-slate-100 py-6">
                {[{l: "Years of Experience", v: "03+"}, {l: "Projects Deployed", v: "09+"}, {l: "Competitions Won", v: "03+"}, {l: "Ongoing Research", v: "02+"}].map((s, i) => (
                  <div key={i} role="listitem" className="stat-card">
                    <h3 className="text-3xl font-black text-slate-900">{s.v}</h3>
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">{s.l}</p>
                    <div className="w-8 h-1 bg-blue-600 mt-2" aria-hidden="true" />
                  </div>
                ))}
              </div>

              <motion.div variants={heroItem} className="flex flex-wrap gap-4">
                <Link to="/projects" aria-label="Review portfolio" className="group px-8 bg-slate-900 text-white font-bold rounded-xl flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2">
                  Review Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/request-cv" aria-label="Get technical CV" className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl flex items-center gap-3 hover:border-blue-600 hover:text-blue-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2">
                  <FileText size={18} />Download CV
                </Link>
                <Link to="/aboutme" aria-label="More about me" className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl flex items-center gap-3 hover:border-blue-600 hover:text-blue-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2">
                About Me <ShieldCheck size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-5 relative profile-image-container" initial={shouldReduceMotion ? 'show' : 'hidden'} animate="show" variants={{ show: { transition: { delay: 0.2 } } }}>
            <motion.div whileHover={!shouldReduceMotion ? { scale: 1.03 } : {}} className="relative z-10 mx-auto w-full max-w-[420px]">
              <div className="absolute -inset-4 border border-slate-100 rounded-[3rem] -z-10" aria-hidden="true" />
              <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-100 border-4 border-white shadow-2xl aspect-[4/5]">
                <img src={myphoto} alt="Arpit Kumar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {[
                  { icon: Github, href: "https://github.com/arpitkumar2004", label: 'GitHub' },
                  { icon: Linkedin, href: "https://linkedin.com/in/arpit-kumar-shivam/", label: 'LinkedIn' },
                  { icon: SiKaggle, href: "https://kaggle.com/kumararpitiitkgp", label: 'Kaggle' },
                  { icon: GoogleScholar, href: "#", label: 'Google Scholar' }
                ].map((item, i) => (
                  <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="p-4 bg-white shadow-xl rounded-2xl text-slate-600 hover:text-blue-600 border border-slate-50 transition-all hover:-translate-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                    <item.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- RESEARCH SECTION --- */}
      <section className="reveal-section bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <ResearchComponent />
        </div>
      </section>

      {/* --- EXPERIENCE SECTION (PRIORITIZED FOR HIRING) --- */}
      <section className="reveal-section ">
        <div className="max-w-7xl mx-auto px-6">
          <Experience />
        </div>
      </section>

      {/* --- EDUCATION SECTION (ACADEMIC VALIDATION) --- */}
      <section className="reveal-section">
        <div className="max-w-7xl mx-auto px-6">
          <Education />
        </div>
      </section>

      {/* --- ACHIEVEMENTS --- */}
      <section className="reveal-section bg-slate-50 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Achievements />
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section className="reveal-section py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg text-blue-600">
                <Terminal size={18} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-blue-600">
                Technical Capabilities Matrix
              </span>
            </div>              
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 tracking-tighter">Featured Research Projects</h2>
            </div>
            <Link to="/projects" className="flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-colors">
              Explore All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {[12, 9, 8].map((id) => {
                const p = projects.find((proj) => proj.id === id);
                return p ? <ProjectCard key={p.id} {...p} /> : null;
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- SKILLS --- */}
      <section className="reveal-section">
        <div className="max-w-7xl mx-auto px-6">
          <TechnicalProficiencies />
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="reveal-section pb-24 px-6">
        <div className="max-w-7xl mx-auto bg-slate-900 border border-slate-100 rounded-[3rem] p-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Let's solve complex problems.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-lg">Currently accepting research collaborations and internship opportunities for Data science and AI roles in Summer 2026.</p>
          <div className="flex flex-wrap justify-center gap-4">
             <Link to="/contact" className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl">Want Call back</Link>
             <Link to="/aboutme" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-100">More About Me</Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;