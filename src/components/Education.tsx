import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  Binary,
  Microscope,
  Terminal,
} from "lucide-react";
import iitkgpLogo from "../data/img/me/2.png";

const TechnicalTag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 bg-slate-50 dark:bg-[#111827] text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-white/10 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
    {children}
  </span>
);

export default function Education() {
  const brandBlue = "rgb(37 99 235)";

  // Calculate progress (Approx for 2022-2027)
  const currentYear = new Date().getFullYear();
  const progressPercent = ((currentYear - 2022) / 5) * 100;

  return (
    <section className="py-24 bg-white dark:bg-black font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={16} className="text-blue-600" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
              Elite Technical Training
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
            Premier Engineering Education
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full" />
        </div>

        {/* Main Institution Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Decorative Background Element */}
          <div className="absolute -inset-4 bg-slate-50 dark:bg-[#0f172a] rounded-[2.5rem] -z-10 border border-slate-100 dark:border-white/10 transition-colors group-hover:bg-blue-50/30 group-hover:border-blue-100" />

          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 lg:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              {/* Left Side: Institution Info */}
              <div className="flex-grow">
                <div className="flex items-center gap-6 mb-8">
                  <div className="p-2 bg-white dark:bg-[#161616] rounded-2xl shadow-md border border-slate-100 dark:border-white/10">
                    <img
                      src={iitkgpLogo}
                      alt="IIT KGP"
                      className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                      Indian Institute of Technology, Kharagpur
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <TechnicalTag>
                        Top Tier (Institute of Eminence)
                      </TechnicalTag>
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                        <Terminal size={12} />
                        <span className="text-xs font-mono font-bold">
                          Kharagpur, West Bengal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      Integrated Dual Degree (B.Tech + M.Tech)
                    </h4>
                    <p className="text-blue-600 font-bold text-sm mt-1 uppercase tracking-wider">
                      Specialization: Chemical Engineering
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {/* Focus Area 1 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
                        <Microscope size={16} className="text-blue-600" />
                        <span>Applied AI for Process Systems</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        Deploying neural networks for real-time process
                        optimization—fusing
                        <strong> physics-informed ML</strong> with{" "}
                        <strong>digital twin architectures</strong> to cut
                        energy consumption and improve yield prediction accuracy
                        by 15-20% in pilot studies.
                      </p>
                    </div>

                    {/* Focus Area 2 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
                        <BookOpen size={16} className="text-blue-600" />
                        <span>Industrial-Scale Engineering</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        Mastering unit operations, reaction kinetics, and
                        heat/mass transfer—building
                        <strong> scalable process designs</strong> validated
                        through <strong>CFD simulations</strong> and economic
                        feasibility analysis for commercial deployment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Meta Stats */}
              <div className="w-full lg:w-auto shrink-0 space-y-4">
                <div className="bg-slate-900 border-4 dark:bg-[#0a0a0a] dark:border-white/5 text-white p-6 rounded-2xl shadow-xl lg:w-64">
                  <div className="flex justify-between items-center mb-4">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                      Duration
                    </span>
                  </div>
                  <p className="text-xl font-black mb-6 tracking-tight">
                    2022 — 2027
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono font-bold uppercase">
                      <span>Course Progress</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl lg:w-64">
                  <div className="flex justify-between items-center mb-4">
                    <Award size={18} className="text-blue-200" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-200">
                      SGPA
                    </span>
                  </div>
                  <p className="text-3xl font-black tracking-tight">
                    7.86<span className="text-sm opacity-60">/10</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Courses Tagging */}
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/10">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mr-4 py-1">
                  Production-Ready Skills:
                </span>
                <TechnicalTag>Digital Process Twins</TechnicalTag>
                <TechnicalTag>Nonlinear Optimization</TechnicalTag>
                <TechnicalTag>Physics-Informed ML</TechnicalTag>
                <TechnicalTag>Industrial Control Systems</TechnicalTag>
                <TechnicalTag>Real-Time Analytics</TechnicalTag>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scholarship / Achievement Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-7 gap-6 items-stretch"
        >
          <div className="rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#161616] p-6 lg:col-span-3">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-300">
              Thesis Track
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
              Expected M.Tech Thesis
            </p>
            <p className="text-sm text-blue-600 font-bold mt-1">
              Applied Neural Architectures in Process Control for Real-Time
              Optimization in Industrial Processes
            </p>
            <div className="h-px bg-slate-100 dark:bg-white/10 my-4" />
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              B.Tech Project
            </p>
            <a
              href="/BTP%201-%20CO%E2%82%82%20to%20CH%E2%82%83OH%20Conversion%20Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 font-bold mt-1 hover:text-blue-700 hover:underline transition-colors inline-block cursor-pointer"
            >
              Transport Analysis of Electrolytic Conversion of CO<sub>2</sub> to
              CH<sub>3</sub>OH in AEM and PEM types of Electrolyzers.
            </a>
          </div>
          <div className="lg:col-span-4 flex items-start gap-4 rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-[#111827] p-6">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-[#161616] flex items-center justify-center text-blue-600 border border-slate-100 dark:border-white/10">
              <Binary size={20} />
            </div>
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-300">
                Research Focus
              </p>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-2">
                Building AI-driven optimization frameworks to cut energy waste
                and speed convergence in industrial-scale chemical processes.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-mono">01.</span>
                  Closed-loop control with neural surrogates for stability and
                  safety.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-mono">02.</span>
                  Hybrid physics + data models to improve generalization across
                  regimes.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-mono">03.</span>
                  Real-time optimization under constraints using MPC-style
                  objectives.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-mono">04.</span>
                  Digital twin validation with sensitivity and uncertainty
                  analysis.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
