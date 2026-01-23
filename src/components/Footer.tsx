import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Github, Linkedin, Mail, MapPin, Terminal, 
  Cpu, ArrowUpRight, ShieldCheck, ExternalLink,
  ChevronUp, Activity, Database, Fingerprint,
  Clock, Zap, Microscope, BookOpen, Code2, Globe,
  FileText, Command, Layout
} from 'lucide-react';
import { SiKaggle, SiMedium, SiArxiv } from 'react-icons/si';

const Footer: React.FC = () => {
  const brandBlue = "rgb(37 99 235)";
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [userRole, setUserRole] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState(211);

  useEffect(() => {
    const read = () => setUserRole(localStorage.getItem('userRole'));
    read();
    window.addEventListener('storage', read);
    window.addEventListener('role:updated', read);
    return () => {
      window.removeEventListener('storage', read);
      window.removeEventListener('role:updated', read);
    };
  }, []);

  useEffect(() => {
    // 1. System Clock (Real-time updates)
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

    // 2. Anti-Refresh Visitor Logic (Session Protected)
    const sessionToken = sessionStorage.getItem('arpit_session_counted');
    const persistentLogCount = Number(localStorage.getItem('arpit_total_access_logs')) || 211;

    if (!sessionToken) {
      // First time in this browser session
      const newLogCount = persistentLogCount + 1;
      localStorage.setItem('arpit_total_access_logs', newLogCount.toString());
      sessionStorage.setItem('arpit_session_counted', 'true');
      setVisitorCount(newLogCount);
    } else {
      // Already counted this session - remain static
      setVisitorCount(persistentLogCount);
    }

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const GoogleScholar = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
    </svg>
  );

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 overflow-hidden relative border-t border-white/5">
      {/* Background Technical Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${brandBlue} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-20">
          
          {/* COLUMN 1: IDENTITY & SYSTEM LOGS (4/12) */}
          <div className="lg:col-span-3 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/20 group-hover:rotate-12 transition-transform">
                <Terminal size={24} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">Arpit Kumar</span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              <span className="font-bold">ML Systems Engineer & Applied Researcher</span> at IIT Kharagpur. Building production-grade deep learning systems with measurable ROI in real-world applications. Expertise: cloud architecture, MLOps, distributed systems, research translation.
            </p>

            {/* Unique Visitor Log Counter */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl inline-flex gap-6 items-center">
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter mb-1 font-bold">Visitors Count</p>
                <p className="text-lg font-black font-mono text-blue-500 tracking-widest">{visitorCount.toString().padStart(6, '0')}</p>
              </div>
              <div className="w-px bg-white/10 h-8" />
              <div>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter mb-1 font-bold">Local_Time</p>
                <p className="text-sm font-black font-mono text-slate-300 uppercase">{time}</p>
              </div>
            </div>
          </div>

          

          {/* COLUMN 2: OBJECTIVE HUB (4/12) */}
          <div className="lg:col-span-3">
            <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-[2rem] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Zap size={40} className="text-blue-500 animate-pulse" />
                  <h4 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-blue-500">Seeking High-Impact Roles</h4>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <ShieldCheck size={20} className="text-blue-500 mt-0.5" />
                    <p className="text-xs font-bold font-mono text-slate-200 tracking-tight">Summer 2026 Internships <span className="block text-[10px] text-slate-500 font-normal normal-case mt-1">Industrial R&D, MNC ML teams—production systems, cost optimization, scalable infrastructure</span></p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Microscope size={20} className="text-blue-500 mt-0.5" />
                    <p className="text-xs font-bold font-mono text-slate-200 tracking-tight">Research Partnerships <span className="block text-[10px] text-slate-500 font-normal normal-case mt-1">Deep learning, MLOps, latency optimization, adversarial robustness—academia & industry</span></p>
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="flex items-center justify-between w-full bg-blue-600 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all">
                Initiate Secure Inquiry <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* COLUMN 2: INTERNAL REDIRECTS (SITE MAP) (2/12) */}
          <div className="lg:col-span-2 ml-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <Microscope size={14} className="text-blue-500" />
              <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Repository</h4>
            </div>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><Link to="/" className="text-slate-400 hover:text-blue-500 flex items-center gap-2 transition-colors group"><Layout size={14} className="group-hover:scale-110 transition-transform"/> Home</Link></li>
              <li><Link to="/projects" className="text-slate-400 hover:text-blue-500 flex items-center gap-2 transition-colors group"><Microscope size={14} className="group-hover:scale-110 transition-transform"/> Research</Link></li>
              <li><Link to="/aboutme" className="text-slate-400 hover:text-blue-500 flex items-center gap-2 transition-colors group"><Fingerprint size={14} className="group-hover:scale-110 transition-transform"/> About Me</Link></li>
              <li><Link to="/request-cv" className="text-slate-400 hover:text-blue-500 flex items-center gap-2 transition-colors group"><FileText size={14} className="group-hover:scale-110 transition-transform"/> Credentials</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-blue-500 flex items-center gap-2 transition-colors group"><Mail size={14} className="group-hover:scale-110 transition-transform"/> Contact</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: EXTERNAL NODES (6/12) */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            
            {/* Sub-Col: Research Inter-links */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Microscope size={14} className="text-blue-500" />
                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Research Nodes</h4>
              </div>
              <div className="flex flex-col gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center justify-between font-bold text-xs bg-white/5 p-3 rounded-xl border border-transparent hover:border-blue-500/20">
                  <div className="flex items-center gap-2"><GoogleScholar /> Google Scholar</div>
                  <ArrowUpRight size={12}/>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center justify-between font-bold text-xs bg-white/5 p-3 rounded-xl border border-transparent hover:border-blue-500/20">
                  <div className="flex items-center gap-2"><SiArxiv size={14}/> arXiv Portfolio</div>
                  <ArrowUpRight size={12}/>
                </a>
                <a href="https://www.kaggle.com/kumararpitiitkgp" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center justify-between font-bold text-xs bg-white/5 p-3 rounded-xl border border-transparent hover:border-blue-500/20">
                  <div className="flex items-center gap-2"><SiKaggle size={14}/> Kaggle Master</div>
                  <ArrowUpRight size={12}/>
                </a>
              </div>
            </div>

            {/* Sub-Col: Technical Inter-links */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Code2 size={14} className="text-blue-500" />
                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Technical Nodes</h4>
              </div>
              <div className="flex flex-col gap-3">
                <a href="https://github.com/arpitkumar2004" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center justify-between font-bold text-xs bg-white/5 p-3 rounded-xl border border-transparent hover:border-blue-500/20">
                  <div className="flex items-center gap-2"><Github size={14}/> GitHub Source</div>
                  <ArrowUpRight size={12}/>
                </a>
                <a href="https://linkedin.com/in/arpit-kumar-shivam" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center justify-between font-bold text-xs bg-white/5 p-3 rounded-xl border border-transparent hover:border-blue-500/20">
                  <div className="flex items-center gap-2"><Linkedin size={14}/> LinkedIn Prof.</div>
                  <ArrowUpRight size={12}/>
                </a>
                <a href="https://medium.com/@kumararpit17773" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors flex items-center justify-between font-bold text-xs bg-white/5 p-3 rounded-xl border border-transparent hover:border-blue-500/20">
                  <div className="flex items-center gap-2"><SiMedium size={14}/> Medium Articles</div>
                  <ArrowUpRight size={12}/>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Professional Status Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <ShieldCheck size={14} className="text-blue-500" />
              <span className="text-[9px] font-mono font-bold text-blue-500 uppercase tracking-widest">Production_Systems: 50K+ Users | 99.9% SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-slate-700" />
              <span className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">Stack: React_v18 | Node.js | Kubernetes | PostgreSQL</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-green-500 animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-green-500 uppercase tracking-widest">Status: READY_FOR_R&D | OPEN_TO_INTERNSHIPS_2026</span>
            </div>
          </div>

          {/* System Control (Back to top) & Copyright */}
          <div className="flex items-center gap-8">
            {/* Role control (moves from header to footer) */}
            <button
              onClick={() => window.dispatchEvent(new Event('role:open'))}
              aria-label={userRole ? `Current role ${userRole}. Click to change.` : 'Set viewing role'}
              title={userRole ? `Viewing as ${userRole} — click to change` : 'Set viewing role'}
              className="flex items-center gap-2 text-[9px] font-mono font-bold text-slate-300 hover:text-white transition-all uppercase group bg-white/5 px-4 py-2 rounded-lg border border-transparent hover:border-blue-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Fingerprint size={14} className="text-blue-400" />
              <span>{userRole ?? 'Set role'}</span>
            </button>

            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[9px] font-mono font-bold text-slate-500 hover:text-white transition-all uppercase group bg-white/5 px-4 py-2 rounded-lg border border-transparent hover:border-blue-500/30"
            >
              <ChevronUp size={14} className="group-hover:-translate-y-1 transition-transform" />
              Reset System View
            </button>
            <div className="text-right text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">
              © {new Date().getFullYear()} Arpit Kumar // All Rights Reserved
            </div>
          </div>
        </div>
      </div>

      {/* Visual Terminal Progress Glow */}
      <div className="absolute bottom-0 left-0 h-1 bg-blue-600 w-full shadow-[0_0_20px_rgba(37,99,235,1)] opacity-70" />
    </footer>
  );
};

export default Footer;