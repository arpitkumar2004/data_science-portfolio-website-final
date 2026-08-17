// ========================================
// OpenToWork Page - Data Source
// ========================================
// Clean, factual data for the recruiter-facing hire page.
// Pulls from projectsData.tsx (static fallback) and AchievementData.tsx.
// getFeaturedProjects() accepts an optional projects array so it can
// consume the same data as the rest of the app (API > cache > static).

import { projects as staticProjects } from "./projectsData";
import type { Project } from "./projectsData";
import { achievementData } from "./AchievementData";

// ====================
// TYPESCRIPT INTERFACES
// ====================

export interface HeroData {
  name: string;
  degree: string;
  institution: string;
  cgpa: string;
  tagline: string;
  email: string;
  linkedin: string;
  github: string;
  calendly: string;
  resumeUrl: string;
  resumeDownloadName: string;
  availableFrom: string;
  duration: string;
  location: string;
  relocation: string;
}

export interface TrackRecordMetric {
  number: string;
  label: string;
  detail: string;
  color: string;
}

export interface SeekingData {
  targetCompanies: Array<{ label: string; detail: string }>;
  rolePreferences: Array<{ label: string; detail: string }>;
  learningGoals: Array<{ label: string; detail: string }>;
}

export interface Achievement {
  rank: string;
  title: string;
  detail: string;
  tech: string;
  metric: string;
  badge: string;
  badgeColor: string;
}

export interface FeaturedProjectDisplay {
  title: string;
  category: string;
  description: string;
  impact: string;
  technologies: string;
  methodology: string;
  link: string;
}

export interface TechnicalSkills {
  mlAiStack: string[];
  otherStrengths: string[];
}

export interface LogisticsData {
  timeline: Array<{ label: string; value: string }>;
  location: Array<{ label: string; value: string }>;
  workPreferences: Array<{ label: string; value: string }>;
  valueProposition: Array<{ label: string; value: string }>;
}

export interface FinalCtaData {
  heading: string;
  subheading: string;
  tagline: string;
  primaryCta: {
    text: string;
    url: string;
  };
  secondaryCta: {
    text: string;
    url: string;
    downloadName: string;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export interface ColorMapping {
  text: string;
  bg: string;
  border: string;
  badgeText: string;
}

export type ColorMappings = Record<string, ColorMapping>;

// ====================
// DATA
// ====================

export const heroData: HeroData = {
  name: "Arpit Kumar",
  degree: "Dual Degree (B.Tech + M.Tech), Chemical Engg · Specialization in AI & HPC",
  institution: "IIT Kharagpur",
  cgpa: "8.86 / 10",
  tagline: "ML Engineer & AI Researcher seeking full-time roles in Machine Learning Engineering, Deep Learning, LLM/RAG systems, and AI Research starting April 2027 where I can design, build, and scale production AI systems.",
  email: "arpitkumar@kgpian.iitkgp.ac.in",
  linkedin: "https://linkedin.com/in/arpit-kumar-shivam",
  github: "https://github.com/arpitkumar2004",
  calendly: "https://calendly.com/kumararpit17773/30min",
  resumeUrl: "/Arpit_Kumar_Resume.pdf",
  resumeDownloadName: "Arpit_Kumar_IIT_KGP_Resume.pdf",
  availableFrom: "April 2027",
  duration: "Full-Time",
  location: "Kharagpur, India (willing to relocate globally)",
  relocation: "Open to remote, hybrid, or on-site. Visa sponsorship required for international roles.",
};

// Compact highlights for the quick-glance section
export const highlights = [
  { metric: "Top 0.5%", context: "Amazon ML Challenge 2025 - out of 50K+ participants" },
  { metric: "1st Place", context: "1st Place, GC OpenSoft '25 (Deloitte-sponsored)" },
  { metric: "Codeforces Expert", context: "Peak rating 1612, handle _Badassium" },
  { metric: "AIR 135", context: "Integral Cup 2026 S1 (Probability, Linear Algebra, Analysis)" },
  { metric: "93.09%", context: "Speech AI NLI test accuracy (ATDC IIT Kharagpur)" },
  { metric: "Advisor", context: "Advisor, Developers' Society (DevSoc), IIT KGP" },
];

// Skills grouped by area
export const skillGroups = [
  {
    area: "ML / Deep Learning",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "BERT", "CLIP", "Transformers", "Wav2Vec2", "WavLM"],
  },
  {
    area: "GenAI / LLM & RAG",
    skills: ["LangChain", "LangGraph", "Tri-Path Multimodal RAG", "BM25S", "DuckDB Text-to-SQL", "BLIP-2", "Qdrant", "Prompt Engineering"],
  },
  {
    area: "Infrastructure & MLOps",
    skills: ["Docker", "FastAPI", "Flask", "GitHub Actions CI/CD", "MLflow", "DVC", "PostgreSQL", "MySQL"],
  },
  {
    area: "Programming",
    skills: ["Python", "C/C++", "SQL", "C", "JavaScript"],
  },
  {
    area: "Data & Analysis",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "A/B Testing", "Statistics & Probability"],
  },
  {
    area: "Domain Knowledge",
    skills: ["Natural Language Processing", "Speech AI / NLI", "Multimodal Retrieval", "LLM Systems & Agents", "ML Systems Architecture"],
  },
];

// Relevant coursework
export const relevantCoursework = [
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "High Performance Computing (HPC)",
  "Probability & Statistics",
  "Linear Algebra & Optimization",
  "Programming & Data Structures",
  "Process Modeling & Simulation",
  "Numerical Methods",
  "Experimental Design & A/B Testing",
];

// ---- Dynamic data from other files ----

/** Top achievements pulled from AchievementData.tsx */
export const getTopAchievements = (): Achievement[] => {
  const competitions = achievementData.find(cat => cat.title.includes("ML & AI Competitions") || cat.id === "01");
  const algorithmic = achievementData.find(cat => cat.title.includes("Competitive Programming") || cat.id === "03");
  const academic = achievementData.find(cat => cat.title.includes("Academic") || cat.id === "04");

  const achievements: Achievement[] = [];

  if (competitions?.items[0]) {
    achievements.push({
      rank: "Top 0.5%",
      title: "Amazon ML Challenge 2025",
      detail: "Multimodal product price intelligence platform using SBERT + CLIP + ensemble stacking",
      tech: "PyTorch, SBERT, CLIP, FastAPI, MLflow, Docker",
      metric: "Ranked Top 0.5% out of 50,000+ participants",
      badge: "Platinum",
      badgeColor: "cyan",
    });
  }

  if (competitions?.items[1]) {
    achievements.push({
      rank: "1st Place",
      title: "GC OpenSoft '25 (Deloitte-sponsored)",
      detail: "LLM-powered RAG employee support platform with 5 specialized agents",
      tech: "FastAPI, LangChain, LangGraph, GPT-4o, Docker, GCP",
      metric: "35% faster resolution, 40% less hallucination, 50% higher throughput",
      badge: "Gold",
      badgeColor: "amber",
    });
  }

  if (algorithmic?.items[0]) {
    achievements.push({
      rank: "Expert",
      title: "Codeforces Expert (Peak 1612)",
      detail: "Handle: _Badassium, advanced algorithmic problem-solving",
      tech: "Algorithms, data structures, graph theory, dynamic programming",
      metric: "Peak rating 1612",
      badge: "Expert",
      badgeColor: "purple",
    });
  }

  if (academic?.items[1]) {
    achievements.push({
      rank: "8.86 GPA",
      title: "IIT Kharagpur Dual Degree",
      detail: "Chemical Engineering with Specialization in AI & High Performance Computing (HPC)",
      tech: "PyTorch, Transformers, Systems Architecture, HPC",
      metric: "8.86 / 10 GPA",
      badge: "Academic",
      badgeColor: "blue",
    });
  }

  return achievements;
};

export const featuredProjectIds: (number | string)[] = [10, 9, 5];

export const getFeaturedProjects = (projectsList?: Project[]): FeaturedProjectDisplay[] => {
  const source = projectsList && projectsList.length > 0 ? projectsList : staticProjects;
  return featuredProjectIds.map((id) => {
    const project = source.find((p) => String(p.id) === String(id) || (p.slug && p.slug === String(id)));
    if (!project) return null;

    return {
      title: project.title,
      category: project.type || "Project",
      description: project.longDescription || project.description,
      impact: project.tldr || project.keyImpactMetrics?.join(" - ") || "",
      technologies: project.technologies?.join(", ") || "",
      methodology: project.methods?.join(" -> ") || "",
      link: project.githubLink || project.liveDemoLink || "",
    };
  }).filter((p): p is FeaturedProjectDisplay => p !== null);
};

// Experience summary for the page
export const experienceSummary = [
  {
    role: "AI Researcher Intern",
    org: "SRIC, IIT Kharagpur",
    period: "May 2026 - Jul 2026",
    highlights: [
      "Built Tri-Path Multimodal RAG framework combining dense BM25S, DuckDB Text-to-SQL, BLIP-2, weighted RRF, cross-encoder reranking, and NLI attribution",
      "Achieved 0.612 Recall@5, 0.552 nDCG@5, 0.578 SQL execution success, 0.657 attribution precision",
      "Improved RAG baselines by 13.7%–19.8% points across 10 benchmarks and mitigated 91% of known RAG failure modes",
      "Productionized via PyPI packaging, GitHub Actions CI, vulnerability auditing, and 22-dimensional evaluation harness",
    ],
  },
  {
    role: "AI Researcher (UG) Intern",
    org: "ATDC, IIT Kharagpur (Prof. Shyamal Kumar Das Mandal)",
    period: "May 2025 - Jul 2025",
    highlights: [
      "Engineered two-phase native language identification framework using fixed Vision Transformers (ViT-small) on L2 English speech across 5 Indian languages",
      "Processed 128-Mel spectrograms, log-F0, and 14-feature fluency representations from 44.1 kHz speech in NISP dataset",
      "Achieved 93.09% test accuracy on Mel-spectrograms, outperforming CNN and ResNet-18 baselines by 6.00% and 4.80%",
      "Implemented PyTorch feature caching to reduce epoch time from ~13 minutes to 30 seconds for efficient training",
    ],
  },
  {
    role: "Advisor (Former Dev Head)",
    org: "Developers' Society (DevSoc), TSG, IIT Kharagpur",
    period: "Sep 2023 - Present",
    highlights: [
      "Advise Machine Learning & Software Architecture track for IIT Kharagpur's premier developer society",
      "Shape architecture decisions, conduct technical reviews, and mentor engineers across ML and backend tracks",
      "Architected containerized microservices and automated CI/CD deployment pipelines",
    ],
  },
];

// Logistics - practical info recruiters need
export const logistics = {
  availability: "April 2027 (Full-time Roles)",
  duration: "Full-Time Permanent",
  notice: "Graduating April 2027 (IIT Kharagpur)",
  location: "Kharagpur, India",
  relocation: "Willing to relocate anywhere globally",
  visa: "Indian passport, will need sponsorship for international roles",
  remote: "Open to remote, hybrid, or on-site",
  hours: "Full-time (40 hrs/week)",
  languages: "English (fluent), Hindi (native)",
  conversion: "Full-time hire from April 2027",
};

// ----- Legacy exports (backward compatibility) -----

export const trackRecordMetrics: TrackRecordMetric[] = [
  { number: "Top 0.5%", label: "Amazon ML Challenge", detail: "Top 0.5% out of 50K+ participants globally", color: "blue" },
  { number: "93.09%", label: "Speech AI Accuracy", detail: "NLI research at ATDC IIT KGP", color: "green" },
  { number: "AIR 135", label: "Integral Cup 2026", detail: "Probability, Linear Algebra & Analysis", color: "purple" },
  { number: "1st Place", label: "GC OpenSoft '25", detail: "LLM-powered RAG platform (Deloitte)", color: "amber" },
];

export const seekingData: SeekingData = {
  targetCompanies: [
    { label: "Big Tech", detail: "FAANG, Microsoft, NVIDIA, Google" },
    { label: "AI Labs", detail: "OpenAI, Anthropic, Cohere, DeepMind" },
    { label: "High-Growth AI", detail: "Scale AI, Databricks, Mistral" },
    { label: "Quant & ML", detail: "HFT, Quant Research, Tech MNCs" },
  ],
  rolePreferences: [
    { label: "ML Engineer", detail: "Production AI systems & infrastructure" },
    { label: "AI Researcher", detail: "LLM, RAG, Speech & Multimodal AI" },
    { label: "LLM/RAG Specialist", detail: "Agentic workflows & RAG pipelines" },
    { label: "MLOps Engineer", detail: "Model lifecycle, CI/CD & serving" },
  ],
  learningGoals: [
    { label: "Scale", detail: "Train and deploy models at billion-parameter scale" },
    { label: "LLMs & RAG", detail: "Advance state-of-the-art retrieval & reasoning" },
    { label: "MLOps", detail: "High-throughput, low-latency distributed inference" },
    { label: "Real Impact", detail: "Ship production features reaching millions" },
  ],
};

export const technicalSkills: TechnicalSkills = {
  mlAiStack: [
    "PyTorch, TensorFlow, Scikit-learn",
    "Transformers (BERT, CLIP, Vision Transformers, LLMs)",
    "RAG Frameworks (BM25S, DuckDB, Qdrant, LangChain, LangGraph)",
    "Speech AI (Wav2Vec2, WavLM, Mel-spectrograms, MFCCs)",
    "XGBoost, LightGBM, CatBoost",
    "FastAPI, Docker, MLflow, DVC, CI/CD (GitHub Actions)",
    "PyPI Packaging, Evaluation Harnesses, Vulnerability Auditing",
    "React, TypeScript, JavaScript",
  ],
  otherStrengths: [
    "PostgreSQL, MySQL, DuckDB, Qdrant",
    "Pandas, NumPy, Matplotlib, Seaborn",
    "Codeforces Expert (Peak 1612)",
    "Integral Cup 2026 AIR 135",
    "IIT Kharagpur 8.86 GPA",
    "Leadership & Mentorship (Developers' Society Advisor)",
  ],
};

export const logisticsData: LogisticsData = {
  timeline: [
    { label: "Start Date", value: "April 2027 (IIT Kharagpur Dual Degree '27)" },
    { label: "Duration", value: "Full-Time Permanent Role" },
    { label: "Notice Period", value: "Graduating April 2027" },
    { label: "Full-time Hire", value: "Open for interviews & placement rounds" },
  ],
  location: [
    { label: "Current Location", value: "Kharagpur, India" },
    { label: "Visa Status", value: "Indian passport holder" },
    { label: "Sponsorship", value: "Will require visa sponsorship for international roles" },
    { label: "Relocation", value: "Willing to relocate anywhere globally" },
  ],
  workPreferences: [
    { label: "Hours", value: "Full-time (40 hrs/week), flexible with time zones" },
    { label: "Remote", value: "Open to remote, hybrid, or on-site" },
    { label: "Languages", value: "English (fluent), Hindi (native)" },
    { label: "Overlap", value: "Can adjust schedule for global time zones" },
  ],
  valueProposition: [
    { label: "Zero ramp-up", value: "Start contributing on Day 1" },
    { label: "Production-ready", value: "Ship robust systems with 93%+ accuracy" },
    { label: "Full-stack ML", value: "From research prototyping to PyPI & CI/CD" },
    { label: "Proven track record", value: "Top 0.5% Amazon ML, AIR 135 Math, Gold Medalist" },
  ],
};

export const finalCtaData: FinalCtaData = {
  heading: "Interested in hiring?",
  subheading: "Available April 2027 for Full-time Roles — open for interviews & recruitment now.",
  tagline: "",
  primaryCta: { text: "Schedule a Call", url: "https://calendly.com/kumararpit17773/30min" },
  secondaryCta: { text: "Download Resume", url: "/Arpit_Kumar_Resume.pdf", downloadName: "Arpit_Kumar_IIT_KGP_Resume.pdf" },
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/arpit-kumar-shivam", icon: "Linkedin" },
    { platform: "GitHub", url: "https://github.com/arpitkumar2004", icon: "Github" },
  ],
};

export const colorMappings: ColorMappings = {
  blue: { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800", badgeText: "text-blue-700 dark:text-blue-300" },
  green: { text: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800", badgeText: "text-green-700 dark:text-green-300" },
  purple: { text: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800", badgeText: "text-purple-700 dark:text-purple-300" },
  amber: { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-800", badgeText: "text-amber-700 dark:text-amber-300" },
  cyan: { text: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-900/20", border: "border-cyan-200 dark:border-cyan-800", badgeText: "text-cyan-700 dark:text-cyan-300" },
  orange: { text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800", badgeText: "text-orange-700 dark:text-orange-300" },
};
