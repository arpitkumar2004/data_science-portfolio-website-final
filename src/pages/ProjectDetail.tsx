import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects } from '../data/projectsData';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ProjectCard from '../components/ProjectCard';
import {
  Github, ExternalLink, NotebookText, Layers, Target, Cpu, Calendar,
  User, GalleryHorizontal, BarChart3, X, ArrowLeft, Share2,
  Home, Download, FileText, BookOpen, Wrench,
  AlertTriangle, Mail, ArrowUpRight, ShieldCheck, Building2
} from 'lucide-react';

// Helper component for main content sections
type InfoSectionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const InfoSection: React.FC<InfoSectionProps> = ({ title, icon, children }) => (
  <div className="mb-10 rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-[#111827] p-6 md:p-7 shadow-sm">
    <div className="flex items-center mb-4">
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white dark:bg-[#161616] border border-slate-100 dark:border-white/10 shadow-sm">
        {icon}
      </span>
      <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100 ml-3 tracking-tight">{title}</h3>
    </div>
    <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 text-sm md:text-base">
      {children}
    </div>
  </div>
);

const TechGlyph: React.FC<{ label: string }> = ({ label }) => {
  const initials = label
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 text-slate-700 dark:text-slate-200">
      <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.12" />
      <text
        x="16"
        y="19"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="currentColor"
      >
        {initials}
      </text>
    </svg>
  );
};

const emphasizeNumbers = (text: string) => {
  const parts = text.split(/(\d+(?:\.\d+)?(?:x|×|%|k|K|M|B)?)/g);
  return parts.map((part, index) => {
    if (/^\d+(?:\.\d+)?(?:x|×|%|k|K|M|B)?$/.test(part)) {
      return (
        <span key={`${part}-${index}`} className="font-bold text-slate-900 dark:text-slate-100">
          {part}
        </span>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = Number(id);
  const project = projects.find((proj) => proj.id === projectId);
  const brandBlue = 'rgb(37 99 235)';
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (isModalOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    setImageLoaded(false);
  }, [project?.image]);

  const openModal = (imageSrc: string) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
    lastFocusedElementRef.current?.focus();
  };

  // Download image functionality
  const downloadImage = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `project-image-${Date.now()}.png`; // Default filename with timestamp
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    } else if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.log('Clipboard error:', err);
      }
    } else {
      window.prompt('Copy link to share:', url);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-slate-300 mb-6">The project you're looking for doesn't exist.</p>
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

  const category = project.category;
  const objectives = project.objectives ?? [];
  const methods = project.methods ?? [];
  const results = project.results ?? [];
  const technologies = project.technologies ?? [];
  const challenges = project.challenges ?? [];
  const solutions = project.solutions ?? [];
  const galleryImages = project.galleryImages ?? [];
  const tags = project.tags ?? [];
  const tldr = project.tldr ?? project.description;
  const impactMetrics = (project.keyImpactMetrics && project.keyImpactMetrics.length > 0)
    ? project.keyImpactMetrics
    : results.slice(0, 3);
  const coreStack = (project.coreStack && project.coreStack.length > 0) ? project.coreStack : technologies;
  const tools = project.tools ?? [];
  const problemStatement = project.ProblemStatement ?? '';
  const solutionSteps = (project.implementation && project.implementation.length > 0)
    ? project.implementation
    : (methods.length > 0 ? methods.slice(0, 3) : []);
  const codeSnippetLanguage = category === 'web-app' ? 'tsx' : 'python';
  const categoryLabelMap: Record<typeof category, string> = {
    'data-science': 'Data Science',
    'web-app': 'Web App',
    'system-design': 'System Design',
    'chemical-research': 'Chemical Research',
  };
  const categoryBadgeMap: Record<typeof category, string> = {
    'data-science': 'bg-blue-600/10 text-blue-700 border-blue-200 dark:bg-blue-600/20 dark:text-blue-200 dark:border-blue-500/30',
    'web-app': 'bg-emerald-600/10 text-emerald-700 border-emerald-200 dark:bg-emerald-600/20 dark:text-emerald-200 dark:border-emerald-500/30',
    'system-design': 'bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-200 dark:border-amber-400/30',
    'chemical-research': 'bg-rose-500/10 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:text-rose-200 dark:border-rose-400/30',
  };
  const categoryLabel = categoryLabelMap[category] ?? 'Project';
  const categoryBadgeClass = categoryBadgeMap[category] ?? 'bg-slate-100 text-slate-700 border-slate-200';
  const metaItems = [
    { label: 'Role', value: project.role, icon: <User size={14} className="text-slate-500 dark:text-slate-400" /> },
    { label: 'Timeline', value: project.duration, icon: <Calendar size={14} className="text-slate-500 dark:text-slate-400" /> },
    { label: 'Type', value: project.type, icon: <Layers size={14} className="text-slate-500 dark:text-slate-400" /> },
  ].filter((item) => Boolean(item.value));

  const sectionConfig = useMemo(() => {
    const baseLabels = {
      abstract: 'Abstract / Executive Summary',
      introduction: 'Introduction',
      problem: 'Problem Statement',
      objectives: 'Objectives / Aims',
      scope: 'Scope of the Study / Project',
      literature: 'Literature Review',
      methodology: 'Methodology / System Design',
      implementation: 'Implementation / Experimentation',
      results: 'Results and Analysis',
      discussion: 'Discussion',
      conclusion: 'Conclusion',
      limitations: 'Limitations',
      future: 'Future Scope / Recommendations',
      references: 'References / Bibliography',
    };

    const overrides: Record<string, Partial<typeof baseLabels>> = {
      'web-app': {
        methodology: 'Architecture / System Design',
        implementation: 'Implementation / Delivery',
        results: 'Outcomes / Impact',
        discussion: 'Trade-offs / Constraints',
        literature: 'Related Work / Inspirations',
      },
      'system-design': {
        methodology: 'System Architecture',
        implementation: 'Implementation / Scaling',
        results: 'Performance / Reliability',
        discussion: 'Trade-offs / Risks',
      },
      'chemical-research': {
        methodology: 'Methodology / Experimental Design',
        implementation: 'Experimentation / Simulation',
      },
    };

    const visibility = {
      literature: category !== 'web-app',
      references: category !== 'web-app',
    };

    return {
      labels: { ...baseLabels, ...overrides[category] },
      visibility,
    };
  }, [category]);

  const nextProjects = useMemo(() => {
    if (!project.similarProjectIds || project.similarProjectIds.length === 0) return [];
    return projects.filter(p => project.similarProjectIds!.includes(p.id)).slice(0, 2);
  }, [project]);

  const randomProjects = useMemo(() => {
    return projects
      .filter(p => p.id !== projectId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [projectId]);

  const handleImageKeyDown = (imageSrc: string) => (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(imageSrc);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#161616] min-h-screen font-body relative">
      {/* <div className="absolute inset-x-0 -top-24 h-72 bg-gradient-to-br from-blue-50 via-white to-slate-50 opacity-80 pointer-events-none" /> */}
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-[#161616] border-b border-slate-100 dark:border-white/10 sticky top-16 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-[#161616] px-3 py-1.5 text-slate-600 dark:text-slate-300 transition hover:text-blue-600 hover:border-blue-200"
                >
                  <Home size={14} />
                  <span className="font-semibold">Home</span>
                </button>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                <span className="text-base">›</span>
              </li>
              <li>
                <button
                  onClick={() => navigate('/projects')}
                  className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#111827] px-3 py-1.5 text-slate-600 dark:text-slate-300 transition hover:text-blue-600 hover:border-blue-200"
                >
                  <span className="font-semibold">Projects</span>
                </button>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                <span className="text-base">›</span>
              </li>
              <li>
                <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-900/5 dark:bg-white/10 px-3 py-1.5 text-slate-900 dark:text-slate-100 font-semibold">
                  {project.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1425px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

        {/* Executive Header */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0a0a0a] shadow-lg border border-slate-100 dark:border-white/10 p-7 md:p-10 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-blue-600/10 dark:via-transparent dark:to-transparent pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-widest ${categoryBadgeClass}`}>
                    {categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-900/5 dark:bg-white/10 text-[11px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                    {project.type}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-3 leading-tight">
                {project.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-5xl leading-relaxed">
                {emphasizeNumbers(tldr)}
              </p>

              {impactMetrics.length > 0 && (
                <ul className="mt-5 list-disc list-inside space-y-1.5 text-sm text-slate-700 dark:text-slate-200">
                  {impactMetrics.map((metric, i) => (
                    <li key={`${metric}-${i}`} className="leading-relaxed">
                      {emphasizeNumbers(metric)}
                    </li>
                  ))}
                </ul>
              )}

              {tags.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
                  {tags.slice(0,5).map((tag, i) => (
                    <span key={`${tag}-${i}`} className="flex items-center gap-2">
                      <span className="text-slate-800 border-2 px-2.5 py-1 rounded-full border-slate-100 dark:border-white/10 font-mono dark:text-slate-100 font-semibold">{tag}</span>
                    </span>
                  ))}
                </div>
              )}

              {metaItems.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
                  {metaItems.slice(0, 3).map((item) => (
                    <span key={item.label} className="flex items-center gap-2">
                      {item.icon}
                      <span className="uppercase tracking-widest text-[10px] text-slate-400">{item.label}</span>
                      <span className="text-slate-800 dark:text-slate-100 font-semibold">{item.value}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={() => navigate('/projects')}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-white/10 rounded-md text-xs font-semibold text-gray-700 dark:text-slate-200 bg-white dark:bg-[#161616] hover:bg-gray-50 dark:hover:bg-[#1c1c1c] transition"
                >
                  <ArrowLeft className="mr-2" size={16} />
                  Back
                </button>

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-semibold text-white bg-gray-800 hover:bg-gray-900 transition"
                    aria-label="View code on GitHub"
                  >
                    <Github className="mr-2" size={14} />
                    View Code
                  </a>
                )}

                {project.liveDemoLink && (
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="mr-2" size={14} />
                    Live Demo
                  </a>
                )}

                {project.articleLink && (
                  <a
                    href={project.articleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-semibold text-white bg-green-600 hover:bg-green-700 transition"
                    aria-label="Read detailed article"
                  >
                    <FileText className="mr-2" size={14} />
                    Read Report
                  </a>
                )}

                <button
                  onClick={shareProject}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                  aria-label="Share project"
                >
                  <Share2 className="mr-2" size={14} />
                  Share
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 mt-10">
              <div className="bg-white dark:bg-[#161616] rounded-2xl shadow-lg border border-slate-100 dark:border-white/10 overflow-hidden relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-white/5 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">Loading image...</div>
                  </div>
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  className={`flex-col items-center justify-center w-full h-auto object-cover transition-transform duration-500 cursor-pointer hover:scale-[1.02] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onClick={() => openModal(project.image)}
                  onKeyDown={handleImageKeyDown(project.image)}
                  role="button"
                  tabIndex={0}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">

          {/* --- LEFT SIDEBAR (Project Details) --- */}
          <aside className="lg:col-span-3 lg:order-1 mb-8 lg:mb-0">
            <div className="sticky top-36 bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-lg border border-slate-100 dark:border-white/10 p-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-white/10 pb-3 mb-4">Engineering Snapshot</h3>
              <div className="flex items-start mb-4">
                <User size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                <div className="ml-3 min-w-0">
                  <p className="font-semibold text-sm uppercase tracking-widest text-slate-400">Role</p>
                  <p className="text-base text-slate-700 dark:text-slate-200 break-words font-medium">{project.role}</p>
                </div>
              </div>
              {project.company && (
                <div className="flex items-start mb-4">
                  <Building2 size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div className="ml-3 min-w-0">
                    <p className="font-semibold text-sm uppercase tracking-widest text-slate-400">Company</p>
                    <p className="text-base text-slate-700 dark:text-slate-200 break-words font-medium">{project.company}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start mb-4">
                <Calendar size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                <div className="ml-3 min-w-0">
                  <p className="font-semibold text-sm uppercase tracking-widest text-slate-400">Duration</p>
                  <p className="text-base text-slate-700 dark:text-slate-200 break-words font-medium">{project.duration}</p>
                </div>
              </div>
              <div className="flex items-start mb-6">
                <Layers size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                <div className="ml-3 min-w-0">
                  <p className="font-semibold text-sm uppercase tracking-widest text-slate-400">Category</p>
                  <p className="text-base text-slate-700 dark:text-slate-200 break-words font-medium">{categoryLabel}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Core Stack</h3>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {coreStack.length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {coreStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-[#111111] px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-white dark:hover:bg-[#1a1a1a] transition"
                      title={tech}
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 dark:bg-[#1a1a1a]">
                        <TechGlyph label={tech} />
                      </span>
                      <span className="whitespace-nowrap">{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              {tools.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-2">Tools</h3>
                  <ul className="space-y-2">
                    {tools.map((tool) => (
                      <li key={tool} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 dark:bg-[#1a1a1a]">
                          <TechGlyph label={tool} />
                        </div>
                        <span className="font-medium">{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-white/10 pb-3 mb-4">Quick Links</h3>
              <div className="space-y-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                    aria-label="View code on GitHub"
                  >
                    <Github className="mr-2" size={16} /> View Code
                  </a>
                )}
                {project.articleLink && (
                  <a
                    href={project.articleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-white/10 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-slate-200 bg-white dark:bg-[#161616] hover:bg-gray-50 dark:hover:bg-[#1c1c1c] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Read the paper"
                  >
                    <NotebookText className="mr-2" size={16} /> Read Paper
                  </a>
                )}
                {project.liveDemoLink && (
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="mr-2" size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT (Center Column) --- */}
          <main className="lg:col-span-9 lg:order-2">
            {/* --- Main Details Card --- */}
            <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-lg border border-slate-100 dark:border-white/10 p-6 sm:p-8 animate-fade-in">
              <InfoSection title={sectionConfig.labels.abstract} icon={<FileText size={22} className="text-blue-500" />}>
                <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
              </InfoSection>

              {project.longDescription?.trim() && (
                <InfoSection title={sectionConfig.labels.introduction} icon={<BookOpen size={22} className="text-blue-500" />}>
                  <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">{project.longDescription}</p>
                </InfoSection>
              )}

              {(problemStatement || solutionSteps.length > 0) && (
                <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {problemStatement && (
                    <div className="rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle size={20} className="text-blue-500" />
                        <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">The Challenge</h3>
                      </div>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {problemStatement}
                      </p>
                    </div>
                  )}
                  {solutionSteps.length > 0 && (
                    <div className="rounded-2xl border border-slate-100 dark:border-white/10 bg-white dark:bg-[#0a0a0a] p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Cpu size={20} className="text-blue-500" />
                        <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">The Engineering Solution</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
                        {solutionSteps.map((step, i) => (
                          <li key={i} className="leading-relaxed">{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {objectives.length > 0 && (
                <InfoSection title={sectionConfig.labels.objectives} icon={<Target size={22} className="text-blue-500" />}>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base dark:text-slate-200">
                    {objectives.map((obj, i) => (
                      <li key={i} className="leading-relaxed">{obj}</li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {methods.length > 0 && (
                <InfoSection title={sectionConfig.labels.methodology} icon={<Wrench size={22} className="text-blue-500" />}>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base dark:text-slate-200">
                    {methods.map((method, i) => (
                      <li key={i} className="leading-relaxed">{method}</li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {results.length > 0 && (
                <InfoSection title={sectionConfig.labels.results} icon={<BarChart3 size={22} className="text-blue-500" />}>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base dark:text-slate-200">
                    {results.map((res, i) => (
                      <li key={i} className="leading-relaxed">{emphasizeNumbers(res)}</li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {challenges.length > 0 && (
                <InfoSection title="Challenges" icon={<AlertTriangle size={22} className="text-blue-500" />}>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base dark:text-slate-200">
                    {challenges.map((item, i) => (
                      <li key={i} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {solutions.length > 0 && (
                <InfoSection title="Solutions" icon={<Target size={22} className="text-blue-500" />}>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base dark:text-slate-200">
                    {solutions.map((item, i) => (
                      <li key={i} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {project.acknowledgements && project.acknowledgements.length > 0 && (
                <InfoSection title="Acknowledgements" icon={<BookOpen size={22} className="text-blue-500" />}>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base dark:text-slate-200">
                    {project.acknowledgements.map((item, i) => (
                      <li key={i} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </InfoSection>
              )}
              {project.codeSnippet && project.codeSnippet.trim().length > 0 && (
                <InfoSection title="Code Snapshot" icon={<Cpu size={22} className="text-blue-500" />}>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 mb-4">
                    Focused snippet from the most critical logic path.
                  </p>
                  {project.codeSnippet.trim().startsWith('http') ? (
                    <a
                      href={project.codeSnippet.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      View code snippet source
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <SyntaxHighlighter
                      language={codeSnippetLanguage}
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
                  )}
                </InfoSection>
              )}

              {(project.LiteratureReview || project.discussion?.length || project.references?.length || project.conclusion?.length || project.limitations?.length || project.futureWork?.length) && (
                <div className="mb-10 rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50/60 dark:bg-[#111827] p-6 md:p-7 shadow-sm">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between text-base md:text-lg font-black text-slate-900 dark:text-slate-100">
                      Advanced Details
                      <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <div className="mt-6 space-y-6 text-sm md:text-base text-slate-600 dark:text-slate-300">
                      {project.LiteratureReview && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Literature Review</h4>
                          <p className="leading-relaxed">{project.LiteratureReview}</p>
                        </div>
                      )}
                      {project.discussion && project.discussion.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Discussion</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {project.discussion.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.conclusion && project.conclusion.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Conclusion</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {project.conclusion.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.limitations && project.limitations.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Limitations</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {project.limitations.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.futureWork && project.futureWork.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Future Work</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {project.futureWork.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.references && project.references.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">References</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {project.references.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              )}

              {galleryImages.length > 0 && (
                <InfoSection title="Results Gallery" icon={<GalleryHorizontal size={22} className="text-blue-500" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((imgSrc, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={imgSrc}
                          alt={`Gallery image ${i + 1}`}
                          className="rounded-xl shadow-sm object-cover aspect-video cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                          onClick={() => openModal(imgSrc)}
                          onKeyDown={handleImageKeyDown(imgSrc)}
                          role="button"
                          tabIndex={0}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-md flex items-center justify-center pointer-events-none">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                            Click to enlarge
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoSection>
              )}
            </div>
          </main>
        </div>

        {/* --- NEXT PROJECTS SECTION --- */}
        <div className="mt-20 pt-12 border-t border-slate-100 dark:border-white/10">
          <h2 className="text-xl md:text-2xl font-black text-center mb-8 text-slate-900 dark:text-slate-100 tracking-tight">
            {nextProjects.length > 0 ? 'Next Projects' : 'Explore More ...'}
          </h2>

          <div className={`grid grid-cols-1 ${nextProjects.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
            {(nextProjects.length > 0 ? nextProjects : randomProjects).map((p) => (
              <ProjectCard
                key={p.id}
                {...p}
              />
            ))}
          </div>
        </div>

        {/* --- IMAGE PREVIEW MODAL --- */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Project image preview"
          >
            <div className="relative bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                className="absolute -top-4 -right-4 p-2 bg-white dark:bg-[#161616] rounded-full text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-[#1c1c1c] transition z-10"
                aria-label="Close image preview"
              >
                <X size={24} />
              </button>
              <button onClick={downloadImage} className="absolute -top-4 -left-4 p-2 bg-white dark:bg-[#161616] rounded-full text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-[#1c1c1c] transition z-10" aria-label="Download image">
                <Download size={24} />
              </button>
              <img src={currentImage} alt="Project preview" className="object-contain rounded-lg max-h-[90vh]" />
            </div>
          </div>
        )}
      </div>

      {/* --- REFINED RECRUITER CTA SECTION --- */}
      <section className="mx-6 md:mx-12 lg:mx-20 mb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative overflow-hidden rounded-[3rem] border border-blue-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-12 lg:p-20 text-white shadow-2xl shadow-blue-500/20">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `radial-gradient(${brandBlue} 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-blue-300 mb-5">Strategic Collaboration</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6 leading-[0.95]">
                  Build the Next <span className="text-blue-400">Production-Grade</span> System.
                </h2>
                <p className="text-slate-200/80 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-8">
                  Curious about architecture choices, evaluation strategy, or delivery scope? I partner on research, production ML, and system design that ships measurable outcomes.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { v: "Impact", l: "ROI-focused" },
                    { v: "Secure", l: "Enterprise-ready" },
                    { v: "Fast", l: "Iterate + Ship" },
                    { v: "Rigor", l: "Research-grade" },
                  ].map((item) => (
                    <div key={item.l} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="text-base font-black text-white">{item.v}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300">{item.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <Link to="/contact" className="group flex items-center justify-between p-7 bg-blue-600 rounded-[2rem] hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/40">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-white/10 rounded-2xl"><Mail size={24} /></div>
                    <div className="text-left">
                      <p className="text-xs font-mono font-bold uppercase tracking-widest text-blue-100 mb-1">Direct Channel</p>
                      <p className="text-lg font-black">Initiate Discussion</p>
                    </div>
                  </div>
                  <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>

                <Link to="/request-cv" className="group flex items-center justify-between p-7 bg-white/10 text-white rounded-[2rem] hover:border-blue-300 hover:text-blue-100 border border-white/15 transition-all shadow-xl">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-white/10 rounded-2xl text-blue-200"><Download size={24} /></div>
                    <div className="text-left">
                      <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300 mb-1">Extended Resource Pack</p>
                      <p className="text-lg font-black">Get CV + Deep-Dives</p>
                    </div>
                  </div>
                  <FileText size={24} className="text-slate-300 group-hover:text-blue-200 transition-colors" />
                </Link>

                <div className="flex items-center gap-2 mt-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                  <ShieldCheck size={16} className="text-blue-400" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300">Verified Researcher @ IIT Kharagpur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    
  );
};

export default ProjectDetail;