import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ShieldCheck, 
  Terminal, 
  ArrowUpRight,
  Activity
} from 'lucide-react';

interface AchievementCategory {
  id: string;
  title: string;
  icon: any;
  category: string;
  items: {
    description: string;
    links: { url: string; label: string }[];
  }[];
}

const Achievement: React.FC<{ categories: AchievementCategory[] }> = ({ categories }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="w-full py-20 bg-slate-50 font-sans selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- 1. SECTION HEADER --- */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={16} className="text-blue-600" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-blue-600">
              Technical Honors Registry
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Honors & Milestones
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full" />
        </div>

        {/* --- 2. THE STEPPED LEDGER (Hierarchy Layer) --- */}
        <div className="space-y-4">
          {categories.map((category) => {
            const isOpen = activeId === category.id;
            
            return (
              <div key={category.id} className={`border rounded-2xl overflow-hidden bg-white transition-all duration-500 ${isOpen ? 'border-blue-600 shadow-xl shadow-blue-900/5' : 'border-slate-200 hover:border-blue-400'}`}>
                {/* --- HIERARCHY 1: THE CATEGORY --- */}
                <button
                  onClick={() => setActiveId(isOpen ? null : category.id)}
                  className={`w-full px-6 py-6 flex items-center justify-between group text-left transition-colors ${isOpen ? 'bg-white' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-xl transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                      <category.icon size={22} />
                    </div>
                    <div>
                        <h3 className={`text-xl font-black tracking-tight transition-colors mt-1 ${isOpen ? 'text-blue-600' : 'text-slate-800'}`}>
                            {category.title}
                        </h3>
                    </div>
                  </div>
                  
                  <div className={`transition-transform duration-500 p-2 rounded-full ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-300'}`}>
                    <ChevronDown size={24} strokeWidth={2.5} />
                  </div>
                </button>

                {/* --- HIERARCHY 2: THE TIMELINE MILESTONES --- */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="px-8 lg:px-16 py-12 relative">
                        
                        {/* --- TIMELINE RAIL (Visual Line) --- */}
                        <div className="absolute left-8 lg:left-16 top-12 bottom-12 w-0.5 bg-slate-200" />

                        <div className="space-y-12">
                          {category.items.map((item, idx) => (
                            <div key={idx} className="relative pl-10">
                              
                              {/* --- TIMELINE NODE (The Dot) --- */}
                              <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-blue-600 transition-all z-10">
                                 <div className="w-full h-full rounded-full bg-blue-600 scale-0 animate-in zoom-in duration-500 delay-300 fill-mode-forwards" style={{ transform: 'scale(0.5)' }} />
                              </div>

                              <div className="flex flex-col gap-4">
                                <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                                  {item.description}
                                </p>

                                {/* Verification Links */}
                                {item.links.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {item.links.map((link, lIdx) => (
                                      link.url !== "#" && (
                                        <a
                                          key={lIdx}
                                          href={link.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-blue-600 border border-slate-200 rounded-lg text-[10px] font-mono font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                                        >
                                          <ShieldCheck size={12} />
                                          {link.label}
                                          <ArrowUpRight size={12} />
                                        </a>
                                      )
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* End of Timeline Indicator */}
                        <div className="mt-8 flex items-center gap-2 ml-8 lg:ml-0">
                           <Activity size={14} className="text-slate-300" />
                           <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-[0.2em]">End of Log Sequence</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievement;