import React from "react";
import { motion } from "framer-motion";
import myphoto from "../data/img/me/my_photo2.png";
import {
    Terminal,
    Database,
    Layers,
    Activity,
    Download,
    Mail,
    ChevronRight,
    Briefcase,
    ShieldCheck,
    Cpu,
    GraduationCap,
    FlaskConical,
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
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">8.46</p>
                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">CGPA Foundation</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                    <p className="text-2xl font-black text-blue-600 tracking-tighter">09+</p>
                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Systems Deployed</p>
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
                                        texts={[
                                            "Deep Learning Researcher",
                                            "Quantitative Analyst",
                                            "Optimization Specialist",
                                            "ML Systems Architect"
                                        ]}
                                        typingSpeed={50}
                                        pauseTime={2000}
                                    />
                                </div>
                            </header>

                            <div className="prose prose-slate lg:prose-lg max-w-3xl text-slate-600 leading-relaxed space-y-6">
                                <p>
                                    I am an <strong>Integrated Dual Degree student at IIT Kharagpur</strong>, operating at the intersection of high-fidelity engineering and data-driven intelligence. My trajectory is defined by a <strong>first-principles approach</strong> to AI—understanding the underlying calculus and probability before implementation.
                                </p>
                                <p>
                                    Currently, I serve as a <strong>Technical Advisor at the Developers' Society (DevSoc)</strong>, where I orchestrate technical roadmaps and mentor future engineers. My focus lies in designing <strong>interpretable ML models</strong> that bridge the gap between black-box predictions and industrial reliability.
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
                                        subtitle="Integrated Dual Degree in Chemical Engineering (Focus: Applied AI)" 
                                    />
                                    <Milestone 
                                        icon={Briefcase} 
                                        date="2023 - Present" 
                                        title="Developers' Society (DevSoc)" 
                                        subtitle="Technical Advisor & Former Full-Stack Development Head" 
                                    />
                                    <Milestone 
                                        icon={Trophy} 
                                        date="Ongoing" 
                                        title="Hackathon Champion" 
                                        subtitle="Finalist in multiple national level ML & Software competitions" 
                                    />
                                    <Milestone 
                                        icon={Microscope} 
                                        date="Research Track" 
                                        title="Applied ML Researcher" 
                                        subtitle="Building neural frameworks for process optimization & finance" 
                                    />
                                </div>
                            </div>

                            {/* SECTION: Core Expertise (The "Why Hire Me" Grid) */}
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <Binary className="text-blue-600" size={24} />
                                    Technical Archetype
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:border-blue-600 transition-all duration-500">
                                        <Terminal className="text-blue-600 mb-4" size={28} />
                                        <h4 className="font-bold text-slate-900 mb-2">Math-First ML</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed text-left">Implementation of backpropagation, optimizers (Adam/SGD), and loss functions from mathematical derivations without relying on high-level wrappers.</p>
                                    </div>
                                    <div className="p-6 border border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:border-blue-600 transition-all duration-500">
                                        <Cpu className="text-blue-600 mb-4" size={28} />
                                        <h4 className="font-bold text-slate-900 mb-2">Systems Engineering</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed text-left">Architecting scalable backend infrastructures (Node/Postgres/Docker) paired with low-latency model inference pipelines.</p>
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
                                    <h3 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight mt-2">Open for Research & R&D Roles</h3>
                                    <p className="text-slate-400 mb-10 max-w-xl text-lg font-medium leading-relaxed">
                                        Currently seeking Summer Internships (2026) and Research Collaborations in Machine Learning, Quantitative Finance, or Process Optimization.
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