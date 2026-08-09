import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  MapPin,
  FileText,
  ArrowRight,
  Building2,
  Briefcase,
  UserCheck,
  Github,
  Package,
  Globe,
  Sparkles,
} from "lucide-react";

// Logos
import cheaLogo from "../data/img/chea_logo.png";
import devsocLogo from "../data/img/devsoc_logo.jpg";
import ppgsLogo from "../data/img/ppgs_logo.png";
import sbrcLogo from "../data/img/sbrc_logo.jpg";
import { trackResumeDownload } from "../utils/analytics";

export type ExperienceLink = {
  label: string;
  url: string;
  type: "github" | "report" | "pypi" | "website";
};

export type ExperienceRole = {
  id: number;
  title: string;
  duration: string;
  description: string[];
};

export type ExperienceEntry = {
  id: number;
  company: string;
  link: string;
  location: string;
  category: string;
  totalDuration: string;
  roles: ExperienceRole[];
  techStack: string[];
  links?: ExperienceLink[];
  advisor?: string;
};

const companyIcons: Record<string, string> = {
  "Developers' Society, IIT-Kharagpur": devsocLogo,
  "Public Policy and Governance Society, IIT-Kharagpur": ppgsLogo,
  "Chemical Engineering Association, IIT-Kharagpur": cheaLogo,
  "Students' Branding and Relations Cell, IIT Kharagpur": sbrcLogo,
};

const workExperiences: ExperienceEntry[] = [
  {
    id: 10,
    company: "Sponsored Research & Industrial Consultancy (SRIC), IIT Kharagpur",
    link: "https://github.com/arpitkumar2004/DocuReason",
    location: "IIT Kharagpur",
    category: "Multimodal RAG & AI Systems Research",
    totalDuration: "June 2026 - July 2026",
    advisor: "Prof. Shyamal Kumar Das Mandal, IIT Kharagpur",
    roles: [
      {
        id: 1001,
        title: "AI Research Intern | Project: DocuReason RAG",
        duration: "June 2026 - July 2026",
        description: [
          "Architected DocuReason, an enterprise-grade tri-path multimodal RAG framework for grounded document retrieval and reasoning across text, complex financial/scientific tables, and visual PDF documents under the guidance of Prof. Shyamal Kumar Das Mandal.",
          "Integrated ColPali (colpali-engine) with Hugging Face Transformers (transformers, peft, accelerate) for vision-language document embedding, fused with BM25s hybrid lexical search, Qdrant vector database, and DuckDB tabular execution via Docling & EasyOCR parser pipelines—slashing retrieval hallucination rate by 45%.",
          "Published and deployed the core framework to PyPI as docureason-framework with async FastAPI inference microservices, Pydantic schemas, and structured benchmarks—authored comprehensive research report (SRIC_Report_Arpit_Kumar'26.pdf).",
        ],
      },
    ],
    techStack: [
      "ColPali",
      "PyTorch",
      "Transformers",
      "FastAPI",
      "Qdrant",
      "DuckDB",
      "BM25s",
      "Docling",
      "PyPI",
    ],
    links: [
      {
        label: "GitHub Repo",
        url: "https://github.com/arpitkumar2004/DocuReason",
        type: "github",
      },
      {
        label: "Research Report (PDF)",
        url: "https://github.com/arpitkumar2004/DocuReason/blob/main/SRIC_Report_Arpit_Kumar'26.pdf",
        type: "report",
      },
      {
        label: "PyPI Package",
        url: "https://pypi.org/project/docureason-framework/",
        type: "pypi",
      },
    ],
  },
  // {
  //   id: 11,
  //   company: "Advanced Technology Development Centre (ATDC), IIT Kharagpur",
  //   link: "https://claude.ai/public/artifacts/6d1cbb90-64a9-4403-bc7a-15b658e82f60",
  //   location: "IIT Kharagpur",
  //   category: "Speech AI & Vision Transformer Research",
  //   totalDuration: "May 2025 - July 2025",
  //   advisor: "Prof. Shyamal Kumar Das Mandal, IIT Kharagpur",
  //   roles: [
  //     {
  //       id: 1002,
  //       title: "AI Research Intern | Vision Transformers & Speech Accent NLI",
  //       duration: "May 2025 - July 2025",
  //       description: [
  //         "Investigated fluency effects, pitch F0 contours, and spectral representations on Vision Transformer (ViT) architectures for Native Language Identification (NLI) from L2 English speech across 5 Indian languages (Hindi, Telugu, Tamil, Kannada, Malayalam) under Prof. Shyamal Kumar Das Mandal.",
  //         "Benchmarked 7 deep learning & speech transformer models—engineered a hybrid Wav2Vec2 + WavLM-BiLSTM fusion pipeline with spectrogram-level Vision Transformers, achieving SOTA 0.88 validation accuracy on the NISP dataset.",
  //         "Quantified acoustic-phonetic degradation across varying speaker fluency bands; authored technical research report documenting spectral attention maps, cross-lingual confusion matrices, and feature attribution.",
  //       ],
  //     },
  //   ],
  //   techStack: [
  //     "Wav2Vec2",
  //     "WavLM",
  //     "Vision Transformers",
  //     "PyTorch",
  //     "Speech Processing",
  //     "Librosa",
  //     "MFCCs",
  //   ],
  //   links: [
  //     {
  //       label: "Research Report & Analysis",
  //       url: "https://claude.ai/public/artifacts/6d1cbb90-64a9-4403-bc7a-15b658e82f60",
  //       type: "report",
  //     },
  //   ],
  // },
];

const positionsOfResponsibility: ExperienceEntry[] = [
  {
    id: 1,
    company: "Developers' Society, IIT-Kharagpur",
    link: "https://devsoc.in",
    location: "IIT Kharagpur",
    category: "AI & ML Systems Leadership",
    totalDuration: "Sep 2023 - Present",
    roles: [
      {
        id: 100,
        title: "Technical Advisor | Machine Learning & AI Systems",
        duration: "Sep 2024 - Present",
        description: [
          "Architected containerized production ML inference microservices and RAG engines (FastAPI, PyTorch, LangChain, Qdrant)—reduced p95 inference latency by 42% (from 850ms to 490ms) through dynamic GPU batching, ONNX Runtime quantization, and Redis response caching for 10,000+ active users.",
          "Engineered automated MLOps CI/CD pipelines & model governance frameworks (Docker, MLflow, DVC, GitHub Actions)—standardized model deployment across 6 engineering squads, established SHA-256 model fingerprinting for 100% reproducible training runs, and eliminated model drift.",
          "Mentoring 30+ developers and AI researchers with structured model reviews, architectural decision records (ADRs), and weekly ML technical workshops—shipped 8 production AI features with zero critical downtime.",
        ],
      },
      {
        id: 101,
        title: "Development Head | Full Stack & ML Systems",
        duration: "Oct 2024 - Sep 2025",
        description: [
          "Built and scaled full-stack ML platforms (React/Node.js/PostgreSQL/Redis) handling thousands of concurrent users during peak registrations—designed for high availability with load testing and capacity planning; optimized database and vector queries cutting p95 latency by 35%.",
          "Led cross-functional squads (backend, frontend, QA) shipping 12+ production features per quarter—established 2-week sprint cycles with clear OKRs; improved on-time delivery rate to 92% with predictable velocity.",
          "Implemented automated testing pyramid (unit, integration, e2e) with 78% code coverage—reduced deployment errors by 40% and enabled safe daily releases; introduced post-mortem process for incident learning.",
        ],
      },
      {
        id: 102,
        title: "Development Member | Backend & Infrastructure",
        duration: "Sep 2023 - Oct 2024",
        description: [
          "Refactored monolithic services into microservices with optimized PostgreSQL queries and Redis caching—reduced API p99 latency from 800ms to 150ms; improved throughput by 3.5x for 5,000+ daily active users.",
          "Designed RESTful APIs with OAuth2/JWT authentication, input validation, and rate limiting—achieved GDPR compliance; conducted security audits identifying and fixing 5 vulnerabilities before production.",
          "Owned feature delivery end-to-end across 8 sprints—wrote automated tests for all critical paths; maintained zero production incidents; mentored 2 junior developers on best practices.",
        ],
      },
    ],
    techStack: ["PyTorch", "FastAPI", "MLOps", "MLflow", "Docker", "PostgreSQL"],
  },
  {
    id: 2,
    company: "Public Policy and Governance Society, IIT-Kharagpur",
    link: "https://ppgsiitkgp.in",
    location: "IIT Kharagpur",
    category: "Quantitative AI & Policy Analytics",
    totalDuration: "May 2023 - Sep 2024",
    roles: [
      {
        id: 201,
        title: "Executive Member | Quantitative Policy & AI Research",
        duration: "Sep 2023 - Sep 2024",
        description: [
          "Led quantitative research on digital governance and AI ethics frameworks—analyzed heterogeneous datasets from 15+ government sources (50K+ records) using statistical regression and hypothesis testing at 95% confidence.",
          "Authored 4 peer-reviewed white papers analyzing AI governance, algorithmic bias, and LLM deployment ethics—cited across 8+ institutional events and influenced curriculum integration of responsible AI modules.",
          "Directed policy symposium reaching 500+ participants; coordinated keynotes with Ministry of Electronics, NITI Aayog, and AI ethics researchers—ranked #3 society at IIT Kharagpur by engagement metrics.",
        ],
      },
      {
        id: 202,
        title: "Associate Member | Data Analytics & ETL Pipelines",
        duration: "May 2023 - Sep 2023",
        description: [
          "Engineered Python data cleaning & ETL validation pipelines (pandas, NumPy) for 50,000+ raw policy records—reduced data anomalies by 70% and established reproducible data provenance workflows.",
          "Co-authored 2 research articles on public sector automation and AI governance metrics—featured on society portal reaching 400+ readers.",
          "Coordinated 6 policy roundtables with government delegates; deployed post-event analytics surveys achieving 85% satisfaction response rates across 200+ attendees.",
        ],
      },
    ],
    techStack: [
      "Python",
      "pandas",
      "Statistical Modeling",
      "Hypothesis Testing",
      "AI Ethics",
    ],
  },
  {
    id: 3,
    company: "Chemical Engineering Association, IIT-Kharagpur",
    link: "https://che.iitkgp.ac.in/",
    location: "IIT Kharagpur",
    category: "Applied Data & Systems Engineering",
    totalDuration: "Aug 2023 - Sep 2024",
    roles: [
      {
        id: 301,
        title: "Lead Data & Systems Specialist",
        duration: "Aug 2023 - Sep 2024",
        description: [
          "Engineered automated data ingestion and registration pipelines handling 2,000+ concurrent participant records—integrated Razorpay API webhooks and SQL validation, slashing manual data reconciliation from 40 hours to <2 hours per event (99.8% data accuracy).",
          "Analyzed web traffic & conversion funnel analytics for FUGACITY fest platform—boosted mobile traffic share from 30% to 80% and reduced LCP latency from 3.2s to 1.1s, elevating registration conversion by 50%.",
          "Architected departmental digital portal with SEO and database query optimizations—achieved #1 organic search ranking, 4.8/5 accessibility score, and 12,000+ annual active visitors.",
        ],
      },
    ],
    techStack: ["Data Automation", "Python", "SQL", "Web Analytics", "System Design"],
  },
  {
    id: 4,
    company: "Students' Branding and Relations Cell, IIT Kharagpur",
    link: "https://sbrc.iitkgp.ac.in",
    location: "IIT Kharagpur",
    category: "Growth & Campaign Data Analytics",
    totalDuration: "Feb 2023 - Sep 2023",
    roles: [
      {
        id: 401,
        title: "Associate Member | Growth & Outreach Analytics",
        duration: "Feb 2023 - Sep 2023",
        description: [
          "Applied quantitative engagement analytics to institutional outreach campaigns—modeled post timing, content tags, and demographic reach to grow audience base by 40% (5K → 7K) with an 18% engagement rate (2.25x campus average).",
          "Analyzed alumni database records (150+ alumni) using attribute-matching logic to pair alumni mentors with students and secure 3 corporate research/internship sponsorships.",
          "Authored data-driven event briefs and technical newsletters for 4 major institutional events, driving a 25% YoY increase in registration conversion across 10,000+ subscribers.",
        ],
      },
    ],
    techStack: ["Growth Analytics", "Data Analysis", "Python", "A/B Testing"],
  },
];

const RoleItem = ({
  role,
  idx,
  totalRoles,
}: {
  role: ExperienceRole;
  idx: number;
  totalRoles: number;
}) => {
  const [isOpen, setIsOpen] = useState(idx === 0);

  return (
    <div className="relative pl-6">
      {/* Role Connector */}
      <div
        className={`absolute left-0 top-[7px] w-[7px] h-[7px] rounded-full transition-colors duration-300 ${isOpen ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"
          }`}
      />
      {idx < totalRoles - 1 && (
        <div className="absolute left-[2.5px] top-4 bottom-[-24px] w-[2px] bg-slate-100 dark:bg-white/10" />
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer group/role"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-slate-400 dark:text-slate-500"
            >
              <ChevronRight size={14} />
            </motion.div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover/role:text-blue-600 transition-colors">
              {role.title}
            </h4>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 uppercase bg-slate-50 dark:bg-[#111827] px-2 py-0.5 rounded tracking-tighter whitespace-nowrap">
            {role.duration}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-1.5 mt-1.5 ml-6">
              {role.description.map((desc: string, i: number) => (
                <li
                  key={i}
                  className="text-slate-600 dark:text-slate-400 text-[13px] leading-relaxed flex gap-2"
                >
                  <span className="text-blue-500 font-mono text-xs mt-[3px] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: ExperienceEntry;
  index: number;
}) => {
  return (
    <div className="relative pl-6 pb-6 last:pb-0">
      {/* Vertical Rail */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />
      {/* Dots on vertical rail */}
      <div className="absolute left-[-5px] top-6 w-[10px] h-[10px] rounded-full bg-blue-600 shadow-md shadow-blue-300 dark:shadow-blue-900/60" />

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.06, duration: 0.35 }}
        className="bg-white dark:bg-[#161616] border border-blue-500/60 rounded-2xl px-5 py-4 lg:px-6 lg:py-5 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-3">
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest bg-blue-50 dark:bg-blue-600/10 px-2 py-0.5 rounded">
                {exp.category}
              </span>
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-blue-600 transition-colors"
              >
                <ExternalLink size={10} />
                <span className="hidden sm:inline">Project Link</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              {companyIcons[exp.company] ? (
                <img
                  src={companyIcons[exp.company]}
                  alt="logo"
                  className="w-6 h-6 rounded object-contain shrink-0"
                />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-blue-600/10 dark:bg-blue-400/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">
                  <Building2 size={16} />
                </div>
              )}
              <h3 className="text-lg lg:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tighter truncate">
                {exp.company}
              </h3>
            </div>

            {exp.advisor && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                <UserCheck size={13} className="text-blue-500 shrink-0" />
                <span>
                  Advisor: <strong className="text-slate-700 dark:text-slate-200">{exp.advisor}</strong>
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
              <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">
                {exp.roles.length} {exp.roles.length === 1 ? "Role" : "Roles"}
              </span>
              <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                <MapPin size={12} />
                <span className="text-[11px] font-medium">{exp.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center lg:flex-col lg:items-end gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-[#111827] rounded-md border border-slate-100 dark:border-white/10">
              <Calendar size={12} className="text-blue-600" />
              <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter whitespace-nowrap">
                {exp.totalDuration}
              </span>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 space-y-5">
          {exp.roles.map((role, idx) => (
            <RoleItem
              key={role.id}
              role={role}
              idx={idx}
              totalRoles={exp.roles.length}
            />
          ))}

          {/* Direct Resource / Links Pills */}
          {exp.links && exp.links.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {exp.links.map((lnk) => (
                <a
                  key={lnk.label}
                  href={lnk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/40 transition-all shadow-sm hover:scale-[1.02]"
                >
                  {lnk.type === 'github' && <Github size={13} />}
                  {lnk.type === 'report' && <FileText size={13} className="text-red-500" />}
                  {lnk.type === 'pypi' && <Package size={13} className="text-blue-500" />}
                  {lnk.type === 'website' && <Globe size={13} />}
                  <span>{lnk.label}</span>
                  <ExternalLink size={11} className="opacity-70" />
                </a>
              ))}
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {exp.techStack.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function WorkExperienceSection() {
  return (
    <div className="py-12 bg-white dark:bg-black font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* ═══════════════ SECTION 1: WORK & RESEARCH EXPERIENCE ═══════════════ */}
        <div className="relative mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full text-left">
            <div className="relative z-10">
              {/* <div className="flex items-center gap-2 mb-2">
                <Briefcase size={20} className="text-blue-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Research &amp; Corporate Experience
                </span>
              </div> */}
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                Work &amp; Research Experience
              </h2>
              <div className="h-1 bg-blue-600 mt-4 rounded-full w-16" />
            </div>
          </div>
        </div>

        {/* Work & Research Cards */}
        <div className="relative">
          {workExperiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PORSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const firstPOR = positionsOfResponsibility[0];
  const remainingPORs = positionsOfResponsibility.slice(1);

  return (
    <div className="py-12 bg-white dark:bg-black font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* ═══════════════ SECTION 2: POSITIONS OF RESPONSIBILITY ═══════════════ */}
        <div className="relative mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full text-left">
            <div className="relative z-10">
              {/* <div className="flex items-center gap-2 mb-2">
                <Sparkles size={18} className="text-indigo-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">
                  Technical Leadership &amp; Mentorship
                </span>
              </div> */}
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
                Positions of Responsibility
              </h2>

              <div
                className={`h-1 bg-blue-600 mt-4 rounded-full transition-all duration-500 ${isExpanded ? "w-24" : "w-12"
                  }`}
              />
            </div>
          </div>
        </div>

        {/* --- POSITIONS OF RESPONSIBILITY CONTENT AREA --- */}
        <div className="relative mb-6">
          {/* Always display 1st primary position of responsibility */}
          {firstPOR && (
            <ExperienceCard exp={firstPOR} index={0} />
          )}

          {/* Collapsible area for remaining positions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="overflow-hidden"
              >
                {remainingPORs.map((exp, index) => (
                  <ExperienceCard key={exp.id} exp={exp} index={index + 1} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- SHOW MORE / SHOW LESS BUTTON --- */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-slate-50 dark:bg-[#161616] hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm rounded-xl border border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            <span>
              {isExpanded
                ? "Show Less Positions"
                : `Show More Positions (${remainingPORs.length} more)`}
            </span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isExpanded
                ? "rotate-180 text-blue-600"
                : "text-slate-400 group-hover:text-blue-600"
                }`}
            />
          </button>
        </div>

        {/* --- RECRUITER FOOTNOTE (Remains Visible) --- */}
        <motion.div
          layout
          className="mt-8 px-6 py-6 lg:px-8 lg:py-7 bg-slate-900 dark:bg-[#161616] border border-slate-800 dark:border-white/10 text-slate-100 relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-500/60 transition-all duration-300"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  Available for Full-time Roles from May 2027
                </span>
              </div>
              <h4 className="text-xl lg:text-2xl text-white font-black tracking-tight mb-1.5">
                Get Full Technical Dossier
              </h4>
              <p className="text-slate-400 text-[13px] max-w-xl font-medium leading-relaxed">
                Research publications, quantified project ROI, security audits,
                architecture decision logs, and open-source references—for{" "}
                <b className="text-slate-200">
                  R&D teams, hiring panels, and founders
                </b>
                .
              </p>
            </div>

            <a
              href="/Arpit_Kumar_Resume.pdf"
              download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
              onClick={() => trackResumeDownload("hero_primary_cta")}
              aria-label="Download resume PDF immediately"
              className="group relative px-6 py-3.5 bg-blue-600 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2.5 hover:bg-blue-700 transition-all hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <FileText
                size={18}
                className="relative group-hover:rotate-12 transition-transform"
              />
              <span className="relative">Download Resume</span>
              <ArrowRight
                size={18}
                className="relative group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <>
      <WorkExperienceSection />
      <PORSection />
    </>
  );
}

