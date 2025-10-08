import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BarChart, Code, ChevronDown, ChevronUp } from 'lucide-react';

// Animation variants for each grid item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  },
  exit: { opacity: 0, y: -20 },
};

// Data for the research interests cards
const researchData = [
    {
        icon: Brain,
        title: "Applied AI in Engineering Systems",
        description: "Integration of machine learning with engineering processes for optimization, anomaly detection, and intelligent control. Focused on data-driven discovery and efficiency enhancement in process systems."
    },
    {
        icon: Brain,
        title: "Research & Innovation",
        description: "Passionate about exploring the intersection of AI, mathematics, and domain science. Dedicated to developing interpretable and scalable models that bridge research and real-world impact."
    },
    {
        icon: Brain,
        title: "Machine Learning Systems",
        description: "Expertise in developing robust ML models for predictive analytics, optimization, and decision-making. Skilled in supervised and unsupervised learning, including regression, classification, and ensemble methods."
    },
    {
        icon: BarChart,
        title: "Data Science & Analytics",
        description: "Proficient in extracting insights from complex datasets through feature engineering, statistical modeling, and visualization. Strong command of Python, Pandas, and advanced analytics tools."
    },
    {
        icon: Code,
        title: "Deep Learning & Neural Networks",
        description: "Hands-on experience with neural networks using PyTorch and TensorFlow. Worked with CNNs, RNNs, LSTMs, and Transformers for applications in vision, NLP, and time-series forecasting."
    },
    {
        icon: Code,
        title: "Quantitative Finance",
        description: "Application of AI and mathematical modeling for market prediction, alpha generation, and portfolio optimization. Experienced in time-series analysis, risk modeling, and simulation-based strategies."
    }
];

const ResearchComponent = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Determine which items to display based on the expanded state
    const itemsToShow = isExpanded ? researchData : researchData.slice(0, 3);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <motion.section
                className="mb-16"
                // This layout prop animates the container size change
                layout="position" 
                transition={{ duration: 0.5, type: "spring" }}
            >
                {/* Summary Text */}
                <motion.p
                    className="text-center text-gray-700 mt-10 max-w-4xl mx-auto mb-10 text-sm md:text-md px-4 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    I specialize in developing scalable AI solutions for prediction, optimization, and decision-making — transforming research into real-world impact.
                </motion.p>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Research Interests</h2>
                <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-12" />

                {/* Grid for research items */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    <AnimatePresence initial={false}>
                        {itemsToShow.map((item, index) => (
                            <motion.div
                                key={item.title} // Use a unique key like title
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout="position" // This makes the item animate its position
                                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col"
                            >
                                <div className="flex items-center mb-4">
                                    <item.icon size={32} className="mr-4 text-blue-600 flex-shrink-0" />
                                    <h3 className="text-md font-semibold text-gray-800">{item.title}</h3>
                                </div>
                                <p className="text-xs text-gray-600 flex-grow">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More / Show Less Button */}
                <div className="text-center mt-12">
                    <motion.button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center mx-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        layout // Animate button position
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                        {isExpanded 
                            ? <ChevronUp size={20} className="ml-2" /> 
                            : <ChevronDown size={20} className="ml-2" />
                        }
                    </motion.button>
                </div>
            </motion.section>
        </div>
    );
}

export default ResearchComponent;
