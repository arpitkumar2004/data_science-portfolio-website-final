import { motion } from "framer-motion";
import myphoto from "../data/img/me/my_photo2.png";
import {
    BrainCircuit,
    LineChart,
    Code,
    Download,
    FlaskConical,
    Mail,
} from "lucide-react";
import { BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import AniText from "../components/AniText";


// SkillTag Component
type SkillTagProps = {
    icon: React.ReactNode;
    children: React.ReactNode;
};

const SkillTag: React.FC<SkillTagProps> = ({ icon, children }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        }}
        className="flex items-center gap-3 p-3 transition-all duration-300 bg-white border border-gray-200 rounded-lg cursor-pointer shadow-sm hover:border-indigo-300 hover:shadow-lg"
    >
        {icon}
        <span className="font-medium text-gray-800">{children}</span>
    </motion.div>
);

// Main AboutMe Component
const AboutMe: React.FC = () => {
    const resumeUrl = "/Arpit_Kumar_Resume.pdf";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="font-sans antialiased text-gray-800 bg-slate-50">
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Section Title */}
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                                Know More About Me
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                            Discover who I am, what drives me, and how I work with Machine Learning and data.
                        </p>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start"
                    >
                        {/* Left Column - Image */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: -50 },
                                visible: { opacity: 1, x: 0 },
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="md:col-span-2 relative flex items-center justify-center"
                        >
                            <div className="relative w-full aspect-square max-w-sm mx-auto group">
                                {/* Animated Gradient Ring */}
                                <div className="absolute inset-0 rounded-[3rem] p-1 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-blue-500 to-purple-500 group-hover:animate-spin-medium blur-sm" />

                                {/* Outer Glow */}
                                <div className="absolute inset-0 rounded-[2rem] bg-indigo-500/10 blur-2xl scale-105 -z-10" />

                                {/* Glass Layer + Image */}
                                <div className="relative z-10 rounded-[2rem] overflow-hidden bg-white/40 backdrop-blur-lg shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                    <img
                                        src={myphoto}
                                        alt="Professional headshot of Arpit Kumar"
                                        className="w-full h-full object-cover rounded-[2rem] transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </motion.div>


                        {/* Right Column - Content */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: 50 },
                                visible: { opacity: 1, x: 0 },
                            }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="md:col-span-3 space-y-8"
                        >
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                                    Arpit Kumar
                                </h1>
                                <h2 className="mt-4 text-xl font-semibold text-indigo-600 tracking-tight">
                                    <AniText
                                        texts={[
                                            "Data Science & Applied ML Researcher",
                                            "Machine Learning & Optimization Specialist",
                                            "AI-Driven Solutions Enthusiast",
                                            "Hackathon & Competition Champion",
                                            "Quantitative Finance Enthusiast",
                                            "Deep Learning Enthusiast",
                                        ]}
                                        typingSpeed={50}
                                        pauseTime={1500}
                                    />
                                </h2>
                            </div>

                            <div className="space-y-4 text-base text-slate-600 text-left max-w-prose">
                                <p>
                                    Pursuing an <strong>Integrated Dual Degree (B.Tech + M.Tech)</strong> in Chemical Engineering at <strong>IIT Kharagpur</strong>, I am passionate about building intelligent systems that unite data science, engineering, and finance to solve complex, real-world problems.
                                </p>
                                <p>
                                    My journey revolves around leveraging AI for optimization, prediction, and discovery. I thrive at the intersection of mathematical modeling and machine learning, designing models that not only predict but also explain and optimize complex systems.
                                </p>
                            </div>

                            {/* Core Strengths */}
                            <div className="pt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Strengths</h3>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
                                >
                                    <SkillTag icon={<BrainCircuit className="w-5 h-5 text-indigo-500" />}>Machine Learning Specialist</SkillTag>
                                    <SkillTag icon={<LineChart className="w-5 h-5 text-indigo-500" />}>Predictive Modeling</SkillTag>
                                    <SkillTag icon={<Code className="w-5 h-5 text-indigo-500" />}>Quantitative Finance</SkillTag>
                                    <SkillTag icon={<FlaskConical className="w-5 h-5 text-indigo-500" />}>AI-driven Process Systems</SkillTag>
                                </motion.div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row flex-wrap items-start gap-4 pt-6">
                                <Link
                                    to="/request-cv"
                                    aria-label="Download CV"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>Download CV</span>
                                </Link>
                                <Link
                                    to="/projects"
                                    aria-label="Explore Projects"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-indigo-700 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
                                >
                                    <span>Explore Projects</span>
                                    <BiRightArrow className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/contact"
                                    aria-label="Contact Me"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-gray-600 bg-white border border-gray-300 hover:bg-gray-200 hover:text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>Contact Me</span>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutMe;
