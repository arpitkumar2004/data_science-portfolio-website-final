import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, image, tags }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded mr-2 mb-2">{tag}</span>
          ))}
        </div>
        <Link to={`/projects/${id}`} className="text-primary-600 hover:underline">
          Learn More
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;