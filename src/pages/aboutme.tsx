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
    Cpu
} from "lucide-react";
import { Link } from "react-router-dom";
import AniText from "../components/AniText";

const TechnicalBadge = ({ children }: { children: React.ReactNode }) => (
    <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
        {children}
    </span>
);

const AboutMe: React.FC = () => {
    const brandBlue = "rgb(37 99 235)";

    return (
        <div className="min-h-screen bg-white font-sans antialiased text-slate-900">
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
                    
                    {/* LEFT SIDE: Identity Card */}
                    <div className="lg:col-span-5 xl:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative"
                        >
                            {/* The "Researcher" Photo Frame */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-slate-50 rounded-3xl -z-10 border border-slate-100" />
                                <div className="overflow-hidden rounded-2xl bg-slate-200 aspect-[4/5] relative">
                                    <img
                                        src={myphoto}
                                        alt="Arpit Kumar - IIT Kharagpur"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />
                                    {/* Data Overlay Effect */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-lg border border-white/10">
                                        <div className="flex items-center gap-3 mb-2 border-b border-white/20 pb-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[12px] font-mono text-white/70 font-bold uppercase tracking-widest">Status: Open to work</span>
                                        </div>
                                        <p className="text-white font-mono text-xs leading-tight">
                                            LOC: IIT_KHARAGPUR // <br />
                                            CORE: DEEP_LEARNING_RSCH
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Verification Block for Recruiters */}
                            <div className="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
                                    <ShieldCheck size={18} className="text-blue-600" />
                                    Recruiter Verification
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex justify-between text-xs">
                                        <span className="text-slate-500 font-mono">Academic Level:</span>
                                        <span className="font-bold text-right">Int. Dual Degree (B.Tech+M.Tech)</span>
                                    </li>
                                    <li className="flex justify-between text-xs">
                                        <span className="text-slate-500 font-mono">Institution:</span>
                                        <span className="font-bold">IIT Kharagpur</span>
                                    </li>
                                    <li className="flex justify-between text-xs">
                                        <span className="text-slate-500 font-mono">Math Foundation:</span>
                                        <span className="font-bold text-green-600">Advanced / Research-Ready</span>
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
                            <header className="mb-8">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <TechnicalBadge>Machine Learning</TechnicalBadge>
                                    <TechnicalBadge>Quantitative Finance</TechnicalBadge>
                                    <TechnicalBadge>Optimization</TechnicalBadge>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">
                                    Arpit Kumar
                                </h1>
                                <div className="text-lg md:text-xl font-mono text-blue-600 font-bold">
                                    &gt; <AniText
                                        texts={[
                                            "Neural Architecture Architect",
                                            "Predictive Modeling Expert",
                                            "Algorithmic Researcher",
                                            "End-to-End Data Scientist"
                                        ]}
                                        typingSpeed={50}
                                        pauseTime={2000}
                                    />
                                </div>
                            </header>

                            <div className="space-y-6 text-slate-700 leading-relaxed text-base md:text-lg max-w-3xl">
                                <p>
                                    Specializing in <strong>Deep Learning and Statistical Inference</strong>, I build high-impact AI systems starting from mathematical derivations to production-grade deployments. My background at <span className="text-slate-900 font-semibold underline decoration-blue-600/30 underline-offset-4">IIT Kharagpur</span> has instilled a first-principles approach to problem-solving.
                                </p>
                                <p>
                                    Unlike "black-box" practitioners, I focus on <strong>interpretable ML</strong>—designing custom neural architectures (Transformers, LSTMs, CNNs) and optimization frameworks that solve non-linear engineering challenges and quantitative financial market complexities.
                                </p>
                            </div>

                            {/* The "Why Hire Me" Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                                <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="mt-1 text-blue-600"><Terminal size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">ML From Scratch</h4>
                                        <p className="text-sm text-slate-500">Deep understanding of backpropagation, gradient descent variants, and cost functions without relying solely on libraries.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="mt-1 text-blue-600"><Database size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Data Architecture</h4>
                                        <p className="text-sm text-slate-500">Expertise in feature engineering pipelines, handling multi-modal data, and time-series forecasting at scale.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="mt-1 text-blue-600"><Layers size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Dual Degree Rigor</h4>
                                        <p className="text-sm text-slate-500">Combines the engineering discipline of a B.Tech with the advanced research methodology of an M.Tech.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="mt-1 text-blue-600"><Activity size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Industry Alignment</h4>
                                        <p className="text-sm text-slate-500">Focused on ROI-driven AI—building models that improve efficiency, reduce cost, or generate alpha.</p>
                                    </div>
                                </div>
                            </div>

                            {/* RECRUITER ACTION CENTER */}
                            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Briefcase size={120} />
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-2">Proceed with Recruitment</h3>
                                <p className="text-slate-400 mb-8 max-w-md text-sm">
                                    Available for Machine Learning Engineering, Data Science, or Quantitative Analyst roles where technical rigor is required.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                    <Link
                                        to="/request-cv"
                                        className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
                                    >
                                        <Download size={18} />
                                        Get Technical CV
                                    </Link>

                                    <Link
                                        to="/hire-me"
                                        className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all"
                                    >
                                        <Briefcase size={18} />
                                        Hire as Consultant
                                    </Link>

                                    <Link
                                        to="/contact"
                                        className="flex items-center justify-center gap-3 px-6 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                                    >
                                        <Mail size={18} />
                                        Interview Request
                                    </Link>
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