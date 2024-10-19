import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projectsData'; // Import projects data
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Github, ExternalLink } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const project = projects.find((proj) => proj.id === projectId);

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gradient">{project.title}</h1>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover rounded-lg shadow-md mb-8"
      />

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
        <p className="text-gray-700 mb-4">{project.longDescription}</p>
        <div className="flex flex-wrap mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white text-sm font-medium py-1 px-2 rounded-lg mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Objectives</h3>
        <ul className="list-disc list-inside mb-6">
          {project.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
        <ul className="list-disc list-inside mb-6">
          {project.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Methods</h3>
        <ul className="list-disc list-inside mb-6">
          {project.methods.map((method, index) => (
            <li key={index}>{method}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Results</h3>
        <ul className="list-disc list-inside mb-6">
          {project.results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Code Snippet</h3>
        <SyntaxHighlighter language="python" style={tomorrow}>
          {project.codeSnippet}
        </SyntaxHighlighter>
      </div>

      <div className="flex items-center space-x-4">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:underline"
        >
          <Github className="mr-2" /> GitHub
        </a>
        <a
          href={project.articleLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:underline"
        >
          <ExternalLink className="mr-2" /> Read Article
        </a>
      </div>
    </div>
  );
};

export default ProjectDetail;
