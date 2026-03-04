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
  degree: "Dual Degree (B.Tech + M.Tech), Chemical Engineering",
  institution: "IIT Kharagpur",
  cgpa: "7.86 / 10",
  tagline: "Applied AI & ML researcher looking for a Summer 2026 internship in machine learning, deep learning, or generative AI systems where I can apply my skills and contribute to real-world problems.",
  email: "kumararpit17773@gmail.com",
  linkedin: "https://linkedin.com/in/arpit-kumar-shivam",
  github: "https://github.com/arpitkumar2004",
  calendly: "https://calendly.com/kumararpit17773/30min",
  resumeUrl: "/Arpit_Kumar_Resume.pdf",
  resumeDownloadName: "Arpit_Kumar_IIT_KGP_Resume.pdf",
  availableFrom: "May 2026",
  duration: "10-12 weeks",
  location: "Kharagpur, India (willing to relocate globally)",
  relocation: "Open to remote, hybrid, or on-site. Visa sponsorship required for international roles.",
};

// Compact highlights for the quick-glance section
export const highlights = [
  { metric: "Top 0.5%", context: "Amazon ML Challenge 2025 - 42nd out of 8,690 teams" },
  { metric: "1st Place", context: "Healthcare Risk Scorecard, GC Data Analytics (Evva Health)" },
  { metric: "Codeforces Expert", context: "Max rating 1612, top 7% globally, 500+ problems solved" },
  { metric: "30+ developers", context: "Mentored as Tech Advisor, Developers' Society, IIT KGP" },
  { metric: "6 competition wins", context: "Healthcare, fintech, time-series, multimodal AI" },
  { metric: "Merit Scholar", context: "Merit-cum-Means Scholarship, top 5% of cohort at IIT KGP" },
];

// Skills grouped by area
export const skillGroups = [
  {
    area: "ML / Deep Learning",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "BERT", "CLIP", "Transformers", "UMAP", "PCA"],
  },
  {
    area: "GenAI / NLP",
    skills: ["LangChain", "LlamaIndex", "RAG pipelines", "Prompt engineering", "Fine-tuning", "vLLM", "HuggingFace"],
  },
  {
    area: "Infrastructure & MLOps",
    skills: ["Docker", "FastAPI", "Flask", "GitHub Actions CI/CD", "GCP (GCE, GCR)", "AWS (EC2, S3)", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    area: "Programming",
    skills: ["Python", "C/C++", "SQL", "JavaScript", "TypeScript"],
  },
  {
    area: "Data & Visualization",
    skills: ["Pandas", "NumPy", "Polars", "Matplotlib", "Seaborn", "Streamlit"],
  },
  {
    area: "Domain Knowledge",
    skills: ["Computer Vision", "NLP", "Time-series forecasting", "Anomaly detection", "Quantitative finance", "Process simulation (Aspen HYSYS)"],
  },
];

// Relevant coursework
export const relevantCoursework = [
  "Machine Learning (Stanford CS229)",
  "Deep Learning (Stanford CS230)",
  "NLP with Deep Learning (Stanford CS224N)",
  "ML Systems Design (Stanford CS329S)",
  "Convex Optimization (Stanford EE364A)",
  "Probability & Statistics",
  "Programming & Data Structures",
  "Process Modeling & Simulation",
  "Numerical Methods",
  "Experimental Design & A/B Testing",
];

// ---- Dynamic data from other files ----

/** Top achievements pulled from AchievementData.tsx */
export const getTopAchievements = (): Achievement[] => {
  const competitions = achievementData.find(cat => cat.id === "03");
  const algorithmic = achievementData.find(cat => cat.id === "02");
  const academic = achievementData.find(cat => cat.id === "01");

  const achievements: Achievement[] = [];

  if (competitions?.items[0]) {
    achievements.push({
      rank: "42nd / 8,690",
      title: "Amazon ML Challenge 2025",
      detail: "Multimodal price prediction using BERT + CLIP + ensemble stacking",
      tech: "PyTorch, BERT, CLIP, XGBoost, LightGBM, CatBoost, UMAP",
      metric: "0.21 MAE, top 0.5% globally",
      badge: "Platinum",
      badgeColor: "cyan",
    });
  }

  if (competitions?.items[3]) {
    achievements.push({
      rank: "1st Place",
      title: "Healthcare Risk Scorecard - Evva Health",
      detail: "GC Data Analytics Competition, IIT KGP",
      tech: "BERT, Naive Bayes, Decision Trees, Streamlit",
      metric: "82.89% accuracy, deployed production dashboard",
      badge: "Gold",
      badgeColor: "amber",
    });
  }

  if (algorithmic?.items[0]) {
    achievements.push({
      rank: "Top 7%",
      title: "Codeforces Expert",
      detail: "Max rating 1612, ranked 203rd in Div 2 Round 1032 (15K+ competitors)",
      tech: "Algorithms, data structures, graph theory, dynamic programming",
      metric: "500+ problems solved",
      badge: "Expert",
      badgeColor: "purple",
    });
  }

  if (academic?.items[1]) {
    achievements.push({
      rank: "Top 5%",
      title: "Merit-cum-Means Scholarship, IIT KGP",
      detail: "Awarded for sustained academic excellence and research contributions",
      tech: "Neural networks, process simulation, research methodology",
      metric: "7.86 CGPA, SPARC international research participant",
      badge: "Academic",
      badgeColor: "blue",
    });
  }

  return achievements;
};

/** Featured projects pulled from projectsData.tsx */
export const featuredProjectIds = [7, 8, 12];

export const getFeaturedProjects = (projectsList?: Project[]): FeaturedProjectDisplay[] => {
  const source = projectsList && projectsList.length > 0 ? projectsList : staticProjects;
  return featuredProjectIds.map((id) => {
    const project = source.find((p) => p.id === id);
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
    role: "Technical Advisor & Former Dev Head",
    org: "Developers' Society, IIT Kharagpur",
    period: "Sep 2023 - Present",
    highlights: [
      "Scaled team from 15 to 30+ developers; shipped 12+ production features per quarter",
      "Architected containerized microservices (Docker, Nginx), reduced infra costs 30%",
      "Built CI/CD pipelines (GitHub Actions) enabling daily deployment with zero-downtime rollouts",
      "Optimized PostgreSQL + Redis caching, cut API p99 latency from 800ms to 150ms",
    ],
  },
  {
    role: "Executive Member",
    org: "Public Policy & Governance Society, IIT KGP",
    period: "May 2023 - Sep 2024",
    highlights: [
      "Authored 4 white papers on AI-policy intersections, cited in 8+ campus events",
      "Led quantitative research on digital governance using regression and causal inference",
      "Directed symposium reaching 500+ participants with government and academic speakers",
    ],
  },
];

// Logistics - practical info recruiters need
export const logistics = {
  availability: "May 2026 (flexible +/-1 week)",
  duration: "10-12 weeks",
  notice: "None - can start immediately",
  location: "Kharagpur, India",
  relocation: "Willing to relocate anywhere globally",
  visa: "Indian passport, will need sponsorship (H-1B, J-1, etc.)",
  remote: "Open to remote, hybrid, or on-site",
  hours: "Full-time (40 hrs/week), flexible with time zones",
  languages: "English (fluent), Hindi (native)",
  conversion: "Open to full-time conversion based on fit",
};

// ----- Legacy exports (backward compatibility) -----

export const trackRecordMetrics: TrackRecordMetric[] = [
  { number: "Top 0.5%", label: "Amazon ML Challenge", detail: "42nd/8,690 teams globally", color: "blue" },
  { number: "3x Faster", label: "Production ML Training", detail: "NLP pipeline optimization", color: "green" },
  { number: "30+ Devs", label: "Mentored & Led", detail: "Technical Advisor, DevSoc IIT KGP", color: "purple" },
  { number: "6 Wins", label: "ML Competitions", detail: "Healthcare, Fintech, Time-series", color: "amber" },
];

export const seekingData: SeekingData = {
  targetCompanies: [
    { label: "Big Tech", detail: "FAANG, Microsoft, NVIDIA" },
    { label: "AI Labs", detail: "OpenAI, Anthropic, Cohere" },
    { label: "Fast-growing", detail: "Scale-ups (Series B+)" },
    { label: "Industries", detail: "Fintech, Healthcare, SaaS" },
  ],
  rolePreferences: [
    { label: "Research-heavy", detail: "Novel ML implementations" },
    { label: "Production systems", detail: "Real user impact" },
    { label: "Cross-functional", detail: "Work with PM, design" },
    { label: "Mentorship", detail: "Learn from senior MLE/researchers" },
  ],
  learningGoals: [
    { label: "Scale", detail: "Train models on TB+ datasets" },
    { label: "LLMs", detail: "Hands-on with Transformers at scale" },
    { label: "MLOps", detail: "K8s, distributed training, CI/CD" },
    { label: "Impact", detail: "Ship features used by millions" },
  ],
};

export const technicalSkills: TechnicalSkills = {
  mlAiStack: [
    "PyTorch, TensorFlow, Scikit-learn",
    "Transformers (BERT, CLIP, LLMs)",
    "XGBoost, LightGBM, CatBoost",
    "Computer Vision, NLP, Generative AI",
    "Mixed-Precision (Apex/AMP), Distributed Training",
    "UMAP, PCA, Feature Engineering",
    "FastAPI, Docker, CI/CD (GitHub Actions)",
    "React, TypeScript, Next.js (frontends)",
  ],
  otherStrengths: [
    "AWS (EC2, S3, Lambda), GCP (GCE, GCR)",
    "Kubernetes, Docker Compose",
    "PostgreSQL, MongoDB, Redis",
    "Pandas, NumPy, Matplotlib, Seaborn",
    "Time Series (FBProphet, LSTM)",
    "Competitive Programming (Codeforces Expert)",
    "Team Leadership (30+ developers mentored)",
    "IIT Kharagpur 7.86 CGPA, Merit Scholar",
  ],
};

export const logisticsData: LogisticsData = {
  timeline: [
    { label: "Start Date", value: "May 1, 2026 (flexible +/-1 week)" },
    { label: "Duration", value: "10-12 weeks (Jun-Jul 2026)" },
    { label: "Notice Period", value: "None (immediate start)" },
    { label: "Full-time Conversion", value: "Open if performance aligns" },
  ],
  location: [
    { label: "Current Location", value: "Kharagpur, India" },
    { label: "Visa Status", value: "Indian passport holder" },
    { label: "Sponsorship", value: "Will require visa sponsorship (H1B, J1, etc.)" },
    { label: "Relocation", value: "Willing to relocate anywhere globally" },
  ],
  workPreferences: [
    { label: "Hours", value: "Full-time (40 hrs/week), flexible with time zones" },
    { label: "Remote", value: "Open to remote, hybrid, or on-site" },
    { label: "Languages", value: "English (fluent), Hindi (native)" },
    { label: "Overlap", value: "Can adjust schedule for US/Europe hours" },
  ],
  valueProposition: [
    { label: "Zero ramp-up", value: "Start coding on Day 1" },
    { label: "Production-ready", value: "Ship features, not experiments" },
    { label: "Full-stack", value: "From model to deployment" },
    { label: "Team player", value: "30+ devs mentored" },
  ],
};

export const finalCtaData: FinalCtaData = {
  heading: "Interested?",
  subheading: "Available May 2026 - accepting interview requests now.",
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
