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
  ExternalLink,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Terminal,
  Code,
  Cpu,
  MousePointerClick,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiFastapi,
  SiLangchain,
  SiDocker,
  SiMlflow,
  SiDvc,
  SiScikitlearn,
  SiCplusplus,
  SiSqlite,
} from "react-icons/si";
import AniText from "../components/AniText";
import { useAboutData } from "../hooks/useAboutData";
import { useProjects } from "../context/ProjectsContext";
import type { Milestone as MilestoneType, Stat } from "../data/aboutData";
import type { Project } from "../data/projectsData";
import { trackResumeDownload } from "../utils/analytics";

/* ─────────────────────── constants ─────────────────────── */

const FEATURED_PROJECT_IDS = [5, 8, 9];

type TechnologySkill = {
  name: string;
  icon?: IconType;
  iconClass: string;
  fallbackLabel?: string;
};

const KEY_TECHNOLOGIES: TechnologySkill[] = [
  { name: "Python", icon: SiPython, iconClass: "text-[#3776AB]" },
  { name: "PyTorch", icon: SiPytorch, iconClass: "text-[#EE4C2C]" },
  { name: "TensorFlow", icon: SiTensorflow, iconClass: "text-[#FF6F00]" },
  { name: "FastAPI", icon: SiFastapi, iconClass: "text-[#009688]" },
  {
    name: "LangChain",
    icon: SiLangchain,
    iconClass: "text-[#1C3C3C] dark:text-[#6FB3B3]",
  },
  { name: "Docker", icon: SiDocker, iconClass: "text-[#2496ED]" },
  { name: "MLflow", icon: SiMlflow, iconClass: "text-[#0194E2]" },
  { name: "DVC", icon: SiDvc, iconClass: "text-[#945DD6]" },
  { name: "Scikit-learn", icon: SiScikitlearn, iconClass: "text-[#F7931E]" },
  {
    name: "JAX",
    iconClass: "text-rose-600 dark:text-rose-300",
    fallbackLabel: "JX",
  },
  {
    name: "FAISS",
    iconClass: "text-indigo-600 dark:text-indigo-300",
    fallbackLabel: "FS",
  },
  { name: "C++", icon: SiCplusplus, iconClass: "text-[#00599C]" },
  {
    name: "SQL",
    icon: SiSqlite,
    iconClass: "text-[#003B57] dark:text-[#7AB8D6]",
  },
];

/* ─────────────────────── icon resolver ─────────────────────── */

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
const resolveIcon = (name: string): React.ElementType => iconMap[name] ?? Zap;

/* ─────────────────────── color map ─────────────────────── */

const statColors: Record<string, string> = {
  default: "text-slate-900 dark:text-slate-100",
  blue: "text-blue-600  dark:text-blue-400",
  green: "text-emerald-600 dark:text-emerald-400",
};

const projectCardThemes: Record<
  Project["category"],
  {
    badge: string;
    ring: string;
  }
> = {
  "data-science": {
    badge:
      "bg-blue-50 text-blue-700 border-blue-200 dark:border-blue-900/50 dark:bg-blue-500/10 dark:text-blue-300",
    ring: "hover:border-blue-300 dark:hover:border-blue-700/50",
  },
  "web-app": {
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:border-emerald-900/50 dark:bg-emerald-500/10 dark:text-emerald-300",
    ring: "hover:border-emerald-300 dark:hover:border-emerald-700/50",
  },
  "system-design": {
    badge:
      "bg-slate-100 text-slate-700 border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
    ring: "hover:border-slate-300 dark:hover:border-slate-600",
  },
  "chemical-research": {
    badge:
      "bg-amber-50 text-amber-700 border-amber-200 dark:border-amber-900/50 dark:bg-amber-500/10 dark:text-amber-300",
    ring: "hover:border-amber-300 dark:hover:border-amber-700/50",
  },
};

const getWorkHighlights = (project: Project) => {
  const source = project.keyImpactMetrics?.length
    ? project.keyImpactMetrics
    : project.results;
  return source.slice(0, 3);
};

/* ─────────────────────── sub-components ─────────────────────── */

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 ${className}`}
  />
);

const SectionLabel = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: React.ElementType;
}) => (
  // 'group' allows us to trigger effects on child elements when the parent is hovered
  <div className="group mb-10 flex cursor-default items-center gap-5">
    <div className="flex items-center gap-3">
      {/* 1. Icon with a subtle "Neural Glow" on hover */}
      {Icon && (
        <div className="relative flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-400/30" />
          <Icon
            size={28}
            className="relative z-10 text-slate-400 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400"
            aria-hidden="true"
          />
        </div>
      )}

      {/* 2. Text with Gradient Shift and Terminal Cursor */}
      <h3 className="flex items-center text-3xl font-black tracking-tight text-slate-800 transition-all duration-300 dark:text-slate-200">
        <span className="bg-gradient-to-r from-slate-800 to-slate-800 bg-clip-text transition-all duration-500 group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-transparent dark:from-slate-200 dark:to-slate-200 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-300">
          {title}
        </span>

        {/* Blinking Terminal Cursor */}
        <span className="ml-1 inline-block text-blue-600 opacity-0 transition-opacity duration-300 group-hover:animate-pulse group-hover:opacity-100 dark:text-cyan-400">
          _
        </span>
      </h3>
    </div>

    {/* 3. The "Data Flow" Trailing Line */}
    <div className="relative h-px flex-1 overflow-hidden bg-gradient-to-r from-slate-200 to-transparent dark:from-white/10">
      {/* Light pulse that shoots across the line on hover */}
      <div className="absolute inset-y-0 left-0 w-full -translate-x-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent transition-transform duration-[800ms] ease-in-out group-hover:translate-x-full dark:via-cyan-400/60" />
    </div>
  </div>
);

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, duration: 0.4 }}
    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#111]"
  >
    <div className="absolute -inset-x-2 -bottom-2 h-1/2 bg-gradient-to-t from-slate-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-white/5" />
    <p
      className={`relative z-10 text-3xl font-black tracking-tight ${statColors[stat.color] ?? statColors.default}`}
    >
      {stat.value}
    </p>
    <p className="relative z-10 mt-1 text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
      {stat.label}
    </p>
  </motion.div>
);

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
      className="group flex gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#111] dark:hover:border-white/20"
    >
      <div className="mt-0.5 shrink-0">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400 dark:group-hover:bg-slate-700">
          <Icon size={18} aria-hidden="true" />
          {milestone.date.includes("Present") && (
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-[#111]" />
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-1.5">
          <Calendar size={12} className="text-slate-400" aria-hidden="true" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {milestone.date}
          </span>
        </div>
        <h4 className="text-base font-bold leading-snug text-slate-900 dark:text-slate-100">
          {milestone.title}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {milestone.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

const TechnologyBadge = ({ tech }: { tech: TechnologySkill }) => {
  const Icon = tech.icon;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-2 shadow-sm transition-all duration-300 hover:border-blue-400 hover:shadow-md dark:border-white/10 dark:bg-[#111] dark:hover:border-blue-500">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10">
          {Icon ? (
            <Icon size={18} className={tech.iconClass} aria-hidden="true" />
          ) : (
            <span
              className={`text-[11px] font-black uppercase tracking-wide ${tech.iconClass}`}
              aria-hidden="true"
            >
              {tech.fallbackLabel}
            </span>
          )}
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold text-slate-700 opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:pr-2 group-hover:opacity-100 dark:text-slate-200">
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
};

const FeaturedWorkCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const highlights = getWorkHighlights(project);
  const theme = projectCardThemes[project.category];
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
      className={`group flex flex-col overflow-hidden rounded-[1rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-[#0a0a0a] dark:shadow-none ${theme.ring} ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* ── Content Section ── */}
      <div className="flex w-full flex-col justify-center p-6 sm:p-8 lg:p-10">
        <h4 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-xl [text-wrap:balance]">
          {project.title}
        </h4>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <span>{project.role}</span>
          {project.company && (
            <>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-blue-600 dark:text-blue-400">
                {project.company}
              </span>
            </>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.tldr ?? project.description}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {highlights.map((item, highlightIndex) => (
              <li
                key={`${project.id}-highlight-${highlightIndex}`}
                className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
              >
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-400"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to={`/projects/${project.id}`}
            className="group/btn inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-500 dark:hover:text-white"
          >
            Read Case Study
            <ArrowRight
              size={16}
              className="transition-transform group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <div className="flex gap-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Github size={18} aria-hidden="true" />
                Code
              </a>
            )}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <ExternalLink size={18} aria-hidden="true" />
                Live
              </a>
            )}
            {project.articleLink && (
              <a
                href={project.articleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <FileText size={18} aria-hidden="true" />
                Paper
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────── main component ─────────────────────── */

const AboutMe: React.FC = () => {
  const { data, loading } = useAboutData();
  const { projects } = useProjects();

  const featuredProjects = useMemo(
    () =>
      FEATURED_PROJECT_IDS.map((id) =>
        projects.find((p) => p.id === id),
      ).filter((p): p is Project => p !== undefined),
    [projects],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-4 py-24 dark:bg-black">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <Skeleton className="h-[400px] rounded-2xl" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
          <div className="space-y-4 lg:col-span-8">
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
    <div className="relative min-h-screen bg-white font-sans antialiased selection:bg-blue-100 dark:bg-black dark:text-slate-100 dark:selection:bg-blue-500/20">
      <SEOHead
        title="About Me"
        description="Learn about Arpit Kumar — ML Engineer & AI Researcher at IIT Kharagpur. Codeforces Expert, Top 0.5% Amazon ML Challenge (50K+ participants), GPA 8.86/10."
        canonicalPath="/aboutme"
        ogType="profile"
      />

      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-full overflow-hidden opacity-40 dark:opacity-20 lg:block"
        aria-hidden="true"
      >
        <div className="absolute -left-[10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute right-[5%] top-[20%] h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-[100px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          {/* ══════════ LEFT SIDEBAR ══════════ */}
          <div className="h-fit space-y-6 lg:col-span-4 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Photo Card */}
              <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-slate-200/50 dark:bg-[#111] dark:shadow-none">
                <img
                  src={myphoto}
                  alt={`${data.personal.name} — ${data.education.institution}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                  <h3 className="text-xl font-black tracking-tight text-white">
                    {data.personal.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {data.personal.tagline}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-bold text-white">
                      {data.personal.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-6 flex gap-3">
                {(data.personal?.socialLinks ?? []).map((link, i) => {
                  const Icon = resolveIcon(link.icon);
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.platform} profile (opens in new tab)`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:bg-[#111] dark:text-slate-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
                    >
                      <Icon size={18} aria-hidden="true" />
                      {link.platform}
                    </a>
                  );
                })}
              </div>

              {/* Education card */}
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#111]">
                <h4 className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  <ShieldCheck size={16} aria-hidden="true" />
                  Education
                </h4>
                <dl className="space-y-4">
                  {[
                    { dt: "Institution", dd: data.education.institution },
                    { dt: "Degree", dd: data.education.degree },
                    { dt: "Specialization", dd: data.education.specialization },
                    { dt: "Graduation", dd: data.education.graduation },
                  ].map((item) => (
                    <div key={item.dt}>
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {item.dt}
                      </dt>
                      <dd className="mt-0.5 text-sm font-bold text-slate-900 dark:text-slate-100">
                        {item.dd}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </div>

          {/* ══════════ RIGHT MAIN ══════════ */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {/* Header block */}
              <header className="mb-10 lg:mt-4">
                <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-slate-100 md:text-7xl">
                  {data.personal.name}
                </h1>
                <div className="mt-4 flex items-center gap-3 text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 md:text-2xl">
                  <Terminal size={24} className="opacity-50" />
                  <AniText
                    texts={data.personal.animatedRoles}
                    typingSpeed={50}
                    pauseTime={2500}
                  />
                </div>
              </header>

              {/* Bio block */}
              <div className="max-w-3xl space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 [text-wrap:balance]">
                  {data.bio.greeting}
                </p>
                {(data.bio?.paragraphs ?? []).map((para, i) => (
                  <p key={i}>
                    {para.label && (
                      <strong className="text-slate-900 dark:text-slate-100">
                        {para.label}:{" "}
                      </strong>
                    )}
                    {para.text}
                  </p>
                ))}
                <p className="flex items-start gap-2 pt-3 text-sm font-bold text-blue-600 dark:text-blue-400">
                  <TrendingUp
                    size={18}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  {data.bio.callToAction}
                </p>
              </div>

              {/* Stats */}
              {(data.stats ?? []).length > 0 && (
                <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {(data.stats ?? []).map((stat, i) => (
                    <StatCard key={i} stat={stat} index={i} />
                  ))}
                </div>
              )}

              <div className="py-16">
                <SectionLabel title="Career Milestones" icon={Briefcase} />
                <div className="space-y-4">
                  {(data.milestones ?? []).map((m, i) => (
                    <MilestoneCard key={i} milestone={m} index={i} />
                  ))}
                </div>
              </div>

              {/* ══════════ SELECTED WORK ══════════ */}
              {featuredProjects.length > 0 && (
                <section aria-labelledby="work-heading" className="pb-16">
                  <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                      <SectionLabel title="Selected Work" icon={Sparkles} />
                      <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 [text-wrap:balance]">
                        A few projects where the outcome, stack, and execution
                        all matter.
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-12 sm:gap-16">
                    {featuredProjects.map((p, i) => (
                      <FeaturedWorkCard key={p.id} project={p} index={i} />
                    ))}
                  </div>

                  <div className="mt-12 flex items-center justify-center">
                    <Link
                      to="/projects"
                      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:border-blue-500 hover:text-blue-600 dark:border-white/10 dark:bg-[#111] dark:text-white dark:hover:border-blue-500 dark:hover:text-blue-400"
                    >
                      View the complete project archive
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </section>
              )}

              {/* Tech Stack */}
              <section aria-labelledby="tech-heading" className="pb-16">
                <SectionLabel title="Key Technologies" icon={Code} />

                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/50 p-6 sm:p-10 dark:border-white/10 dark:bg-[#0a0a0a]">
                  {/* Subtle technical grid background */}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"
                    style={{
                      maskImage:
                        "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
                    }}
                  />

                  <div className="relative z-10">
                    {/* Top Header Row */}
                    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-white/10">
                      <p className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                        <MousePointerClick
                          size={16}
                          className="text-blue-500 dark:text-blue-400"
                        />
                        Hover over any logo to reveal the technology
                      </p>
                      <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm sm:self-auto dark:bg-white/10 dark:text-slate-300 dark:shadow-none">
                        <Cpu size={14} />
                        {KEY_TECHNOLOGIES.length} Tools & Frameworks
                      </div>
                    </div>

                    {/* Badges Grid with Staggered Animation */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.05 },
                        },
                      }}
                      className="flex flex-wrap items-center gap-4 sm:gap-5"
                    >
                      {KEY_TECHNOLOGIES.map((tech) => (
                        <TechnologyBadge key={tech.name} tech={tech} />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* CTA Banner */}
              <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white dark:bg-[#0a0a0a] sm:p-12 lg:p-16">
                <div
                  className="absolute right-0 top-0 p-8 opacity-[0.03] transition-opacity hover:opacity-[0.05]"
                  aria-hidden="true"
                >
                  <Mail size={240} />
                </div>

                <div className="relative z-10">
                  <p className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 backdrop-blur-md">
                    Let's Work Together
                  </p>
                  <h3 className="mb-4 max-w-2xl text-3xl font-black tracking-tight lg:text-4xl [text-wrap:balance]">
                    {data.cta.heading}
                  </h3>
                  <p className="mb-10 max-w-xl text-base leading-relaxed text-slate-400">
                    {data.cta.description}
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
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
                    <a
                      href={data.cta.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      <Calendar size={18} aria-hidden="true" />
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
