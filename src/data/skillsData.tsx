// import React from "react";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tooltip } from "react-tooltip";
import { Brain, BarChart, Code2, Sigma, Network, BookOpen, Target, FlaskConical, ChevronDown, ChevronUp } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const techData = [
  {
    title: "Machine Learning & AI Frameworks",
    icon: <Brain className="w-6 h-6 text-blue-600" />,
    description:
      "Expertise in building, training, and deploying scalable ML/DL models for predictive analytics, computer vision, and quantitative finance.",
    tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "XGBoost", "LightGBM", "CatBoost", "OpenCV", "Transformers"],
  },
  {
    title: "Quantitative & Statistical Modeling",
    icon: <Sigma className="w-6 h-6 text-blue-600" />,
    description:
      "Strong foundation in stochastic processes, volatility modeling, optimization, and risk analytics with hybrid ML-finance integration.",
    tools: ["NumPy", "Pandas", "Statsmodels", "QuantLib", "TA-Lib", "SciPy"],
  },
  {
    title: "Data Science & Visualization",
    icon: <BarChart className="w-6 h-6 text-blue-600" />,
    description:
      "Experienced in full-cycle data workflows — preprocessing, EDA, feature selection, and visualization for insight-driven modeling.",
    tools: ["Pandas", "Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau"],
  },
  {
    title: "Backend & ML Systems Engineering",
    icon: <Network className="w-6 h-6 text-blue-600" />,
    description:
      "Designing modular ML systems with containerization, versioning, and automation for reproducible pipelines.",
    tools: ["FastAPI", "Flask", "Docker", "MLflow", "DVC", "Airflow", "Kafka", "Streamlit"],
  },
  {
    title: "Programming & Automation",
    icon: <Code2 className="w-6 h-6 text-blue-600" />,
    description:
      "Proficient in writing optimized, modular, and reproducible code for data analytics and AI applications.",
    tools: ["Python", "C", "C++", "SQL", "MATLAB", "HTML", "CSS", "JavaScript", "LaTeX", "Git"],
  },
  {
    title: "Chemical Engineering & Simulation Tools",
    icon: <FlaskConical className="w-6 h-6 text-blue-600" />,
    description:
      "Hands-on experience with process modeling, simulation, and optimization in chemical engineering systems.",
    tools: ["Aspen Plus v14", "Aspen HYSYS", "COMSOL Multiphysics", "ANSYS Fluent", "OpenFOAM"],
  },
];

const coursework = [
  "CS10001 - Programming and Data Structures",
  "MA10001 - Mathematics I",
  "MA10002 - Mathematics II",
  "MA20104 - Probability & Statistics",
  "MA20101 - Transfrom Calculus",
  "Stanford EE364A - Convex Optimization I & II",
  "Stanford CS229 - Introduction to Machine Learning",
  "Stanford CS230 - Deep Learning & Neural Networks",
  "Stanford CS224N - Natural Language Processing with Deep Learning",
  "CH30016 - Numerical Methods",
  "CH61015 - Advanced Mathematical Techniques",
  "CS329S: Machine Learning Systems Design",
  "CH62003 - Process Modeling & Simulation",
  "CH31011 -  Instrumentation & Process Control"
];

const domains = [
  "Time Series Analysis (Forecasting, Anomaly Detection)",
  "Natural Language Processing (Sentiment Analysis, Text Summarization)",
  "Computer Vision (Defect Detection, Object Recognition)",
  "Chemical & Process Engineering (Predictive Maintenance, Optimization)",
  "Chemical Reaction Engineering (Kinetic Modeling, Catalyst Design)",
  "Transport Phenomena (Flow Prediction, Heat Transfer Optimization)",
  "Process Control (Fault Detection, Control Optimization)",
];

export default function TechnicalProficiencies() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const courseworkRef = useRef(null);
  const domainsRef = useRef(null);
  const [expandedCards, setExpandedCards] = React.useState(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered animation for cards
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation for coursework section
      gsap.fromTo(
        courseworkRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: courseworkRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation for domains section
      gsap.fromTo(
        domainsRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: domainsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleCardExpansion = (idx) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  return (
    <section id="technical" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-2xl md:text-2xl font-bold text-center mb-6 text-black bg-clip-text"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore my Technical Skills & Proficiencies
        </motion.h2>

        <div className="w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-10" />
        <motion.p
          className="text-gray-600 max-w-3xl mx-auto mb-16 text-md leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Showcasing my expertise and skillset in Chemical engineering, machine learning, computer vision, quantitative finance and data science technologies.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {techData.map((item, idx) => (
            <motion.div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="group relative bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-white/20 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/50"
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              style={{ willChange: 'transform' }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-md font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <motion.button
                    onClick={() => toggleCardExpansion(idx)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {expandedCards.has(idx) ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </motion.button>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: expandedCards.has(idx) ? 'auto' : 0, opacity: expandedCards.has(idx) ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-6"
                >
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>

                <div className="flex flex-wrap gap-2">
                  {item.tools.map((tool, tIdx) => (
                    <motion.span
                      key={tIdx}
                      className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-2 rounded-full font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-200 cursor-pointer shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    // data-tooltip-id={`tooltip-${idx}-${tIdx}`}
                    // data-tooltip-content={`${tool} - Click to learn more`}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coursework Section */}
        <motion.div
          ref={courseworkRef}
          className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-10 border border-white/30 mb-12"
          style={{ willChange: 'transform' }}
        >
          <div className="flex items-center gap-4 mb-8 justify-center">
            <motion.div
              className="p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="w-6 h-6 text-green-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800">Core Coursework</h3>
          </div>
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm text-left max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {coursework.map((course, idx) => (
              <motion.li
                key={idx}
                className="flex items-center text-xs gap-3 p-1 px-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-100"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                <span className="font-medium text-xs">{course}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Domain & Application Section */}
        <motion.div
          ref={domainsRef}
          className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-10 border border-white/30"
          style={{ willChange: 'transform' }}
        >
          <div className="flex items-center gap-4 mb-8 justify-center">
            <motion.div
              className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Target className="w-6 h-6 text-purple-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800">Domains & Applications</h3>
          </div>
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm text-left max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            {domains.map((domain, idx) => (
              <motion.li
                key={idx}
                className="flex items-start text-xs gap-4 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0 mt-2"
                  whileHover={{ scale: 1.5 }}
                />
                <span className="font-medium leading-relaxed group-hover:text-gray-800 transition-colors">{domain}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Tooltips */}
      {techData.map((item, idx) =>
        item.tools.map((tool, tIdx) => (
          <Tooltip
            key={`${idx}-${tIdx}`}
            id={`tooltip-${idx}-${tIdx}`}
            place="top"
            className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg"
          />
        ))
      )}
    </section>
  );
}
