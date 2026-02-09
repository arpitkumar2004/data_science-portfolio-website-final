import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  ChevronDown,
  Terminal,
  ExternalLink,
  History,
  Layers,
  MapPin,
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
          "Architecting scalable cloud-native systems (Kubernetes, Docker, microservices) for 10,000+ concurrent users—reduced infrastructure costs by 30% via auto-scaling policies and optimized resource allocation.",
          "Mentoring 30+ developers with structured code reviews, architectural decision records, and weekly technical workshops—shipped 8 production features in Q1 2026 with zero critical bugs.",
          "Designed and deployed CI/CD pipelines (GitHub Actions, ArgoCD) with comprehensive testing (unit, integration, e2e)—reduced release cycle from 2 weeks to 48 hours with true zero-downtime deployments.",
        ],
      },
      {
        id: 101,
        title: "Development Head | Full Stack Systems",
        duration: "Oct 2024 - Sep 2025",
        description: [
          "Built and scaled full-stack platforms (React/Node.js/PostgreSQL/Redis) handling 50,000+ concurrent users during peak registrations—maintained 99.9% SLA with load testing and capacity planning; optimized queries cutting p95 latency by 35%.",
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
    totalDuration: "Feb 2022 - Jan 2024",
    roles: [
      {
        id: 201,
        title: "Executive Member | Quantitative Policy Research",
        duration: "Feb 2023 - Jan 2024",
        description: [
          "Led quantitative research on digital governance frameworks—synthesized datasets from 15+ government sources (Census, RTI, bureaucratic reports) into statistical models; conducted regression analysis and causal inference studies with 95% confidence.",
          "Authored 4 peer-reviewed white papers on AI-policy intersections published in institutional journals—findings cited in 8+ campus events; influenced curriculum review committee decision to add AI-ethics module.",
          "Directed policy symposium reaching 500+ participants; coordinated speakers from Ministry of Electronics, NITI Aayog, and academia—established PPGS as institutional thought leader; ranked #3 society by engagement metrics.",
        ],
      },
      {
        id: 202,
        title: "Associate Member | Research Analytics",
        duration: "Feb 2022 - Jan 2023",
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
    totalDuration: "Jan 2023 - Jan 2024",
    roles: [
      {
        id: 301,
        title: "Web Development Specialist",
        duration: "Jan 2023 - Jan 2024",
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
    totalDuration: "Feb 2023 - Feb 2024",
    roles: [
      {
        id: 401,
        title: "Associate Member | Corporate Relations",
        duration: "Feb 2023 - Feb 2024",
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

const ExperienceCard = ({ exp, index }: { exp: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const brandBlue = "rgb(37 99 235)";

  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Vertical Rail */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-100" />
      {/* Dots on vertical rail */}
      <div className="absolute left-[-6px] top-20 w-3 h-3 rounded-full bg-blue-600 shadow-lg shadow-blue-200" />

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group cursor-pointer bg-white border rounded-3xl p-6 lg:p-8 transition-all duration-500 ${
          isExpanded
            ? "border-blue-600 shadow-2xl shadow-blue-900/5"
            : "border-slate-100 hover:border-blue-300 shadow-sm"
        }`}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                {exp.category}
              </span>
              <ExternalLink
                size={12}
                className="text-slate-300 group-hover:text-blue-600 transition-colors"
              />
              <a
                href={exp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors"
              >
                Visit Website
              </a>
            </div>
            <div className="flex flex-center gap-4">
              {/* icon of company */}
              <img
                src={companyIcons[exp.company]}
                alt="logo"
                className={`w-6 h-6 rounded object-contain transition-all mt-1 ${isExpanded ? "scale-110" : "grayscale"}`}
              />
              {/* name of company */}
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
                {exp.company}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
              <span className="text-sm font-bold text-slate-700">
                {exp.roles[0].title}
              </span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin size={14} />
                <span className="text-xs font-medium">{exp.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
              <Calendar size={14} className="text-blue-600" />
              <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-tighter">
                {exp.totalDuration}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              className="mt-6 text-slate-300 hidden lg:block"
            >
              <ChevronRight size={24} />
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
              className="overflow-hidden"
            >
              <div className="mt-10 pt-8 border-t border-slate-100 space-y-12">
                {exp.roles.map((role: any, idx: number) => (
                  <div key={role.id} className="relative pl-8">
                    {/* Role Connector */}
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600 shadow-lg shadow-blue-200" />
                    {idx < exp.roles.length - 1 && (
                      <div className="absolute left-[3px] top-4 bottom-[-48px] w-[2px] bg-slate-100" />
                    )}

                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
                      <h4 className="font-bold text-slate-900 text-base">
                        {role.title}
                      </h4>
                      <span className="text-[10px] font-mono font-black text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded tracking-tighter">
                        {role.duration}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {role.description.map((desc: string, i: number) => (
                        <li
                          key={i}
                          className="text-slate-600 text-sm leading-relaxed flex gap-3"
                        >
                          <span className="text-blue-600 font-mono mt-0.5">
                            0{i + 1}.
                          </span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {exp.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-50 text-slate-500 border border-slate-200 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider"
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
    <div className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- INTERACTIVE HEADER SECTION --- */}
        <div className="relative mb-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex flex-col md:flex-row md:items-end justify-between w-full text-left transition-all"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`p-1.5 rounded-md transition-colors ${isExpanded ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"}`}
                >
                  <History size={14} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
                  {isExpanded ? "Dossier Unlocked" : "Technical Dossier"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
                  Scaling Systems & Teams
                </h2>
              </div>
              <p className="text-slate-600 text-sm md:text-base font-medium max-w-4xl mt-8 leading-relaxed">
                Full-stack trajectory spanning technical leadership, ML systems architecture, and policy research—showcasing measurable impact across 4 organizations with 50K+ concurrent users, 99.9% SLA maintenance, and proven ability to scale teams and systems.
              </p>

              <div
                className={`h-1.5 bg-blue-600 mt-6 rounded-full transition-all duration-500 ${isExpanded ? "w-32" : "w-16"}`}
              />
            </div>

            {/* Visual Call-to-Action */}
            <div className="mt-8 md:mt-0 flex items-center gap-4">
              {!isExpanded && (
                <span className="hidden md:block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                  Click to Expand Sequence
                </span>
              )}
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-2xl border-2 transition-all duration-300 ${isExpanded ? "bg-blue-600 border-blue-600 text-white rotate-180" : "bg-white border-slate-200 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-500"}`}
              >
                <ChevronDown size={28} strokeWidth={3} />
              </div>
            </div>
          </button>
        </div>

        {/* --- COLLAPSIBLE CONTENT AREA --- */}
        <div className="relative mb-16 max-w-6xl mx-auto">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                {/* Timeline Line Decor */}
                {/* <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600 via-slate-100 to-transparent" /> */}

                {/* Experience Cards */}
                {experiences.map((exp, index) => (
                  <ExperienceCard key={exp.id} exp={exp} index={index} />
                ))}

                {/* Close Trigger at the bottom for better UX */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full py-4 border-t border-slate-100 text-[10px] font-mono font-bold text-slate-400 hover:text-blue-600 uppercase tracking-[0.4em] transition-colors"
                >
                  Collapse Timeline ^
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background Placeholder when closed */}
          {!isExpanded && (
            <div className="h-1 w-full bg-slate-50 rounded-full" />
          )}
        </div>

        {/* --- RECRUITER FOOTNOTE (Remains Visible) --- */}
        <motion.div
          layout
          className="mt-12 p-8 lg:p-12 bg-slate-900 border border-slate-800 text-slate-100 relative overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-500"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-widest">
                  Available for Summer 2026
                </span>
              </div>
              <h4 className="text-3xl text-white font-black tracking-tighter mb-3">
                Get Full Technical Dossier
              </h4>
              <p className="text-slate-300 text-sm max-w-md font-medium leading-relaxed">
                Includes: research publications, quantified ROI of Projects(cost, latency, revenue), security audit outcomes, architecture decision logs, and open-source references—optimized for <b className="text-white">R&D teams, hiring panels, founders, and academic collaborators</b>.
              </p>
            </div>

            <a
              href="/request-cv"
              className="group px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3 shadow-lg shadow-blue-600/40 hover:shadow-xl hover:shadow-blue-600/60"
            >
              <Terminal
                size={18}
                className="group-hover:translate-y-0.5 transition-transform"
              />
              <span>Get the Dossier →</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
