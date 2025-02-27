import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github,NotebookText, ExternalLink, ArrowRight,} from 'lucide-react';
import { Project } from '../data/projectsData';

// Add new props to the component
interface ProjectCardProps {
  liveDemoLink?: string;
}

const ProjectCard: React.FC<Project & ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  tags,
  githubLink,
  articleLink,
  liveDemoLink,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer relative border-2 border-transparent hover:border-gradient-primary"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
      </div>
  
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {description}
        </p>
  
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm font-light text-blue-500 bg-blue-50 rounded-full transition-colors hover:bg-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
  
        <div className="flex items-center justify-between pt-4">
          <div className="flex space-x-4">
            {githubLink && (
              <a
                href={githubLink}
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            )}
            {articleLink && (
              <a
                href={articleLink}
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NotebookText size={20} />
              </a>
              
            )}
            {liveDemoLink && (
               <a
                 href={liveDemoLink}
                 onClick={(e) => e.stopPropagation()}
                 className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                 target="_blank"
                 rel="noopener noreferrer"
                >
                <ExternalLink size={20} />
              </a>
            )}            
          </div>
          <ArrowRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
