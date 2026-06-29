import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ArrowUpRight,
  Award,
  Trophy,
  Zap,
  GraduationCap,
  Calculator,
} from 'lucide-react';

/* ─────────────────────── types ─────────────────────── */

// FIX: was `icon: any` — replaced with the correct React type
interface AchievementItem {
  description: string;
  links: { url: string; label: string }[];
}

interface AchievementCategory {
  id: string;
  title: string;
  icon: React.ElementType; // was `any`
  category: string;
  items: AchievementItem[];
}

/* ─────────────────────── constants ─────────────────────── */

/**
 * Always-visible hero stats — the four most impressive numbers.
 * All values CV-verified. These should not require any click to see.
 */
const HERO_STATS = [
  {
    icon: Trophy,
    value: 'Top 0.5%',
    label: 'Amazon ML Challenge',
    sub: '50K+ participants globally',
  },
  {
    icon: Zap,
    value: 'Expert 1612',
    label: 'Codeforces',
    sub: 'Peak rating · competitive programming',
  },
  {
    icon: GraduationCap,
    value: 'AIR 1478',
    label: 'JEE Advanced 2022',
    sub: '~180K candidates',
  },
  {
    icon: Calculator,
    value: 'AIR 135',
    label: 'Integral Cup 2026',
    sub: 'Probability · Linear Algebra · Calculus',
  },
] as const;

/* ─────────────────────── AchievementItem ─────────────────────── */

const AchievementItemRow = ({
  item,
  number,
}: {
  item: AchievementItem;
  number: number;
}) => {
  const validLinks = item.links.filter(
    (l) => l.url !== '#' && l.url !== '/',
  );

  return (
    <div className="flex gap-4 py-3 group/item">
      {/* Numbered badge */}
      <span
        className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-900/20 text-[10px] font-mono font-black text-blue-600 dark:text-blue-400"
        aria-hidden="true"
      >
        {String(number).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
          {item.description}
        </p>

        {validLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {validLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-blue-100 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 transition-colors hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-300"
              >
                {link.label}
                <ArrowUpRight size={9} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────── CategoryCard ─────────────────────── */

const CategoryCard = ({
  category,
  index,
}: {
  category: AchievementCategory;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = category.icon;

  // Preview of first item shown in the collapsed state —
  // lets recruiters skim without clicking every card.
  const previewText = category.items[0]?.description ?? '';

  const contentId = `achievement-${category.id}-content`;
  const headerId  = `achievement-${category.id}-header`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.07, duration: 0.32 }}
      className={`relative rounded-2xl transition-all duration-300 ${
        isOpen
          ? 'border border-blue-500/40 bg-white dark:bg-[#161616] shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20'
          : 'border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-[#161616] shadow-sm hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md'
      }`}
    >
      {/* Blue left accent line — only visible when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-blue-600 origin-top"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Accordion trigger */}
      <button
        id={headerId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full px-5 py-4 lg:px-6 lg:py-5 flex items-center justify-between text-left gap-4 group"
      >
        <div className="flex items-start gap-4 min-w-0 flex-1">
          {/* Category icon */}
          <div
            className={`mt-0.5 shrink-0 p-2.5 rounded-xl transition-all duration-300 ${
              isOpen
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:shadow-blue-900/40'
                : 'bg-slate-100 dark:bg-[#111827] text-slate-400 dark:text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400'
            }`}
          >
            <Icon size={17} aria-hidden="true" />
          </div>

          {/* Title + meta + preview */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3
                className={`text-base font-black tracking-tight transition-colors ${
                  isOpen
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                }`}
              >
                {category.title}
              </h3>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {category.category}
              </span>
              <span className="text-[9px] font-mono font-bold rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5">
                {category.items.length} {category.items.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>

            {/* First-item preview — collapses when card is open */}
            <AnimatePresence>
              {!isOpen && previewText && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.18 }}
                  className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 line-clamp-1 max-w-5xl"
                >
                  {previewText}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`shrink-0 ${
            isOpen
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-300 dark:text-slate-600'
          }`}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </motion.div>
      </button>

      {/* Collapsible item list */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 lg:px-6 lg:pb-6">
              <div className="border-t border-slate-100 dark:border-white/8 pt-1 divide-y divide-slate-50 dark:divide-white/5">
                {category.items.map((item, idx) => (
                  <AchievementItemRow
                    key={idx}
                    item={item}
                    number={idx + 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────── main section ─────────────────────── */

const Achievement: React.FC<{ categories: AchievementCategory[] }> = ({
  categories,
}) => {
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <section
      className="w-full py-16 lg:py-24 bg-white dark:bg-black font-sans overflow-hidden"
      aria-labelledby="achievements-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section header ───────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/10">
              <Award size={13} className="text-blue-600" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
              Verified Achievements
            </span>
          </div>
          <h2
            id="achievements-heading"
            className="text-3xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tighter"
          >
            Honors &amp; Milestones
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {totalItems} verified entries across {categories.length} categories —
            academic distinctions, competitive rankings, and leadership impact.
          </p>
          <div className="mt-4 h-1 w-12 rounded-full bg-blue-600" aria-hidden="true" />
        </div>

        {/* ── Hero stats — always visible, no click required ─ */}
        {/*
          KEY UX FIX: the best 4 achievements were previously hidden behind
          accordion clicks. These dark cards are always visible so a recruiter
          sees the most impressive numbers immediately on section scroll.
        */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 gap-3 mb-8 lg:grid-cols-4"
          aria-label="Key achievement highlights"
        >
          {HERO_STATS.map(({ icon: Icon, value, label, sub }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-2xl bg-slate-900 dark:bg-[#0d0d0d] p-5 text-white border border-slate-800 dark:border-white/5"
            >
              {/* Subtle glow */}
              <div
                className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-blue-600/15 blur-2xl"
                aria-hidden="true"
              />
              <Icon
                size={15}
                className="text-blue-400 mb-3 relative"
                aria-hidden="true"
              />
              <p className="relative text-xl font-black tracking-tight leading-none">
                {value}
              </p>
              <p className="relative mt-1.5 text-xs font-bold text-slate-300">
                {label}
              </p>
              <p className="relative mt-0.5 text-[10px] font-mono text-slate-500">
                {sub}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Category accordion ───────────────────────────── */}
        <div className="space-y-2.5" role="list" aria-label="Achievement categories">
          {categories.map((cat, i) => (
            <div key={cat.id} role="listitem">
              <CategoryCard category={cat} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievement;