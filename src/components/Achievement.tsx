import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Trophy,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  ExternalLink,
  LucideIcon
} from 'lucide-react';

// --- Types ---
interface AchievementLink {
  url: string;
  label: string;
}

interface AchievementItem {
  description: string;
  links: AchievementLink[];
}

interface AchievementCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  category: string;
  items: AchievementItem[];
}

interface AchievementSectionProps {
  categories: AchievementCategory[];
}

// --- Sub-Component: LogEntry (Level 3: The actual data points) ---
const LogEntry = ({ item, index }: { item: AchievementItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.08 }}
    className="group/entry relative pl-8 pb-8 last:pb-2 border-l-2 border-slate-100 hover:border-blue-500 transition-colors duration-300"
  >
    {/* Visual Node (Dot on the line) */}
    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover/entry:border-blue-600 transition-all duration-300 flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/entry:bg-blue-600 group-hover/entry:animate-pulse" />
    </div>

    <div className="flex flex-col gap-3">
      {/* Description */}
      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold group-hover/entry:text-slate-900 transition-colors">
        {item.description}
      </p>

      {/* Action Links */}
      <div className="flex flex-wrap gap-2">
        {item.links.map((link, i) => (
          link.url !== "#" && (
            <motion.a
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-blue-600 border border-slate-200 rounded-md text-[10px] font-mono font-black uppercase tracking-wider hover:border-blue-600 hover:shadow-sm transition-all"
            >
              {link.label}
              <ArrowUpRight size={12} />
            </motion.a>
          )
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Main Component: Achievement ---
const Achievement: React.FC<AchievementSectionProps> = ({ categories }) => {
  // State for Hierarchy Level 1 (The whole section)
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  // State for Hierarchy Level 2 (Specific category module)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setActiveCategoryId(activeCategoryId === id ? null : id);
  };

  return (
    <section className="w-full py-24 bg-slate-50 font-sans overflow-hidden selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- LEVEL 1: MASTER HEADER (The Dossier Toggle) --- */}
        <button 
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className={isSectionOpen ? "text-blue-600" : "text-slate-400"} />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
              {isSectionOpen ? "Registry Unlocked" : "Achievements & Milestones"}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
              Verified Impact & Credentials
            </h2>
            
            {/* Interactive Badge/Toggle Icon */}
            <div className="flex items-center gap-4">
               {!isSectionOpen && (
                 <span className="hidden md:block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                   Access Full Registry
                 </span>
               )}
               <div className={`flex items-center justify-center w-14 h-14 rounded-2xl border-2 transition-all duration-500 ${isSectionOpen ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'bg-white border-slate-200 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-500'}`}>
                  <ChevronDown size={28} strokeWidth={3} />
               </div>
            </div>
          </div>

          {/* Technical Progress Bar Decoration */}
          <div className="relative h-1.5 bg-slate-50 mt-8 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "100px" }}
              animate={{ width: isSectionOpen ? "200px" : "100px" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="absolute top-0 left-0 h-full bg-blue-600"
            />
          </div>
        </button>

        {/* --- LEVEL 2: CATEGORY MODULES --- */}
        <AnimatePresence>
          {isSectionOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-5 mt-12">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className={`group/module rounded-[2rem] border transition-all duration-300 ${activeCategoryId === category.id ? 'border-blue-500 bg-blue-50/20 shadow-xl shadow-blue-500/5' : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg'}`}
                  >
                    {/* Category Selector Button */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between p-6 lg:p-8 text-left"
                    >
                      <div className="flex items-center gap-6">
                        {/* Icon Container */}
                        <div className={`p-4 rounded-2xl transition-all duration-500 ${activeCategoryId === category.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400 group-hover/module:bg-white group-hover/module:text-blue-600 group-hover/module:shadow-md'}`}>
                          <category.icon size={28} />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest">
                                Module_{category.id}
                             </span>
                             <div className="w-1 h-1 rounded-full bg-slate-300" />
                             <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                                {category.category}
                             </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight group-hover/module:text-blue-600 transition-colors">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        {/* Entry Counter */}
                        <div className="hidden md:flex flex-col items-end">
                           <span className="text-[18px] font-mono font-black text-slate-900 leading-none">
                              {category.items.length.toString().padStart(2, '0')}
                           </span>
                           <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                              Registry Logs
                           </span>
                        </div>
                        {/* Arrow Indicator */}
                        <div className={`transition-transform duration-500 p-2 rounded-full ${activeCategoryId === category.id ? 'rotate-90 bg-blue-600 text-white' : 'text-slate-300 bg-slate-50'}`}>
                          <ChevronRight size={20} strokeWidth={3} />
                        </div>
                      </div>
                    </button>

                    {/* --- LEVEL 3: DATA LOG ENTRIES --- */}
                    <AnimatePresence>
                      {activeCategoryId === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="px-6 lg:px-24 pb-12 pt-2">
                             {/* Decorative Internal Header */}
                             <div className="mb-8 flex items-center gap-3">
                                <div className="h-px flex-1 bg-slate-200" />
                                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em]">Detailed Sequence</span>
                                <div className="h-px flex-1 bg-slate-200" />
                             </div>

                             <div className="space-y-2">
                                {category.items.map((item, idx) => (
                                  <LogEntry key={idx} item={item} index={idx} />
                                ))}
                             </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* End of Section Metadata */}
              <div className="mt-16 flex flex-col items-center justify-center gap-4">
                 <button 
                  onClick={() => { setIsSectionOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[15px] font-mono font-black text-blue-600 uppercase tracking-widest hover:underline"
                 >
                   [ Close Registry ]
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closed State Decorative Icons */}
        {!isSectionOpen && (
           <div className="mt-12 flex items-center gap-4 opacity-20">
              <ShieldCheck size={20} />
              <div className="h-px flex-1 bg-slate-200" />
              <Cpu size={20} />
              <div className="h-px flex-1 bg-slate-200" />
              <Zap size={20} />
           </div>
        )}

      </div>
    </section>
  );
};

export default Achievement;