import { motion } from "framer-motion";
import myphoto from "../data/img/me/my_photo2.png";

const AboutMe: React.FC = () => {
    return (
        <div className="font-sans">
            {/* About Me Section */}
            {/* <h2 className="text-2xl font-bold mb-4 text-center">About Me</h2> */}
            {/* <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full mb-10" /> */}

            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left Column - Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src={myphoto}
                                    alt="Professional headshot"
                                    className="w-full h-full object-cover"
                                />
                                {/* Decorative elements */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full z-0" />
                                <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500/5 rounded-full z-0" />
                            </div>
                        </motion.div>

                        {/* Right Column - Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="space-y-6"
                        >
                            <motion.h2
                                className="text-3xl font-bold text-gray-800"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                About Me
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="space-y-4 text-gray-600 text-xs gap-6"
                            >
                                <p>Hi, My name is <strong>Arpit Kumar</strong>, an aspiring Machine Learning and AI Researcher. I’m passionate about building intelligent systems that unite data science, applied engineering, and applied finance to solve complex, real-world problems.
                                    I’m currently pursuing an <strong>Integrated Dual Degree (B.Tech + M.Tech)</strong> in Chemical Engineering at <strong>IIT Kharagpur</strong>.</p>
                                <p>
                                    My academic and research journey revolves around leveraging AI for optimization, prediction, and discovery across engineering and financial systems. Over the years, I’ve worked on projects spanning <strong>Statistical Machine Learning, Time Series Forecasting, Quantitative Finance</strong>, and <strong>AI-driven Process Systems</strong>. I thrive at the intersection of mathematical modeling and machine learning, where I design models that not only predict but also explain and optimize complex systems.
                                </p>
                                <p>
                                    With hands-on experience in <strong>predictive modeling, computer vision, NLP, and data visualization</strong>, I’m constantly exploring new technologies to push the boundaries of applied AI.
                                </p>
                            </motion.div>

                            {/* Key Points */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="grid grid-cols-2 gap-4 pt-4"
                            >
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="font-medium text-gray-700">Machine Learning Specialist</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="font-medium text-gray-700">Predictive Modeling & Forecasting</span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="font-medium text-gray-700">Time-Series Analysis</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="font-medium text-gray-700">Optimization & Statistical Inference</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default AboutMe;