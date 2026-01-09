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
        description: "Pursuing an Integrated Dual Degree (B.Tech + M.Tech) in Chemical Engineering at IIT Kharagpur, specializing in Process Systems Engineering with a focus on AI-driven modeling, optimization, and applied data science in engineering systems.",
        links: [{ url: "https://iitkgp.ac.in/", label: "IIT Kharagpur Portfolio" }]
      },
      {
        description: "Awarded the Merit-cum-Means Scholarship at IIT Kharagpur (2023) in recognition of consistent academic excellence, strong research orientation, and outstanding overall performance.",
        links: [{ url: "/", label: "Scholarship Record" }]
      },
      {
        description: "Participated in multiple International Conferences and Courses organized by SPARC on AI applications in computational modelling, electrochemical systems, and ML integration in engineering processes.",
        links: [{ url: "/#projects", label: "Conference Archive" }]
      },
      {
        description: "Advanced process modeling under Prof. Sourav Mondal: Optimized MeOH–EtOH–PrOH columns using FUG methods, achieving 98% methanol purity and 20% energy savings.",
        links: [{ url: "https://github.com/arpitkumar2004/Assigment-PMS", label: "FUG Optimization Code" }]
      },
      {
        description: "Simulated key unit operations (CSTR/PFR reactors, distillation columns) in Aspen HYSYS under Prof. Nikita Saxena, applying chemical process principles to industrial solutions.",
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
        description: "Achieved Expert title on Codeforces (Max Rating: 1612, Handle: _Badassium). Ranked 203 in Div 2 Round 1032, demonstrating high-pressure algorithmic problem-solving.",
        links: [{ url: "https://codeforces.com/profile/_Badassium", label: "Codeforces Profile" }]
      },
      {
        description: "ML/DL & Quantitative Research: Built modular pipelines using PyTorch, TensorFlow, and Scikit-learn for end-to-end interpretable AI solutions.",
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
        description: "Developed a Deep Learning Text Summarization System processing 100K+ documents, achieving 35% ROUGE-L F1 improvement and 60% reduction in manual workload.",
        links: [
            { url: "/#projects", label: "Case Study" },
            { url: "https://github.com/arpitkumar2004/Text-Summarizer-Project", label: "Git Repository" }
        ]
      },
      {
        description: "Healthcare Risk Scorecard for Evva Health: Built a Voting Ensemble (BERT + Naive Bayes + Decision Tree) achieving 82.89% accuracy for real-time risk scoring.",
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
        description: "Amazon ML Challenge 2025: Ranked Top 0.5% globally (42nd out of 8690 teams). Engineered a multimodal price prediction pipeline using XGBoost, LightGBM, and CatBoost.",
        links: [{ url: "https://github.com/arpitkumar2004/A_ML_25", label: "Technical Write-up" }]
      },
      {
        description: "Volatility Curve Prediction (NK Securities Hackathon): Pioneered a geometric ensembling strategy with Transformers for financial volatility forecasting.",
        links: [{ url: "#", label: "Methodology Details" }]
      },
      {
        description: "DTL Quant Challenge 2024: Ranked 19th Nationally. Scored 2.42 in-sample and 0.48 real-time alpha performance across diverse market regimes.",
        links: [{ url: "#", label: "Leaderboard Entry" }]
      },
      {
        description: "Gold Medal — GC Data Analytics by Evva Health '23: Automated real-time healthcare risk scoring with 82.89% accuracy.",
        links: [{ url: "#", label: "Analytical Report" }]
      },
      {
        description: "Bronze Medal — GC ChemQuest: Proposed novel EMI shielding materials achieving 40 dB attenuation for bio-electronic systems.",
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
        description: "Advisor & Former Head of Developers’ Society, IIT Kharagpur: Led AI/ML project roadmaps and mentored 30+ junior developers in full-stack architecture.",
        links: [{ url: "#", label: "Society Team Page" }]
      },
      {
        description: "Executive Member, Public Policy & Governance Society (2022–24): Applied quantitative analytics for socio-economic policy research and modeling.",
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