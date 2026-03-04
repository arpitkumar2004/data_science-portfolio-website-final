import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ArrowUpRight,
  Award,
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

/* ---------- Single achievement item row ---------- */
const AchievementItem = ({
  item,
  number,
}: {
  item: { description: string; links: { url: string; label: string }[] };
  number: number;
}) => {
  const validLinks = item.links.filter((l) => l.url !== '#' && l.url !== '/');

  return (
    <div className="flex gap-3 py-2.5 group/item">
      {/* Row number */}
      <span className="text-blue-500 font-mono text-xs mt-[3px] shrink-0 w-5 text-right">
        {String(number).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-relaxed">
          {item.description}
        </p>

        {/* Inline verification links */}
        {validLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1.5">
            {validLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 uppercase tracking-wider transition-colors"
              >
                {link.label}
                <ArrowUpRight size={10} className="opacity-60" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- Category card with collapsible items ---------- */
const CategoryCard = ({
  category,
  index,
}: {
  category: AchievementCategory;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className={`border rounded-2xl bg-slate-50 dark:bg-[#161616] transition-all duration-300 ${
        isOpen
          ? 'border-blue-500/50 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20'
          : 'border-slate-100 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/30 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Header — always visible, clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 lg:px-6 lg:py-5 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={`p-2.5 rounded-xl transition-all duration-300 shrink-0 ${
              isOpen
                ? 'bg-blue-600 text-white shadow-md shadow-blue-300/50 dark:shadow-blue-900/50'
                : 'bg-slate-100 dark:bg-[#111827] text-slate-500 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-600/10 group-hover:text-blue-600'
            }`}
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <h3
              className={`text-base lg:text-lg font-black tracking-tight transition-colors ${
                isOpen
                  ? 'text-blue-600'
                  : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600'
              }`}
            >
              {category.title}
            </h3>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {category.category}
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-600/60 dark:text-blue-400/60">
                {category.items.length} {category.items.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className={`shrink-0 ml-3 ${
            isOpen ? 'text-blue-600' : 'text-slate-300 dark:text-slate-500'
          }`}
        >
          <ChevronRight size={18} />
        </motion.div>
      </button>

      {/* Body — collapsible items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 lg:px-6 lg:pb-6 pt-0">
              <div className="border-t border-slate-100 dark:border-white/10 pt-3 divide-y divide-slate-50 dark:divide-white/5">
                {category.items.map((item, idx) => (
                  <AchievementItem key={idx} item={item} number={idx + 1} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ---------- Main Achievement Section ---------- */
const Achievement: React.FC<{ categories: AchievementCategory[] }> = ({ categories }) => {
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <section className="w-full py-16 bg-white dark:bg-black font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-600/10 text-blue-600">
              <Award size={14} />
            </div>
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
              Verified Achievements
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">
            Honors & Milestones
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-2xl mt-3 leading-relaxed">
            {totalItems} verified entries across {categories.length} categories — academic
            distinctions, competitive rankings, and leadership impact.
          </p>
          <div className="h-1 w-12 bg-blue-600 mt-4 rounded-full" />
        </div>

        {/* Category Cards */}
        <div className="space-y-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievement;