import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Github,
  ArrowRight,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";

interface ProjectCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  type?: string;
  standings?: string;
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
  tags,
  githubLink,
  articleLink,
  liveDemoLink,
  role,
  duration,
  type,
  standings,
  readingTime = "5 min read",
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/projects/${String(id)}`);
  const handleLinkClick = (e: React.MouseEvent) => e.stopPropagation();
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col bg-white dark:bg-[#0a0a0a] border border-slate-900/10 dark:border-white/10 rounded-xl overflow-hidden cursor-pointer h-full will-change-transform transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_18px_50px_-40px_rgba(15,23,42,0.45)] dark:shadow-[0_18px_50px_-40px_rgba(2,6,23,0.9)] hover:shadow-[0_24px_70px_-35px_rgba(37,99,235,0.25)] hover:border-blue-600/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500/70 focus-visible:outline-offset-2"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/12 via-blue-600/0 to-transparent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      {/* 1. VISUAL HEADER - Editorial Style */}
      <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-[#111827]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* Standings Badge */}
        {type === "Competition" && standings && (
          <div className="absolute top-3 right-3 z-20">
            {standings === "Gold" && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 text-xs font-black rounded-full shadow-lg">
                🥇 {standings}
              </div>
            )}
            {standings === "Silver" && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-gray-300 to-gray-400 text-slate-900 text-xs font-black rounded-full shadow-lg">
                🥈 {standings}
              </div>
            )}
            {standings === "Bronze" && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-slate-900 text-xs font-black rounded-full shadow-lg">
                🥉 {standings}
              </div>
            )}
            {standings === "Platinum" && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-300 to-blue-400 text-slate-900 text-xs font-black rounded-full shadow-lg">
                💎 {standings}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. CORE INFORMATION */}
      <div className="relative z-10 p-6 flex flex-col flex-grow bg-white/85 dark:bg-[#0a0a0a]/85 backdrop-blur-md border-t border-white/40 dark:border-white/10">
        {/* Metadata Row */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest">
              {role || "Contributor"} 
            </span>
            <span className="text-[9px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
              {duration || "2024"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
            <Clock size={12} />
            <span className="text-[9px] font-mono font-bold uppercase">
              {readingTime}
            </span>
          </div>
        </div>

        {/* Title & Abstract */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-3 leading-tight transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-blue-600">
          {title}
        </h3>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2 font-medium transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-slate-600 dark:group-hover:text-slate-300">
          {description}
        </p>

        {/* Technology DNA */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/80 dark:bg-[#161616]/80 border border-slate-100/80 dark:border-white/10 rounded text-[8px] font-mono font-bold text-slate-400 dark:text-slate-500 tracking-widest transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-blue-600 group-hover:border-blue-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* --- ACTION ZONE SEPARATOR --- */}
        <div className="w-full h-px bg-slate-100/80 dark:bg-white/10 mb-5 mt-auto" />

        {/* 3. BUTTON MATRIX */}
        <div className="flex items-center justify-between gap-4">
          {/* Primary Conversion Button */}
          <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-blue-600 shadow-lg shadow-slate-200 dark:shadow-blue-900/40 hover:shadow-blue-900/25 group/btn">
            <span>View Project</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
            />
          </button>

          {/* Secondary Inline Links */}
          <div className="flex items-center gap-3">
            {githubLink && (
              <a
                href={githubLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-blue-600 transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                title="Source Repository"
              >
                <Github size={18} />
              </a>
            )}
            {articleLink && (
              <a
                href={articleLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-blue-600 transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                title="Full Documentation"
              >
                <FileText size={18} />
              </a>
            )}
            {liveDemoLink && (
              <a
                href={liveDemoLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-blue-600 transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                title="Live System"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;