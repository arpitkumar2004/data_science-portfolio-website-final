import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/projectsData';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ProjectCard from '../components/ProjectCard';
import {
  Github, ExternalLink, NotebookText, Layers, Target, Cpu, Calendar,
  User, GalleryHorizontal, Lightbulb, BarChart3, X
} from 'lucide-react';

// Helper component for main content sections
type InfoSectionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const InfoSection: React.FC<InfoSectionProps> = ({ title, icon, children }) => (
  <div className="mb-10">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-bold text-gray-800 ml-3">{title}</h3>
    </div>
    <div className="text-gray-600 leading-relaxed space-y-3 text-sm">
      {children}
    </div>
  </div>
);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const project = projects.find((proj) => proj.id === projectId);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');

  const openModal = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const similarProjects = project?.similarProjectIds
    ? projects.filter(p => project.similarProjectIds.includes(p.id))
    : [];

  // Add this line to get random project IDs for the fallback
  const randomProjectIds = projects
    .filter(p => p.id !== projectId)      // Exclude the current project
    .sort(() => 0.5 - Math.random())    // Shuffle the remaining projects
    .slice(0, 3);                         // Take the first 3 from the shuffled list

  if (!project) {
    return <div className="text-center py-20">Project not found!</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">

          {/* --- LEFT SIDEBAR (Project Details) --- */}
          <aside className="lg:col-span-3 lg:order-1">
            <div className="sticky top-24 bg-white rounded-lg shadow-md p-6 mb-10 lg:mb-0">
              {/* ... Sidebar code remains the same ... */}
              <h3 className="text-base font-bold text-gray-800 border-b pb-3 mb-4">Project Details</h3>
              <div className="flex items-start mb-4">
                <User size={18} className="text-gray-500 mt-1" />
                <div className="ml-3">
                  <p className="font-semibold text-sm">My Role</p>
                  <p className="text-sm text-gray-600">{project.role}</p>
                </div>
              </div>
              <div className="flex items-start mb-6">
                <Calendar size={18} className="text-gray-500 mt-1" />
                <div className="ml-3">
                  <p className="font-semibold text-sm">Timeline</p>
                  <p className="text-sm text-gray-600">{project.duration}</p>
                </div>
              </div>

              <h3 className="text-base font-bold text-gray-800 border-b pb-3 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                ))}
              </div>

              <h3 className="text-base font-bold text-gray-800 border-b pb-3 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900">
                  <Github className="mr-2" size={16} /> View Code
                </a>
                <a href={project.articleLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <NotebookText className="mr-2" size={16} /> Read Paper
                </a>
                <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="mr-2" size={16} /> Live Demo
                </a>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT (Center Column) --- */}
          <main className="lg:col-span-9 lg:order-2 mt-10 lg:mt-0">
            <div className="text-left mb-8">
              <h1 className="text-2xl md:text-2xl font-extrabold text-gray-900 tracking-tight">{project.title}</h1>
              <p className="mt-4 text-base text-gray-500 text-sm">{project.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
            </div>

            {/* --- Main Details Card --- */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <InfoSection title="Project Overview" icon={<Layers size={22} className="text-blue-500" />}>
                <p className='text-sm'>{project.longDescription}</p>
              </InfoSection>

              <InfoSection title="Objectives" icon={<Target size={22} className="text-blue-500" />}>
                <ul className="list-disc list-inside space-y-2 text-sm">{project.objectives.map((obj, i) => <li key={i}>{obj}</li>)}</ul>
              </InfoSection>

              {/* ---ADDED SECTIONS --- */}
              <InfoSection title="Key Challenges & Learnings" icon={<Lightbulb size={22} className="text-blue-500" />}>
                <ul className="list-disc list-inside space-y-2 text-sm">{project.challenges?.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </InfoSection>

              <InfoSection title="Results & Impact" icon={<BarChart3 size={22} className="text-blue-500" />}>
                <ul className="list-disc list-inside space-y-2 text-sm">{project.results.map((res, i) => <li key={i}>{res}</li>)}</ul>
              </InfoSection>

              {Array.isArray(project.galleryImages) && project.galleryImages.length > 0 && (
                <InfoSection title="Project Gallery" icon={<GalleryHorizontal size={22} className="text-blue-500" />}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.galleryImages.map((imgSrc, i) => (
                      <img key={i} src={imgSrc} alt={`Gallery image ${i + 1}`} className="rounded-md shadow-sm object-cover aspect-video cursor-pointer transition duration-200 hover:scale-105" onClick={() => openModal(imgSrc)} />
                    ))}
                  </div>
                </InfoSection>
              )}

              {/* --- ADDED CODE SNIPPET SECTION --- */}
              {project.codeSnippet && (
                <InfoSection title="Code Snippet" icon={<Cpu size={22} className="text-blue-500" />}>
                  <p className="text-xs text-gray-500 mb-4">A brief example. For the full codebase, please visit the GitHub repository.</p>
                  <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}>
                    {project.codeSnippet}
                  </SyntaxHighlighter>
                </InfoSection>
              )}
            </div>
          </main>
        </div>

        {/* --- SIMILAR PROJECTS SECTION --- */}
      <div className="mt-20 pt-12 border-t">
        <h2 className="text-2xl font-bold text-center mb-8">
          {similarProjects.length > 0 ? 'Explore Similar Projects' : 'Explore Other Projects'}
        </h2>
        
        {similarProjects.length > 0 ? (
          // If similar projects exist, render them
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarProjects.map((p) => (
              <ProjectCard
                key={p.id}
                {...p}
              />
            ))}
          </div>
        ) : (
          // Otherwise, render the fallback message with random IDs
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomProjectIds.map((p) => (
              <ProjectCard
                key={p.id}
                {...p}
              />
            ))}
          </div>

        )}
      </div>

        {/* --- IMAGE PREVIEW MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button onClick={closeModal} className="absolute -top-4 -right-4 p-2 bg-white rounded-full text-gray-700 hover:bg-gray-200 transition z-10" aria-label="Close image preview">
                <X size={24} />
              </button>
              <img src={currentImage} alt="Project preview" className="object-contain rounded-lg max-h-[90vh]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;