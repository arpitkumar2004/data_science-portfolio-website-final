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
      className="group flex flex-col bg-white rounded-[0.8rem] border-2 border-slate-100 overflow-hidden hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 cursor-pointer h-full relative"
    >
      {/* 1. IMAGE AREA */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* Type Badge - Top Left */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-white/40 flex items-center gap-2">
            <TypeIcon />
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.15em] text-slate-700">
              {type || "Project"}
            </span>
          </div>
        </div>

        {/* Reading Time Badge - Top Right */}
        <div className="absolute top-4 right-4">
          <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
            <Clock size={11} className="text-blue-400" />
            <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">{readingTime}</span>
          </div>
        </div>

        {/* Duration/Role Badge - Bottom Left (if exists) */}
        {(duration || role) && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            {duration && (
              <div className="bg-blue-600/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <Activity size={11} className="text-white" />
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">{duration}</span>
              </div>
            )}
            {role && (
              <div className="bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
                <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">{role}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter mb-3 leading-[1.1] group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description with better readability */}
        <p className="text-slate-600 text-[15px] leading-relaxed mb-5 line-clamp-3 font-medium">
          {description}
        </p>

        {/* Tech Stack Tags - Improved visibility */}
        {tags && tags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={12} className="text-blue-500" />
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 5).map((tag) => (
                <span 
                  key={tag} 
                  className="text-[10px] font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg uppercase tracking-wider hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 5 && (
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
                  +{tags.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5" />

        {/* 3. ACTION ZONE - Improved layout */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Primary CTA */}
          <Link
            to={`/projects/${String(id)}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-grow flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all hover:bg-blue-600 shadow-lg shadow-slate-900/20 hover:shadow-blue-600/40 group/btn"
          >
            <span>View Details</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {/* External Links */}
          <div className="flex gap-2 justify-center sm:justify-start">
            {githubLink && (
              <a 
                href={githubLink} 
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border-2 border-slate-200 text-slate-500 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all group/icon"
                title="Source Code"
              >
                <Github size={18} className="group-hover/icon:scale-110 transition-transform" />
              </a>
            )}
            {liveDemoLink && (
              <a 
                href={liveDemoLink} 
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border-2 border-slate-200 text-slate-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all group/icon"
                title="Live Demo"
              >
                <ExternalLink size={18} className="group-hover/icon:scale-110 transition-transform" />
              </a>
            )}
            {articleLink && (
              <a 
                href={articleLink} 
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border-2 border-slate-200 text-slate-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all group/icon"
                title="Article"
              >
                <FileText size={18} className="group-hover/icon:scale-110 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Corner Accent - Subtle design element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;