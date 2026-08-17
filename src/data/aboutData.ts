// ===== About Me Page Data Types & Local Fallback =====
// All live data is fetched from /api/about at runtime.
// This file provides TypeScript types and a local fallback so the page
// renders correctly offline and during SSR/SSG pre-rendering.
//
// ⚠ ACCURACY RULE: Every value here must be verifiable from the CV.
//   Never add metrics, achievements, or claims that cannot be confirmed.
//   Fabricated stats destroy recruiter trust the moment they ask a follow-up.

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  photo: string;
  availability: string;
  animatedRoles: string[];
  socialLinks: SocialLink[];
  calendlyUrl: string;
}

export interface Stat {
  value: string;
  label: string;
  color: "default" | "blue" | "green";
}

export interface Education {
  degree: string;
  specialization: string;
  institution: string;
  graduation: string;
}

export interface BioParagraph {
  label: string | null;
  text: string;
}

export interface Bio {
  greeting: string;
  paragraphs: BioParagraph[];
  callToAction: string;
}

export interface Milestone {
  icon: string;
  date: string;
  title: string;
  subtitle: string;
  category: string;
}

export interface TechItem {
  name: string;
  level: string;
  category: string;
}

export interface SelectedWork {
  title: string;
  status: string;
  statusColor: "blue" | "green" | "default";
  tags: string[];
  projectUrl: string;
}

export interface CTAData {
  heading: string;
  description: string;
  cvLink: string;
  meetingLink: string;
}

export interface AboutData {
  personal: PersonalInfo;
  stats: Stat[];
  education: Education;
  bio: Bio;
  milestones: Milestone[];
  techStack: TechItem[];
  selectedWork: SelectedWork[];
  cta: CTAData;
}

/* ═══════════════════════════════════════════════════════════════
   FALLBACK DATA — mirrors backend/data/about.json
   All values verified against Arpit_Kumar_CV.pdf
   ═══════════════════════════════════════════════════════════════ */

export const aboutFallbackData: AboutData = {

  /* ── Personal ─────────────────────────────────────────────── */
  personal: {
    name: "Arpit Kumar",
    tagline: "ML Engineer & AI Researcher · IIT Kharagpur '27",
    photo: "/img/me/my_photo2.png",
    availability: "Available for Full-time Roles (April 2027)",
    animatedRoles: [
      "ML Engineer",
      "AI Researcher",
      "NLP & LLM/RAG Engineer",
      "MLOps Engineer",
    ],
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/arpitkumar2004",
        icon: "Github",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/arpit-kumar-shivam",
        icon: "Linkedin",
      },
    ],
    calendlyUrl: "https://calendly.com/kumararpit17773/30min",
  },

  stats: [
    {
      value: "AIR 807",
      label: "GATE 2026 · Chemical Engg",
      color: "default",
    },
    {
      value: "Top 0.5%",
      label: "Amazon ML Challenge · 50K+ participants",
      color: "blue",
    },
    {
      value: "1612",
      label: "Codeforces Expert · peak",
      color: "blue",
    },
    {
      value: "AIR 135",
      label: "Integral Cup 2026",
      color: "green",
    },
  ],

  /* ── Education ────────────────────────────────────────────── */
  education: {
    degree: "Integrated B.Tech - M.Tech (Dual Degree) in Chemical Engineering",
    specialization: "Specialization in Artificial Intelligence (AI) and High Performance Computing (HPC)",
    institution: "IIT Kharagpur",
    graduation: "April 2027",
  },

  bio: {
    greeting:
      "I'm Arpit Kumar — an ML Engineer and AI Researcher at IIT Kharagpur working on Natural Language Processing, Large Language Models, and Speech AI systems.",
    paragraphs: [
      {
        label: "Background",
        text: "I'm completing an Integrated Dual Degree (B.Tech + M.Tech) in Chemical Engineering with a Specialization in Artificial Intelligence and High Performance Computing at IIT Kharagpur (GATE 2026 AIR 807, Graduating April 2027). My combination of engineering fundamentals and deep ML training gives me a concrete edge: I think in systems, design for real-world constraints, and build models that are both theoretically grounded and deployable at scale.",
      },
      {
        label: "Research & Competitions",
        text: "At IIT Kharagpur's Advanced Technology Development Centre (ATDC), under Prof. Shyamal Kumar Das Mandal, I developed a native language identification framework using fixed Vision Transformers (ViT-small) on L2 English speech — achieving 93.09% test accuracy on the NISP dataset across 5 Indian languages. At SRIC, IIT Kharagpur, I built a Tri-Path Multimodal RAG framework combining BM25S, DuckDB Text-to-SQL, BLIP-2, weighted RRF, and cross-encoder reranking (+13.7% to +19.8% recall across 10 benchmarks, mitigating 91% of RAG failure modes). In parallel, I ranked Top 0.5% globally in the Amazon ML Challenge 2025 out of 50,000+ participants with a reproducible multimodal price prediction system.",
      },
      {
        label: "What I Build",
        text: "I specialize in the full ML lifecycle — from experiment tracking (MLflow, DVC) to containerized deployment (Docker, CI/CD) and scalable inference (FastAPI, async routing). At GC OpenSoft '25, sponsored by Deloitte, I led development of an LLM-powered RAG employee support platform (1st Place) that cut resolution time by 35%, reduced hallucination rate by 40%, and boosted API throughput by 50%. As Advisor at DevSoc — IIT KGP's developer society — I shape ML and software architecture decisions and mentor engineers.",
      },
    ],
    callToAction:
      "Actively seeking full-time Machine Learning Engineer and AI Researcher roles starting April 2027 at teams building production AI systems — NLP, LLM/RAG engineering, speech AI, or scalable MLOps.",
  },

  milestones: [
    {
      icon: "Microscope",
      date: "May 2026 – July 2026",
      title: "AI Researcher Intern · SRIC, IIT Kharagpur",
      subtitle:
        "Engineered a Tri-Path Multimodal RAG framework for documents combining dense BM25S retrieval, DuckDB Text-to-SQL, BLIP-2 vision retrieval, weighted RRF, cross-encoder reranking, and NLI attribution. Achieved 0.612 Recall@5, 0.552 nDCG@5, 0.578 SQL execution success, 0.657 attribution precision, improving RAG baselines by 13.7%–19.8% points across 10 benchmarks. Mitigated 91% of known RAG failure modes.",
      category: "research",
    },
    {
      icon: "Trophy",
      date: "Sep – Dec 2025",
      title: "Top 0.5% · Amazon ML Challenge 2025",
      subtitle:
        "Ranked Top 0.5% globally out of 50,000+ participants in Amazon ML Challenge 2025. Built PrismPrice — a multimodal price prediction pipeline across 3 modalities (TF-IDF/SBERT text, CLIP/ResNet vision, unit signals) with 5+ model families, cross-validation, OOF stacking, FastAPI endpoints, MLflow, and DVC tracking.",
      category: "competition",
    },
    {
      icon: "Microscope",
      date: "May – Jul 2025",
      title: "AI Researcher Intern · ATDC, IIT Kharagpur",
      subtitle:
        "Under Prof. Shyamal Kumar Das Mandal. Native Language Identification from L2 English speech on the NISP dataset (5 Indian languages: Hindi, Telugu, Tamil, Kannada, Malayalam). Engineered 128-Mel spectrograms, log-F0, and 14-feature fluency representations, trained ViT-small models with PyTorch feature caching (reducing epoch time from ~13 min to 30 sec). Achieved 93.09% test accuracy, outperforming CNN and ResNet-18 baselines by 6.00% and 4.80%.",
      category: "research",
    },
    {
      icon: "Trophy",
      date: "Jan – Apr 2025",
      title: "1st Place · GC OpenSoft '25 (Deloitte-sponsored)",
      subtitle:
        "Inter-hall software competition at IIT Kharagpur. Built an LLM-powered RAG employee support platform: 35% reduction in resolution time, 40% reduction in hallucination rate, 50% boost in API throughput via async FastAPI with 5 specialized agents (GPT-4o, LangChain, LangGraph, vector retrieval, Docker, GCP).",
      category: "competition",
    },
    {
      icon: "Briefcase",
      date: "Sep 2023 – Present",
      title: "Advisor · Developers' Society (DevSoc), IIT KGP",
      subtitle:
        "Advisor for Machine Learning & Software Architecture. Shape architecture decisions, review production systems, and mentor engineers across ML and backend tracks.",
      category: "leadership",
    },
    {
      icon: "GraduationCap",
      date: "Jul 2022 – Apr 2027",
      title: "IIT Kharagpur",
      subtitle:
        "Integrated B.Tech - M.Tech (Dual Degree) in Chemical Engineering with Specialization in Artificial Intelligence (AI) and High Performance Computing (HPC). GPA 8.86/10.",
      category: "education",
    },
  ],

  techStack: [
    { name: "Python",      level: "Advanced",      category: "core"     },
    { name: "C++",         level: "Advanced",      category: "core"     },
    { name: "PyTorch",     level: "Advanced",      category: "ml"       },
    { name: "TensorFlow",  level: "Advanced",      category: "ml"       },
    { name: "Scikit-learn",level: "Advanced",      category: "ml"       },
    { name: "FastAPI",     level: "Advanced",      category: "backend"  },
    { name: "LangChain",   level: "Advanced",      category: "genai"    },
    { name: "Docker",      level: "Advanced",      category: "devops"   },
    { name: "MLflow",      level: "Advanced",      category: "devops"   },
    { name: "DVC",         level: "Advanced",      category: "devops"   },
    { name: "Qdrant",      level: "Advanced",      category: "genai"    },
    { name: "DuckDB",      level: "Advanced",      category: "data"     },
    { name: "Pandas",      level: "Advanced",      category: "data"     },
    { name: "NumPy",       level: "Advanced",      category: "data"     },
    { name: "SQL",         level: "Advanced",      category: "data"     },
    { name: "React",       level: "Intermediate",  category: "frontend" },
  ],

  selectedWork: [
    {
      title: "DocuReason RAG: Multimodal Document Retrieval & Reasoning Framework",
      status: "Research · SRIC IIT KGP",
      statusColor: "blue",
      tags: ["PyTorch", "FastAPI", "DuckDB", "Qdrant", "BM25S"],
      projectUrl: "/projects",
    },
    {
      title: "LLM-Powered Employee Support Platform with RAG and Scalable AI Infrastructure",
      status: "1st Place · OpenSoft '25",
      statusColor: "green",
      tags: ["FastAPI", "LangChain", "LangGraph", "GPT-4o", "Docker"],
      projectUrl: "/projects",
    },
    {
      title: "PrismPrice — Multimodal Price Prediction using Text, Image, and Tabular Data",
      status: "Top 0.5% · Amazon ML '25",
      statusColor: "blue",
      tags: ["PyTorch", "BERT", "CLIP", "FastAPI", "MLflow", "Docker"],
      projectUrl: "/projects",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  cta: {
    heading: "Available for Full-time ML Engineer & AI Researcher Roles (April 2027)",
    description:
      "Seeking full-time roles in ML Engineering, NLP/LLM systems, Speech AI, or AI Research starting April 2027 upon graduation from IIT Kharagpur.",
    cvLink: "/request-cv",
    meetingLink: "https://calendly.com/kumararpit17773/30min",
  },
};