import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../context/ProjectsContext';
import ProjectCarousel from '../components/ProjectCarousel';
import { Filter, Database, Terminal, History, BookOpen, Trophy, Globe, Cpu, Activity, Zap, FileText, Download, Mail, ArrowUpRight, ShieldCheck, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackResumeDownload } from '../utils/analytics';

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

// Logic: Sorting by date
const parseEndDate = (duration: string): Date => {
  const parts = duration.split(/ - |–/);
  let endPart = parts.length > 1 ? parts[1] : parts[0];
  const rangeParts = endPart.split('–');
  if (rangeParts.length > 1) endPart = rangeParts[rangeParts.length - 1];

  const [month, year] = endPart.trim().split(' ');
  if (month && year) {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    if (!isNaN(monthIndex)) return new Date(parseInt(year), monthIndex, 1);
  }
  return new Date(0);
};

const Projects: React.FC = () => {
  const { projects, loading } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const brandBlue = "rgb(37 99 235)";

  // --- DYNAMIC STATISTICS CALCULATION ---
  const stats = useMemo(() => {
    const lower = (str: string | undefined) => str?.toLowerCase() || '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasTag = (p: any, tag: string) => p.tags?.some((t: string) => lower(t).includes(tag));
    return {
      total: projects.length,
      researchPapers: projects.filter(p => lower(p.type).includes('paper') || lower(p.type).includes('research')).length,
      ongoingResearch: projects.filter(p => (lower(p.type).includes('paper') || lower(p.type).includes('research')) && hasTag(p, 'ongoing')).length,
      competitions: projects.filter(p => lower(p.type).includes('competition')).length,
      blogs: projects.filter(p => lower(p.type).includes('blog') || lower(p.type).includes('article') || lower(p.type).includes('website')).length,
      totalProjects: projects.filter(p => lower(p.type).includes('project')).length,
      liveDeployed: projects.filter(p => hasTag(p, 'live') || hasTag(p, 'deployed')).length,
      ongoingProjects: projects.filter(p => !lower(p.type).includes('paper') && hasTag(p, 'ongoing')).length,
    };
  }, [projects]);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => parseEndDate(b.duration).getTime() - parseEndDate(a.duration).getTime());
  }, [projects]);

  const allTags = Array.from(new Set(sortedProjects.flatMap((project) => project.tags || [])));
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mx-auto mb-5 w-14 h-14">
            <div className="absolute inset-0 rounded-full bg-blue-600/20 animate-ping" />
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/10">
              <Loader2 size={24} className="animate-spin text-blue-600" />
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading projects...</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Fetching from database</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto bg-white min-h-screen font-sans selection:bg-blue-100 overflow-x-hidden dark:selection:bg-blue-500/20 dark:bg-black">

      {/* --- RECRUITER CTA BANNER --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white py-4 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.08)_50%,transparent_75%)] bg-[length:250%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="font-bold text-lg mb-1 flex items-center gap-2">👋 Hiring for ML/AI roles? <Sparkles size={16} className="text-yellow-300" /></p>
            <p className="text-sm text-blue-100">5+ production projects · Top 0.5% Amazon ML · High-traffic systems · Available for Summer Internship 2026</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="/Arpit_Kumar_Resume.pdf"
              download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
              onClick={() => trackResumeDownload('projects_page_banner')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg flex items-center gap-2"
            >
              <FileText size={16} />
              Download Resume
            </a>
            <a
              href="https://calendly.com/kumararpit17773/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 ring-1 ring-white/10"
            >
              <Mail size={16} />
              Schedule Meeting
            </a>
          </div>
        </div>
      </motion.div>

      {/* --- REFINED DASHBOARD HEADER --- */}
      <header className="pt-14 pb-14 px-6 md:px-12 lg:px-20 border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-[#0a0a0a] dark:via-[#0d0d0d] dark:to-[#0a0f1a] dark:border-white/10 overflow-x-hidden relative">
        {/* Decorative background dots */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgb(37 99 235) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/25">
                  <Database size={18} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-blue-600">
                  Technical Portfolio
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black font-sans tracking-[-0.05em] leading-[0.85] uppercase">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">Shipped Systems</span>
                <br/>
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">& Research</span>
                <br/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Impact</span>
              </h1>
              <p className="mt-5 text-base text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Production ML, peer-reviewed research, and competition wins — measured in SLAs, cost savings, and real-world lift.
              </p>
            </motion.div>

            {/* Dynamic Dashboard Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 w-full lg:w-auto"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {[
                { label: "Total Entries", val: stats.total, icon: <History size={14}/> },
                { label: "Research Papers", val: stats.researchPapers, icon: <BookOpen size={14}/>, color: 'text-blue-600' },
                { label: "In-Flight Research", val: stats.ongoingResearch, icon: <Activity size={14}/>, color: 'text-orange-500' },
                { label: "Competition Podiums", val: stats.competitions, icon: <Trophy size={14}/>, color: 'text-yellow-600' },
                { label: "Production Projects", val: stats.totalProjects, icon: <Terminal size={14}/> },
                { label: "Live Systems Shipping", val: stats.liveDeployed, icon: <Cpu size={14}/>, color: 'text-green-600' },
                { label: "Active Development", val: stats.ongoingProjects, icon: <Zap size={14}/> },
                { label: "Technical Blogs", val: stats.blogs, icon: <FileText size={14}/> },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  className="group p-4 bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-w-[150px] cursor-default"
                >
                  <div className={`mb-2 ${stat.color || 'text-slate-600 dark:text-slate-300'} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-black font-sans text-slate-900 dark:text-white tracking-tight tabular-nums">{stat.val.toString().padStart(2, '0')}</div>
                    <div className="text-[9.5px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* --- STICKY COMMAND CENTER --- */}
      <div className="sticky top-0 z-50 bg-white/85 dark:bg-[#0a0a0a]/85 backdrop-blur-2xl border-b border-slate-100 dark:border-white/10 py-5 px-6 md:px-12 lg:px-20 shadow-sm shadow-slate-200/50 dark:shadow-none">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-5 items-center">
          <div className="relative flex-grow w-full group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <Terminal size={18} className="text-blue-600 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search projects, tech, tags..."
              className="w-full pl-14 pr-4 py-4 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 focus:bg-white dark:focus:bg-[#0f172a] outline-none transition-all font-mono text-sm placeholder:text-slate-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-200 border ${
                selectedTags.length > 0 || showFilters
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20 hover:bg-blue-700'
                  : 'bg-white dark:bg-[#161616] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              <Filter size={18} />
              <span>Filters</span>
              {selectedTags.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-mono">{selectedTags.length}</span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden mt-5 max-w-[1600px] mx-auto"
            >
              <div className="flex flex-wrap gap-2 p-5 bg-slate-50 dark:bg-[#0f172a] rounded-2xl border border-slate-100 dark:border-white/10">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                        : 'bg-white dark:bg-[#161616] text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-sm'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- Type Sections: Projects / Competitions / Research / Websites --- */}
      {
        (() => {
          const sections = [
            {
              key: 'project',
              label: 'Projects',
              title: 'Production ML Systems',
              desc: 'Production-grade ML systems that deliver measurable impact — 20–40% cost reduction, 10× faster decisions, and robust performance under real-world edge cases.',
              icon: <Activity size={18} className="text-blue-600" />
            },
            {
              key: 'competition',
              label: 'Competitions',
              title: 'Competition Highlights',
              desc: 'Top-tier placements in global ML competitions, showcasing applied machine learning skills, innovative feature engineering, and the ability to optimize models for real-world performance.',
              icon: <Trophy size={18} className="text-yellow-600" />
            },
            {
              key: 'research',
              label: 'Research',
              title: 'Research & Publications',
              desc: 'Peer-reviewed papers and applied research that bridge theory and scalable systems, including reproducible experiments and methodology notes.',
              icon: <BookOpen size={18} className="text-blue-600" />
            },
            {
              key: 'website',
              label: 'Websites',
              title: 'Websites & Blogs',
              desc: 'Personal and professional websites, blogs, and documentation for open-source projects — focused on clarity, design, and technical depth.',
              icon: <Globe size={18} className="text-green-600" />
            },
          ];

          return sections.map((sec, sectionIdx) => {
            const items = sortedProjects.filter(p => {
              const typeMatch = (p.type || '').toLowerCase().includes(sec.key);
              const searchMatch = searchTerm.trim() === '' || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
              const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => p.tags?.includes(tag));
              return typeMatch && searchMatch && tagMatch;
            });
            if (items.length === 0) return null;

            const headerLeft = (
              <div className="max-w-7xl">
                <div className="flex items-center gap-2.5 mb-4 ml-4">
                  <div className="p-2.5 bg-white dark:bg-[#161616] rounded-xl text-slate-800 dark:text-white shadow-sm border border-slate-100 dark:border-white/10">{sec.icon}</div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">{sec.label}</span>
                  <span className="ml-2 px-2 py-0.5 text-[9px] font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 rounded-full">{items.length}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black font-sans leading-tight ml-3 text-slate-900 dark:text-white tracking-tight mb-3">{sec.title}</h3>
                <p className="max-w-3xl text-base text-slate-500 dark:text-slate-400 font-sans ml-3 leading-relaxed">{sec.desc}</p>
              </div>
            );

            return (
              <motion.section
                key={sec.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: sectionIdx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="px-6 md:px-12 lg:px-20 mt-16 first:mt-12"
              >
                {sectionIdx > 0 && (
                  <div className="max-w-[1600px] mx-auto mb-10">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
                  </div>
                )}
                <div className="max-w-[1600px] mx-auto">
                  <ProjectCarousel projects={items} headerLeft={headerLeft} showGrid={true} />
                </div>
              </motion.section>
            );
          });
        })()
      }

      {/* --- REFINED RECRUITER CTA SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-6 mt-20 md:mx-12 lg:mx-20 mb-20"
      >
        <div className="max-w-[1600px] mx-auto relative overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border border-white/10 shadow-[0_40px_120px_-60px_rgba(2,132,199,0.7)]">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
               style={{ backgroundImage: `radial-gradient(${brandBlue} 1px, transparent 1px)`, backgroundSize: '36px 36px' }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 p-10 md:p-12 lg:p-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-300">Availability: Open for AI/ML Roles</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black font-sans tracking-tight mb-6 leading-[0.9]">
                Ship reliable ML systems that <span className="text-cyan-400">move revenue</span>.
              </h2>
              <p className="text-slate-300 text-lg md:text-xl font-medium font-sans max-w-xl leading-relaxed mb-8">
                I build production ML with clear SLAs, fast iteration loops, and measured lift. Expect 20-40% cost reduction, 10x faster decisions, and resilient deployments that hold under real traffic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <ShieldCheck size={16} className="text-cyan-400" />
                  <span className="font-mono uppercase tracking-widest text-[10px]">SLA-first reliability</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <Cpu size={16} className="text-emerald-400" />
                  <span className="font-mono uppercase tracking-widest text-[10px]">Production MLOps</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <Activity size={16} className="text-blue-400" />
                  <span className="font-mono uppercase tracking-widest text-[10px]">Measured impact</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <a href="https://calendly.com/kumararpit17773/30min" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-7 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] hover:from-cyan-400 hover:to-blue-500 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-2xl shadow-cyan-900/30">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-white/15 rounded-2xl group-hover:bg-white/25 transition-colors"><Mail size={24} /></div>
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-white/80 mb-1">Direct Channel</p>
                    <p className="text-xl font-black">Start a scoped discussion</p>
                  </div>
                </div>
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <Link to="/request-cv" className="group flex items-center justify-between p-7 bg-white text-slate-900 rounded-[2rem] hover:bg-slate-50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-xl">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-slate-900/5 rounded-2xl text-blue-600 group-hover:bg-blue-50 transition-colors"><Download size={24} /></div>
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Extended Resource Pack</p>
                    <p className="text-xl font-black">Get CV + Deep-Dives</p>
                  </div>
                </div>
                <FileText size={24} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </Link>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Cost', value: '20-40%' },
                  { label: 'Speed', value: '10x' },
                  { label: 'Uptime', value: 'SLA' },
                ].map((metric) => (
                  <div key={metric.label} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                    <div className="text-lg font-black text-white">{metric.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Verified Researcher @ IIT Kharagpur</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Projects;