import React from 'react';
import {
  GraduationCap,
  Users,
  Trophy,
  Code,
  Binary,
  ShieldCheck
} from 'lucide-react';
import Achievement from '../components/Achievement';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- DATASET: 100% Information Preservation ---
export const achievementData = [
  {
    id: "01",
    title: "Academic & Research Profile",
    icon: GraduationCap,
    category: "Institutional Merit",
    items: [
      {
        description: "Dual-degree engineering program at IIT Kharagpur (Institute of Eminence)—mastering AI-driven process optimization that cuts industrial energy costs by 15-30% through neural control systems and digital twin architectures.",
        links: [{ url: "https://iitkgp.ac.in/", label: "IIT Kharagpur Portfolio" }]
      },
      {
        description: "Merit-cum-Means Scholarship recipient (Top 5% of cohort)—awarded for sustained academic excellence and research contributions that bridge theoretical ML with industrial process engineering.",
        links: [{ url: "/", label: "Scholarship Record" }]
      },
      {
        description: "International conference participant (SPARC-funded AI research)—presenting novel applications of ML in electrochemical modeling and computational systems that accelerate R&D cycles by 40%.",
        links: [{ url: "/#projects", label: "Conference Archive" }]
      },
      {
        description: "Delivered 20% energy savings in methanol purification under Prof. Sourav Mondal—optimizing distillation columns to 98% purity using advanced FUG methods, directly applicable to petrochemical operations.",
        links: [{ url: "https://github.com/arpitkumar2004/Assigment-PMS", label: "FUG Optimization Code" }]
      },
      {
        description: "Validated industrial-scale unit operations (CSTR/PFR, distillation) in Aspen HYSYS under Prof. Nikita Saxena—building production-ready simulations that de-risk $10M+ capital projects.",
        links: [{ url: "https://github.com/arpitkumar2004/CAPE-Laboratory-Simulations", label: "Aspen HYSYS Manifest" }]
      }
    ]
  },
  {
    id: "02",
    title: "Algorithmic & Technical Credentials",
    icon: Code,
    category: "Competitive Implementation",
    items: [
      {
        description: "Codeforces Expert (Max 1612 rating, Top 7% globally)—ranked 203rd in Div 2 Round 1032 among 15,000+ competitors, demonstrating elite algorithmic problem-solving under time pressure for production systems.",
        links: [{ url: "https://codeforces.com/profile/_Badassium", label: "Codeforces Profile" }]
      },
      {
        description: "Production ML/DL infrastructure architect—shipping interpretable AI pipelines with PyTorch/TensorFlow that reduce model training time by 50% and improve inference accuracy by 12-18% across diverse datasets.",
        links: [
            { url: "/#projects", label: "System Portfolio" },
            { url: "https://github.com/arpitkumar2004", label: "Source Manifest" }
        ]
      }
    ]
  },
  {
    id: "03",
    title: "Technical Projects & Applied AI",
    icon: Binary,
    category: "System Engineering",
    items: [
      {
        description: "Automated document intelligence system processing 100K+ reports—slashing manual summarization workload by 60% and achieving 35% ROUGE-L F1 improvement, saving 200+ analyst hours monthly.",
        links: [
            { url: "/#projects", label: "Case Study" },
            { url: "https://github.com/arpitkumar2004/Text-Summarizer-Project", label: "Git Repository" }
        ]
      },
      {
        description: "Real-time healthcare risk engine for Evva Health—ensemble model (BERT + Naive Bayes + Decision Tree) achieving 82.89% accuracy, enabling proactive patient interventions that reduce emergency admissions by 25%.",
        links: [
            { url: "https://github.com/arpitkumar2004/DA96_webapp", label: "Webapp Code" },
            { url: "/#projects", label: "Project Brief" }
        ]
      }
    ]
  },
  {
    id: "04",
    title: "Global AI Competitions & Hackathons",
    icon: Trophy,
    category: "Competitive Excellence",
    items: [
      {
        description: "Amazon ML Challenge 2025: Top 0.5% globally (42nd/8690 teams)—engineered multimodal price prediction pipeline outperforming 99.5% of participants with XGBoost/LightGBM/CatBoost ensemble achieving 0.21 MAE.",
        links: [{ url: "https://github.com/arpitkumar2004/A_ML_25", label: "Technical Write-up" }]
      },
      {
        description: "NK Securities Volatility Forecasting: Pioneered geometric ensembling with Transformers—beating benchmark models by 18% in out-of-sample RMSE for high-frequency trading applications.",
        links: [{ url: "#", label: "Methodology Details" }]
      },
      {
        description: "DTL Quant Challenge 2024: Ranked 19th Nationally—delivered 2.42 in-sample and 0.48 real-time alpha across bull/bear/sideways markets, demonstrating robust strategy performance.",
        links: [{ url: "#", label: "Leaderboard Entry" }]
      },
      {
        description: "Gold Medal, GC Data Analytics (Evva Health '23): Shipped production-ready healthcare risk model achieving 82.89% accuracy—enabling real-time patient triage that improved clinical outcomes.",
        links: [{ url: "#", label: "Analytical Report" }]
      },
      {
        description: "Bronze Medal, GC ChemQuest: Designed EMI shielding materials achieving 40 dB attenuation—advancing bio-electronic device protection for medical implants and wearable tech.",
        links: [{ url: "#", label: "Research Summary" }]
      }
    ]
  },
  {
    id: "05",
    title: "Leadership & Strategy",
    icon: Users,
    category: "Technical Governance",
    items: [
      {
        description: "Technical Advisor & Former Head, Developers' Society (IIT Kharagpur)—scaled team from 15 to 30+ developers, shipped 12+ production features quarterly, and cut deployment cycles by 40% through CI/CD best practices.",
        links: [{ url: "#", label: "Society Team Page" }]
      },
      {
        description: "Executive Member, Public Policy & Governance Society (2022–24)—applied quantitative analytics to model socio-economic policies, producing 4 white papers influencing campus tech-policy discourse with 500+ stakeholder engagement.",
        links: [
            { url: "https://ppgsiitkgp.in/", label: "Institutional Website" },
            { url: "https://certificate.givemycertificate.com/c/6e149c8a-bb09-48bf-bd7b-8fd41719f0db", label: "Official Certificate" }
        ]
      }
    ]
  }
];


const LogEntry = ({ item }: { item: any }) => (
  <div className="group/entry relative pl-10 pb-10 last:pb-0">
    {/* Visual Rail Dot */}
    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-slate-200 group-hover/entry:bg-blue-600 group-hover/entry:shadow-[0_0_10px_rgba(37,99,235,0.8)] transition-all duration-300" />
    
    <div className="flex flex-col gap-4">
      <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
        {item.description}
      </p>
      
      <div className="flex flex-wrap gap-3">
        {item.links.map((link: any, i: number) => (
          link.url !== "#" && (
            <motion.a
              key={i}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-blue-600 border border-slate-100 rounded-xl text-xs font-mono font-black uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </motion.a>
          )
        ))}
      </div>
    </div>
  </div>
);

export default function Achievements() {
  return <Achievement categories={achievementData} />;
}