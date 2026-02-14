import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import ProjectCarousel from '../components/ProjectCarousel';
import { Filter, Database, Terminal, History, BookOpen, Trophy, Globe, Cpu, Activity, Zap, FileText, Download, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [layout, setLayout] = useState<'list' | 'grid-2' | 'grid-3'>('grid-2');
  const [showFilters, setShowFilters] = useState(false);

  const brandBlue = "rgb(37 99 235)";

  // --- DYNAMIC STATISTICS CALCULATION ---
  const stats = useMemo(() => {
    const lower = (str: string | undefined) => str?.toLowerCase() || '';
    const hasTag = (p: any, tag: string) => p.tags?.some((t: string) => lower(t).includes(tag));

    return {
      total: projects.length,
      researchPapers: projects.filter(p => lower(p.type).includes('paper') || lower(p.type).includes('research')).length,
      ongoingResearch: projects.filter(p => (lower(p.type).includes('paper') || lower(p.type).includes('research')) && hasTag(p, 'ongoing')).length,
      competitions: projects.filter(p => lower(p.type).includes('competition')).length,
      blogs: projects.filter(p => lower(p.type).includes('blog') || lower(p.type).includes('article')|| lower(p.type).includes('website')).length,
      totalProjects: projects.filter(p => lower(p.type).includes('project')).length,
      liveDeployed: projects.filter(p => hasTag(p, 'live') || hasTag(p, 'deployed')).length,
      ongoingProjects: projects.filter(p => !lower(p.type).includes('paper') && hasTag(p, 'ongoing')).length,
    };
  }, []);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => parseEndDate(b.duration).getTime() - parseEndDate(a.duration).getTime());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setLayout('list');
      else if (window.innerWidth < 1280) setLayout('grid-2');
      else setLayout('grid-3');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allTags = Array.from(new Set(sortedProjects.flatMap((project) => project.tags)));
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="max-w-8xl mx-auto bg-white min-h-screen font-sans selection:bg-blue-100 overflow-x-hidden dark:selection:bg-blue-500/20 dark:bg-black">
      
      {/* --- RECRUITER CTA BANNER --- */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white py-4 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="font-bold text-lg mb-1">👋 Hiring for ML/AI roles?</p>
            <p className="text-sm text-blue-100">15+ production projects • Top 0.5% Amazon ML • 50k+ users served • Available May 2027</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="/Arpit_Kumar_Resume.pdf"
              download="Arpit_Kumar_IIT_KGP_ML_Engineer.pdf"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2"
            >
              <FileText size={16} />
              Download Resume
            </a>
            <Link
              to="/contact"
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Mail size={16} />
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* --- REFINED DASHBOARD HEADER --- */}
      <header className="pt-12 pb-12 px-6 md:px-12 lg:px-20 border-b border-slate-100 bg-slate-50/30 dark:bg-white/5 dark:border-white/10 overflow-x-hidden relative ">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-12">
            <div className="max-w-4xl">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
                  <Database size={18} />
                </div>
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-blue-600">
                  Technical Portfolio
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-black font-sans text-slate-900 tracking-[-0.05em] leading-[0.85] uppercase">
                Shipped Systems<br/> & Research<br/> Impact
              </h1>
            </div>

            {/* Dynamic Dashboard Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full lg:w-auto">
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
                <div key={i} className="p-4 bg-white dark:bg-[#161616] border border-slate-400 dark:border-white/10 rounded-2xl shadow-sm flex flex-col justify-between min-w-[150px]">
                  <div className={`mb-2 ${stat.color || 'text-slate-900'}`}>{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-black font-sans text-slate-900 tracking-tight">{stat.val.toString().padStart(2, '0')}</div>
                    <div className="text-[9.5px] font-mono font-bold text-slate-900 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* --- STICKY COMMAND CENTER ---
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/10 py-6 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Terminal size={18} className="text-blue-600" />
            </div>
            <input
              type="text"
              placeholder="Query technical repository..."
              className="w-full pl-16 pr-4 py-4 bg-grey-50 dark:bg-[#111827] border border-slate-100 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-mono text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all border ${
                selectedTags.length > 0 || showFilters ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white dark:bg-[#161616] text-slate-900 dark:text-slate-100 border-slate-200 dark:border-white/10'
              }`}
            >
              <Filter size={18} />
              <span>Filters</span>
              {selectedTags.length > 0 && <span className="ml-1 px-2 py-0.5 bg-white/20 rounded text-[10px]">{selectedTags.length}</span>}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-6 max-w-[1600px] mx-auto">
              <div className="flex flex-wrap gap-2 p-6 bg-slate-50 dark:bg-[#0f172a] rounded-[2.5rem] border border-slate-100 dark:border-white/10">
                {allTags.map((tag) => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${selectedTags.includes(tag) ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-[#161616] text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-blue-600'}`}>
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}

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
              desc: 'High-impact challenge solutions and benchmarked prototypes — concise technical writeups and award-winning implementations.',
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
              title: 'Demos & Writeups',
              desc: 'Interactive demos, technical blog posts, and deployment guides with reproducible artifacts and implementation tips.',
              icon: <Globe size={18} className="text-green-600" />
            },
          ];

          return sections.map((sec) => {
            const items = sortedProjects.filter(p => {
              const typeMatch = (p.type || '').toLowerCase().includes(sec.key);
              const searchMatch = searchTerm.trim() === '' || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
              const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => p.tags?.includes(tag));
              return typeMatch && searchMatch && tagMatch;
            });
            if (items.length === 0) return null;

            const headerLeft = (
              <div className="max-w-9xl">
                <div className="flex items-center gap-2 mb-4 ml-4">
                  <div className="p-2 bg-white rounded-lg text-slate-800 shadow-sm">{sec.icon}</div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-slate-600">{sec.label}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black font-sans leading-tight ml-3 text-slate-900 tracking-tight mb-4">{sec.title}</h3>
                <p className="max-w-8xl text-md text-slate-500 font-sans ml-3">{sec.desc}</p>
              </div>
            );

            return (
              <section key={sec.key} className="px-6 md:px-12 lg:px-20 mt-12">
                <div className="max-w-[1600px] mx-auto">
                  <ProjectCarousel projects={items} headerLeft={headerLeft} showGrid={true} />
                </div>
              </section>
            );
          });
        })()
      }

      {/* --- REFINED RECRUITER CTA SECTION --- */}
      <section className="mx-6 mt-16 md:mx-12 lg:mx-20 mb-20">
        <div className="max-w-[1600px] mx-auto relative overflow-hidden rounded-[2.75rem] bg-slate-950 text-white border border-white/10 shadow-[0_40px_120px_-60px_rgba(2,132,199,0.85)]">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
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
              <Link to="/contact" className="group flex items-center justify-between p-7 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] hover:from-cyan-400 hover:to-blue-500 transition-all shadow-2xl shadow-cyan-900/30">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-white/15 rounded-2xl"><Mail size={24} /></div>
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-white/80 mb-1">Direct Channel</p>
                    <p className="text-xl font-black">Start a scoped discussion</p>
                  </div>
                </div>
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link to="/request-cv" className="group flex items-center justify-between p-7 bg-white text-slate-900 rounded-[2rem] hover:bg-slate-50 transition-all shadow-xl">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-slate-900/5 rounded-2xl text-blue-600"><Download size={24} /></div>
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Technical Dossier</p>
                    <p className="text-xl font-black">Get the technical CV</p>
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
      </section>
    </div>
  );
};

export default Projects;