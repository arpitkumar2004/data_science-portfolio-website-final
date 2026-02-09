import React from "react";
import { motion } from "framer-motion";
import myphoto from "../data/img/me/my_photo2.png";
import {
    Terminal,
    Activity,
    Download,
    Mail,
    Briefcase,
    ShieldCheck,
    Cpu,
    GraduationCap,
    Trophy,
    Binary,
    Code2,
    Microscope
} from "lucide-react";
import { Link } from "react-router-dom";
import AniText from "../components/AniText";

const TechnicalBadge = ({ children }: { children: React.ReactNode }) => (
    <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
        {children}
    </span>
);

const Milestone = ({ icon: Icon, title, subtitle, date }: any) => (
    <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-200 transition-all">
        <div className="mt-1 p-2 rounded-lg bg-slate-50 text-blue-600">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest">{date}</p>
            <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
            <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
    </div>
);
const savedRole = localStorage.getItem('userRole') || 'guest';
const AboutMe: React.FC = () => {
    const brandBlue = "rgb(37 99 235)";

    return (
        <div className="min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-blue-100">
            {/* Minimalist Top Bar */}
            <div className="sticky top-0 z-50 w-full h-1 bg-slate-100">
                <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: "100%" }} 
                    viewport={{ once: true }}
                    className="h-full" 
                    style={{ backgroundColor: brandBlue }}
                />
            </div>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* LEFT SIDE: Identity Card & Quick Stats */}
                    <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-fit">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-slate-50 rounded-[2.5rem] -z-10 border border-slate-100" />
                                <div className="overflow-hidden rounded-3xl bg-slate-200 aspect-[4/5] relative shadow-2xl">
                                    <img
                                        src={myphoto}
                                        alt="Arpit Kumar - IIT Kharagpur"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                        <div className="flex items-center gap-3 mb-2 border-b border-white/20 pb-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[12px] font-mono text-white font-bold uppercase tracking-widest">Researcher_ID: ARC_2026</span>
                                        </div>
                                        <p className="text-white/80 font-mono text-[10px] leading-tight uppercase tracking-tighter">
                                            Location: IIT_KHARAGPUR // WB <br />
                                            Focus: DEEP_LEARNING_RSCH
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Rapid Stats Grid */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">7.86</p>
                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">SGPA // Top Cohort</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                    <p className="text-2xl font-black text-blue-600 tracking-tighter">09+</p>
                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Prod Systems Shipped</p>
                                </div>
                            </div>

                            {/* Verification Block */}
                            <div className="mt-6 p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 text-blue-400">
                                    <ShieldCheck size={16} /> Institutional Status
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex flex-col">
                                        <span className="text-[10px] font-mono text-slate-500 uppercase">Degree Path</span>
                                        <span className="text-sm font-bold">Integrated Dual Degree (B.Tech + M.Tech)</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <span className="text-[10px] font-mono text-slate-500 uppercase">Primary Domain</span>
                                        <span className="text-sm font-bold">Applied Artificial Intelligence</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE: Technical Dossier */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <header className="mb-10">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <TechnicalBadge>Neural Architectures</TechnicalBadge>
                                    <TechnicalBadge>Stochastic Modeling</TechnicalBadge>
                                    <TechnicalBadge>IIT KGP Scholar</TechnicalBadge>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
                                    Arpit Kumar
                                </h1>
                                <div className="text-xl md:text-2xl font-mono text-blue-600 font-bold">
                                    &gt; <AniText
                                        texts={["Deep Learning Researcher", "Applied ML Specialist", "Data Science Enthusiast", "AI Systems Developer", "First-Principles Engineer"]}
                                        typingSpeed={50}
                                        pauseTime={2000}
                                    />
                                </div>
                            </header>

                            <div className="prose prose-slate lg:prose-lg max-w-3xl text-slate-600 leading-relaxed space-y-6">
                                <p>
                                    Hello {savedRole.toUpperCase()}, I am an undergraduate at IIT Kharagpur who operates as a <strong>first-principles ML systems engineer</strong>. I bridge mathematical rigor with production realities: derive algorithms, reason about stability, then deliver code that meets latency and reliability budgets. My <strong>Integrated Dual Degree at IIT Kharagpur</strong> trains me to move from theory to deployment—designing models with provable behavior, adversarially testing edge cases, and running tight feedback loops until they earn trust in production.
                                </p>
                                <p>
                                    As a <strong>Technical Advisor at Developers' Society (DevSoc)</strong>, I set AI/ML roadmaps, review architectures, and mentor engineers. I champion <strong>interpretable, fail-safe ML</strong> with explicit SLAs, latency budgets, and observability baked in. That means guardrailed rollouts, regression tests on drifted data, and dashboards that surface leading indicators before users feel pain.
                                </p>
                            </div>

                            {/* SECTION: Career Milestones */}
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <Activity className="text-blue-600" size={24} />
                                    Career Milestones
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Milestone 
                                        icon={GraduationCap} 
                                        date="2022 - 2027" 
                                        title="IIT Kharagpur" 
                                        subtitle="Integrated Dual Degree (ChemE + AI). Top decile CGPA; research track in applied ML." 
                                    />
                                    <Milestone 
                                        icon={Briefcase} 
                                        date="2023 - Present" 
                                        title="Developers' Society (DevSoc)" 
                                        subtitle="Technical Advisor & ex-Head: mentored 30+ devs, shipped 12+ releases/quarter, cut deployment time by 40%." 
                                    />
                                    <Milestone 
                                        icon={Trophy} 
                                        date="Ongoing" 
                                        title="Hackathon Champion" 
                                        subtitle="Top 0.5% Amazon ML Challenge; 19th National in DTL Quant; multiple podium finishes in ML/software comps." 
                                    />
                                    <Milestone 
                                        icon={Microscope} 
                                        date="Research Track" 
                                        title="Applied ML Researcher" 
                                        subtitle="Neural optimization for process systems (20% energy savings) and electrochemical modeling (40% savings)." 
                                    />
                                </div>
                            </div>

                            {/* SECTION: Core Expertise (The "Why Hire Me" Grid) */}
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <Binary className="text-blue-600" size={24} />
                                    Technical Archetype
                                </h3>
                                <div className="flex flex-col gap-6">
                                    <div className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:border-blue-600 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Terminal size={24} />
                                                <h4 className="font-bold text-slate-900">Math-First ML</h4>
                                            </div>
                                            <span className="px-2 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-blue-50 text-blue-700 border border-blue-100">Rigor</span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-500 leading-relaxed text-left">
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" /><span>Derive backprop, optimizers, and custom losses; prove or bound stability via spectral analysis and initialization bounds.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" /><span>Design for covariate and concept shift; calibrate predictions and detect OOD with confidence intervals.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" /><span>Stress-test models with adversarial examples, synthetic distribution shifts, and edge-case pathologies.</span></li>
                                        </ul>
                                    </div>
                                    <div className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:border-blue-600 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Cpu size={24} />
                                                <h4 className="font-bold text-slate-900">Systems Engineering</h4>
                                            </div>
                                            <span className="px-2 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Reliability</span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-500 leading-relaxed text-left">
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" /><span>Low-latency inference stacks (FastAPI, Node.js) with structured tracing, horizontal autoscaling, circuit breakers.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" /><span>p99 latency budgets with SLO/SLA monitoring; error budgets that trigger alerts before threshold breach.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" /><span>Docker/K8s orchestration with resource limits, health checks, and graceful shutdown protocols.</span></li>
                                        </ul>
                                    </div>
                                    <div className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:border-blue-600 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Code2 size={24} />
                                                <h4 className="font-bold text-slate-900">Production MLOps</h4>
                                            </div>
                                            <span className="px-2 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-amber-50 text-amber-700 border border-amber-100">Safety</span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-500 leading-relaxed text-left">
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" /><span>Feature stores with versioning; drift monitors (KS-test, KL-divergence); bias detectors for protected attributes.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" /><span>Shadow traffic for safe validation; canary/blue-green releases with automatic rollbacks on SLA breach.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" /><span>Training-serving parity checks; prediction logging for audit; continuous retraining with pipeline orchestration.</span></li>
                                        </ul>
                                    </div>
                                    <div className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:border-blue-600 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Microscope size={24} />
                                                <h4 className="font-bold text-slate-900">Research to Impact</h4>
                                            </div>
                                            <span className="px-2 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-purple-50 text-purple-700 border border-purple-100">Evidence</span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-500 leading-relaxed text-left">
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500" /><span>Translate papers to production code; competitive baselines, ablation studies with statistical significance testing.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500" /><span>Robustness suites: adversarial perturbations, corrupted inputs, long-tail distributions, class imbalance.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500" /><span>Measure performance delta vs. baselines with 95% confidence intervals; document decision boundaries before shipping.</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* RECRUITER ACTION CENTER */}
                            <div className="mt-20 bg-slate-900 rounded-[3rem] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Briefcase size={200} />
                                </div>
                                
                                <div className="relative z-10">
                                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em]">Direct Inquiry Channel</span>
                                    <h3 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight mt-2">Ready to Deliver Production-Grade ML</h3>
                                    <p className="text-slate-300 mb-10 max-w-xl text-lg font-medium leading-relaxed">
                                        Seeking Summer 2026 roles where measurable impact matters: 20-40% cost reduction, 10x decision speed, and resilient systems with defined SLAs. Strong fit for applied ML, quantitative research, and process optimization teams.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            to="/request-cv"
                                            className="flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 group"
                                        >
                                            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                                            <span>Technical Dossier (CV)</span>
                                        </Link>

                                        <Link
                                            to="/contact"
                                            className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all"
                                        >
                                            <Mail size={20} />
                                            <span>Secure Message</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutMe;