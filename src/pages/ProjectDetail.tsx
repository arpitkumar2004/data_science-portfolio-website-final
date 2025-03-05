import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projectsData'; // Import projects data
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Github, ExternalLink, NotebookText } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const project = projects.find((proj) => proj.id === projectId);

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* <h1 className="text-2xl font-semibold mb-6 text-gradient">{project.title}</h1> */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover rounded-sm shadow-md"
      />

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-semibold mb-4 text-gradient text-center">{project.title}</h1>
        <h2 className="text-lg font-semibold mb-4">Project Overview</h2>
        <p className="text-sm text-gray-700 mb-4">{project.longDescription}</p>
        <div className="flex flex-wrap mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-light text-blue-500 bg-blue-50 rounded-full transition-colors hover:bg-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-2">Objectives</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside mb-6">
          {project.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside mb-6">
          {project.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Methods</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside mb-6">
          {project.methods.map((method, index) => (
            <li key={index}>{method}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Results</h3>
        <ul className="text-sm text-gray-700 list-disc list-inside mb-6">
          {project.results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
        <div className="flex items-center space-x-10">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-500 hover:underline"
          >
            <Github className="mr-2" size={20} /> Code on GitHub
          </a>
          <a
            href={project.articleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-500 hover:underline"
          >
            <NotebookText className ="mr-2" size={20} /> Read Article
          </a>
          <a
            href={project.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-500 hover:underline"
          >
            <ExternalLink className="mr-2" size={20} /> Live Demo
          </a>
        </div>
      </div>

      <div className="text-xs bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Code Snippet (Just Example)</h3>
        <p className="text-sm text-gray-700 mb-4">Just a code snippet for demonstration purposes. Please Checkout full information about the code snippet by clicking above links.</p>
        <SyntaxHighlighter language="python" style={tomorrow}>
          {project.codeSnippet}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ProjectDetail;
