import React, { useMemo } from "react";
import { motion } from "framer-motion";
import myphoto from "../data/img/me/my_photo2.png";
import SEOHead from "../components/SEOHead";
import {
  Activity,
  Download,
  Mail,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  Trophy,
  Microscope,
  Github,
  Linkedin,
  Layers,
  Zap,
  ArrowRight,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import AniText from "../components/AniText";
import { useAboutData } from "../hooks/useAboutData";
import { useProjects } from "../context/ProjectsContext";
import { techData } from "../data/skillsData";
import type { Milestone as MilestoneType, Stat } from "../data/aboutData";
import type { Project } from "../data/projectsData";

const FEATURED_PROJECT_IDS = [5, 8, 9];

// ===== Icon Resolver =====
const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Briefcase,
  Trophy,
  Microscope,
  Github,
  Linkedin,
  Activity,
  Zap,
  Layers,
  TrendingUp,
};
const resolveIcon = (name: string): React.ElementType => iconMap[name] || Zap;

// ===== Color Maps =====
const statColors: Record<string, string> = {
  default: "text-slate-900 dark:text-slate-100",
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  green: "text-emerald-600 dark:text-emerald-400",
};

// ===== Skeleton =====
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg ${className}`}
  />
);

// ===== Stat Card =====
const StatCard = ({ stat, index }: { stat: Stat; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, duration: 0.4 }}
    className="p-4 bg-white dark:bg-[#111] rounded-xl border border-slate-100 dark:border-white/8 text-center"
  >
    <p
      className={`text-2xl font-black tracking-tight ${statColors[stat.color] || statColors.default}`}
    >
      {stat.value}
    </p>
    <p className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase mt-0.5">
      {stat.label}
    </p>
  </motion.div>
);

// ===== Milestone =====
const MilestoneCard = ({
  milestone,
  index,
}: {
  milestone: MilestoneType;
  index: number;
}) => {
  const Icon = resolveIcon(milestone.icon);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.08 * index, duration: 0.4 }}
      className="flex gap-4 p-4 rounded-xl border border-slate-100 dark:border-white/8 bg-white dark:bg-[#111] hover:border-slate-200 dark:hover:border-white/15 transition-colors"
    >
      <div className="mt-0.5 shrink-0">
        <div className="relative p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400">
          <Icon size={18} />
          {milestone.date.includes("Present") && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#111]" />
          )}
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Calendar size={11} className="text-slate-400" />
          <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
            {milestone.date}
          </span>
        </div>
        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug">
          {milestone.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
          {milestone.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

// ===== Selected Work Row (from real project data) =====
const WorkRow = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.06 * index, duration: 0.35 }}
  >
    <Link
      to={`/projects/${project.id}`}
      className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/8 bg-white dark:bg-[#111] hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5 mb-1.5">
          <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h4>
          <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400">
            {project.type}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(project.tags ?? []).slice(0, 5).map((tag, i, arr) => (
            <span
              key={i}
              className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500"
            >
              {tag}
              {i < arr.length - 1 ? " ·" : ""}
            </span>
          ))}
        </div>
      </div>
      <ArrowRight
        size={16}
        className="shrink-0 ml-3 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all"
      />
    </Link>
  </motion.div>
);

// ===== Section Label =====
const SectionLabel = ({ title }: { title: string }) => (
  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-5">
    {title}
  </h3>
);

// ====================================================================
// ===== MAIN COMPONENT ===============================================
// ====================================================================
const AboutMe: React.FC = () => {
  const { data, loading } = useAboutData();
  const { projects } = useProjects();

  // Filter featured projects by specific IDs
  const featuredProjects = useMemo(() => {
    return FEATURED_PROJECT_IDS.map((id) =>
      projects.find((p) => p.id === id),
    ).filter((p): p is Project => p !== undefined);
  }, [projects]);

  const getSocialIcon = (iconName: string) => {
    const Icon = resolveIcon(iconName);
    return <Icon size={16} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black px-4 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-4">
            <Skeleton className="h-[400px] rounded-2xl" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans antialiased text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-500/20">
      <SEOHead
        title="About Me"
        description="Learn about Arpit Kumar — Applied AI & ML Researcher at IIT Kharagpur. Codeforces Expert, Top 0.5% Amazon ML Challenge, building production-grade ML systems."
        canonicalPath="/aboutme"
        ogType="profile"
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ========== LEFT SIDEBAR ========== */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Photo */}
              <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#111] aspect-[4/5] relative">
                <img
                  src={myphoto}
                  alt={`${data.personal.name} — ${data.education.institution}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* Bottom info bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-4 px-5">
                  <h3 className="text-lg font-bold text-white">
                    {data.personal.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    {data.personal.tagline}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-medium text-emerald-300">
                      {data.personal.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                {(data.stats ?? []).map((stat, i) => (
                  <StatCard key={i} stat={stat} index={i} />
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-2.5 mt-5">
                {(data.personal?.socialLinks ?? []).map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 dark:bg-[#111] rounded-lg border border-slate-100 dark:border-white/8 hover:border-slate-200 dark:hover:border-white/15 transition-colors text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    {getSocialIcon(link.icon)}
                    {link.platform}
                  </a>
                ))}
              </div>

              {/* Education */}
              <div className="p-5 bg-slate-900 dark:bg-[#0a0a0a] rounded-2xl text-white mt-5">
                <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-4">
                  <ShieldCheck size={14} /> Education
                </h4>
                <dl className="space-y-3">
                  {[
                    { dt: "Institution", dd: data.education.institution },
                    { dt: "Degree", dd: data.education.degree },
                    { dt: "Specialization", dd: data.education.specialization },
                    { dt: "Graduation", dd: data.education.graduation },
                  ].map((item, i) => (
                    <div key={i}>
                      <dt className="text-[10px] font-mono text-slate-500 uppercase">
                        {item.dt}
                      </dt>
                      <dd className="text-sm font-semibold">{item.dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>

          {/* ========== RIGHT MAIN ========== */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {/* Header */}
              <header className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-[1.1]">
                  {data.personal.name}
                </h1>
                <div className="text-lg md:text-xl font-mono text-blue-600 dark:text-blue-400 font-semibold mt-2">
                  &gt;{" "}
                  <AniText
                    texts={data.personal.animatedRoles}
                    typingSpeed={50}
                    pauseTime={2500}
                  />
                </div>
              </header>

              {/* Bio */}
              <div className="space-y-5 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {data.bio.greeting}
                </p>
                {(data.bio?.paragraphs ?? []).map((para, i) => (
                  <p key={i}>
                    {para.label && (
                      <strong className="text-slate-800 dark:text-slate-200">
                        {para.label}:{" "}
                      </strong>
                    )}
                    {para.text}
                  </p>
                ))}
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-start gap-2 pt-2">
                  <TrendingUp size={16} className="mt-0.5 shrink-0" />
                  {data.bio.callToAction}
                </p>
              </div>

              {/* Divider */}
              <hr className="my-14 border-slate-100 dark:border-white/8" />

              {/* Milestones */}
              <div>
                <SectionLabel title="Career Milestones" />
                <div className="space-y-3">
                  {(data.milestones ?? []).map((m, i) => (
                    <MilestoneCard key={i} milestone={m} index={i} />
                  ))}
                </div>
              </div>

              <hr className="my-14 border-slate-100 dark:border-white/8" />

              {/* Selected Work — from database */}
              {featuredProjects.length > 0 && (
                <div>
                  <SectionLabel title="Selected Work" />
                  <div className="space-y-2.5">
                    {featuredProjects.map((project, i) => (
                      <WorkRow key={project.id} project={project} index={i} />
                    ))}
                  </div>
                  <Link
                    to="/projects"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all"
                  >
                    View all projects <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              <hr className="my-14 border-slate-100 dark:border-white/8" />

              {/* Tech Stack — from skillsData */}
              <div>
                <SectionLabel title="Tech Stack" />
                <div className="space-y-4">
                  {techData.map((skill) => (
                    <div key={skill.title}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-600 dark:text-blue-400">
                          {skill.icon}
                        </span>
                        <p className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {skill.title}
                        </p>
                        <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 ml-auto">
                          {skill.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.tools.map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 dark:bg-[#111] border border-slate-100 dark:border-white/8 text-xs font-semibold text-slate-700 dark:text-slate-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 bg-slate-900 dark:bg-[#0a0a0a] rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                  <Briefcase size={160} />
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.2em]">
                    Let's Work Together
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-black tracking-tight mt-1.5 mb-3">
                    {data.cta.heading}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-lg mb-8">
                    {data.cta.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={data.cta.cvLink}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-500 transition-colors"
                    >
                      <Download size={16} />
                      Get CV
                    </Link>
                    <a
                      href={data.cta.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/15 transition-colors"
                    >
                      <Mail size={16} />
                      Schedule Meeting
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
