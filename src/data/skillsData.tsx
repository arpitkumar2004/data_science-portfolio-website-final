import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Code2,
  Sigma,
  Network,
  BookOpen,
  Activity,
  FlaskConical,
  Terminal,
  Database,
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
    category: "State-of-the-Art",
    icon: <Sparkles className="w-5 h-5" />,
    description:
      "Architecting RAG pipelines and fine-tuning LLMs. Expertise in transformer architectures, vector databases, and JAX.",
    tools: [
      "LangChain",
      "HuggingFace",
      "LlamaIndex",
      "VectorDBs",
      "JAX",
      "NumPy",
      "Pandas",
    ],
  },
  {
    title: "Deep Learning & AI",
    category: "Modeling Core",
    icon: <Brain className="w-5 h-5" />,
    description:
      "Building scalable ML/DL models for predictive analytics, computer vision, and quantitative systems.",
    tools: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "SciPy",
      "Keras",
      "XGBoost",
      "OpenCV",
    ],
  },
  {
    title: "MLOps & Systems",
    category: "Production Scaling",
    icon: <Network className="w-5 h-5" />,
    description:
      "Designing modular ML systems with containerization and automation for reproducible production pipelines.",
    tools: ["Docker", "Kubernetes", "MLflow", "DVC", "Airflow", "FastAPI"],
  },
  {
    title: "Big Data & Science",
    category: "Insight at Scale",
    icon: <BarChart3 className="w-5 h-5" />,
    description:
      "Processing petabyte-scale datasets. Expertise in distributed computing and full-cycle data engineering.",
    tools: [
      "PySpark",
      "GCP/AWS",
      "BigQuery",
      "Snowflake",
      "Power BI",
      "Tableau",
    ],
  },
  {
    title: "Programming Core",
    category: "Implementation",
    icon: <Code2 className="w-5 h-5" />,
    description:
      "High-performance, memory-efficient code for algorithmic trading and real-time data processing.",
    tools: ["Python", "C++", "SQL", "MATLAB", "JavaScript", "CUDA", "Git"],
  },
  {
    title: "Process Simulation",
    category: "Domain Expertise",
    icon: <FlaskConical className="w-5 h-5" />,
    description:
      "Advanced process modeling and optimization within complex chemical and thermodynamic systems.",
    tools: ["Aspen Plus", "Aspen HYSYS", "COMSOL", "ANSYS", "OpenFOAM"],
  },
];

const coursework = [
  { id: "CS10001", name: "Programming & Data Structures" },
  { id: "MA20104", name: "Probability & Statistics" },
  { id: "EE364A", name: "Convex Optimization (Stanford)" },
  { id: "CS229", name: "Machine Learning (Stanford)" },
  { id: "CS230", name: "Deep Learning (Stanford)" },
  { id: "CS224N", name: "NLP with Deep Learning (Stanford)" },
  { id: "CS329S", name: "ML Systems Design" },
  { id: "CH61015", name: "Advanced Math Techniques" },
  { id: "CH62003", name: "Process Modeling & Simulation" },
  { id: "CH31011", name: "Instrumentation & Control" },
  { id: "MA20101", name: "Transform Calculus" },
  { id: "CH30016", name: "Numerical Methods" },
];

const domains = [
  "Large Language Models (RAG, Agentic Systems)",
  "Quantitative Finance (Alpha Generation)",
  "Experimentation (A/B Testing, Causal Inference)",
  "Time Series Analysis (Anomaly Detection)",
  "Computer Vision (Industrial Recognition)",
  "MLOps (Low-Latency Inference)",
  "Chemical Engineering (Predictive Maintenance)",
  "Transport Phenomena (Heat/Flow Optimization)",
];

export default function TechnicalProficiencies() {
  const sectionRef = useRef(null);

  useEffect(() => {
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (err) {
      console.warn("gsap.registerPlugin failed", err);
    }
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".skill-card");
      cards.forEach((card: any, i: number) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.06,
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });

      // Fallback: ensure visibility if ScrollTrigger didn't run (fast nav / SSR case)
      setTimeout(() => {
        cards.forEach((c: any) => {
          try {
            if (getComputedStyle(c).opacity === "0") {
              c.style.opacity = "1";
              c.style.transform = "none";
            }
          } catch (e) {
            // ignore
          }
        });
      }, 1200);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white font-sans selection:bg-blue-100 relative overflow-visible"
    >
      {/* Background Technical Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgb(37 99 235) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            Skillsets & Specializations
          </h2>
          <div className="w-24 h-2 bg-blue-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {techData.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white border border-slate-200 p-7 rounded-2xl transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5"
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
            </div>
          ))}
        </div>

        {/* --- BOTTOM SECTION: ACADEMIC & DOMAIN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-24">
          {/* ACADEMIC TRANSCRIPT CARD (7-Column) */}
          <div className="lg:col-span-7">
            <div className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-10 lg:p-12 overflow-hidden hover:border-blue-500 transition-all duration-300 h-full shadow-sm hover:shadow-xl hover:shadow-blue-500/5">
              {/* Background Technical Grid Overlay */}
              <div
                className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Header: Side-by-Side Icon & Title */}
              <div className="flex items-center gap-5 mb-12 relative z-10">
                <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                  <BookOpen size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 font-mono text-[9px] font-bold uppercase tracking-widest border border-blue-100 rounded">
                      Transcript
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                    Academic Rigor
                  </h3>
                  <p className="text-slate-400 text-[10px] font-mono uppercase tracking-[0.2em] mt-2">
                    Verified Coursework // IIT KGP & Stanford
                  </p>
                </div>
              </div>

              {/* Coursework Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {coursework.map((course, idx) => (
                  <div
                    key={idx}
                    className="group/item flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover/item:bg-white group-hover/item:border-blue-200 transition-all shadow-sm">
                      <Binary size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono font-bold text-blue-500 uppercase tracking-tighter leading-none mb-1">
                        {course.id}
                      </p>
                      <p className="text-[13px] font-bold text-slate-700 group-hover/item:text-blue-600 transition-colors">
                        {course.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtle Bottom Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/0 via-blue-600 to-blue-600/0 opacity-20" />
            </div>
          </div>

          {/* DOMAIN EXPERTISE CARD (5-Column) */}
          <div className="lg:col-span-5">
            <div className="group relative bg-[#fcfdff] border border-slate-200 rounded-[2.5rem] p-10 lg:p-12 overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-blue-500">
              {/* Top Header */}
              <div className="flex items-center gap-5 mb-12">
                <div className="p-4 bg-white text-blue-600 rounded-2xl shadow-sm border border-slate-100 group-hover:border-blue-200 transition-colors">
                  <Activity size={28} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                    Domain Impact
                  </h3>
                  <p className="text-slate-400 text-[10px] font-mono uppercase tracking-[0.3em] mt-2">
                    Industrial Application
                  </p>
                </div>
              </div>

              {/* Industrial Tags List */}
              <div className="space-y-3 flex-grow">
                {domains.map((domain, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-300 hover:translate-x-2 transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                      <p className="text-sm font-bold text-slate-700 tracking-tight">
                        {domain}
                      </p>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-slate-300 group-hover:text-blue-500"
                    />
                  </div>
                ))}
              </div>

              {/* Footer Status Bar */}
              <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Cpu size={14} className="text-blue-600" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    System Ready: Industrial R&D
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
