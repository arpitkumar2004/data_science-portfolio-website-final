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
    Microscope,
    Github,
    Linkedin,
    BookOpen,
    Layers,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import AniText from "../components/AniText";

const TechnicalBadge = ({ children }: { children: React.ReactNode }) => (
    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-600/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
        {children}
    </span>
);

interface MilestoneProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    date: string;
}

const Milestone = ({ icon: Icon, title, subtitle, date }: MilestoneProps) => (
    <div className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#161616] hover:border-blue-200 transition-all">
        <div className="mt-1 p-2 rounded-lg bg-slate-50 dark:bg-[#0f172a] text-blue-600">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest">{date}</p>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
    </div>
);

const AboutMe: React.FC = () => {
    const brandBlue = "rgb(37 99 235)";

    return (
        <div className="min-h-screen bg-white font-sans antialiased text-slate-900 selection:bg-blue-100 dark:selection:bg-blue-500/20 dark:bg-black dark:text-slate-100">
            {/* Minimalist Top Bar */}
            <div className="sticky top-0 z-50 w-full h-1 bg-slate-100 dark:bg-white/10">
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
                                <div className="absolute -inset-4 bg-slate-50 dark:bg-[#161616] rounded-[2.5rem] -z-10 border border-slate-100 dark:border-white/10" />
                                <div className="overflow-hidden rounded-3xl bg-slate-200 dark:bg-[#161600] aspect-[4/5] relative shadow-2xl">
                                    <img
                                        src={myphoto}
                                        alt="Arpit Kumar - IIT Kharagpur"
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale-[80%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.02]"
                                    />
                                    
                                    {/* Subtle gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Name overlay - slides in from bottom on hover */}
                                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <div className="bg-gradient-to-t from-slate-900/95 via-slate-900/90 to-transparent dark:from-black/95 dark:via-black/90 backdrop-blur-sm pt-12 pb-6 px-6">
                                            <div className="text-center space-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <h3 className="text-2xl font-black text-white tracking-tight">
                                                    Arpit Kumar
                                                </h3>
                                                <p className="text-sm font-semibold text-blue-300 tracking-wide">
                                                    Applied ML Engineer • IIT Kharagpur '27
                                                </p>
                                                <div className="flex items-center justify-center gap-2 pt-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span className="text-xs font-medium text-emerald-300">
                                                        Available for Summer 2026
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rapid Stats Grid */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border border-slate-100 dark:border-white/10 text-center">
                                    <p className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">7.86</p>
                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">CGPA (Top 15%)</p>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border border-slate-100 dark:border-white/10 text-center">
                                    <p className="text-2xl font-black text-blue-600 tracking-tighter">5+</p>
                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">Production Projects</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6 flex gap-3">
                                <a 
                                    href="https://github.com/arpitkumar2004" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 hover:border-blue-500 transition-all text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    <Github size={18} />
                                    <span>GitHub</span>
                                </a>
                                <a 
                                    href="https://linkedin.com/in/arpit-kumar-shivam" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 hover:border-blue-500 transition-all text-sm font-semibold text-slate-700 dark:text-slate-300"
                                >
                                    <Linkedin size={18} />
                                    <span>LinkedIn</span>
                                </a>
                            </div>

                            {/* Academic Info */}
                            <div className="mt-6 p-6 bg-slate-900 dark:bg-[#0a0a0a] rounded-3xl text-white shadow-xl">
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 text-blue-400">
                                    <ShieldCheck size={16} /> Education
                                </h4>
                                <ul className="space-y-4">
                                    <li className="flex flex-col">
                                        <span className="text-[10px] font-mono text-slate-500 uppercase">Degree</span>
                                        <span className="text-sm font-bold">B.Tech + M.Tech (5-Year Integrated)</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <span className="text-[10px] font-mono text-slate-500 uppercase">Specialization</span>
                                        <span className="text-sm font-bold">Chemical Engineering + AI/ML</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <span className="text-[10px] font-mono text-slate-500 uppercase">Graduation</span>
                                        <span className="text-sm font-bold">May 2027</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Currently Learning */}
                            {/* <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 text-blue-600 dark:text-blue-400">
                                    <BookOpen size={16} /> Currently Exploring
                                </h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    LLM fine-tuning, Retrieval-Augmented Generation (RAG), and scaling ML systems to handle production traffic.
                                </p>
                            </div> */}
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
                                
                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-slate-100 tracking-tighter mb-4 leading-none">
                                    Arpit Kumar
                                </h1>
                                <div className="text-xl md:text-2xl font-mono text-blue-600 font-bold">
                                    &gt; <AniText
                                        texts={["ML Engineer", "Deep Learning Researcher", "ML Infrastructure Engineer", "Data Scientist", "Chemical Engineer turned AI Builder"]}
                                        typingSpeed={50}
                                        pauseTime={2000}
                                    />
                                </div>
                            </header>

                            <div className="prose prose-slate lg:prose-lg max-w-3xl text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                                <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    Hi! I'm Arpit — a Chemical Engineer who fell in love with AI and never looked back.
                                </p>
                                <p>
                                    <strong>The Origin Story:</strong> It started in my sophomore year when I tried to optimize a distillation column using spreadsheets. After hours of manual calculations, I thought, "There has to be a better way." That weekend, I learned Python and built my first neural network to predict optimal operating conditions. The model wasn't great (MAE of 15%!), but I was hooked. I realized I could combine engineering intuition with ML to solve real problems.
                                </p>
                                <p>
                                    Fast forward to today: I'm finishing my <strong>5-year Integrated Dual Degree at IIT Kharagpur</strong> (graduating May 2027), specializing in Chemical Engineering with a deep focus on AI/ML. I've built production systems serving thousands of users, competed in national ML challenges (Top 0.5% in Amazon ML Challenge 2025), and published research on using neural networks for industrial process optimization.
                                </p>
                                <p>
                                    At <strong>Developers' Society (DevSoc)</strong>, IIT Kharagpur's premier tech club, I serve as Technical Advisor—mentoring 30+ developers, architecting scalable systems, and shipping features every sprint. Before that, I led the entire tech team, where we dramatically improved deployment efficiency and implemented CI/CD pipelines that are still in use.
                                </p>
                                <p>
                                    <strong>What I bring to the table:</strong> Strong fundamentals in math and engineering, hands-on experience building and deploying ML systems (PyTorch, TensorFlow, FastAPI, Docker), and the ability to translate business problems into technical solutions. I don't just build models—I build systems that work in production.
                                </p>
                                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                    🎯 Looking for Summer 2026 internships in ML Engineering, Data Science, or AI Infrastructure. Ideal fit: teams building production ML systems, working on LLMs/NLP, or optimizing complex systems at scale.
                                </p>
                            </div>

                            {/* SECTION: Career Milestones */}
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
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
                                        title="Developers' Society (DevSoc), IIT KGP" 
                                        subtitle="Technical Advisor (ex-Head of Tech). Mentor 30+ developers, review PRs, architect systems. Dramatically improved deployment efficiency via CI/CD automation and best practices." 
                                    />
                                    <Milestone 
                                        icon={Trophy} 
                                        date="2023-2024" 
                                        title="Competitive ML & Quant" 
                                        subtitle="Ranked 42nd/8,690 teams (Top 0.5%) in Amazon ML Challenge 2025. Rank 19 (National) DTL Quant Competition. Multiple hackathon wins." 
                                    />
                                    <Milestone 
                                        icon={Microscope} 
                                        date="2024-Present" 
                                        title="Research: Industrial ML" 
                                        subtitle="Neural network optimization for chemical processes: achieved 18-22% energy reduction in distillation columns. Working on electrochemical modeling with ML." 
                                    />
                                </div>
                            </div>

                            {/* SECTION: Tech Stack */}
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                                    <Layers className="text-blue-600" size={24} />
                                    Tech Stack
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
                                    <div className="p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 text-center">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Python</p>
                                        <p className="text-[10px] text-slate-500">Expert</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 text-center">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">PyTorch</p>
                                        <p className="text-[10px] text-slate-500">Advanced</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 text-center">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">TensorFlow</p>
                                        <p className="text-[10px] text-slate-500">Advanced</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 text-center">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">scikit-learn</p>
                                        <p className="text-[10px] text-slate-500">Expert</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 text-center">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">FastAPI</p>
                                        <p className="text-[10px] text-slate-500">Advanced</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 text-center">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">React</p>
                                        <p className="text-[10px] text-slate-500">Intermediate</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 text-center">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">PostgreSQL</p>
                                        <p className="text-[10px] text-slate-500">Advanced</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-[#0f172a] rounded-xl border border-slate-100 dark:border-white/10 text-center">
                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Docker</p>
                                        <p className="text-[10px] text-slate-500">Intermediate</p>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION: Featured Projects */}
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                                    <Zap className="text-blue-600" size={24} />
                                    Featured Projects
                                </h3>
                                <div className="space-y-6">
                                    <div className="p-6 border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#161616] hover:shadow-lg transition-all">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Conversational AI Platform for Employee Welfare</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">AI-driven system for proactive burnout detection & automated HR reporting</p>
                                            </div>
                                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">Production</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                                            Engineered full-stack AI platform on Google Cloud that proactively identifies at-risk employees using ensemble anomaly detection (Isolation Forest + LOF) and automates HR reporting via LangChain LLM pipelines. Features cross-platform dashboards (Next.js + Expo) with real-time data synchronization.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">FastAPI</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">LangChain</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">Next.js</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">Google Cloud</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">Docker</span>
                                        </div>
                                    </div>

                                    <div className="p-6 border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#161616] hover:shadow-lg transition-all">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Neural Process Optimizer</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Deep learning for chemical process optimization</p>
                                            </div>
                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">Research</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                                            Developed LSTM-based models to optimize distillation column operations. Achieved 18-22% energy savings through real-time prediction and control. Trained on 6 months of industrial sensor data (500K+ data points).
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">PyTorch</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">Pandas</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">NumPy</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">Matplotlib</span>
                                        </div>
                                    </div>

                                    <div className="p-6 border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#161616] hover:shadow-lg transition-all">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Amazon ML Challenge 2025 Solution</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Product price prediction from images and metadata</p>
                                            </div>
                                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold rounded-full">Top 0.5%</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                                            Ranked 42nd/8,690 teams globally (Top 0.5%). Built ensemble model combining ResNet50 (image features) + BERT (text embeddings) + XGBoost. Achieved RMSE of 0.23 on test set with extensive feature engineering.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">TensorFlow</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">XGBoost</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">Transformers</span>
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded">OpenCV</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION: Core Expertise */}
                            <div className="mt-16">
                                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                                    <Binary className="text-blue-600" size={24} />
                                    What I Do Best
                                </h3>
                                <div className="flex flex-col gap-6">
                                    <div className="p-6 border border-slate-100 dark:border-white/10 rounded-[1rem] bg-slate-50 dark:bg-[#161616] hover:bg-white dark:hover:bg-[#0f172a] hover:border-blue-600 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Terminal size={24} />
                                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Math-First ML</h4>
                                            </div>
                                            <span className="px-2 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-blue-50 text-blue-700 border border-blue-100">Rigor</span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-500 leading-relaxed text-left">
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" /><span>Build deep learning models (CNNs, RNNs, Transformers) with PyTorch/TensorFlow for classification, regression, and time-series forecasting.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" /><span>Handle imbalanced datasets, data augmentation, and distribution shifts with proper validation strategies.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" /><span>Debug model performance: gradient issues, overfitting, and convergence problems using first-principles approach.</span></li>
                                        </ul>
                                    </div>
                                    <div className="p-6 border border-slate-100 dark:border-white/10 rounded-[1rem] bg-slate-50 dark:bg-[#161616] hover:bg-white dark:hover:bg-[#0f172a] hover:border-blue-600 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Cpu size={24} />
                                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Systems Engineering</h4>
                                            </div>
                                            <span className="px-2 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Reliability</span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-500 leading-relaxed text-left">
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" /><span>Design RESTful APIs with FastAPI serving ML models with sub-100ms latency for 95th percentile requests.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" /><span>Set up PostgreSQL databases with proper indexing, query optimization, and connection pooling for high-traffic applications.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" /><span>Containerize applications with Docker, write CI/CD pipelines, and deploy to cloud platforms (experience with Vercel, Render).</span></li>
                                        </ul>
                                    </div>
                                    <div className="p-6 border border-slate-100 dark:border-white/10 rounded-[1rem] bg-slate-50 dark:bg-[#161616] hover:bg-white dark:hover:bg-[#0f172a] hover:border-blue-600 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Code2 size={24} />
                                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Production MLOps</h4>
                                            </div>
                                            <span className="px-2 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-amber-50 text-amber-700 border border-amber-100">Safety</span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-500 leading-relaxed text-left">
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" /><span>Version control for models and datasets; track experiments with proper metrics logging and reproducibility.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" /><span>Monitor model performance in production: track prediction distributions, detect data drift, and set up alerting for anomalies.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" /><span>Write unit tests for ML pipelines, validate data schemas, and ensure training-serving consistency.</span></li>
                                        </ul>
                                    </div>
                                    <div className="p-6 border border-slate-100 dark:border-white/10 rounded-[1rem] bg-slate-50 dark:bg-[#161616] hover:bg-white dark:hover:bg-[#0f172a] hover:border-blue-600 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <Microscope size={24} />
                                                <h4 className="font-bold text-slate-900 dark:text-slate-100">Research to Impact</h4>
                                            </div>
                                            <span className="px-2 py-1 text-[11px] font-mono font-bold uppercase rounded-full bg-purple-50 text-purple-700 border border-purple-100">Evidence</span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-500 leading-relaxed text-left">
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500" /><span>Read and implement research papers (latest Transformers, optimization techniques) and adapt them for specific use cases.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500" /><span>Run proper experiments: baseline comparisons, ablation studies, statistical significance tests, and fair evaluation protocols.</span></li>
                                            <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500" /><span>Document findings clearly: write technical reports, visualize results, and communicate insights to both technical and non-technical stakeholders.</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* CALL TO ACTION */}
                            <div className="mt-20 bg-slate-900 dark:bg-[#0a0a0a] rounded-[3rem] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Briefcase size={200} />
                                </div>
                                
                                <div className="relative z-10">
                                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em]">Let's Work Together</span>
                                    <h3 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight mt-2">Ready for Summer 2026 internships</h3>
                                    <p className="text-slate-300 mb-10 max-w-xl text-lg font-medium leading-relaxed">
                                        Looking for roles where I can build production ML systems, work with real data at scale, and learn from experienced engineers. Ideal fit: ML Engineering, Data Science, or AI Infrastructure teams. Available May-July 2026.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            to="/request-cv"
                                            className="flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 group"
                                        >
                                            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                                            <span>Get CV + Deep-Dives</span>
                                        </Link>

                                        <a
                                            href="https://calendly.com/kumararpit17773/30min"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-3 px-8 py-5 bg-white dark:bg-[#161616] text-slate-900 dark:text-slate-100 font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-[#1c1c1c] transition-all"
                                        >
                                            <Mail size={20} />
                                            <span>Schedule Meeting</span>
                                        </a>
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