import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ProjectCard from '../components/ProjectCard';
import SEOHead from '../components/SEOHead';
import {
  Github, ExternalLink, NotebookText, Layers, Target, Cpu, Calendar,
  User, BarChart3, X, ArrowLeft, Share2, Home, Download, FileText,
  BookOpen, Wrench, AlertTriangle, Mail, ArrowUpRight, ShieldCheck,
  Building2, ChevronRight, ImageIcon
} from 'lucide-react';

/* ─── Helpers ─── */

const bold = (text: string) => {
  const parts = text.split(/(\d+(?:\.\d+)?(?:x|×|%|k|K|M|B)?)/g);
  return parts.map((p, i) =>
    /^\d+(?:\.\d+)?(?:x|×|%|k|K|M|B)?$/.test(p)
      ? <span key={i} className="font-bold text-slate-900 dark:text-white">{p}</span>
      : <span key={i}>{p}</span>
  );
};

/* ─── Section heading (simple, no wrapper card) ─── */
const SH: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <h3 id={id} className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-10 mb-3 first:mt-0">
    {children}
  </h3>
);

/* ─── Category config ─── */
const CAT_LABEL: Record<string, string> = {
  'data-science': 'Data Science',
  'web-app': 'Web App',
  'system-design': 'System Design',
  'chemical-research': 'Chemical Research',
};

const CAT_BADGE: Record<string, string> = {
  'data-science': 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'web-app': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  'system-design': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  'chemical-research': 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

/* ═══════════════════════════════════════════════════ */

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const project = projects.find((p) => p.id === Number(id));

  /* ── Modal state ── */
  const [modalImg, setModalImg] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && modalOpen) closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalOpen]);

  useEffect(() => { if (modalOpen) closeBtnRef.current?.focus(); }, [modalOpen]);
  useEffect(() => { setImgLoaded(false); }, [project?.image]);

  const openModal = (src: string) => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setModalImg(src);
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setModalImg(''); lastFocusRef.current?.focus(); };

  const downloadImage = () => {
    if (!modalImg) return;
    const a = document.createElement('a');
    a.href = modalImg;
    a.download = `project-image-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareProject = async () => {
    const url = window.location.href;
    const title = project?.title || 'Project';
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* noop */ }
    } else if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(url); alert('Link copied!'); } catch { /* noop */ }
    } else {
      window.prompt('Copy link:', url);
    }
  };

  const imgKeyHandler = (src: string) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(src); }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading project...</p>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Project not found</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">The project you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/projects')} className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline">
            <ArrowLeft size={14} className="mr-1" /> Back to Projects
          </button>
        </div>
      </div>
    );
  }

  /* ── Extracted data ── */
  const cat = project.category;
  const catLabel = CAT_LABEL[cat] ?? 'Project';
  const catBadge = CAT_BADGE[cat] ?? 'bg-slate-50 text-slate-700';
  const objectives = project.objectives ?? [];
  const methods = project.methods ?? [];
  const results = project.results ?? [];
  const technologies = project.technologies ?? [];
  const challenges = project.challenges ?? [];
  const solutions = project.solutions ?? [];
  const gallery = project.galleryImages ?? [];
  const tags = project.tags ?? [];
  const tldr = project.tldr ?? project.description;
  const impact = project.keyImpactMetrics?.length ? project.keyImpactMetrics : results.slice(0, 3);
  const stack = project.coreStack?.length ? project.coreStack : technologies;
  const tools = project.tools ?? [];
  const problem = project.ProblemStatement ?? '';
  const implSteps = project.implementation?.length ? project.implementation : methods.slice(0, 3);
  const codeLang = cat === 'web-app' ? 'tsx' : 'python';

  /* ── Section labels (category-aware) ── */
  const sectionConfig = useMemo(() => {
    const base: Record<string, string> = {
      abstract: 'Abstract',
      introduction: 'Introduction',
      problem: 'Problem Statement',
      objectives: 'Objectives',
      methodology: 'Methodology',
      implementation: 'Implementation',
      results: 'Results & Analysis',
    };
    const overrides: Record<string, Partial<typeof base>> = {
      'web-app': { methodology: 'Architecture', implementation: 'Implementation', results: 'Outcomes' },
      'system-design': { methodology: 'System Architecture', results: 'Performance' },
      'chemical-research': { methodology: 'Experimental Design', implementation: 'Experimentation' },
    };
    return { ...base, ...overrides[cat] };
  }, [cat]);

  /* ── Related projects ── */
  const nextProjects = useMemo(() => {
    if (!project.similarProjectIds?.length) return [];
    return projects.filter((p) => project.similarProjectIds!.includes(p.id)).slice(0, 2);
  }, [project, projects]);

  const randomProjects = useMemo(() =>
    projects.filter((p) => p.id !== project.id).sort(() => 0.5 - Math.random()).slice(0, 3),
    [project.id, projects],
  );

  const related = nextProjects.length ? nextProjects : randomProjects;

  /* ── Meta row items ── */
  const meta = [
    project.role && { icon: <User size={13} />, label: 'Role', value: project.role },
    project.company && { icon: <Building2 size={13} />, label: 'Company', value: project.company },
    project.duration && { icon: <Calendar size={13} />, label: 'Timeline', value: project.duration },
    project.type && { icon: <Layers size={13} />, label: 'Type', value: project.type },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  /* ═══════════════════════ RENDER ═══════════════════════ */
  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen font-sans text-slate-700 dark:text-slate-300">
      <SEOHead
        title={project.title}
        description={project.tldr || project.description}
        canonicalPath={`/projects/${project.id}`}
        ogImageAlt={`${project.title} — Arpit Kumar`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.tldr || project.description,
          url: `https://arpitkumar.dev/projects/${project.id}`,
          author: { '@type': 'Person', name: 'Arpit Kumar' },
          dateCreated: project.duration,
          keywords: project.tags?.join(', '),
        }}
      />

      {/* ── Breadcrumb ── */}
      <nav className="border-b border-slate-100 dark:border-white/5 sticky top-16 z-40 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors flex items-center gap-1"><Home size={12} /> Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate('/projects')} className="hover:text-blue-600 transition-colors">Projects</button>
          <ChevronRight size={12} />
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">{project.title}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ════════════════ HEADER ════════════════ */}
        <header className="mb-10">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${catBadge}`}>{catLabel}</span>
            {project.standings && (
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                {project.standings}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            {project.title}
          </h1>

          {/* TL;DR */}
          <p className="text-sm md:text-base leading-relaxed max-w-3xl mb-5">{bold(tldr)}</p>

          {/* Impact Metrics */}
          {impact.length > 0 && (
            <ul className="mb-5 space-y-1">
              {impact.map((m, i) => (
                <li key={i} className="text-sm leading-relaxed flex items-start gap-2">
                  <span className="text-blue-500 mt-1.5 shrink-0">•</span>
                  <span>{bold(m)}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Meta row */}
          {meta.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-5">
              {meta.map((m) => (
                <span key={m.label} className="flex items-center gap-1.5">
                  {m.icon}
                  <span className="uppercase tracking-wider text-[10px]">{m.label}:</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{m.value}</span>
                </span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => navigate('/projects')} className="inline-flex items-center px-3 py-1.5 rounded border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition">
              <ArrowLeft size={14} className="mr-1.5" /> Back
            </button>
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 rounded bg-slate-900 dark:bg-white/10 text-xs font-medium text-white hover:bg-slate-800 dark:hover:bg-white/15 transition">
                <Github size={14} className="mr-1.5" /> Code
              </a>
            )}
            {project.liveDemoLink && (
              <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 rounded bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 transition">
                <ExternalLink size={14} className="mr-1.5" /> Demo
              </a>
            )}
            {project.articleLink && (
              <a href={project.articleLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 rounded bg-emerald-600 text-xs font-medium text-white hover:bg-emerald-700 transition">
                <FileText size={14} className="mr-1.5" /> Report
              </a>
            )}
            <button onClick={shareProject} className="inline-flex items-center px-3 py-1.5 rounded border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition">
              <Share2 size={14} className="mr-1.5" /> Share
            </button>
          </div>
        </header>

        {/* ════════════════ TWO-COLUMN LAYOUT ════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── Main content ── */}
          <article className="lg:col-span-8 min-w-0">

            {/* Hero image */}
            <div className="rounded-lg overflow-hidden border border-slate-100 dark:border-white/5 mb-8 relative bg-slate-50 dark:bg-white/5">
              {!imgLoaded && (
                <div className="absolute inset-0 animate-pulse bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                  <ImageIcon size={24} className="text-slate-300 dark:text-slate-600" />
                </div>
              )}
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-auto object-cover cursor-pointer transition-opacity ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImgLoaded(true)}
                onClick={() => openModal(project.image)}
                onKeyDown={imgKeyHandler(project.image)}
                role="button"
                tabIndex={0}
                loading="lazy"
              />
            </div>

            {/* ── Abstract ── */}
            <SH>{sectionConfig.abstract}</SH>
            <p className="text-sm leading-relaxed">{project.description}</p>

            {/* ── Introduction ── */}
            {project.longDescription?.trim() && (
              <>
                <SH>{sectionConfig.introduction}</SH>
                <p className="text-sm leading-relaxed">{project.longDescription}</p>
              </>
            )}

            {/* ── Problem + Solution side-by-side ── */}
            {(problem || implSteps.length > 0) && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {problem && (
                  <div className="border-l-2 border-amber-400 pl-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                      <AlertTriangle size={14} className="text-amber-500" /> The Challenge
                    </h4>
                    <p className="text-sm leading-relaxed">{problem}</p>
                  </div>
                )}
                {implSteps.length > 0 && (
                  <div className="border-l-2 border-blue-400 pl-4">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                      <Cpu size={14} className="text-blue-500" /> The Solution
                    </h4>
                    <ul className="space-y-1.5 text-sm">
                      {implSteps.map((s, i) => <li key={i} className="leading-relaxed">— {s}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* ── Objectives ── */}
            {objectives.length > 0 && (
              <>
                <SH>{sectionConfig.objectives}</SH>
                <ul className="space-y-1.5 text-sm">
                  {objectives.map((o, i) => <li key={i} className="flex items-start gap-2"><Target size={12} className="text-blue-500 mt-1 shrink-0" /><span>{o}</span></li>)}
                </ul>
              </>
            )}

            {/* ── Methodology ── */}
            {methods.length > 0 && (
              <>
                <SH>{sectionConfig.methodology}</SH>
                <ul className="space-y-1.5 text-sm">
                  {methods.map((m, i) => <li key={i} className="flex items-start gap-2"><Wrench size={12} className="text-slate-400 mt-1 shrink-0" /><span>{m}</span></li>)}
                </ul>
              </>
            )}

            {/* ── Results ── */}
            {results.length > 0 && (
              <>
                <SH>{sectionConfig.results}</SH>
                <ul className="space-y-1.5 text-sm">
                  {results.map((r, i) => <li key={i} className="flex items-start gap-2"><BarChart3 size={12} className="text-emerald-500 mt-1 shrink-0" /><span>{bold(r)}</span></li>)}
                </ul>
              </>
            )}

            {/* ── Challenges & Solutions ── */}
            {challenges.length > 0 && (
              <>
                <SH>Challenges</SH>
                <ul className="space-y-1.5 text-sm">
                  {challenges.map((c, i) => <li key={i} className="flex items-start gap-2"><AlertTriangle size={12} className="text-amber-500 mt-1 shrink-0" /><span>{c}</span></li>)}
                </ul>
              </>
            )}
            {solutions.length > 0 && (
              <>
                <SH>Solutions</SH>
                <ul className="space-y-1.5 text-sm">
                  {solutions.map((s, i) => <li key={i} className="flex items-start gap-2"><Target size={12} className="text-blue-500 mt-1 shrink-0" /><span>{s}</span></li>)}
                </ul>
              </>
            )}

            {/* ── Acknowledgements ── */}
            {project.acknowledgements?.length ? (
              <>
                <SH>Acknowledgements</SH>
                <ul className="space-y-1 text-sm">
                  {project.acknowledgements.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </>
            ) : null}

            {/* ── Code Snapshot ── */}
            {project.codeSnippet?.trim() && (
              <>
                <SH>Code Snapshot</SH>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Critical logic path — condensed snippet.</p>
                {project.codeSnippet.trim().startsWith('http') ? (
                  <a href={project.codeSnippet.trim()} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1">
                    View code source <ExternalLink size={14} />
                  </a>
                ) : (
                  <SyntaxHighlighter language={codeLang} style={vscDarkPlus} customStyle={{ borderRadius: '0.5rem', padding: '1rem', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    {project.codeSnippet}
                  </SyntaxHighlighter>
                )}
              </>
            )}

            {/* ── Advanced Details (collapsible) ── */}
            {(project.LiteratureReview || project.discussion?.length || project.references?.length || project.conclusion?.length || project.limitations?.length || project.futureWork?.length) && (
              <details className="mt-10 group">
                <summary className="cursor-pointer text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Advanced Details
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▾</span>
                </summary>
                <div className="mt-4 space-y-6 text-sm border-l-2 border-slate-200 dark:border-white/10 pl-4">
                  {project.LiteratureReview && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Literature Review</h4>
                      <p className="leading-relaxed">{project.LiteratureReview}</p>
                    </div>
                  )}
                  {project.discussion?.length ? (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Discussion</h4>
                      <ul className="space-y-1">{project.discussion.map((d, i) => <li key={i}>— {d}</li>)}</ul>
                    </div>
                  ) : null}
                  {project.conclusion?.length ? (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Conclusion</h4>
                      <ul className="space-y-1">{project.conclusion.map((c, i) => <li key={i}>— {c}</li>)}</ul>
                    </div>
                  ) : null}
                  {project.limitations?.length ? (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Limitations</h4>
                      <ul className="space-y-1">{project.limitations.map((l, i) => <li key={i}>— {l}</li>)}</ul>
                    </div>
                  ) : null}
                  {project.futureWork?.length ? (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Future Work</h4>
                      <ul className="space-y-1">{project.futureWork.map((f, i) => <li key={i}>— {f}</li>)}</ul>
                    </div>
                  ) : null}
                  {project.references?.length ? (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">References</h4>
                      <ul className="space-y-1">{project.references.map((r, i) => <li key={i} className="text-xs">{r}</li>)}</ul>
                    </div>
                  ) : null}
                </div>
              </details>
            )}

            {/* ── Gallery ── */}
            {gallery.length > 0 && (
              <>
                <SH>Results Gallery</SH>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Result ${i + 1}`}
                      className="rounded-lg object-cover aspect-video cursor-pointer hover:opacity-80 transition-opacity border border-slate-100 dark:border-white/5"
                      onClick={() => openModal(src)}
                      onKeyDown={imgKeyHandler(src)}
                      role="button"
                      tabIndex={0}
                      loading="lazy"
                    />
                  ))}
                </div>
              </>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-2">

              {/* Project info card */}
              <div className="border border-slate-100 dark:border-white/5 rounded-lg p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Project Details</h4>
                <dl className="space-y-3 text-sm">
                  {meta.map((m) => (
                    <div key={m.label} className="flex items-start gap-3">
                      <span className="text-slate-400 mt-0.5">{m.icon}</span>
                      <div>
                        <dt className="text-[10px] uppercase tracking-wider text-slate-400">{m.label}</dt>
                        <dd className="text-slate-800 dark:text-slate-200 font-medium">{m.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Tech stack */}
              <div className="border border-slate-100 dark:border-white/5 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tech Stack</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{stack.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              {tools.length > 0 && (
                <div className="border border-slate-100 dark:border-white/5 rounded-lg p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tools</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="border border-slate-100 dark:border-white/5 rounded-lg p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick links */}
              <div className="border border-slate-100 dark:border-white/5 rounded-lg p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Links</h4>
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-3 py-2 rounded text-xs font-medium bg-slate-900 dark:bg-white/10 text-white hover:bg-slate-800 dark:hover:bg-white/15 transition">
                    <Github size={14} className="mr-2" /> View Code
                  </a>
                )}
                {project.articleLink && (
                  <a href={project.articleLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-3 py-2 rounded border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                    <NotebookText size={14} className="mr-2" /> Read Paper
                  </a>
                )}
                {project.liveDemoLink && (
                  <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-3 py-2 rounded bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 transition">
                    <ExternalLink size={14} className="mr-2" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* ═══════════════ RELATED PROJECTS ═══════════════ */}
        <section className="mt-16 pt-10 border-t border-slate-100 dark:border-white/5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white text-center mb-8">
            {nextProjects.length > 0 ? 'Related Projects' : 'Explore More'}
          </h2>
          <div className={`grid grid-cols-1 ${nextProjects.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
            {related.map((p) => <ProjectCard key={p.id} {...p} />)}
          </div>
        </section>
      </div>

      {/* ═══════════════ RECRUITER CTA (preserved) ═══════════════ */}
      <section className="px-6 md:px-12 lg:px-20 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-900 dark:bg-slate-950 p-10 lg:p-14 text-white">
            <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-blue-300 mb-4">Collaboration</p>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 leading-tight">
                  Build the next <span className="text-blue-400">production-grade</span> system.
                </h2>
                <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed mb-6">
                  Curious about architecture choices, evaluation strategy, or delivery scope? I partner on research, production ML, and system design that ships measurable outcomes.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { v: 'Impact', l: 'ROI-focused' },
                    { v: 'Secure', l: 'Enterprise-ready' },
                    { v: 'Fast', l: 'Iterate + Ship' },
                    { v: 'Rigor', l: 'Research-grade' },
                  ].map((item) => (
                    <div key={item.l} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                      <div className="text-sm font-bold text-white">{item.v}</div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{item.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3">
                <Link to="/contact" className="group flex items-center justify-between p-5 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg"><Mail size={20} /></div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-blue-200 mb-0.5">Direct Channel</p>
                      <p className="text-sm font-bold">Initiate Discussion</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link to="/request-cv" className="group flex items-center justify-between p-5 bg-white/5 rounded-xl hover:bg-white/10 border border-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg text-blue-200"><Download size={20} /></div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">Resource Pack</p>
                      <p className="text-sm font-bold">Get CV + Deep-Dives</p>
                    </div>
                  </div>
                  <FileText size={18} className="text-slate-400 group-hover:text-blue-200 transition-colors" />
                </Link>

                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Verified Researcher @ IIT Kharagpur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ IMAGE MODAL ═══════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal} role="dialog" aria-modal="true" aria-label="Image preview">
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button ref={closeBtnRef} onClick={closeModal} className="absolute -top-3 -right-3 p-1.5 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition z-10 shadow" aria-label="Close">
              <X size={18} />
            </button>
            <button onClick={downloadImage} className="absolute -top-3 -left-3 p-1.5 bg-white dark:bg-slate-800 rounded-full text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition z-10 shadow" aria-label="Download">
              <Download size={18} />
            </button>
            <img src={modalImg} alt="Preview" className="object-contain rounded-lg max-h-[90vh]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;