import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Trophy,
  TrendingUp,
  Award,
  Calculator,
  MapPin,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import iitkgpLogo from "../data/img/me/2.png";

/* ─────────────────────── data ─────────────────────── */

/**
 * All four values pulled directly from the CV — do not approximate.
 * JEE Advanced: AIR 1478 (2022)
 * JEE Mains:    98.28 percentile across 1.1M+ candidates (2022)
 * GATE 2026:    AIR 807, CH stream, conducted by IIT Guwahati
 * Integral Cup: AIR 135 across 3 tracks (Probability, LinAlg, Integral Analysis)
 */
const ACADEMIC_STATS = [
  {
    icon: Trophy,
    value: "AIR 1478",
    label: "JEE Advanced 2022",
    sub: "~180K candidates",
  },
  {
    icon: TrendingUp,
    value: "98.28%",
    label: "JEE Mains 2022",
    sub: "1.1M+ candidates",
  },
  {
    icon: Award,
    value: "AIR 807",
    label: "GATE 2026",
    sub: "CH stream · IIT Guwahati",
  },
  {
    icon: Calculator,
    value: "AIR 135",
    label: "Integral Cup 2026 S1",
    sub: "Probability · LinAlg · Calculus",
  },
] as const;

/* ─────────────────────── component ─────────────────────── */

export default function Education() {
  const start           = new Date("2022-07-01").getTime();
  const end             = new Date("2027-04-30").getTime();
  const progressPercent = Math.round(
    Math.min(((Date.now() - start) / (end - start)) * 100, 100),
  );

  return (
    <section
      className="py-24 bg-white dark:bg-black font-sans overflow-hidden"
      aria-labelledby="education-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section header ─────────────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={16} className="text-blue-600" aria-hidden="true" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
              Education
            </span>
          </div>
          <h2
            id="education-heading"
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter"
          >
            Academic Background
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full" aria-hidden="true" />
        </div>

        {/* ── Main IIT KGP card ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Soft outer glow on hover */}
          <div
            className="absolute -inset-4 -z-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50/30 dark:border-white/10 dark:bg-[#0f172a] dark:group-hover:border-blue-900/40"
            aria-hidden="true"
          />

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#0a0a0a] lg:p-12">
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between">

              {/* ── Left: institution details + thesis cards ── */}
              <div className="min-w-0 flex-grow">

                {/* Logo + institution name + location */}
                <div className="mb-8 flex items-center gap-6">
                  <div className="shrink-0 rounded-2xl border border-slate-100 bg-white p-2 shadow-md dark:border-white/10 dark:bg-[#161616]">
                    <img
                      src={iitkgpLogo}
                      alt="IIT Kharagpur logo"
                      className="h-16 w-16 object-contain lg:h-20 lg:w-20"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 lg:text-3xl">
                      Indian Institute of Technology Kharagpur
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <MapPin size={12} className="shrink-0 text-slate-400" aria-hidden="true" />
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        Kharagpur, West Bengal, India
                      </span>
                    </div>
                  </div>
                </div>

                {/* Degree + department + Micro-Specialization */}
                <div className="mb-8 space-y-2">
                  <h4 className="text-lg font-black tracking-tight text-slate-800 dark:text-slate-100">
                    Integrated Dual Degree — B.Tech + M.Tech
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Department of Chemical Engineering
                  </p>

                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Sparkles size={13} className="shrink-0 text-blue-500" aria-hidden="true" />
                    <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-200">
                      Micro-Specialization:
                    </span>
                    <span className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50 px-2.5 py-0.5 text-[13px] font-bold text-blue-700 dark:border-blue-700/30 dark:bg-blue-900/20 dark:text-blue-300">
                      Artificial Intelligence &amp; Applications
                    </span>
                  </div>
                </div>

                {/*
                  Thesis + BTP in a 2-column layout on sm+.
                  Was a single-column `grid-cols-1 items-stretch` before.
                */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* M.Tech Thesis */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-white/10 dark:bg-[#111827]">
                    <p className="mb-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      M.Tech Thesis (Expected)
                    </p>
                    <p className="text-sm font-bold leading-snug text-slate-800 dark:text-slate-100">
                      Applied Neural Architectures in Process Control for
                      Real-Time Optimization in Industrial Processes
                    </p>
                  </div>

                  {/* B.Tech Project — ExternalLink icon added on hover for affordance */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-white/10 dark:bg-[#111827]">
                    <p className="mb-3 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      B.Tech Project
                    </p>
                    <a
                      href="/BTP%201-%20CO%E2%82%82%20to%20CH%E2%82%83OH%20Conversion%20Report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-start gap-1.5 text-sm font-bold leading-snug text-blue-600 transition-colors hover:text-blue-700 dark:hover:text-blue-400"
                    >
                      <span>
                        Transport Analysis of Electrolytic Conversion of CO
                        <sub>2</sub> to CH<sub>3</sub>OH in AEM and PEM
                        Electrolyzers
                      </span>
                      <ExternalLink
                        size={25}
                        className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                </div>
              </div>

              {/* ── Right: Duration card + GPA card ── */}
              {/* <div className="flex w-full shrink-0 flex-row gap-4 lg:w-auto lg:flex-col">

                <div className="flex-1 rounded-2xl border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-xl dark:border-white/5 dark:bg-[#0a0a0a] lg:w-60">
                  <div className="mb-3 flex items-center justify-between">
                    <Calendar size={16} className="text-blue-400" aria-hidden="true" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                      Duration
                    </span>
                  </div>
                  <p className="mb-5 text-xl font-black tracking-tight">
                    2022 — 2027
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-mono font-bold uppercase text-slate-400">
                      <span>Progress</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full rounded-full bg-blue-500"
                        role="progressbar"
                        aria-valuenow={progressPercent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Degree ${progressPercent}% complete`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 rounded-2xl bg-blue-600 p-6 text-white shadow-xl lg:w-60">
                  <div className="mb-3 flex items-center justify-between">
                    <GraduationCap size={16} className="text-blue-200" aria-hidden="true" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-200">
                      CPI / GPA
                    </span>
                  </div>
                  <p className="text-3xl font-black tracking-tight">
                    8.86
                    <span className="text-base font-bold opacity-60">/10</span>
                  </p>
                  <p className="mt-1 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-200">
                    Cumulative · All semesters
                  </p>
                </div>

              </div> */}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4"
          aria-label="Academic examination results"
        >
          {ACADEMIC_STATS.map(({ icon: Icon, value, label, sub }) => (
            <div
              key={label}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0a0a0a]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <Icon size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-black leading-none tracking-tight text-slate-900 dark:text-slate-100">
                  {value}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                  {label}
                </p>
                <p className="mt-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}