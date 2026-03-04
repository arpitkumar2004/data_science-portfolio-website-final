import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { trackResumeDownload, trackEvent } from "../utils/analytics";
import { getRecruiterProfile } from "../utils/recruiterProfile";
import { useProjects } from "../context/ProjectsContext";
import {
  heroData,
  highlights,
  skillGroups,
  relevantCoursework,
  getTopAchievements,
  getFeaturedProjects,
  experienceSummary,
  logistics,
} from "../data/openToWorkPageData";

const OpenToWorkPage: React.FC = () => {
  useEffect(() => {
    const role = localStorage.getItem("userRole") || "unknown";
    const profile = getRecruiterProfile();
    trackEvent("open_to_work_page_view", {
      role,
      company: profile?.company || "unknown",
      source: document.referrer || "direct",
    });
  }, []);

  const achievements = getTopAchievements();
  const { projects: allProjects } = useProjects();
  const projects = getFeaturedProjects(allProjects);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* ===== HEADER ===== */}
        <header className="mb-16">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Available from {heroData.availableFrom}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.15]">
            {heroData.name}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            {heroData.degree}, {heroData.institution} &middot; CGPA {heroData.cgpa}
          </p>

          <p className="text-base text-slate-500 dark:text-slate-400 mb-8 max-w-4xl leading-relaxed">
            {heroData.tagline}
          </p>

          {/* Contact row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={heroData.resumeUrl}
              download={heroData.resumeDownloadName}
              onClick={() => trackResumeDownload("open_to_work_page")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <Download size={16} />
              Resume
            </a>
            <a
              href={heroData.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Calendar size={16} />
              Schedule a call
            </a>
            <a href={`mailto:${heroData.email}`} className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Mail size={15} />
              {heroData.email}
            </a>
          </div>
        </header>

        <hr className="border-slate-200 dark:border-slate-800 mb-14" />

        {/* ===== AT A GLANCE ===== */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            At a glance
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-3 items-start py-1">
                <span className="text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap min-w-[120px]">
                  {h.metric}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {h.context}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== TECHNICAL SKILLS ===== */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Technical skills
          </h2>
          <div className="space-y-5">
            {skillGroups.map((group, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {group.area}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== COMPETITION HIGHLIGHTS ===== */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Competition highlights
          </h2>
          <div className="space-y-5 grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {achievements.map((a, i) => (
              <div key={i} className="border-l-2 border-slate-200 dark:border-slate-700 pl-5">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-base font-bold text-slate-900 dark:text-white">{a.title}</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{a.rank}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1.5">{a.detail}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">{a.tech}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{a.metric}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SELECTED PROJECTS ===== */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Selected projects
          </h2>
          <div className="space-y-8">
            {projects.map((p, i) => (
              <div key={i} className="group">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap mt-0.5">{p.category}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 leading-relaxed line-clamp-3">
                  {p.description}
                </p>
                {p.impact && (
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Result: {p.impact}
                  </p>
                )}
                <p className="text-xs font-mono text-slate-500 dark:text-slate-500 mb-2">
                  {p.technologies}
                </p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Github size={14} />
                    View on GitHub
                    <ExternalLink size={12} />
                  </a>
                )}
                {i < projects.length - 1 && (
                  <hr className="mt-6 border-slate-100 dark:border-slate-800" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              See all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Experience
          </h2>
          <div className="space-y-8">
            {experienceSummary.map((exp, i) => (
              <div key={i}>
                <div className="mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {exp.org} &middot; {exp.period}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <span className="text-slate-300 dark:text-slate-600 mt-1.5 shrink-0">&bull;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ===== EDUCATION & COURSEWORK ===== */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Education
          </h2>
          <div className="mb-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {heroData.institution}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {heroData.degree} &middot; CGPA {heroData.cgpa}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-0.5">
              Merit-cum-Means Scholarship recipient (top 5% of cohort)
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-0.5">
              SPARC-funded international AI research participant
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Relevant coursework
            </h4>
            <div className="flex flex-wrap gap-2">
              {relevantCoursework.map((course, i) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== AVAILABILITY & LOGISTICS ===== */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Availability & logistics
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Start date</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.availability}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Duration</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.duration}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Notice period</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.notice}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Location</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.location}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Relocation</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.relocation}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Work mode</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.remote}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Visa</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.visa}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Languages</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.languages}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Hours</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.hours}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 dark:text-slate-400">Full-time conversion</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">{logistics.conversion}</span>
            </div>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800 mb-14" />

        {/* ===== FOOTER CTA ===== */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Interested?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mb-8 max-w-xl">
            I am actively looking for Summer 2026 ML internship opportunities and happy to chat. 
            Feel free to reach out directly or schedule a short call.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href={heroData.resumeUrl}
              download={heroData.resumeDownloadName}
              onClick={() => trackResumeDownload("open_to_work_page_footer")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a
              href={heroData.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Calendar size={16} />
              Schedule a call
            </a>
            <a
              href={`mailto:${heroData.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Mail size={16} />
              Email me
            </a>
          </div>

          <div className="flex items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
            <a
              href={heroData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href={heroData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default OpenToWorkPage;
