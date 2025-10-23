import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projectsData';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ProjectCard from '../components/ProjectCard';
import {
  Github, ExternalLink, NotebookText, Layers, Target, Cpu, Calendar,
  User, GalleryHorizontal, Lightbulb, BarChart3, X, ArrowLeft, Share2,
  Home
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
    <div className="text-gray-600 leading-relaxed space-y-3 text-xs">
      {children}
    </div>
  </div>
);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);
  const project = projects.find((proj) => proj.id === projectId);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Memoize similar projects to prevent unnecessary recalculations
  const similarProjects = useMemo(() => {
    if (!project?.similarProjectIds) return [];
    return projects.filter(p => project.similarProjectIds!.includes(p.id));
  }, [project]);

  // Memoize random projects for fallback
  const randomProjectIds = useMemo(() => {
    return projects
      .filter(p => p.id !== projectId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [projectId]);

  // Handle modal keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const openModal = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
  };

  // Share functionality
  const shareProject = async () => {
    const url = window.location.href;
    const title = project?.title || 'Project';

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => navigate('/')}
              className="flex items-center hover:text-blue-600 transition"
            >
              <Home size={16} className="mr-1" />
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate('/projects')}
              className="hover:text-blue-600 transition"
            >
              Projects
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">{project.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header with Title and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              {project.title}
            </h1>
            <p className="text-md text-gray-600">{project.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              <ArrowLeft className="mr-2" size={22} />
              Back to Project
            </button>
            <button
              onClick={shareProject}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
              aria-label="Share project"
            >
              <Share2 className="mr-2" size={16} />
              Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">

          {/* --- LEFT SIDEBAR (Project Details) --- */}
          <aside className="lg:col-span-3 lg:order-1 mb-8 lg:mb-0">
            <div className="sticky top-24 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">Project Details</h3>
              <div className="flex items-start mb-4">
                <User size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                <div className="ml-3 min-w-0">
                  <p className="font-semibold text-sm">My Role</p>
                  <p className="text-sm text-gray-600 break-words">{project.role}</p>
                </div>
              </div>
              <div className="flex items-start mb-6">
                <Calendar size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                <div className="ml-3 min-w-0">
                  <p className="font-semibold text-sm">Timeline</p>
                  <p className="text-sm text-gray-600 break-words">{project.duration}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  aria-label="View code on GitHub"
                >
                  <Github className="mr-2" size={16} /> View Code
                </a>
                <a
                  href={project.articleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Read the paper"
                >
                  <NotebookText className="mr-2" size={16} /> Read Paper
                </a>
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="View live demo"
                >
                  <ExternalLink className="mr-2" size={16} /> Live Demo
                </a>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT (Center Column) --- */}
          <main className="lg:col-span-9 lg:order-2">
            {/* Hero Image with Loading State */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 relative">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400">Loading image...</div>
                </div>
              )}
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-auto object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
            </div>

            {/* --- Main Details Card --- */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 animate-fade-in">
              <InfoSection title="Project Overview" icon={<Layers size={22} className="text-blue-500" />}>
                <p className="text-sm leading-relaxed">{project.longDescription}</p>
              </InfoSection>

              <InfoSection title="Objectives" icon={<Target size={22} className="text-blue-500" />}>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="leading-relaxed">{obj}</li>
                  ))}
                </ul>
              </InfoSection>

              {/* ---ADDED SECTIONS --- */}
              {project.challenges && project.challenges.length > 0 && (
                <InfoSection title="Key Challenges & Learnings" icon={<Lightbulb size={22} className="text-blue-500" />}>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {project.challenges.map((item, i) => (
                      <li key={i} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              <InfoSection title="Results & Impact" icon={<BarChart3 size={22} className="text-blue-500" />}>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {project.results.map((res, i) => (
                    <li key={i} className="leading-relaxed">{res}</li>
                  ))}
                </ul>
              </InfoSection>

              {Array.isArray(project.galleryImages) && project.galleryImages.length > 0 && (
                <InfoSection title="Project Gallery" icon={<GalleryHorizontal size={22} className="text-blue-500" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.galleryImages.map((imgSrc, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={imgSrc}
                          alt={`Gallery image ${i + 1}`}
                          className="rounded-md shadow-sm object-cover aspect-video cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          onClick={() => openModal(imgSrc)}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-md flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                            Click to enlarge
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoSection>
              )}

              {/* --- ADDED CODE SNIPPET SECTION --- */}
              {project.codeSnippet && (
                <InfoSection title="Code Snippet" icon={<Cpu size={22} className="text-blue-500" />}>
                  <p className="text-sm text-gray-500 mb-4">A brief example. For the full codebase, please visit the GitHub repository.</p>
                  <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    customStyle={{
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5'
                    }}
                  >
                    {project.codeSnippet}
                  </SyntaxHighlighter>
                </InfoSection>
              )}
            </div>
          </main>
        </div>

        {/* --- SIMILAR PROJECTS SECTION --- */}
        <div className="mt-20 pt-12 border-t">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            {similarProjects.length > 0 ? 'Explore Similar Projects' : 'Explore Other Projects'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(similarProjects.length > 0 ? similarProjects : randomProjectIds).map((p) => (
              <ProjectCard
                key={p.id}
                {...p}
              />
            ))}
          </div>
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