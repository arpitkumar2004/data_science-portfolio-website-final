import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import { 
  Search, Filter, X, LayoutGrid, List, Columns, 
  Database, Terminal, History, BookOpen, Trophy, 
  Globe, Cpu, Activity, Zap, FileText, Download, 
  Mail, ArrowUpRight, ShieldCheck 
} from 'lucide-react';
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

  const filteredProjects = sortedProjects.filter(
    (project) =>
      (project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       project.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag)))
  );

  const allTags = Array.from(new Set(sortedProjects.flatMap((project) => project.tags)));
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="max-w-8xl mx-auto bg-white min-h-screen font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* --- REFINED DASHBOARD HEADER --- */}
      <header className="pt-12 pb-12 px-6 md:px-12 lg:px-20 border-b border-slate-100 bg-slate-50/30 overflow-x-hidden relative ">
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
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-[-0.05em] leading-[0.85] uppercase">
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
                <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between min-w-[150px]">
                  <div className={`mb-2 ${stat.color || 'text-slate-400'}`}>{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.val.toString().padStart(2, '0')}</div>
                    <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* --- STICKY COMMAND CENTER --- */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Terminal size={18} className="text-blue-600" />
            </div>
            <input
              type="text"
              placeholder="Query technical repository..."
              className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-mono text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all border ${
                selectedTags.length > 0 || showFilters ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              <Filter size={18} />
              <span>Filters</span>
              {selectedTags.length > 0 && <span className="ml-1 px-2 py-0.5 bg-white/20 rounded text-[10px]">{selectedTags.length}</span>}
            </button>

            <div className="hidden lg:flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1">
                <button onClick={() => setLayout('list')} className={`p-3 rounded-xl transition-all ${layout === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><List size={20} /></button>
                <button onClick={() => setLayout('grid-2')} className={`p-3 rounded-xl transition-all ${layout === 'grid-2' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><LayoutGrid size={20} /></button>
                <button onClick={() => setLayout('grid-3')} className={`p-3 rounded-xl transition-all ${layout === 'grid-3' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><Columns size={20} /></button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-6 max-w-[1600px] mx-auto">
              <div className="flex flex-wrap gap-2 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                {allTags.map((tag) => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${selectedTags.includes(tag) ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-600'}`}>
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- PROJECT GRID --- */}
      <main className="px-6 md:px-12 lg:px-20 py-16 max-w-[1600px] mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-slate-600 leading-relaxed">
            Production systems that reduced costs by 20-40%, accelerated decisions by 10x, and survived real-world edge cases. Each entry includes methodology, live metrics, and deployment lessons.
          </p>
        </div>
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div layout className={layout === 'list' ? 'flex flex-col gap-12' : layout === 'grid-2' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
              {filteredProjects.map((project) => (
                <motion.div key={project.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="group relative">
                  <div className="absolute -top-6 left-0 font-mono text-[9px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-[0.2em]">
                    Log_Entry_Ref: {String(project.id).padStart(3, '0')}
                  </div>
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-32 text-center">
              <History size={48} className="mx-auto text-slate-300 mb-6" />
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Null Set Returned</h3>
              <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">No matching entries found.</p>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* --- REFINED RECRUITER CTA SECTION --- */}
      <section className="mx-6 md:mx-12 lg:mx-20 mb-20">
        <div className="max-w-[1600px] mx-auto bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden group/cta">
          {/* Subtle Technical Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(${brandBlue} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-300">System Status: Available for Collaboration</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                Scale Revenue with <span className="text-blue-500">Production ML</span>.
              </h2>
              <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed mb-10">
                Hiring for AI/ML? Need help shipping production systems? I deliver 20-40% cost reduction, 10x faster decisions, and resilient models with defined SLAs. Let's align on metrics.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <Link to="/contact" className="group flex items-center justify-between p-8 bg-blue-600 rounded-[2rem] hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/40">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl"><Mail size={24} /></div>
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-100 mb-1">Direct Channel</p>
                    <p className="text-xl font-black">Initiate Discussion</p>
                  </div>
                </div>
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link to="/request-cv" className="group flex items-center justify-between p-8 bg-white text-slate-900 rounded-[2rem] hover:bg-slate-50 transition-all shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-slate-900/5 rounded-2xl text-blue-600"><Download size={24} /></div>
                  <div className="text-left">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Technical Dossier</p>
                    <p className="text-xl font-black">Get Technical CV</p>
                  </div>
                </div>
                <FileText size={24} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </Link>

              <div className="flex items-center gap-2 mt-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                <ShieldCheck size={16} className="text-blue-500" />
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