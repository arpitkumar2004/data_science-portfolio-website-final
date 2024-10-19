import React, { useState } from 'react';
import { projects } from '../data/projectsData'; // Import the projects data
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === '' || project.tags.includes(selectedTag))
  );

  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gradient">My Projects</h1>

      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search projects..."
          className="mb-4 md:mb-0 md:mr-4 p-2 border rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
