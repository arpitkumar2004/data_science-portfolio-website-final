import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  History,
  MapPin,
  Download,
} from "lucide-react";

// Logos (Assumed paths from your previous code)
import cheaLogo from "../data/img/chea_logo.png";
import devsocLogo from "../data/img/devsoc_logo.jpg";
import ppgsLogo from "../data/img/ppgs_logo.png";
import sbrcLogo from "../data/img/sbrc_logo.jpg";

const companyIcons: Record<string, string> = {
  "Developers' Society, IIT-Kharagpur": devsocLogo,
  "Public Policy and Governance Society, IIT-Kharagpur": ppgsLogo,
  "Chemical Engineering Association, IIT-Kharagpur": cheaLogo,
  "Students' Branding and Relations Cell, IIT Kharagpur": sbrcLogo,
};

const experiences = [
  {
    id: 1,
    company: "Developers' Society, IIT-Kharagpur",
    link: "https://devsoc.in",
    location: "IIT Kharagpur",
    category: "Technical Leadership",
    totalDuration: "Sep 2023 - Present",
    roles: [
      {
        id: 100,
        title: "Advisor | Web & Software Architecture",
        duration: "Sep 2025 - Present",
        description: [
          "Architected containerized microservices (Docker, Docker Compose) serving high-traffic applications—reduced infrastructure costs by 30% via optimized resource allocation, implemented health checks, graceful shutdown, and rolling deploys with load balancer (Nginx) achieving high availability with zero critical production bugs.",
          "Mentoring 30+ developers with structured code reviews, architectural decision records, and weekly technical workshops—shipped 8 production features in Q1 2026 with zero critical bugs.",
          "Designed and deployed CI/CD pipelines (GitHub Actions, ArgoCD) with comprehensive testing (unit, integration, e2e)—dramatically reduced release cycles enabling daily deployments with zero-downtime rollout strategies.",
        ],
      },
      {
        id: 101,
        title: "Development Head | Full Stack Systems",
        duration: "Oct 2024 - Sep 2025",
        description: [
          "Built and scaled full-stack platforms (React/Node.js/PostgreSQL/Redis) handling thousands of concurrent users during peak registrations—designed for high availability with load testing and capacity planning; optimized queries cutting p95 latency by 35%.",
          "Led cross-functional squads (backend, frontend, QA) shipping 12+ production features per quarter—established 2-week sprint cycles with clear OKRs; improved on-time delivery rate to 92% with predictable velocity.",
          "Implemented automated testing pyramid (unit, integration, e2e) with 78% code coverage—reduced deployment errors by 40% and enabled safe daily releases; introduced post-mortem process for incident learning.",
        ],
      },
      {
        id: 102,
        title: "Development Member | Backend Systems",
        duration: "Sep 2023 - Oct 2024",
        description: [
          "Refactored monolithic services into microservices with optimized PostgreSQL queries and Redis caching—reduced API p99 latency from 800ms to 150ms; improved throughput by 3.5x for 5,000+ daily active users.",
          "Designed RESTful APIs with OAuth2/JWT authentication, input validation, and rate limiting—achieved GDPR compliance; conducted security audits identifying and fixing 5 vulnerabilities before production.",
          "Owned feature delivery end-to-end across 8 sprints—wrote automated tests for all critical paths; maintained zero production incidents; mentored 2 junior developers on best practices.",
        ],
      },
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: 2,
    company: "Public Policy and Governance Society, IIT-Kharagpur",
    link: "https://ppgsiitkgp.in",
    location: "IIT Kharagpur",
    category: "Policy Research",
    totalDuration: "May 2023 - Sep 2024",
    roles: [
      {
        id: 201,
        title: "Executive Member | Quantitative Policy Research",
        duration: "Sep 2023 - Sep 2024",
        description: [
          "Led quantitative research on digital governance frameworks—synthesized datasets from 15+ government sources (Census, RTI, bureaucratic reports) into statistical models; conducted regression analysis and causal inference studies with 95% confidence.",
          "Authored 4 peer-reviewed white papers on AI-policy intersections published in institutional journals—findings cited in 8+ campus events; influenced curriculum review committee decision to add AI-ethics module.",
          "Directed policy symposium reaching 500+ participants; coordinated speakers from Ministry of Electronics, NITI Aayog, and academia—established PPGS as institutional thought leader; ranked #3 society by engagement metrics.",
        ],
      },
      {
        id: 202,
        title: "Associate Member | Research Analytics",
        duration: "May 2023 - Sep 2023",
        description: [
          "Gathered and cleaned policy datasets using Python (pandas, NumPy)—handled 50K+ records; implemented data validation pipelines reducing errors by 70%; documented data provenance for research reproducibility.",
          "Co-authored 2 research articles for the quarterly journal on AI governance and public sector automation—articles reached 400+ readers; selected as featured pieces on society website.",
          "Coordinated speaker logistics and stakeholder engagement for 6 policy roundtables—secured speakers from government ministries; managed post-event surveys capturing 85% satisfaction rates from 200+ participants.",
        ],
      },
    ],
    techStack: [
      "Data Analysis",
      "Python",
      "Policy Modeling",
      "Economic Research",
    ],
  },
  {
    id: 3,
    company: "Chemical Engineering Association, IIT-Kharagpur",
    link: "https://che.iitkgp.ac.in/",
    location: "IIT Kharagpur",
    category: "Digital Transformation",
    totalDuration: "Aug 2023 - Sep 2024",
    roles: [
      {
        id: 301,
        title: "Web Development Specialist",
        duration: "Aug 2023 - Sep 2024",
        description: [
          "Rebuilt FUGACITY fest portal with mobile-first design (React, Tailwind CSS)—increased mobile traffic from 30% to 80%; improved Core Web Vitals (LCP from 3.2s to 1.1s); boosted conversion rate by 50% through UX optimizations.",
          "Built automated registration and payment system handling 2,000+ concurrent registrations—integrated Razorpay for payments; reduced manual data entry time from 40 hours to <2 hours per event; achieved 99.8% data accuracy.",
          "Designed and deployed Chemical Engineering Association website with SEO optimization—ranked #1 for departmental searches; achieved 4.8/5 accessibility score (WCAG AA); 12K+ annual visitors.",
        ],
      },
    ],
    techStack: ["Frontend Engineering", "UI/UX", "Database Automation"],
  },
  {
    id: 4,
    company: "Students' Branding and Relations Cell, IIT Kharagpur",
    link: "https://sbrc.iitkgp.ac.in",
    location: "IIT Kharagpur",
    category: "Strategic Outreach",
    totalDuration: "Feb 2023 - Sep 2023",
    roles: [
      {
        id: 401,
        title: "Associate Member | Corporate Relations",
        duration: "Feb 2023 - Sep 2023",
        description: [
          "Coordinated institutional branding campaigns across social media (LinkedIn, Instagram, Twitter)—increased follower base by 40% (5K→7K); achieved 18% engagement rate vs. 8% institutional average.",
          "Executed alumni outreach program connecting 150+ alumni with current students—facilitated 12 mentorship sessions; secured 3 corporate partnerships for internships and research collaborations.",
          "Authored technical briefs and marketing collateral for 4 major institutional events—written content featured on institutional newsletter reaching 10K+ subscribers; improved event registration by 25% YoY.",
        ],
      },
    ],
    techStack: ["Public Relations", "Brand Strategy", "Technical Writing"],
  },
];

const ExperienceCard = ({ exp, index, defaultOpen = false }: { exp: any; index: number; defaultOpen?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  return (
    <div className="relative pl-6 pb-6 last:pb-0">
      {/* Vertical Rail */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />
      {/* Dots on vertical rail */}
      <div
        className={`absolute left-[-5px] top-6 w-[10px] h-[10px] rounded-full transition-colors duration-300 ${
          isExpanded
            ? "bg-blue-600 shadow-md shadow-blue-300 dark:shadow-blue-900/60"
            : "bg-slate-300 dark:bg-slate-600"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.06, duration: 0.35 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group cursor-pointer bg-white dark:bg-[#161616] border rounded-2xl px-5 py-4 lg:px-6 lg:py-5 transition-all duration-300 ${
          isExpanded
            ? "border-blue-500/60 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20"
            : "border-slate-100 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/40 shadow-sm hover:shadow-md"
        }`}
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
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-blue-600 transition-colors"
              >
                <ExternalLink size={10} />
                <span className="hidden sm:inline">Website</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={companyIcons[exp.company]}
                alt="logo"
                className={`w-6 h-6 rounded object-contain transition-all shrink-0 ${
                  isExpanded ? "" : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                }`}
              />
              <h3 className="text-lg lg:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-blue-600 transition-colors truncate">
                {exp.company}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
              <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">
                {exp.roles[0].title}
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
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-slate-300 dark:text-slate-500 hidden lg:block"
            >
              <ChevronRight size={20} />
            </motion.div>
          </div>
        </div>

        {/* Roles & Descriptions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 space-y-6">
                {exp.roles.map((role: any, idx: number) => (
                  <div key={role.id} className="relative pl-6">
                    {/* Role Connector */}
                    <div className="absolute left-0 top-[7px] w-[7px] h-[7px] rounded-full bg-blue-500" />
                    {idx < exp.roles.length - 1 && (
                      <div className="absolute left-[2.5px] top-4 bottom-[-24px] w-[2px] bg-slate-100 dark:bg-white/10" />
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start gap-1 mb-2">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {role.title}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 uppercase bg-slate-50 dark:bg-[#111827] px-2 py-0.5 rounded tracking-tighter whitespace-nowrap">
                        {role.duration}
                      </span>
                    </div>

                    <ul className="space-y-1.5">
                      {role.description.map((desc: string, i: number) => (
                        <li
                          key={i}
                          className="text-slate-600 dark:text-slate-400 text-[13px] leading-relaxed flex gap-2"
                        >
                          <span className="text-blue-500 font-mono text-xs mt-[3px] shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

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
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-16 bg-white dark:bg-black font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- INTERACTIVE HEADER SECTION --- */}
        <div className="relative mb-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex flex-col md:flex-row md:items-end justify-between w-full text-left transition-all"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`p-1 rounded-md transition-colors duration-300 ${isExpanded ? "bg-blue-600 text-white" : "bg-blue-50 dark:bg-blue-600/10 text-blue-600"}`}
                >
                  <History size={14} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
                  {isExpanded ? "Dossier Unlocked" : "Technical Dossier"}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter group-hover:text-blue-600 transition-colors">
                Experience in Scaling Systems
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-3xl mt-3 leading-relaxed">
                Full-stack trajectory spanning technical leadership, ML systems architecture, and policy research—measurable impact across 4 organizations with production systems, zero critical bugs, and proven ability to scale teams.
              </p>

              <div
                className={`h-1 bg-blue-600 mt-4 rounded-full transition-all duration-500 ${isExpanded ? "w-24" : "w-12"}`}
              />
            </div>

            {/* Visual Call-to-Action */}
            <div className="mt-6 md:mt-0 flex items-center gap-3">
              {!isExpanded && (
                <span className="hidden md:block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest animate-pulse">
                  Expand
                </span>
              )}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-all duration-300 ${isExpanded ? "bg-blue-600 border-blue-600 text-white rotate-180" : "bg-white dark:bg-[#161616] border-slate-200 dark:border-white/10 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-500"}`}
              >
                <ChevronDown size={20} strokeWidth={3} />
              </div>
            </div>
          </button>
        </div>

        {/* --- COLLAPSIBLE CONTENT AREA --- */}
        <div className="relative mb-10">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="overflow-hidden"
              >
                {/* Experience Cards */}
                {experiences.map((exp, index) => (
                  <ExperienceCard key={exp.id} exp={exp} index={index} defaultOpen={index === 0} />
                ))}

                {/* Close Trigger at the bottom */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full py-3 mt-2 border-t border-slate-100 dark:border-white/10 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 hover:text-blue-600 uppercase tracking-[0.3em] transition-colors"
                >
                  Collapse Timeline
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background Placeholder when closed */}
          {!isExpanded && (
            <div className="h-px w-full bg-slate-100 dark:bg-white/10" />
          )}
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
                  Available for Summer 2026
                </span>
              </div>
              <h4 className="text-xl lg:text-2xl text-white font-black tracking-tight mb-1.5">
                Get Full Technical Dossier
              </h4>
              <p className="text-slate-400 text-[13px] max-w-xl font-medium leading-relaxed">
                Research publications, quantified project ROI, security audits, architecture decision logs, and open-source references—for <b className="text-slate-200">R&D teams, hiring panels, and founders</b>.
              </p>
            </div>

            <a
              href="/request-cv"
              className="group px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/50 shrink-0"
            >
              <Download
                size={16}
                className="group-hover:translate-y-0.5 transition-transform"
              />
              <span>Get CV + Deep-Dives</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
