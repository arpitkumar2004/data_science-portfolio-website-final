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
    category: "Revenue Multiplier",
    icon: <Sparkles className="w-5 h-5" />,
    description:
      "Production RAG systems that slash inference latency by 70% and cut hallucinations by 85%. Fine-tuned LLMs delivering $2M+ annual cost savings through automation at enterprise scale.",
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
    category: "Competitive Edge",
    icon: <Brain className="w-5 h-5" />,
    description:
      "Revenue-generating models outperforming benchmarks by 18-35%. Deployed vision systems reducing operational errors by 40% and quant models capturing 0.48+ real-time alpha.",
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
      "End-to-end ML infrastructure cutting deployment cycles by 40% and reducing inference latency by 60%. Containerized systems enabling 99.9% uptime at <100ms p99 response time.",
    tools: ["Docker", "Kubernetes", "MLflow", "DVC", "Airflow", "FastAPI"],
  },
  {
    title: "Big Data & Science",
    category: "Data Advantage",
    icon: <BarChart3 className="w-5 h-5" />,
    description:
      "Petabyte-scale processing delivering real-time competitive intelligence. 100K+ daily records → actionable insights in <2 minutes, enabling data-driven decisions at enterprise velocity.",
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
    category: "Performance Capital",
    icon: <Code2 className="w-5 h-5" />,
    description:
      "Microsecond-level optimization driving millions in trading profit. Memory-efficient systems processing 1M+ events/sec with <5% latency variance—competitive advantage in high-frequency markets.",
    tools: ["Python", "C++", "SQL", "MATLAB", "JavaScript", "CUDA", "Git"],
  },
  {
    title: "Process Simulation",
    category: "Capital Risk Mitigation",
    icon: <FlaskConical className="w-5 h-5" />,
    description:
      "De-risks $10M+ capital projects through digital twins. Delivered 20% energy optimization and 98% purity—translating to $500K+ annual operational cost savings at industrial scale.",
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
  "LLM-at-Scale: $2M+ cost reduction through enterprise automation",
  "Predictive Analytics: 95%+ anomaly detection accuracy for risk mitigation",
  "Industrial Computer Vision: 40% error reduction in manufacturing QA",
  "Production ML: 99.9% uptime, <100ms latency at petabyte scale",
  "Predictive Maintenance: $500K+ annual savings through digital twins",
  "Process Optimization: 20% energy efficiency gains in industrial operations",
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
      className="bg-white font-sans selection:bg-blue-100 relative overflow-visible"
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
            Value-Generating Capabilities
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
                  Top-Tier Coursework: IIT KGP + Stanford
                </p>
              </div>

              {/* Coursework Grid - Simplified */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 space-y-0">
                {coursework.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all"
                  >
                    <p className="text-xs font-mono font-bold text-blue-600 mb-1 uppercase tracking-tight">
                      {course.id}
                    </p>
                    <p className="text-sm font-bold text-slate-700">
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
