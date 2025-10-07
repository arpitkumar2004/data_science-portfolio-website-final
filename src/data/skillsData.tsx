// import React from "react";
import { motion } from "framer-motion";
import { Brain, BarChart, Cloud, Code2, BookOpen, Target } from "lucide-react";

const techData = [
  {
    title: "Machine Learning & AI Frameworks",
    icon: <Brain className="w-6 h-6 text-blue-600" />,
    description:
      "Expertise in building, training, and deploying scalable ML/DL models for predictive analytics, computer vision, and quantitative finance.",
    tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "XGBoost", "LightGBM", "CatBoost"],
  },
  {
    title: "Data Science & Visualization",
    icon: <BarChart className="w-6 h-6 text-blue-600" />,
    description:
      "Skilled in end-to-end data workflows — from cleaning and preprocessing to statistical analysis and interactive visualization.",
    tools: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau"],
  },
  {
    title: "Programming Tools",
    icon: <Code2 className="w-6 h-6 text-blue-600" />,
    description:
      "Experienced in writing modular and optimized code for analytics, automation, and system integration.",
    tools: ["Python", "C", "SQL", "C++", "Git", "Jupyter", "VS Code", "Streamlit", "FastAPI", "Flask"],
  },
  {
    title: "Core Chemical Engineering Tools",
    icon: <Cloud className="w-6 h-6 text-blue-600" />,
    description:
      "Hands-on with advanced simulation tools for process modeling, optimization, and computational fluid dynamics (CFD).",
    tools: ['Aspen Plus v14', "Aspen Hysys", "Comsol Multiphysics", "ANSYS", " OpenFOAM",],
  },
];

const coursework = [
  "Data Structures & Algorithms",
  "Machine Learning",
  "Deep Learning",
  "Calculus & Differential Equations",
  "Linear Algebra",
  "Probability & Statistics",
  "Optimization Techniques",
  "Numerical Methods",
  "Time Series Forecasting",
  "Heat & Mass Transfer",
  "Process Modeling & Simulation",
  "Computational Fluid Dynamics (CFD)",
  "Chemical Reaction Engineering",
  "Transport Phenomena",
  "Thermodynamics",
  "Process Control & Instrumentation",
  "Process Design & Economics",
];

const domains = [
  "Chemical & Process Engineering (Predictive Maintenance, Optimization)",
  "Chemical Reaction Engineering (Kinetic Modeling, Catalyst Design)",
  "Transport Phenomena (Flow Prediction, Heat Transfer Optimization)",
  "Thermodynamics (Phase Equilibria, Property Prediction)",
  "Process Control (Fault Detection, Control Optimization)",
  "Time Series Analysis (Forecasting, Anomaly Detection)",
  "Natural Language Processing (Sentiment Analysis, Text Summarization)",
  "Computer Vision (Defect Detection, Object Recognition)",
];

export default function TechnicalProficiencies() {
  return (
    <section id="technical" className="py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-2xl font-bold text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Technical Details & Proficiencies
        </motion.h2>

        <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto mb-10 text-center md:text-sm">
          Showcasing my expertise and skillset in Chemical engineering, machine learning, computer vision, quantitative finance and data science technologies.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {techData.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-3 mb-3">
                {item.icon}
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              </div>
              {/* <p className="text-gray-600 text-sm mb-4">{item.description}</p> */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-8">
                {item.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium hover:bg-blue-200 transition"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coursework Section */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100 mb-10 mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Core Coursework</h3>
          </div>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-gray-700 text-xs list-disc list-inside text-left max-w-3xl mx-auto md:mx-0">
            {coursework.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>
        </motion.div>

        {/* Domain & Application Section */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Domains & Applications</h3>
          </div>
          <ul className="space-y-3 text-gray-700 text-sm text-left max-w-3xl mx-auto md:mx-0">
            {domains.map((domain, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs">
                <span className="text-blue-500">•</span>
                <span>{domain}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
