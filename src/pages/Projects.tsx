import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import { Search, Filter, X, LayoutGrid, List, Columns } from 'lucide-react';

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
  
  const clearAllFilters = () => {
    setSelectedTags([]);
    setSearchTerm('');
    const searchInput = document.getElementById('project-search') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
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

      {/* --- IMPROVED CONTROLS --- */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="project-search"
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative p-2 rounded-lg border hover:bg-gray-100 transition-colors"
              aria-label="Toggle filters"
            >
              <Filter size={20} />
              {selectedTags.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  {selectedTags.length}
                </span>
              )}
            </button>
            <div className="flex items-center border rounded-lg p-0.5 bg-gray-50">
                <button onClick={() => setLayout('list')} className={`p-1.5 rounded-md ${layout === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-black'}`}><List size={20} /></button>
                <button onClick={() => setLayout('grid-2')} className={`p-1.5 rounded-md ${layout === 'grid-2' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-black'}`}><LayoutGrid size={20} /></button>
                <button onClick={() => setLayout('grid-3')} className={`p-1.5 rounded-md ${layout === 'grid-3' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-black'}`}><Columns size={20} /></button>
            </div>
          </div>
        </div>

        {/* --- ACTIVE FILTERS DISPLAY --- */}
        <AnimatePresence>
            {selectedTags.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap items-center gap-2 text-sm"
                >
                    <span className="font-medium text-gray-600">Active:</span>
                    {selectedTags.map(tag => (
                        <span key={tag} className="flex items-center gap-1.5 pl-2.5 pr-1 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {tag}
                            <button onClick={() => toggleTag(tag)} className="bg-blue-200 rounded-full p-0.5 hover:bg-blue-300">
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                    <button onClick={() => setSelectedTags([])} className="text-blue-500 hover:underline font-semibold ml-2">
                        Clear Tags
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
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
        <motion.div className={layoutClass} layout>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              // --- ADDED HOVER EFFECT CLASS ---
              className="hover:scale-105 transition-transform duration-300"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* --- IMPROVED NO RESULTS VIEW --- */}
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-600 mt-16 flex flex-col items-center gap-4"
        >
            <h3 className="text-2xl font-semibold">No projects match your search!</h3>
            <p className="max-w-md">Try adjusting your search terms, or clear the filters to see everything.</p>
            <button
                onClick={clearAllFilters}
                className="mt-2 px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow"
            >
                Clear All Filters
            </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;