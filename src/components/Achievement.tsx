import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  LucideIcon,
  Activity,
  BookOpen,
  Badge,
  Trophy
} from 'lucide-react';

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

// --- Reusable Log Entry Component ---
const LogEntry = ({ item }: { item: AchievementItem }) => (
  <div className="group/entry relative pl-10 pb-10 last:pb-0">
    {/* Visual Rail Dot */}
    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-slate-200 group-hover/entry:bg-blue-600 group-hover/entry:shadow-[0_0_10px_rgba(37,99,235,0.8)] transition-all duration-300" />
    
    <div className="flex flex-col gap-4">
      <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
        {item.description}
      </p>
      
      <div className="flex flex-wrap gap-3">
        {item.links.map((link, i) => (
          link.url !== "#" && (
            <motion.a
              key={i}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-blue-600 border border-slate-100 rounded-xl text-xs font-mono font-black uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </motion.a>
          )
        ))}
      </div>
    </div>
  </div>
);

// --- Main Achievement Component ---
const Achievement: React.FC<AchievementSectionProps> = ({ categories }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="w-full pt-32 pb-24 font-sans selection:bg-blue-100">
      {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-blue-600" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
              Achievements & Milestones
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Awards & Recognitions
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full" />
        </div>

      {/* --- LEDGER LIST --- */}
      <div className="px-6lg:space-y-12">
        {categories.map((category) => {
          const isExpanded = expanded[category.id] || false;
          const shownItems = isExpanded ? category.items : category.items.slice(0, 2);
          const needsToggle = category.items.length > 2;

          return (
            <motion.div
              key={category.id}
              layout
              className="w-full border-t-2 border-slate-100 pt-16 lg:pt-24 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
                
                {/* Meta Column */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="p-3 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
                    >
                      <category.icon size={24} />
                    </motion.div>
                    <span className="text-sm font-mono font-black text-blue-600 uppercase tracking-widest">
                      Log_{category.id}
                    </span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full hover:bg-blue-100 transition-colors">
                    {category.category}
                  </span>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-10">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter mb-12 uppercase leading-none hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>

                  <div className="relative">
                    {/* Vertical Rail Line */}
                    <div className="absolute left-[3.5px] top-4 bottom-4 w-px bg-gradient-to-b from-slate-100 to-slate-50" />
                    
                    <div className="space-y-4">
                      <AnimatePresence>
                        {shownItems.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <LogEntry item={item} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {needsToggle && (
                    <motion.button
                      onClick={() => toggle(category.id)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-12 ml-10 flex items-center gap-3 text-slate-900 font-black text-sm uppercase tracking-widest group hover:text-blue-600 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                          Collapse Registry
                        </>
                      ) : (
                        <>
                          Expand {category.items.length - 2} More Entries
                          <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Achievement;
