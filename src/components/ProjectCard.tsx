import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Github,
  ArrowRight,
  FileText,
  ExternalLink,
} from "lucide-react";
import { trackProjectView } from "../utils/analytics";

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
}) => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Track mouse position for cursor-following animation
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleCardClick = () => {
    trackProjectView(Number(id), title, 'card_click');
    navigate(`/projects/${String(id)}`);
  };
  const handleLinkClick = (e: React.MouseEvent) => e.stopPropagation();
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden cursor-pointer h-full transition-all duration-300 ease-out shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
    >
      {/* Radial blue fill animation from cursor position */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(37, 99, 235, 1) 0%, 
            rgb(9, 83, 240) 15%, 
            rgb(37, 117, 247) 30%, 
            rgb(60, 145, 248) 50%,
            rgba(110, 177, 253, 0.95) 70%,
            transparent 85%)`,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scale(3)' : 'scale(0.3)',
          transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out',
        }}
      />
      
      {/* Subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none z-[1]" />
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 z-10">
        <img
          src={image}
          alt={title}
          width={800}
          height={600}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Standings Badge */}
        {type === "Competition" && standings && (
          <div className="absolute top-3 right-3 z-20">
            {standings === "Gold" && (
              <div className="px-3 py-1.5 bg-yellow-400 text-slate-900 text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm">
                🥇 {standings}
              </div>
            )}
            {standings === "Silver" && (
              <div className="px-3 py-1.5 bg-gray-300 text-slate-900 text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm">
                🥈 {standings}
              </div>
            )}
            {standings === "Bronze" && (
              <div className="px-3 py-1.5 bg-orange-400 text-slate-900 text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm">
                🥉 {standings}
              </div>
            )}
            {standings === "Platinum" && (
              <div className="px-3 py-1.5 bg-cyan-400 text-slate-900 text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm">
                💎 {standings}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="relative z-10 p-6 flex flex-col flex-grow">
        {/* Metadata */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors duration-300">
            {role || "Contributor"}
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-500 group-hover:text-blue-100 transition-colors duration-300">
            {duration || "2024"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:text-white transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 border border-transparent transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 group-hover:border-white/20 transition-colors duration-300">
          {/* View Project Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold text-sm transition-all duration-300 group-hover:bg-white group-hover:text-blue-600 group-hover:scale-105 group/btn">
            <span>View Details</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </button>

          {/* Quick Links */}
          <div className="flex items-center gap-3">
            {githubLink && (
              <a
                href={githubLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 group-hover:text-white transition-colors duration-300"
                title="Source Repository"
              >
                <Github size={20} />
              </a>
            )}
            {articleLink && (
              <a
                href={articleLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 group-hover:text-white transition-colors duration-300"
                title="Full Documentation"
              >
                <FileText size={20} />
              </a>
            )}
            {liveDemoLink && (
              <a
                href={liveDemoLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 group-hover:text-white transition-colors duration-300"
                title="Live System"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;