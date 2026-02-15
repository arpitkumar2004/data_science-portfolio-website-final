import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Code2,
  Sigma,
  Network,
  BookOpen,
  Activity,
  FlaskConical,
  Terminal,
  Cloud,
  Sparkles,
  BarChart3,
  Cpu,
  ChevronRight,
  Binary,
} from "lucide-react";

export const techData = [
  {
    title: "Gen AI & LLM Ops",
    category: "Revenue Multiplier",
    icon: <Sparkles className="w-5 h-5" />,
    description:
      "Enterprise RAG and agent systems that cut latency 60-80%, improve factuality 80%+, and automate complex workflows at scale. Built with evals, guardrails, and cost controls for production deployment.",
    tools: [
      "LangChain",
      "LlamaIndex",
      "vLLM",
      "Transformers",
      "Vector DBs",
      "HuggingFace",
    ],
  },
  {
    title: "Deep Learning & AI",
    category: "Competitive Edge",
    icon: <Brain className="w-5 h-5" />,
    description:
      "Research-to-production models beating baselines by 15-35% across vision, NLP, and time series. Deployed CV reducing defects by 40% and quant models capturing 0.4+ real-time alpha.",
    tools: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "CatBoost",
      "XGBoost",
      "LightGBM",
      "OpenCV",
    ],
  },
  {
    title: "MLOps & Systems",
    category: "Production Scaling",
    icon: <Network className="w-5 h-5" />,
    description:
      "End-to-end ML platforms cutting deployment cycles by 40% and reducing inference latency by 60%. Containerized services designed for high availability with optimized response times.",
    tools: [
      "Docker",
      "GCP",
      "FastAPI",
      "Flask",
      "CI/CD Workflows",
      "Cron Jobs",
      "YAML",
      "Git",
    ],
  },
  {
    title: "Data Engineering",
    category: "Data Advantage",
    icon: <BarChart3 className="w-5 h-5" />,
    description:
      "Large-scale data pipelines processing hundreds of thousands of records efficiently. Transform raw data to actionable insights in under 2 minutes, enabling real-time decision-making.",
    tools: [
      "Polars",
      "SciPy",
      "Seaborn",
      "Joblib",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    title: "Programming Core",
    category: "Performance Capital",
    icon: <Code2 className="w-5 h-5" />,
    description:
      "High-performance systems and clean, tested code for research and production. Memory-efficient services optimized for throughput with consistent low-latency performance.",
    tools: [
      "Python",
      "C",
      "C++",
      "SQL",
      "JavaScript",
      "Linux",
    ],
  },
  {
    title: "Process Simulation",
    category: "Capital Risk Mitigation",
    icon: <FlaskConical className="w-5 h-5" />,
    description:
      "Chemical engineering digital twins that de-risk $10M+ capital projects. Delivered 20% energy optimization and 98% purity, translating to $500K+ annual cost savings.",
    tools: ["Aspen Plus", "Aspen HYSYS", "COMSOL", "ANSYS", "OpenFOAM"],
  },
];

const coursework = [
  { id: "CS10001", name: "Programming & Data Structures" },
  { id: "MA20104", name: "Probability & Statistics" },
  { id: "EE364A", name: "Convex Optimization (Stanford Online)" },
  { id: "CS229", name: "Machine Learning (Stanford Online)" },
  { id: "CS230", name: "Deep Learning (Stanford Online)" },
  { id: "CS224N", name: "NLP with Deep Learning (Stanford Online)" },
  { id: "CS329S", name: "ML Systems Design (Stanford Online)" },
  { id: "CH61015", name: "Advanced Math Techniques" },
  { id: "CH62003", name: "Process Modeling & Simulation" },
  { id: "CH31011", name: "Instrumentation & Control" },
  { id: "MA20101", name: "Transform Calculus" },
  { id: "CH30016", name: "Numerical Methods" },
  { id: "DS51001", name: "Experimental Design & A/B Testing" },
  { id: "DS52004", name: "Causal Inference " },
];

const domains = [
  "LLM at Scale: enterprise automation with RAG systems and multi-agent workflows",
  "Applied Research: rigorous experiments, ablations, and reproducible results",
  "Predictive Analytics: 95%+ anomaly detection accuracy for risk mitigation",
  "Industrial Computer Vision: 40% defect reduction in manufacturing QA",
  "Production ML: designed for high availability with sub-100ms p99 latency",
  "Process Optimization: 20% energy efficiency gains in industrial operations",
];

export default function TechnicalProficiencies() {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : i * 0.06,
        ease: "easeOut"
      }
    })
  };

  return (
    <section
      className="bg-white dark:bg-black font-sans selection:bg-blue-100 dark:selection:bg-blue-500/20 relative overflow-visible"
    >
      {/* Background Technical Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgb(37 99 235) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 dark:bg-black ">
        {/* --- HEADER --- */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg text-blue-600">
              <Terminal size={18} />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-blue-600">
              Technical Capabilities Matrix
            </span>
          </div>
          <h2 className="text-5xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6">
            Value-Generating Capabilities
          </h2>
          <div className="w-24 h-2 bg-blue-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {techData.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="group relative bg-white border border-slate-200 p-7 rounded-2xl transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 dark:bg-[#161616] dark:border-white/10"
            >
              {/* Subtle Blueprint Grid Pattern on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-500 rounded-2xl"
                style={{
                  backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />

              {/* --- HEADER: Icon, Title, Category Side-by-Side --- */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-blue-100 group-hover:border-blue-600">
                    {item.icon}
                  </div>
                  {/* Decorative Technical Crosshair */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                </div>

                <div className="flex flex-col">
                  <span className="font-mono text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* --- CONTENT --- */}
              <div className="relative">
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium border-l-2 border-slate-100 pl-4 group-hover:border-blue-200 transition-colors">
                  {item.description}
                </p>

                {/* --- TAGS/TOOLS --- */}
                <div className="flex flex-wrap gap-2">
                  {item.tools.map((tool, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md group/tag hover:border-blue-400 hover:bg-white transition-all"
                    >
                      <div className="w-1 h-1 rounded-full bg-blue-400" />
                      <span className="font-mono text-[10px] font-bold text-slate-600 group-hover/tag:text-blue-600">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Serial Number Decor */}
              <div className="absolute top-4 right-6 font-mono text-[8px] text-slate-300 group-hover:text-blue-200 uppercase tracking-widest">
                Ref // 00{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM SECTION: ACADEMIC & DOMAIN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-24">
          {/* ACADEMIC TRANSCRIPT CARD (7-Column) */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 overflow-hidden h-full transition-all duration-300 hover:border-blue-500 hover:shadow-md">
              {/* Header: Clean and Simple */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Elite Technical Credentials
                  </h3>
                </div>
                <p className="text-slate-500 text-sm font-medium">
                  Featured Coursework from IIT Kharagpur and Stanford Online
                </p>
              </div>

              {/* Coursework Grid - Simplified */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-0">
                {coursework.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border flex flex-row gap-3 border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all"
                  >
                    <p className="text-xs font-mono font-bold text-blue-600 mb-1 uppercase tracking-tight">
                      {course.id}
                    </p>
                    <p className="text-xs font-bold text-slate-700">
                      {course.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DOMAIN EXPERTISE CARD (5-Column) */}
          <div className="lg:col-span-5">
            <div className="relative bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-blue-500 hover:shadow-md">
              {/* Header - Clean */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                    <Activity size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Value Domains
                  </h3>
                </div>
                <p className="text-slate-500 text-sm font-medium">
                  Revenue-Generating Applications
                </p>
              </div>

              {/* Domain List - Simplified */}
              <div className="space-y-2 flex-grow">
                {domains.map((domain, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-blue-50/40 transition-colors"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <p className="text-sm font-medium text-slate-700 leading-snug">
                      {domain}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
