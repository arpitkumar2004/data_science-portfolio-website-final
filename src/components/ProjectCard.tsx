import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, NotebookText, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../data/projectsData';

// Assuming Project type is defined elsewhere, e.g.:
// export interface Project {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   tags: string[];
//   githubLink?: string;
//   articleLink?: string;
// }

interface ProjectCardProps extends Project {
  liveDemoLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  type,
  githubLink,
  articleLink,
  liveDemoLink,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${id}`);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Tooltip component
  const Tooltip: React.FC<{ text: string }> = ({ text }) => (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full mb-2 px-3 py-1 bg-slate-800 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-10"
    >
      {text}
    </motion.div>
  );

  // Reusable Icon Button with Tooltip
  const IconWithTooltip: React.FC<{
    href: string;
    icon: React.ElementType;
    tooltipText: string;
  }> = ({ href, icon: Icon, tooltipText }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
      <a
        href={href}
        onClick={handleLinkClick}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center p-1 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <Icon size={20} />
        <AnimatePresence>
          {isHovered && <Tooltip text={tooltipText} />}
        </AnimatePresence>
      </a>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 h-full"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />

        {/* Type Tag */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold text-white rounded-md shadow-md z-10 ${
            type === 'Competition' ? 'bg-blue-500/80' :
            type === 'Project' ? 'bg-green-500/80' :
            type === 'Fest Website' ? 'bg-purple-500/80' :
            type === 'Portfolio Website' ? 'bg-orange-500/80' :
            type === 'Research Paper' ? 'bg-red-500/80' :
            type === 'Conference' ? 'bg-yellow-500/80' :
            'bg-gray-500/80'
          }`}
        >
          {type}
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-grow mb-4">
          {description}
        </p>

        {/* Footer with Links */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-200">
          <div className="flex items-center space-x-2"> {/* Reduced space-x to account for tooltip padding */}
            {githubLink && (
              <IconWithTooltip href={githubLink} icon={Github} tooltipText="GitHub" />
            )}
            {articleLink && (
              <IconWithTooltip href={articleLink} icon={NotebookText} tooltipText="Read Paper" />
            )}
            {liveDemoLink && (
              <IconWithTooltip href={liveDemoLink} icon={ExternalLink} tooltipText="Live Demo" />
            )}
          </div>
          <div className="flex items-center text-sm font-semibold text-blue-600">
            View Details
            <ArrowRight
              size={16}
              className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;