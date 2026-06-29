import React from "react";
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
import type { Milestone as MilestoneType, SelectedWork as SelectedWorkType, Stat } from "../data/aboutData";

/* ─────────────────────── constants ─────────────────────── */

const KEY_TECHNOLOGIES = [
  "Python", "PyTorch", "TensorFlow", "FastAPI",
  "LangChain", "Docker", "MLflow", "DVC",
  "Scikit-learn", "JAX", "FAISS", "C++", "SQL",
] as const;

/* ─────────────────────── icon resolver ─────────────────────── */

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Briefcase, Trophy, Microscope,
  Github, Linkedin, Activity, Zap, Layers, TrendingUp,
};
const resolveIcon = (name: string): React.ElementType => iconMap[name] ?? Zap;

/* ─────────────────────── color map ─────────────────────── */

const statColors: Record<string, string> = {
  default: "text-slate-900 dark:text-slate-100",
  blue:    "text-blue-600  dark:text-blue-400",
  green:   "text-emerald-600 dark:text-emerald-400",
};

/* ─────────────────────── sub-components ─────────────────────── */

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 ${className}`} />
);

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, duration: 0.4 }}
    className="rounded-xl border border-slate-100 bg-white p-4 text-center dark:border-white/8 dark:bg-[#111]"
  >
    <p className={`text-2xl font-black tracking-tight ${statColors[stat.color] ?? statColors.default}`}>
      {stat.value}
    </p>
    <p className="mt-0.5 text-[10px] font-mono uppercase text-slate-600 dark:text-slate-500">
      {stat.label}
    </p>
  </motion.div>
);

const MilestoneCard = ({ milestone, index }: { milestone: MilestoneType; index: number }) => {
  const Icon = resolveIcon(milestone.icon);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.08 * index, duration: 0.4 }}
      className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-colors hover:border-slate-200 dark:border-white/8 dark:bg-[#111] dark:hover:border-white/15"
    >
      <div className="mt-0.5 shrink-0">
        <div className="relative rounded-lg bg-slate-50 p-2 text-blue-600 dark:bg-slate-900 dark:text-blue-400">
          <Icon size={18} aria-hidden="true" />
          {milestone.date.includes("Present") && (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-[#111]" />
          )}
        </div>
      </div>
      <div className="min-w-0">
        <div className="mb-0.5 flex items-center gap-1.5">
          <Calendar size={11} className="text-slate-400" aria-hidden="true" />
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            {milestone.date}
          </span>
        </div>
        <h4 className="text-sm font-bold leading-snug text-slate-900 dark:text-slate-100">
          {milestone.title}
        </h4>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {milestone.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

const WorkRow = ({ work, index }: { work: SelectedWorkType; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.06 * index, duration: 0.35 }}
  >
    <Link
      to={work.projectUrl}
      className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 transition-colors hover:border-blue-200 dark:border-white/8 dark:bg-[#111] dark:hover:border-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center gap-2.5">
          <h4 className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
            {work.title}
          </h4>
          <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/30 dark:text-blue-400">
            {work.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(work.tags ?? []).slice(0, 5).map((tag, i, arr) => (
            <span key={i} className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500">
              {tag}{i < arr.length - 1 ? " ·" : ""}
            </span>
          ))}
        </div>
      </div>
      <ArrowRight
        size={16}
        className="ml-3 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500 dark:text-slate-600"
        aria-hidden="true"
      />
    </Link>
  </motion.div>
);

const SectionLabel = ({ title }: { title: string }) => (
  <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
    {title}
  </h3>
);

/* ─────────────────────── main component ─────────────────────── */

const AboutMe: React.FC = () => {
  const { data, loading } = useAboutData();

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
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-blue-100 dark:bg-black dark:text-slate-100 dark:selection:bg-blue-500/20">
      <SEOHead
        title="About Me"
        description="Learn about Arpit Kumar — ML Engineer & AI Researcher at IIT Kharagpur. Codeforces Expert, Top 0.5% Amazon ML Challenge (50K+ participants), GPA 8.86/10."
        canonicalPath="/aboutme"
        ogType="profile"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ══════════ LEFT SIDEBAR ══════════ */}
          <div className="h-fit space-y-5 lg:col-span-4 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#111]">
                <img
                  src={myphoto}
                  alt={`${data.personal.name} — ${data.education.institution}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pb-4 pt-10 px-5">
                  <h3 className="text-lg font-bold text-white">
                    {data.personal.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-slate-300">
                    {data.personal.tagline}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span className="text-[11px] font-medium text-emerald-300">
                      {data.personal.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-5 flex gap-2.5">
                {(data.personal?.socialLinks ?? []).map((link, i) => {
                  const Icon = resolveIcon(link.icon);
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.platform} profile (opens in new tab)`}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-blue-600 dark:border-white/8 dark:bg-[#111] dark:text-slate-400 dark:hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {link.platform}
                    </a>
                  );
                })}
              </div>

              {/* Education card */}
              <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white dark:bg-[#0a0a0a]">
                <h4 className="mb-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                  <ShieldCheck size={14} aria-hidden="true" />
                  Education
                </h4>
                <dl className="space-y-3">
                  {[
                    { dt: "Institution",    dd: data.education.institution    },
                    { dt: "Degree",         dd: data.education.degree         },
                    { dt: "Specialization", dd: data.education.specialization },
                    { dt: "Graduation",     dd: data.education.graduation     },
                  ].map((item) => (
                    <div key={item.dt}>
                      <dt className="text-[10px] font-mono uppercase text-slate-500">
                        {item.dt}
                      </dt>
                      <dd className="text-sm font-semibold">{item.dd}</dd>
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
              {/* Name + animated role */}
              <header className="mb-12">
                <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl">
                  {data.personal.name}
                </h1>
                <div className="mt-2 text-lg font-mono font-semibold text-blue-600 dark:text-blue-400 md:text-xl">
                  &gt;{" "}
                  <AniText
                    texts={data.personal.animatedRoles}
                    typingSpeed={50}
                    pauseTime={2500}
                  />
                </div>
              </header>

              {/* Bio */}
              <div className="max-w-2xl space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
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
                <p className="flex items-start gap-2 pt-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <TrendingUp size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {data.bio.callToAction}
                </p>
              </div>

              {/*
                Stats grid — was commented out in the sidebar.
                FIX: uncommented and moved to right column for stronger visual impact.
                data.stats is already fetched; now actually rendered.
              */}
              {(data.stats ?? []).length > 0 && (
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {(data.stats ?? []).map((stat, i) => (
                    <StatCard key={i} stat={stat} index={i} />
                  ))}
                </div>
              )}

              <hr className="my-14 border-slate-100 dark:border-white/8" />

              {/* Career Milestones */}
              <section aria-labelledby="milestones-heading">
                <SectionLabel title="Career Milestones" />
                <div className="space-y-3">
                  {(data.milestones ?? []).map((m, i) => (
                    <MilestoneCard key={i} milestone={m} index={i} />
                  ))}
                </div>
              </section>

              <hr className="my-14 border-slate-100 dark:border-white/8" />

              {/*
                Selected Work — featuredProjects was computed with useMemo
                on every render but NEVER appeared in the JSX.
                FIX: rendered here using the already-defined WorkRow component
                (which was also defined but never called).
              */}
              {(data.selectedWork ?? []).length > 0 && (
                <section aria-labelledby="work-heading">
                  <SectionLabel title="Selected Work" />
                  <div className="space-y-3">
                    {(data.selectedWork ?? []).map((work, i) => (
                      <WorkRow key={work.title} work={work} index={i} />
                    ))}
                  </div>
                  <Link
                    to="/projects"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-all hover:gap-3 dark:text-blue-400 focus-visible:outline-none focus-visible:underline"
                  >
                    View all projects
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </section>
              )}

              <hr className="my-14 border-slate-100 dark:border-white/8" />

              {/* Key Technologies — CV-verified, replaces unused techData import */}
              <section aria-labelledby="tech-heading" className="mb-14">
                <SectionLabel title="Key Technologies" />
                <div className="flex flex-wrap gap-2">
                  {KEY_TECHNOLOGIES.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-mono font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white dark:bg-[#0a0a0a] lg:p-10">
                {/* Decorative watermark — aria-hidden added */}
                <div className="absolute right-0 top-0 p-6 opacity-[0.03]" aria-hidden="true">
                  <Briefcase size={160} />
                </div>

                <div className="relative z-10">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-blue-400">
                    Let's Work Together
                  </p>
                  <h3 className="mb-3 mt-1.5 text-2xl font-black tracking-tight lg:text-3xl">
                    {data.cta.heading}
                  </h3>
                  <p className="mb-8 max-w-lg text-sm leading-relaxed text-slate-400">
                    {data.cta.description}
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      to={data.cta.cvLink}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      <Download size={16} aria-hidden="true" />
                      Get CV
                    </Link>
                    <a
                      href={data.cta.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      <Mail size={16} aria-hidden="true" />
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