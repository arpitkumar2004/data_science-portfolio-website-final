import React from 'react';
import {
  GraduationCap,
  Users,
  Trophy,
  Code,
  Award,
} from 'lucide-react';
import Achievement from '../components/Achievement';

// ─── Types (mirrors Achievement.tsx interface) ─────────────────────

interface AchievementItem {
  description: string;
  links: { url: string; label: string }[];
}

interface AchievementCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  category: string;
  items: AchievementItem[];
}

export const achievementData: AchievementCategory[] = [
  {
    id: '01',
    title: 'ML & AI Competitions',
    icon: Trophy,
    category: 'Competitive Excellence',
    items: [
      {
        description:
          'Amazon ML Challenge 2025 — ranked **Top 0.5% globally** among **50,000+ participants** in this national Amazon-sponsored competition. Built PrismPrice: a multimodal product price prediction pipeline fusing TF-IDF/SBERT text embeddings, CLIP/ResNet vision features, and unit signals with 5-fold stacked ensembles. Production FastAPI serving layer, versioned model registry, MLflow and DVC tracking.',
        links: [
          { url: 'https://github.com/arpitkumar2004/A_ML_25', label: 'GitHub Repository' },
        ],
      },
      {
        description:
          '1st Place (Gold Medalist), GC OpenSoft \'25 — inter-hall software championship at IIT Kharagpur, sponsored by Deloitte. Built an LLM-powered RAG employee support platform: **35% reduction in average resolution time**, **40% reduction in hallucination rate**, **50% increase in API throughput** via async FastAPI with 5 specialized agents (GPT-4o, LangChain, LangGraph, vector retrieval, Docker, GCP).',
        links: [],
      },
      {
        description:
          'DTL Quant Challenge 2024 — ranked **Top 20 Nationally**, engineering high-frequency statistical factors, mean-reversion signals, and risk-managed algorithmic trading strategies under competitive evaluation.',
        links: [],
      },
    ],
  },

  // {
  //   id: '02',
  //   title: 'AI Research & Technical Leadership',
  //   icon: Users,
  //   category: 'Applied AI & Research',
  //   items: [
  //     {
  //       description:
  //         'AI Researcher Intern — Sponsored Research & Industrial Consultancy (SRIC), IIT Kharagpur (May–July 2026). Engineered a **Tri-Path Multimodal RAG framework** combining dense BM25S retrieval, DuckDB Text-to-SQL, BLIP-2 vision retrieval, weighted RRF, cross-encoder reranking, and NLI attribution. Achieved **0.612 Recall@5**, **0.552 nDCG@5**, **0.578 SQL execution success**, and **0.657 attribution precision**, improving RAG baselines by **13.7%–19.8% points** across 10 benchmarks and mitigating **91% of known RAG failure modes**.',
  //       links: [],
  //     },
  //     {
  //       description:
  //         'AI Researcher (UG) Intern — Advanced Technology Development Centre (ATDC), IIT Kharagpur, under Prof. Shyamal Kumar Das Mandal (May–July 2025). Developed a native language identification framework using fixed Vision Transformers (ViT-small) on L2 English speech across 5 Indian languages (Hindi, Telugu, Tamil, Kannada, Malayalam). Engineered 128-Mel spectrograms, log-F0, and 14-feature fluency descriptors with PyTorch feature caching (epoch time reduced from ~13 min to 30 sec). Achieved **93.09% test accuracy**, outperforming CNN and ResNet-18 baselines by **6.00% and 4.80%**.',
  //       links: [],
  //     },
  //     {
  //       description:
  //         'Technical Advisor, ML & Software Architecture — Developers\' Society (DevSoc), TSG, IIT Kharagpur (September 2023 – present). Shape ML and software architecture decisions, conduct technical reviews, and mentor engineers building production systems across ML, web, and backend development tracks.',
  //       links: [],
  //     },
  //   ],
  // },

  {
    id: '03',
    title: 'Competitive Programming & Mathematics',
    icon: Code,
    category: 'Algorithms & Math',
    items: [
      {
        description:
          'Codeforces Expert — achieved **Expert rating (Peak 1612)** (handle: `_Badassium`), demonstrating advanced proficiency in data structures, graph algorithms, and dynamic programming under strict time limits.',
        links: [
          { url: 'https://codeforces.com/profile/_Badassium', label: 'Codeforces Profile' },
        ],
      },
      {
        description:
          'Integral Cup 2026 S1 — secured **AIR 135** across three mathematical tracks: Probability Theory & Statistics, Linear Algebra & Optimization, and Integral Analysis. Strong signal of mathematical rigor directly applicable to ML theory and quantitative research.',
        links: [],
      },
      {
        description:
          'GATE 2026 — secured **AIR 807** in the Graduate Aptitude Test in Engineering (Chemical Engineering stream, conducted by IIT Guwahati), demonstrating deep mastery of core engineering mathematics, transport phenomena, and analytical problem-solving.',
        links: [],
      },
    ],
  },

  {
    id: '04',
    title: 'Academic Credentials & Merit',
    icon: GraduationCap,
    category: 'Institutional Merit',
    items: [
      {
        description:
          'JEE Advanced 2022 — secured **AIR 1478** among ~180,000 candidates, earning admission to IIT Kharagpur. Simultaneously achieved **98.28 Percentile in JEE Mains 2022** across **1.1M+ candidates** — India\'s premier national engineering entrance examination.',
        links: [
          { url: 'https://iitkgp.ac.in/', label: 'IIT Kharagpur' },
        ],
      },
      {
        description:
          'Integrated Dual Degree (B.Tech + M.Tech), Chemical Engineering with **Specialization in Artificial Intelligence (AI) and High Performance Computing (HPC)** — IIT Kharagpur (2022–2027). Cumulative Performance Index: **8.86 / 10**.',
        links: [],
      },
    ],
  },

  {
    id: '05',
    title: 'Institute Championships',
    icon: Award,
    category: 'IIT Kharagpur Honors',
    items: [
      {
        description:
          'Gold Medal — General Championship Data Analytics 2025, IIT Kharagpur. Competed against all halls of residence in the institute\'s annual technical championship.',
        links: [],
      },
      {
        description:
          'Silver Medal — Open IIT Data Analytics 2024, IIT Kharagpur. Open-category competition drawing participants from across India\'s premier institutes.',
        links: [],
      },
      {
        description:
          'Silver Medal — Open IIT Case Study 2024, IIT Kharagpur. Structured strategic analysis and problem-solving under competitive conditions.',
        links: [],
      },
      {
        description:
          'Bronze Medal — General Championship ChemQuest 2025, IIT Kharagpur.',
        links: [],
      },
    ],
  },
];

// ─── Page component ────────────────────────────────────────────────

export default function Achievements() {
  return <Achievement categories={achievementData} />;
}