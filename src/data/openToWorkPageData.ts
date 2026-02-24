// ========================================
// OpenToWork Page - Complete Data Source
// ========================================
// TypeScript-powered, data-driven content for OpenToWork.tsx
// Links to projectsData.tsx and AchievementData.tsx for single source of truth

/**
 * @fileoverview OpenToWork page data with TypeScript interfaces
 * 
 * This file provides:
 * 1. Type-safe data structures for the OpenToWork landing page
 * 2. Dynamic data linking to projectsData.tsx and AchievementData.tsx
 * 3. Reusable TypeScript interfaces for other components
 * 
 * @example Importing data in components
 * ```typescript
 * import { 
 *   heroData, 
 *   getFeaturedProjects, 
 *   getTopAchievements 
 * } from '../data/openToWorkPageData';
 * ```
 * 
 * @example Using TypeScript interfaces
 * ```typescript
 * import type { 
 *   Achievement, 
 *   FeaturedProjectDisplay, 
 *   TrackRecordMetric 
 * } from '../data/openToWorkPageData';
 * 
 * const MyComponent = () => {
 *   const achievements: Achievement[] = getTopAchievements();
 *   const projects: FeaturedProjectDisplay[] = getFeaturedProjects();
 *   return <div>...</div>;
 * };
 * ```
 * 
 * @example Available Interfaces
 * - HeroData: Hero section with availability badge and CTAs
 * - TrackRecordMetric: Stat cards with metrics
 * - SeekingData: Target companies, role preferences, learning goals
 * - Achievement: Competition wins and credentials
 * - FeaturedProjectDisplay: Project showcase cards
 * - TechnicalSkills: ML/AI stack and other strengths
 * - LogisticsData: Timeline, location, work preferences, value prop
 * - FinalCtaData: Final CTA section with social links
 * - ColorMapping: Tailwind color utility mappings
 * 
 * @see projectsData.tsx for Project interface and full project database
 * @see AchievementData.tsx for achievement categories and items
 */

import { projects } from "./projectsData";
import { achievementData } from "./AchievementData";

// ====================
// TYPESCRIPT INTERFACES
// ====================

export interface HeroData {
  availabilityBadge: {
    status: string;
    message: string;
    color: "green" | "blue" | "amber";
  };
  title: {
    main: string;
    subtitle: string;
  };
  credentials: string[];
  contact: {
    email: string;
    responseTime: string;
  };
  availability: Array<{
    icon: string;
    label: string;
    detail: string;
  }>;
  cta: {
    primary: {
      text: string;
      url: string;
      icon: string;
    };
    secondary: {
      text: string;
      url: string;
      downloadName: string;
      icon: string;
    };
  };
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
// DATA EXPORTS
// ====================

// Hero Section Data
export const heroData: HeroData = {
  availabilityBadge: {
    status: "Available May 2026",
    message: "Accepting Interview Requests",
    color: "green" as const,
  },
  title: {
    main: "Summer 2026 ML Intern",
    subtitle: "IIT Kharagpur",
  },
  credentials: [
    "Top 0.5% Amazon ML Challenge",
    "7.86 CGPA Dual Degree",
    "Mentored 30+ Developers",
    "6 Competition Wins",
    "Codeforces Expert (Top 7%)",
  ],
  contact: {
    email: "kumararpit17773@gmail.com",
    responseTime: "Response within 24 hours",
  },
  availability: [
    { icon: "Calendar", label: "May - July 2026", detail: "(10-12 weeks)" },
    { icon: "MapPin", label: "Global", detail: "(Relocation Ready)" },
    { icon: "Clock", label: "Immediate Start", detail: "Available" },
  ],
  cta: {
    primary: {
      text: "Schedule Interview",
      url: "https://calendly.com/kumararpit17773/30min",
      icon: "Calendar",
    },
    secondary: {
      text: "Download Resume",
      url: "/Arpit_Kumar_Resume.pdf",
      downloadName: "Arpit_Kumar_IIT_KGP_ML_Intern.pdf",
      icon: "Download",
    },
  },
};

// Track Record Metrics
export const trackRecordMetrics: TrackRecordMetric[] = [
  {
    number: "Top 0.5%",
    label: "Amazon ML Challenge",
    detail: "42nd/8,690 teams globally",
    color: "blue",
  },
  {
    number: "3x Faster",
    label: "Production ML Training",
    detail: "NLP pipeline optimization",
    color: "green",
  },
  {
    number: "30+ Devs",
    label: "Mentored & Led",
    detail: "Technical Advisor, DevSoc IIT KGP",
    color: "purple",
  },
  {
    number: "6 Wins",
    label: "ML Competitions",
    detail: "Healthcare, Fintech, Time-series",
    color: "amber",
  },
];

// What I'm Looking For Section
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

// Top Achievements - Dynamically sourced from AchievementData.tsx
/**
 * Get top achievements from achievementData.tsx
 * Maps specific competition items to OpenToWork display format
 */
export const getTopAchievements = (): Achievement[] => {
  // Extract specific achievements from achievementData
  const competitions = achievementData.find(cat => cat.id === "03"); // Global AI Competitions
  const algorithmic = achievementData.find(cat => cat.id === "02"); // Algorithmic Credentials
  const academic = achievementData.find(cat => cat.id === "01"); // Academic Profile

  const achievements: Achievement[] = [];

  // 1. Amazon ML Challenge (from competitions, first item)
  if (competitions?.items[0]) {
    achievements.push({
      rank: "Top 0.5%",
      title: "Amazon ML Challenge 2025",
      detail: "42nd/8,690 teams • Multimodal Price Prediction",
      tech: "BERT, CLIP, XGBoost, LightGBM, CatBoost, UMAP",
      metric: "0.21 MAE • Ensemble stacking with dimensionality reduction",
      badge: "Platinum",
      badgeColor: "cyan",
    });
  }

  // 2. Healthcare Risk Scorecard (from competitions, fourth item)
  if (competitions?.items[3]) {
    achievements.push({
      rank: "1st Place",
      title: "Healthcare Risk Scorecard (Evva Health)",
      detail: "GC Data Analytics Competition",
      tech: "BERT, Naive Bayes, Decision Trees, Streamlit",
      metric: "82.89% accuracy • Deployed production dashboard",
      badge: "Gold",
      badgeColor: "amber",
    });
  }

  // 3. Codeforces Expert (from algorithmic, first item)
  if (algorithmic?.items[0]) {
    achievements.push({
      rank: "Top 7%",
      title: "Codeforces Expert",
      detail: "Max Rating 1612 • 203rd in Div 2 (15K+ competitors)",
      tech: "Algorithms, Data Structures, Graph Theory, DP",
      metric: "Elite problem solver • 500+ problems solved",
      badge: "Expert",
      badgeColor: "purple",
    });
  }

  // 4. IIT KGP CGPA (from academic, second item - Merit Scholarship)
  if (academic?.items[1]) {
    achievements.push({
      rank: "IIT KGP",
      title: "7.86 CGPA Dual Degree",
      detail: "Chemical Engineering • Merit Scholar",
      tech: "Process Simulation, Neural Networks, Research",
      metric: "Top 5% cohort • SPARC international research",
      badge: "Academic",
      badgeColor: "blue",
    });
  }

  return achievements;
};

// Legacy: Manual Achievements List (deprecated, use getTopAchievements() instead)
/** @deprecated Use getTopAchievements() for dynamic data linking from AchievementData.tsx */
export const topAchievements: Achievement[] = [
  {
    rank: "Top 0.5%",
    title: "Amazon ML Challenge 2025",
    detail: "42nd/8,690 teams • Multimodal Price Prediction",
    tech: "BERT, CLIP, XGBoost, LightGBM, CatBoost, UMAP",
    metric: "0.21 MAE • Ensemble stacking with dimensionality reduction",
    badge: "Platinum",
    badgeColor: "cyan",
  },
  {
    rank: "1st Place",
    title: "Healthcare Risk Scorecard (Evva Health)",
    detail: "GC Data Analytics Competition",
    tech: "BERT, Naive Bayes, Decision Trees, Streamlit",
    metric: "82.89% accuracy • Deployed production dashboard",
    badge: "Gold",
    badgeColor: "amber",
  },
  {
    rank: "Top 7%",
    title: "Codeforces Expert",
    detail: "Max Rating 1612 • 203rd in Div 2 (15K+ competitors)",
    tech: "Algorithms, Data Structures, Graph Theory, DP",
    metric: "Elite problem solver • 500+ problems solved",
    badge: "Expert",
    badgeColor: "purple",
  },
  {
    rank: "IIT KGP",
    title: "7.86 CGPA Dual Degree",
    detail: "Chemical Engineering • Merit Scholar",
    tech: "Process Simulation, Neural Networks, Research",
    metric: "Top 5% cohort • SPARC international research",
    badge: "Academic",
    badgeColor: "blue",
  },
];

// Featured Projects - Dynamically fetched from projectsData.tsx by ID
export const featuredProjectIds = [7, 8, 12]; // Amazon ML, Text Summarization, Employee Welfare

/**
 * Get featured projects by ID from projectsData.tsx
 * Returns formatted project data for OpenToWork display
 */
export const getFeaturedProjects = (): FeaturedProjectDisplay[] => {
  return featuredProjectIds.map((id) => {
    const project = projects.find((p) => p.id === id);
    if (!project) {
      console.warn(`Project with ID ${id} not found in projectsData.tsx`);
      return null;
    }

    // Map Project interface to FeaturedProjectDisplay format
    return {
      title: project.title,
      category: project.type || "Project",
      description: project.longDescription || project.description,
      impact: project.tldr || project.keyImpactMetrics?.join(" • ") || "",
      technologies: project.technologies?.join(" • ") || "",
      methodology: project.methods?.join(" → ") || "",
      link: project.githubLink || project.liveDemoLink || "",
    };
  }).filter((p): p is FeaturedProjectDisplay => p !== null);
};

// Legacy: Manual Curated Projects (deprecated, use getFeaturedProjects() instead)
/** @deprecated Use getFeaturedProjects() for dynamic data linking */
export const featuredProjects: FeaturedProjectDisplay[] = [
  {
    title: "Amazon ML Challenge - Multimodal AI Pipeline",
    category: "Competition Winner",
    description:
      "End-to-end multimodal price prediction combining BERT text embeddings, CLIP image features, and tabular data. Advanced ensemble stacking with dimensionality reduction.",
    impact: "Top 0.5% globally (42nd/8,690 teams) • 0.21 MAE",
    technologies: "PyTorch • BERT • CLIP • XGBoost • LightGBM • CatBoost • UMAP",
    methodology:
      "Feature embedding → Dimensionality reduction (UMAP) → Ensemble stacking → 5-fold CV",
    link: "https://github.com/arpitkumar2004/A_ML_2025",
  },
  {
    title: "NLP Text Summarization System",
    category: "Production ML",
    description:
      "Production-grade summarization pipeline with curriculum sampling, mixed-precision training (Apex/AMP), and distributed PyTorch. Deployed with Docker + CI/CD.",
    impact: "+5 ROUGE-L on SAMSum • 3x faster training • 40% lower p95 latency",
    technologies: "PyTorch • Transformers (BART) • Apex/AMP • Docker • GitHub Actions",
    methodology:
      "Curriculum sampling → Mixed-precision FP16 → Distributed training → Automated testing",
    link: "https://github.com/arpitkumar2004/Text-Summarizer-Project",
  },
  {
    title: "Conversational AI Platform for Employee Welfare",
    category: "Full-Stack ML System",
    description:
      "Scalable AI platform for proactive burnout detection using ensemble anomaly detection (Isolation Forest + LOF) and LangChain-driven automated HR reporting.",
    impact:
      "Containerized FastAPI on GCP • Real-time risk flagging • Automated weekly reports",
    technologies: "Next.js • Expo • FastAPI • LangChain • GCP (GCE, GCR) • Docker",
    methodology:
      "Ensemble anomaly detection → LLM-powered insights → Async CRON → Cloud deployment",
    link: "",
  },
];

// Technical Skills
export const technicalSkills: TechnicalSkills = {
  mlAiStack: [
    "PyTorch, TensorFlow, Scikit-learn",
    "Transformers (BERT, CLIP, LLMs)",
    "XGBoost, LightGBM, CatBoost",
    "Computer Vision • NLP • Generative AI",
    "Mixed-Precision (Apex/AMP) • Distributed Training",
    "UMAP, PCA, Feature Engineering",
    "FastAPI, Docker, CI/CD (GitHub Actions)",
    "React, TypeScript, Next.js (frontends)",
  ],
  otherStrengths: [
    "AWS (EC2, S3, Lambda) • GCP (GCE, GCR)",
    "Kubernetes, Docker Compose",
    "PostgreSQL, MongoDB, Redis",
    "Pandas, NumPy, Matplotlib, Seaborn",
    "Time Series (FBProphet, LSTM)",
    "Competitive Programming (Codeforces Expert)",
    "Team Leadership (30+ developers mentored)",
    "IIT Kharagpur 7.86 CGPA • Merit Scholar",
  ],
};

// Logistics & Work Authorization
export const logisticsData: LogisticsData = {
  timeline: [
    { label: "Start Date", value: "May 1, 2026 (flexible ±1 week)" },
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

// Final CTA Section
export const finalCtaData: FinalCtaData = {
  heading: "Let's Build Something Great",
  subheading: "Available May 2026 • Accepting interviews now",
  tagline: "Fast onboarding • Day-one contributions • Zero ramp-up time",
  primaryCta: {
    text: "Schedule Interview",
    url: "https://calendly.com/kumararpit17773/30min",
  },
  secondaryCta: {
    text: "Download Resume",
    url: "/Arpit_Kumar_Resume.pdf",
    downloadName: "Arpit_Kumar_IIT_KGP_ML_Intern.pdf",
  },
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/arpit-kumar-shivam",
      icon: "Linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/arpitkumar2004",
      icon: "Github",
    },
  ],
};

// Color mappings for consistency
export const colorMappings: ColorMappings = {
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
    badgeText: "text-blue-700 dark:text-blue-400",
  },
  green: {
    text: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
    border: "border-green-200 dark:border-green-800",
    badgeText: "text-green-700 dark:text-green-400",
  },
  purple: {
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-200 dark:border-purple-800",
    badgeText: "text-purple-700 dark:text-purple-400",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    border: "border-amber-200 dark:border-amber-800",
    badgeText: "text-amber-700 dark:text-amber-400",
  },
  cyan: {
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    border: "border-cyan-200 dark:border-cyan-800",
    badgeText: "text-cyan-700 dark:text-cyan-400",
  },
  orange: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    border: "border-orange-200 dark:border-orange-800",
    badgeText: "text-orange-700 dark:text-orange-400",
  },
};
