import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Terminal, 
  Cpu, 
  ArrowUpRight, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { SiKaggle, SiMedium } from 'react-icons/si';

const Footer: React.FC = () => {
  const brandBlue = "rgb(37 99 235)";

  const GoogleScholar = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
    </svg>
  );

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 overflow-hidden relative">
      {/* Subtle Technical Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${brandBlue} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="container max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 max">
          
          {/* Column 1: Identity & Research Statement (4/12) */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <Terminal size={20} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">Arpit Kumar</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
              Specializing in the intersection of Deep Learning and Engineering Systems. 
              Developing scalable AI solutions at <span className="text-white font-bold">IIT Kharagpur</span>.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <Mail size={14} className="text-blue-500" />
                <a href="mailto:kumararpit17773@gmail.com" className="hover:text-white transition-colors">kumararpit17773@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <MapPin size={14} className="text-blue-500" />
                <span>Lucknow / IIT Kharagpur, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation (2/12) */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Archive</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/" className="text-slate-400 hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-slate-400 hover:text-blue-500 transition-colors">Research</Link></li>
              <li><Link to="/request-cv" className="text-slate-400 hover:text-blue-500 transition-colors">Technical Dossier</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-blue-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Research Footprint (3/12) */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Research Footprint</h4>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://github.com/arpitkumar2004" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                <Github size={16} /> GitHub <ArrowUpRight size={12} className="opacity-40" />
              </a>
              <a href="https://www.linkedin.com/in/arpit-kumar-shivam/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                <Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} className="opacity-40" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                <GoogleScholar /> Scholar <ArrowUpRight size={12} className="opacity-40" />
              </a>
              <a href="https://www.kaggle.com/kumararpitiitkgp" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                <SiKaggle size={16} /> Kaggle <ArrowUpRight size={12} className="opacity-40" />
              </a>
              <a href="https://medium.com/@kumararpit17773" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
                <SiMedium size={16} /> Medium <ArrowUpRight size={12} className="opacity-40" />
              </a>
            </div>
          </div>

          {/* Column 4: System Info (3/12) */}
          <div className="lg:col-span-3">
            <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
              <h4 className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest mb-4">Availability</h4>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-tighter">Open for Research Roles</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                Currently specializing in Applied ML at IIT KGP. Seeking opportunities in R&D and Quantitative Finance.
              </p>
              <Link to="/request-cv" className="mt-6 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-white border-t border-slate-700 pt-4 hover:text-blue-500 transition-colors">
                Get complete PDF CV <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: System Status & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" />
              <span>Verified Researcher</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-slate-700" />
              <span>Build v4.0.1 // {new Date().getFullYear()}</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            © {new Date().getFullYear()} Arpit Kumar // Engineered with React & Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;