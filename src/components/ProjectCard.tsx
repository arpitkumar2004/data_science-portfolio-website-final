import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Github, 
  ArrowRight, 
  Clock, 
  FileText, 
  Microscope,
  Code2,
  Terminal,
  Activity,
  Search,
  Database,
  ExternalLink
} from 'lucide-react';

// Technical Interface
interface ProjectCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  type?: string;
  tags?: string[];
  githubLink?: string;
  articleLink?: string;
  liveDemoLink?: string;
  readingTime?: string;
  duration?: string;
  role?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  type,
  tags,
  githubLink,
  articleLink,
  liveDemoLink,
  duration,
  role,
  readingTime = "5 min read",
}) => {
  const navigate = useNavigate();
  const brandBlue = "rgb(37 99 235)";

  const handleCardClick = () => navigate(`/projects/${String(id)}`);
  const handleLinkClick = (e: React.MouseEvent) => e.stopPropagation();

  const TypeIcon = () => {
    const t = type?.toLowerCase() || '';
    if (t.includes('paper') || t.includes('research')) return <Microscope size={12} />;
    if (t.includes('competition')) return <Activity size={12} />;
    return <Code2 size={12} />;
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 cursor-pointer h-full relative"
    >
      {/* 1. IMAGE AREA (Grayscale to Color Interaction) */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* Dossier Badge */}
        <div className="absolute top-5 left-5">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/20 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-800">
              {type || "Technical Build"}
            </span>
          </div>
        </div>

        
      </div>

      {/* 2. CORE INFORMATION SECTION */}
      <div className="p-8 flex flex-col flex-grow">
        
        {/* Meta Stats Row */}
        <div className="flex justify-between items-center mb-6 font-mono">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              <TypeIcon /> {type}
            </div>
            {duration && (
               <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{duration}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock size={12} />
            <span className="text-[10px] font-black uppercase">{readingTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-4 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Technical Summary Header */}
        <div className="flex items-center gap-2 mb-3">
            <Terminal size={14} className="text-slate-300" />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Executive Abstract</span>
        </div>
        
        {/* Comprehensive Description (responsive clamp for readability) */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 md:line-clamp-6 mb-6 font-medium">
          {description}
        </p>

        {/* Tech DNA Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags?.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-[0.2em] border border-slate-100 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

        {/* --- SEPARATOR LINE --- */}
        <div className="w-full h-px bg-slate-100 mb-6 mt-auto" />

        {/* 3. ACTION ZONE */}
        <div className="flex items-center gap-3">
          <Link
            to={`/projects/${String(id)}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-grow flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-blue-600 shadow-xl shadow-slate-200 hover:shadow-blue-900/30 group/btn"
          >
            <span>Read More</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          <div className="flex gap-2">
            {githubLink && (
              <a 
                href={githubLink} 
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm group/icon"
                title="Git Source"
              >
                <Github size={20} className="group-hover/icon:scale-110 transition-transform" />
              </a>
            )}
            {liveDemoLink && (
              <a 
                href={liveDemoLink} 
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm group/icon"
                title="Live Demonstration"
              >
                <ExternalLink size={20} className="group-hover/icon:scale-110 transition-transform" />
              </a>
            )}
            {articleLink && (
              <a 
                href={articleLink} 
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border border-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm group/icon"
                title="Full Documentation"
              >
                <FileText size={20} className="group-hover/icon:scale-110 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;