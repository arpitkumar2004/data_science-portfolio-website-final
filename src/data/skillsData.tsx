import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Brain, Code2, Sigma, Network, BookOpen, Activity, 
  FlaskConical, Terminal, Database, Cloud, Sparkles, 
  BarChart3, Cpu, ChevronRight, Binary
} from "lucide-react";

const techData = [
  {
    title: "Gen AI & LLM Ops",
    category: "State-of-the-Art",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Architecting RAG pipelines and fine-tuning LLMs. Expertise in transformer architectures, vector databases, and JAX.",
    tools: ["LangChain", "HuggingFace", "LlamaIndex", "VectorDBs", "JAX", "Prompt Eng."],
  },
  {
    title: "Deep Learning & AI",
    category: "Modeling Core",
    icon: <Brain className="w-5 h-5" />,
    description: "Building scalable ML/DL models for predictive analytics, computer vision, and quantitative systems.",
    tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "XGBoost", "OpenCV"],
  },
  {
    title: "MLOps & Systems",
    category: "Production Scaling",
    icon: <Network className="w-5 h-5" />,
    description: "Designing modular ML systems with containerization and automation for reproducible production pipelines.",
    tools: ["Docker", "Kubernetes", "MLflow", "DVC", "Airflow", "FastAPI"],
  },
  {
    title: "Quant & Stats Research",
    category: "Mathematical Rigor",
    icon: <Sigma className="w-5 h-5" />,
    description: "Advanced stochastic modeling, volatility analysis, and optimization with hybrid ML-finance integration.",
    tools: ["NumPy", "Pandas", "Statsmodels", "QuantLib", "TA-Lib", "SciPy"],
  },
  {
    title: "Big Data & Science",
    category: "Insight at Scale",
    icon: <BarChart3 className="w-5 h-5" />,
    description: "Processing petabyte-scale datasets. Expertise in distributed computing and full-cycle data engineering.",
    tools: ["PySpark", "GCP/AWS", "BigQuery", "Snowflake", "Power BI", "Tableau"],
  },
  {
    title: "Programming Core",
    category: "Implementation",
    icon: <Code2 className="w-5 h-5" />,
    description: "High-performance, memory-efficient code for algorithmic trading and real-time data processing.",
    tools: ["Python", "C++", "SQL", "MATLAB", "JavaScript", "CUDA", "Git"],
  },
  {
    title: "Process Simulation",
    category: "Domain Expertise",
    icon: <FlaskConical className="w-5 h-5" />,
    description: "Advanced process modeling and optimization within complex chemical and thermodynamic systems.",
    tools: ["Aspen Plus", "Aspen HYSYS", "COMSOL", "ANSYS", "OpenFOAM"],
  }
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
  { id: "CH30016", name: "Numerical Methods" }
];

const domains = [
  "Large Language Models (RAG, Agentic Systems)",
  "Quantitative Finance (Alpha Generation)",
  "Experimentation (A/B Testing, Causal Inference)",
  "Time Series Analysis (Anomaly Detection)",
  "Computer Vision (Industrial Recognition)",
  "MLOps (Low-Latency Inference)",
  "Chemical Engineering (Predictive Maintenance)",
  "Transport Phenomena (Heat/Flow Optimization)"
];

export default function TechnicalProficiencies() {
  const sectionRef = useRef(null);

  useEffect(() => {
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (err) {
      console.warn('gsap.registerPlugin failed', err);
    }
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.skill-card');
      cards.forEach((card: any, i: number) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: { trigger: card, start: 'top 90%' }
        });
      });

      // Fallback: ensure visibility if ScrollTrigger didn't run (fast nav / SSR case)
      setTimeout(() => {
        cards.forEach((c: any) => {
          try {
            if (getComputedStyle(c).opacity === '0') {
              c.style.opacity = '1';
              c.style.transform = 'none';
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
    <section ref={sectionRef} className="py-24 bg-white font-sans selection:bg-blue-100 relative overflow-visible">
      {/* Background Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(rgb(37 99 235) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

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

        {/* --- CORE SKILLS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-24">
          {techData.map((item, idx) => (
            <div 
              key={idx}
              className="skill-card relative z-50 transform-gpu group bg-white border border-slate-100 p-8 rounded-[2.5rem] hover:border-blue-600 transition-all duration-500 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-blue-900/10"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="p-3 bg-slate-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-slate-100 group-hover:border-blue-600">
                  {item.icon}
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-full border border-green-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[8px] font-bold text-green-700 uppercase">Active</span>
                   </div>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-[9px] font-mono font-bold text-blue-600 uppercase tracking-[0.2em] mb-2 block">
                   {item.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight uppercase">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[12px] leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto pt-6 border-t border-slate-50">
                {item.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[9px] font-mono font-bold text-slate-200 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM SECTION: ACADEMIC & DOMAIN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ACADEMIC TRANSCRIPT CARD */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-[3.5rem] p-10 lg:p-14 text-white relative h-full overflow-hidden group shadow-2xl">
               {/* Decorative Element */}
               <div className="absolute -bottom-20 -right-20 p-12 opacity-[0.04] group-hover:scale-110 transition-transform duration-700 -z-20 pointer-events-none">
                  <Database size={320} />
               </div>
               
               <div className="flex items-center gap-4 mb-12">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight leading-none">Academic Rigor</h3>
                    <p className="text-blue-400 text-[10px] font-mono uppercase tracking-[0.3em] mt-2">Verified Coursework // IIT KGP & Stanford</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                  {coursework.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-4 group/item">
                       <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:border-blue-600 transition-all">
                          <Binary size={16} className="text-slate-500 group-hover/item:text-white" />
                       </div>
                       <div>
                          <p className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-tighter leading-none mb-1">{course.id}</p>
                          <p className="text-xs font-bold text-slate-300 group-hover/item:text-white transition-colors">{course.name}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* DOMAIN EXPERTISE CARD */}
          <div className="lg:col-span-5 h-full">
            <div className="border border-slate-100 bg-slate-50/50 rounded-[3.5rem] p-10 lg:p-14 h-full flex flex-col relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 border border-slate-100">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Domain Impact</h3>
                  <p className="text-slate-400 text-[10px] font-mono uppercase tracking-[0.3em] mt-2">Industrial Application</p>
                </div>
              </div>

              <div className="space-y-4 flex-grow relative z-10">
                {domains.map((domain, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl group-hover:border-blue-200 transition-all hover:translate-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                    <p className="text-xs font-black text-slate-700 tracking-tight leading-tight">
                      {domain}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Cpu size={14} className="text-blue-600" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Ready for Industrial Scale R&D
                  </span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}