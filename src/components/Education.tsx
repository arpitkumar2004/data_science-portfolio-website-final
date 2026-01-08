import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  BookOpen, 
  Binary, 
  Microscope,
  Terminal
} from 'lucide-react';
import iitkgpLogo from '../data/img/me/2.png';

const TechnicalTag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
    {children}
  </span>
);

export default function Education() {
  const brandBlue = "rgb(37 99 235)";
  
  // Calculate progress (Approx for 2022-2027)
  const currentYear = new Date().getFullYear();
  const progressPercent = ((currentYear - 2022) / 5) * 100;

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={16} className="text-blue-600" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
              Academic Foundation
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Institutional Background
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
          <div className="absolute -inset-4 bg-slate-50 rounded-[2.5rem] -z-10 border border-slate-100 transition-colors group-hover:bg-blue-50/30 group-hover:border-blue-100" />

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 lg:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              
              {/* Left Side: Institution Info */}
              <div className="flex-grow">
                <div className="flex items-center gap-6 mb-8">
                  <div className="p-2 bg-white rounded-2xl shadow-md border border-slate-100">
                    <img src={iitkgpLogo} alt="IIT KGP" className="w-16 h-16 lg:w-20 lg:h-20 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                      Indian Institute of Technology, Kharagpur
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <TechnicalTag>Top Tier (Institute of Eminence)</TechnicalTag>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Terminal size={12} />
                        <span className="text-xs font-mono font-bold">Kharagpur, West Bengal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      Integrated Dual Degree (B.Tech + M.Tech)
                    </h4>
                    <p className="text-blue-600 font-bold text-sm mt-1 uppercase tracking-wider">
                      Specialization: Chemical Engineering
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {/* Focus Area 1 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Microscope size={16} className="text-blue-600" />
                        <span>Research & AI Track</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Integrating machine learning with chemical process modeling, focusing on 
                        <strong> predictive analytics</strong> and <strong>simulation-based optimization</strong> for complex engineering systems.
                      </p>
                    </div>

                    {/* Focus Area 2 */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <BookOpen size={16} className="text-blue-600" />
                        <span>Core Engineering</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Advanced study in process design, thermodynamics, and transport phenomena with an emphasis on 
                        <strong> computational modeling</strong> and scale-up strategies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Meta Stats */}
              <div className="w-full lg:w-auto shrink-0 space-y-4">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl lg:w-64">
                  <div className="flex justify-between items-center mb-4">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Duration</span>
                  </div>
                  <p className="text-xl font-black mb-6 tracking-tight">2022 — 2027</p>
                  
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
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-200">Cumulative GPA</span>
                  </div>
                  <p className="text-3xl font-black tracking-tight">8.46<span className="text-sm opacity-60">/10</span></p>
                </div>
              </div>

            </div>

            {/* Bottom Section: Courses Tagging */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mr-4 py-1">Relevant Expertise:</span>
                <TechnicalTag>Process Simulation</TechnicalTag>
                <TechnicalTag>Mathematical Optimization</TechnicalTag>
                <TechnicalTag>Data-Driven Discovery</TechnicalTag>
                <TechnicalTag>Stochastic Processes</TechnicalTag>
                <TechnicalTag>System Engineering</TechnicalTag>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Scholarship / Achievement Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left"
        >
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100">
                <Binary size={20} />
             </div>
             <p className="text-sm font-medium text-slate-600 max-w-xs">
               Actively applying AI to optimize non-linear chemical processes in real-time.
             </p>
          </div>
          <div className="h-4 w-px bg-slate-200 hidden md:block" />
          <p className="text-sm font-bold text-slate-900">
            Current Focus: <span className="text-blue-600">Research & Thesis Proposal Stage</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}