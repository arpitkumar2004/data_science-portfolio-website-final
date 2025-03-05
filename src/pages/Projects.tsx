import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import { Search, Grid, List, Filter } from 'lucide-react';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [layout, setLayout] = useState<'list' | 'grid-2' | 'grid-3'>('grid-2');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLayout('list');
      } else if (window.innerWidth < 1024) {
        setLayout('grid-2');
      } else {
        setLayout('grid-2');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag)))
  );

  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)));

  const layoutClass = layout === 'list'
    ? 'flex flex-col gap-8'
    : layout === 'grid-2'
    ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <motion.h1 
        className="text-3xl font-bold mb-8 text-gradient text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg border hover:bg-gray-100 transition-colors"
              aria-label="Toggle filters"
            >
              <Filter size={20} />
            </button>
            <select
              className="p-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              onChange={(e) => setLayout(e.target.value as 'list' | 'grid-2' | 'grid-3')}
              value={layout}
            >
              <option value="list">List</option>
              <option value="grid-2">2-Column</option>
              <option value="grid-3">3-Column</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div 
          className={layoutClass}
          layout
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-8"
        >
          No projects found matching your criteria.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Projects;