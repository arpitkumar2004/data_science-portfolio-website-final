import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  Github,
  ArrowRight,
  Clock,
  FileText,
  ExternalLink,
  Code2,
  Database,
} from "lucide-react";

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
  role,
  duration,
  readingTime = "5 min read",
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/projects/${String(id)}`);
  const handleLinkClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      onClick={handleCardClick}
      className="group flex flex-col bg-white border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 cursor-pointer h-full"
    >
      {/* 1. IMAGE AREA - Minimalist & Focused */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle Overlay only on hover */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-300" />

        {/* Simplified Type Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-slate-800 rounded shadow-sm border border-slate-200">
            {type || "Project"}
          </span>
        </div>
      </div>

      {/* 2. CONTENT SECTION - Spaced & Clean */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest">
            {id.toString().padStart(2, "0")} •{" "}
            {role?.toString() || "Contributor"} •{" "}
            {duration || "Jan 2023 - Present"}
          </span>
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={10} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {readingTime}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Minimal Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold text-slate-400 uppercase"
            >
              • {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between hover:mt-auto transition-all group-hover:border-blue-500">
          {/* Main Action */}
          <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-all">
            Open Dossier{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* Icon Actions */}
          <div className="flex gap-3">
            {githubLink && (
              <a
                href={githubLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                title="View Code on GitHub"
                className="text-slate-400 hover:text-white hover:bg-black hover:bg-opacity-70 p-1 rounded-md transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {liveDemoLink && (
              <a
                href={liveDemoLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                title="View Live Demo"
                className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {articleLink && (
              <a
                href={articleLink}
                onClick={handleLinkClick}
                target="_blank"
                rel="noreferrer"
                title="Read Article"
                className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded"
              >
                <FileText size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
