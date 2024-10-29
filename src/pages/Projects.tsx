import React, { useState, useEffect } from 'react';
import { projects } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [layout, setLayout] = useState<'list' | 'grid-2' | 'grid-3'>('grid-2'); // Default to grid-2

  useEffect(() => {
    // Set default layout based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) { // Assuming mobile screens are less than 768px
        setLayout('list');
      } else {
        setLayout('grid-2');
      }
    };

    handleResize(); // Set initial layout
    window.addEventListener('resize', handleResize); // Update layout on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === '' || project.tags.includes(selectedTag))
  );

  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)));

  // Set the class based on layout state
  const layoutClass = layout === 'list'
    ? 'flex flex-col gap-8'
    : layout === 'grid-2'
    ? 'grid grid-cols-2 gap-8'
    : 'grid grid-cols-3 gap-8';

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gradient text-center" style={{ paddingBottom: "5px" }}>
        My Projects
      </h1>

      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search projects..."
          className="mb-4 md:mb-0 md:mr-4 p-2 border rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="mb-4 md:mb-0 md:mr-4 p-2 border rounded-md bg-gray-100 text-gray-700"
          onChange={(e) => setLayout(e.target.value as 'list' | 'grid-2' | 'grid-3')}
          value={layout}
        >
          <option value="list">List</option>
          <option value="grid-2">2-Column Grid</option>
          <option value="grid-3">3-Column Grid</option>
        </select>

        <select
          className="p-2 border rounded-md bg-gray-100 text-gray-700"
          onChange={(e) => setSelectedTag(e.target.value)}
          value={selectedTag}
        >
          <option value="">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={layoutClass}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No projects found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default Projects;
