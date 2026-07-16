
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
          'Amazon ML Challenge 2025 — ranked Top 0.5% globally among 50,000+ participants in this national Amazon-sponsored competition. Built a multimodal price prediction pipeline fusing SBERT text embeddings, CLIP image features, and engineered tabular inputs with a 5-fold stacked ensemble (RF, XGBoost, LightGBM, CatBoost, Ridge). Achieved SMAPE 25.45, RMSE 0.82, MAE 0.66. Production FastAPI serving layer at 469.1ms p95 latency. Tracked 46+ experiments with MLflow, DVC, and SHA-256 model fingerprinting for deterministic reproducibility.',
        links: [
          { url: 'https://github.com/arpitkumar2004/A_ML_25', label: 'GitHub Repository' },
        ],
      },
      {
        description:
          '1st Place, GC OpenSoft \'25 — inter-hall software competition at IIT Kharagpur, sponsored by Deloitte. Built an LLM-powered RAG employee support platform: 35% reduction in average resolution time (session analytics), 40% reduction in hallucination rate (human evaluation audits), 50% increase in API throughput via async FastAPI with non-blocking LLM routing, and 30% reduction in cost per session through token optimization and adaptive model selection. Deployed with OpenTelemetry, Prometheus, and Grafana observability dashboards.',
        links: [],
      },
      {
        description:
          'DTL Quant Challenge 2024 — ranked Top 20 nationally, applying statistical modeling and quantitative strategy development under competitive conditions.',
        links: [],
      },
    ],
  },

  {
    id: '02',
    title: 'Institute Championships',
    icon: Award,
    category: 'IIT Kharagpur',
    items: [
      {
        description:
          'Gold Medal — General Championship Data Analytics 2025, IIT Kharagpur. Competed against all halls of residence in the institute\'s annual technical championship.',
        links: [],
      },
      {
        description:
          'Silver Medal — Open IIT Data Analytics 2024, IIT Kharagpur. Open-category competition drawing participants from across India\'s IITs.',
        links: [],
      },
      {
        description:
          'Silver Medal — Open IIT Case Study 2024, IIT Kharagpur. Structured case analysis and problem-solving under competition conditions.',
        links: [],
      },
      {
        description:
          'Bronze Medal — General Championship ChemQuest 2025, IIT Kharagpur.',
        links: [],
      },
    ],
  },

  {
    id: '03',
    title: 'Competitive Programming & Mathematics',
    icon: Code,
    category: 'Algorithms & Quant',
    items: [
      {
        description:
          'Codeforces Expert — achieved Expert rating with a peak of 1612 (handle: _Badassium), demonstrating advanced proficiency in data structures and algorithmic problem-solving under time pressure.',
        links: [
          { url: 'https://codeforces.com/profile/_Badassium', label: 'Codeforces Profile' },
        ],
      },
      {
        description:
          'Integral Cup 2026 — secured AIR 135 across three tracks: Probability Theory & Statistics, Linear Algebra & Optimization, and Integral Analysis. Strong signal of mathematical maturity directly relevant to ML theory and quantitative research.',
        links: [],
      },
      {
        description:
          'GATE 2026 — ranked AIR 807 in the Graduate Aptitude Test in Engineering, Chemical Engineering stream (conducted by IIT Guwahati). National engineering aptitude examination assessing technical depth across core engineering and mathematics.',
        links: [],
      },
    ],
  },

  {
    id: '04',
    title: 'Academic Credentials',
    icon: GraduationCap,
    category: 'Institutional Merit',
    items: [
      {
        // CV: "Secured AIR 1478 in JEE Advanced 2022 and a 98.28 percentile in
        //       JEE Mains among 1.1M+ candidates"
        description:
          'JEE Advanced 2022 — secured AIR 1478 among ~180,000 candidates, earning admission to IIT Kharagpur. Simultaneously achieved 98.28 percentile in JEE Mains 2022 across 1.1M+ candidates — India\'s most competitive undergraduate entrance examination, covering Mathematics, Physics, and Chemistry at olympiad depth.',
        links: [
          { url: 'https://iitkgp.ac.in/', label: 'IIT Kharagpur' },
        ],
      },
      {
        // CV: "GPA: 8.86/10" and "Micro-Specialization: Artificial Intelligence and Applications"
        description:
          'Integrated Dual Degree (B.Tech + M.Tech), Chemical Engineering with Micro-Specialization in Artificial Intelligence & Applications — IIT Kharagpur (2022–2027). Cumulative Performance Index: 8.86/10.',
        links: [],
      },
    ],
  },

  {
    id: '05',
    title: 'Research & Leadership',
    icon: Users,
    category: 'Applied Research',
    items: [
      {
        
        description:
          'AI Researcher Intern — Advanced Technology Development Centre (ATDC), IIT Kharagpur, under Prof. Shyamal Kumar Das Mandal (May–July 2025). Research focus: Native Language Identification (NLI) from L2 English speech. Engineered a speaker-balanced preprocessing pipeline for the NISP dataset across 5 Indian languages (Hindi, Telugu, Tamil, Kannada, Malayalam). Benchmarked 7 deep learning architectures from CNN and ResNet-18/50 baselines to fusion models. Final model — Wav2Vec2 + WavLM-BiLSTM fusion with frozen transformer layers — achieved 0.88 validation accuracy, state-of-the-art on this task.',
        links: [],
      },
      {
        description:
          'Technical Advisor, ML & Software Architecture — Developers\' Society (DevSoc), TSG, IIT Kharagpur (September 2023 – present). Shape ML and software architecture decisions, conduct technical reviews, and mentor engineers building production systems across ML, web, and backend development tracks.',
        links: [],
      },
      {
        description:
          'Executive Member, Quantitative Policy Research — Public Policy and Governance Society (PPGS), IIT Kharagpur (May 2023 – September 2024). Applied quantitative methods to policy analysis and research in one of IIT KGP\'s leading policy organizations.',
        links: [
          { url: 'https://ppgsiitkgp.in/', label: 'PPGS Website' },
          {
            url: 'https://certificate.givemycertificate.com/c/6e149c8a-bb09-48bf-bd7b-8fd41719f0db',
            label: 'Certificate',
          },
        ],
      },
    ],
  },
];

// ─── Page component ────────────────────────────────────────────────

export default function Achievements() {
  return <Achievement categories={achievementData} />;
}