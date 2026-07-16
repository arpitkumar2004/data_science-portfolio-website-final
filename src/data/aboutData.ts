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
  // "purple" removed — not in the blue-only brand palette.
  // If the backend sends "purple", it will fall back to "default" in the component.
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
  statusColor: "blue" | "green" | "default"; // purple removed
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
   All values verified against Arpit_Kumar_CV_updated.pdf
   ═══════════════════════════════════════════════════════════════ */

export const aboutFallbackData: AboutData = {

  /* ── Personal ─────────────────────────────────────────────── */
  personal: {
    name: "Arpit Kumar",
    // Tagline matches the CV headline exactly
    tagline: "ML Engineer & AI Researcher · IIT Kharagpur '27",
    photo: "/img/me/my_photo2.png",
    // CV states "Seeking a Data Science internship" — updated from vague "Available for Summer 2026"
    availability: "",
    // More specific roles that reflect actual CV specializations
    animatedRoles: [
      "ML Engineer",
      "NLP & LLM/RAG Engineer",
      "MLOps Engineer",
      "Data Scientist",
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
      value: "AIR 807",
      label: "GATE 2026 · Chemical Engineering",
      color: "green",
    },
    {
      value: "AIR 135",
      label: "Integral Cup 2026",
      color: "green",
    },
  ],

  /* ── Education ────────────────────────────────────────────── */
  education: {
    degree: "Integrated Dual Degree — B.Tech + M.Tech",
    // Micro-Specialization is a formal academic credential from the CV
    specialization: "Chemical Engineering · Micro-Spec in AI & Applications and High Performance Computing (HPC)",
    institution: "IIT Kharagpur",
    graduation: "April 2027",
  },


  bio: {
    greeting:
      "I'm Arpit Kumar — an ML Engineer and AI Researcher at IIT Kharagpur researching on Natural Language Processing, Large Language Models, and Speech AI systems.",
    paragraphs: [
      {
        label: "Background",
        text: "I'm completing an Integrated Dual Degree (B.Tech + M.Tech) in Chemical Engineering with a Micro-Specialization in Artificial Intelligence and Applications and High Performance Computing at IIT Kharagpur (Graduating April 2027). My unusual combination of rigorous engineering fundamentals and deep ML training gives me a concrete edge: I think in systems, design for real-world constraints, and build models that are both theoretically grounded and deployable at scale.",
      },
      {
        label: "Research & Competitions",
        text: "At IIT Kharagpur's Advanced Technology Development Centre (ATDC), under Prof. Shyamal Kumar Das Mandal, I built a Wav2Vec2 + WavLM-BiLSTM fusion model for Native Language Identification from L2 English speech — achieving 0.88 validation accuracy, state-of-the-art on the NISP dataset across 5 Indian languages. In parallel, I ranked Top 0.5% globally in the Amazon ML Challenge 2025 among 50,000+ participants, shipping a multimodal price prediction system (SMAPE 25.45) with a production FastAPI serving layer at 469ms p95 latency and 46+ tracked MLflow runs with SHA-256 model fingerprinting.",
      },
      {
        label: "What I Build",
        text: "I specialize in the full ML lifecycle — from experiment tracking (MLflow, DVC) to containerized deployment (Docker, CI/CD) and scalable inference (FastAPI, async routing). At GC OpenSoft '25, sponsored by Deloitte, I led development of an LLM-powered RAG employee support platform that cut resolution time by 35%, reduced hallucination rate by 40%, and boosted API throughput by 50%. As Technical Advisor at DevSoc — IIT KGP's developer society — I shape ML and software architecture decisions and mentor engineers building production systems.",
      },
    ],
    callToAction:
      "Actively seeking Summer 2026 Data Science internships at teams building production ML systems — NLP, LLM/RAG engineering, or MLOps at scale. Available May–July 2026.",
  },

  milestones: [
    {
      icon: "Trophy",
      date: "Sep – Dec 2025",
      title: "Top 0.5% · Amazon ML Challenge 2025",
      subtitle:
        "Top 0.5% globally among 50,000+ participants (national competition, Amazon-sponsored). Built a multimodal price prediction pipeline fusing SBERT text + CLIP image + tabular features with a 5-fold stacked ensemble (SMAPE 25.45). Production FastAPI layer: 469ms p95 latency, SHA-256 model fingerprinting, DVC + MLflow tracking across 46+ runs.",
      category: "competition",
    },
    {
      icon: "Microscope",
      date: "May – Jul 2025",
      title: "AI Researcher Intern · ATDC, IIT Kharagpur",
      subtitle:
        "Under Prof. Shyamal Kumar Das Mandal. Native Language Identification from L2 English speech on the NISP dataset (5 Indian languages: Hindi, Telugu, Tamil, Kannada, Malayalam). Benchmarked 7 architectures; final model — Wav2Vec2 + WavLM-BiLSTM fusion with frozen transformer layers — achieved 0.88 validation accuracy, state-of-the-art on this task.",
      category: "research",
    },
    {
      icon: "Trophy",
      date: "Jan – Apr 2025",
      title: "1st Place · GC OpenSoft '25 (Deloitte-sponsored)",
      subtitle:
        "Inter-hall software competition at IIT Kharagpur. Built an LLM-powered RAG employee support platform: 35% reduction in resolution time, 40% reduction in hallucination rate (human-evaluated), 50% boost in API throughput via async FastAPI + non-blocking LLM routing, 30% cost reduction via token optimization. Stack: LangChain, FAISS/Chroma, OpenAI API, Groq, OpenTelemetry, Docker.",
      category: "competition",
    },
    {
      icon: "Briefcase",
      // "Present" triggers the active green dot in MilestoneCard
      date: "Sep 2023 – Present",
      title: "Technical Advisor · Developers' Society (DevSoc), IIT KGP",
      subtitle:
        "ML & Software Architecture track. Shape architecture decisions, review production systems, and implement CI/CD workflows for IIT KGP's premier developer society. Mentor engineers across ML and backend development tracks.",
      category: "leadership",
    },
    {
      icon: "GraduationCap",
      date: "Jul 2022 – Apr 2027",
      title: "IIT Kharagpur",
      subtitle:
        "Integrated Dual Degree (B.Tech + M.Tech), Chemical Engineering with Micro-Specialization in Artificial Intelligence & Applications. GPA 8.86/10. Admitted via JEE Advanced AIR 1478 (98.28 percentile JEE Mains, 1.1M+ candidates).",
      category: "education",
    },
  ],

  techStack: [
    { name: "Python",      level: "Advanced",      category: "core"     },
    { name: "C++",         level: "Advanced",      category: "core"     },
    { name: "PyTorch",     level: "Advanced",      category: "ml"       },
    { name: "TensorFlow",  level: "Advanced",      category: "ml"       },
    { name: "JAX",         level: "Intermediate",  category: "ml"       },
    { name: "Scikit-learn",level: "Advanced",      category: "ml"       },
    { name: "LangChain",   level: "Advanced",      category: "genai"    },
    { name: "FastAPI",     level: "Advanced",      category: "backend"  },
    { name: "Flask",       level: "Intermediate",  category: "backend"  },
    { name: "Docker",      level: "Advanced",      category: "devops"   },
    { name: "MLflow",      level: "Advanced",      category: "devops"   },
    { name: "DVC",         level: "Advanced",      category: "devops"   },
    { name: "FAISS",       level: "Advanced",      category: "genai"    },
    { name: "Pandas",      level: "Advanced",      category: "data"     },
    { name: "NumPy",       level: "Advanced",      category: "data"     },
    { name: "SQL",         level: "Advanced",      category: "data"     },
    { name: "React",       level: "Intermediate",  category: "frontend" },
  ],


  selectedWork: [
    {
      title: "Multimodal ML Platform for E-Commerce (Amazon ML Challenge '25)",
      status: "Top 0.5% · 50K+ participants",
      statusColor: "blue",
      tags: ["PyTorch", "SBERT", "CLIP", "FastAPI", "MLflow", "Docker"],
      projectUrl: "/projects",
    },
    {
      title: "LLM-Powered Employee Support Platform with RAG",
      status: "1st Place · OpenSoft '25",
      statusColor: "green",
      tags: ["FastAPI", "LangChain", "FAISS", "OpenAI API", "Docker"],
      projectUrl: "/projects",
    },
    {
      title: "Native Language Identification from L2 English Speech",
      status: "Research · ATDC IIT KGP",
      statusColor: "blue",
      tags: ["Wav2Vec2", "WavLM", "BiLSTM", "PyTorch", "MFCCs"],
      projectUrl: "/projects",
    },
  ],

  /* ── CTA ──────────────────────────────────────────────────── */
  cta: {
    // Updated to reflect actual target (Data Science internship, not generic "Summer 2026")
    heading: "Available for Summer 2026 Data Science Internship",
    description:
      "Seeking roles in ML Engineering, NLP/LLM systems, or Data Science at teams building production AI at scale. Open to industrial R&D, MNC ML teams, and applied research positions. Available May–July 2026.",
    cvLink: "/request-cv",
    meetingLink: "https://calendly.com/kumararpit17773/30min",
  },
};