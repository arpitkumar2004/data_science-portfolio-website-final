import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  FileText,
  Pencil,
  Trash2,
  Calendar,
  Building2,
  Layers,
  User,
  Target,
  Wrench,
  BarChart3,
  AlertTriangle,
  Cpu,
} from "lucide-react";
import type { ProjectResponse } from "../../services/adminAPI";

interface ProjectDetailDrawerProps {
  project: ProjectResponse;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CAT_LABEL: Record<string, string> = {
  "data-science": "Data Science",
  "web-app": "Web App",
  "system-design": "System Design",
  "chemical-research": "Chemical Research",
};

const CAT_BADGE: Record<string, string> = {
  "data-science": "bg-blue-50 text-blue-700",
  "web-app": "bg-emerald-50 text-emerald-700",
  "system-design": "bg-amber-50 text-amber-700",
  "chemical-research": "bg-rose-50 text-rose-700",
};

const ProjectDetailDrawer: React.FC<ProjectDetailDrawerProps> = ({
  project,
  onClose,
  onEdit,
  onDelete,
}) => {
  /* ── Derived data (mirrors ProjectDetail.tsx) ── */
  const catLabel = CAT_LABEL[project.category] ?? "Project";
  const catBadge = CAT_BADGE[project.category] ?? "bg-slate-50 text-slate-700";
  const objectives = project.objectives ?? [];
  const methods = project.methods ?? [];
  const results = project.results ?? [];
  const technologies = project.technologies ?? [];
  const challenges = project.challenges ?? [];
  const solutions = project.solutions ?? [];
  const tags = project.tags ?? [];
  const tldr = project.tldr ?? project.description;
  const impact = project.keyImpactMetrics?.length ? project.keyImpactMetrics : results.slice(0, 3);
  const stack = project.coreStack?.length ? project.coreStack : technologies;
  const tools = project.tools ?? [];
  const problem = project.ProblemStatement ?? "";
  const implSteps = project.implementation?.length ? project.implementation : methods.slice(0, 3);

  /* ── Section labels (category-aware, mirrors live site) ── */
  const sectionConfig = useMemo(() => {
    const base: Record<string, string> = {
      abstract: "Abstract",
      introduction: "Introduction",
      problem: "Problem Statement",
      objectives: "Objectives",
      methodology: "Methodology",
      implementation: "Implementation",
      results: "Results & Analysis",
    };
    const overrides: Record<string, Partial<typeof base>> = {
      "web-app": { methodology: "Architecture", implementation: "Implementation", results: "Outcomes" },
      "system-design": { methodology: "System Architecture", results: "Performance" },
      "chemical-research": { methodology: "Experimental Design", implementation: "Experimentation" },
    };
    return { ...base, ...overrides[project.category] };
  }, [project.category]);

  /* ── Meta row items (same as live site) ── */
  const meta = [
    project.role && { icon: <User size={13} />, label: "Role", value: project.role },
    project.company && { icon: <Building2 size={13} />, label: "Company", value: project.company },
    project.duration && { icon: <Calendar size={13} />, label: "Timeline", value: project.duration },
    project.type && { icon: <Layers size={13} />, label: "Type", value: project.type },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer — wider to fit live-site layout */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
      >
        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 shrink-0">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
            Live Preview
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {/* ── Content (mirrors ProjectDetail.tsx layout) ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-8">

            {/* ════════════ HEADER (matches live site) ════════════ */}
            <header className="mb-8">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${catBadge}`}>
                  {catLabel}
                </span>
                {project.standings && (
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-yellow-50 text-yellow-700">
                    {project.standings}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                {project.title}
              </h1>

              {/* TL;DR */}
              <p className="text-sm leading-relaxed text-slate-600 max-w-2xl mb-4">
                {tldr}
              </p>

              {/* Impact Metrics */}
              {impact.length > 0 && (
                <ul className="mb-4 space-y-1">
                  {impact.map((m, i) => (
                    <li key={i} className="text-sm leading-relaxed flex items-start gap-2 text-slate-600">
                      <span className="text-blue-500 mt-1.5 shrink-0">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Meta row */}
              {meta.length > 0 && (
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 mb-4">
                  {meta.map((m) => (
                    <span key={m.label} className="flex items-center gap-1.5">
                      {m.icon}
                      <span className="uppercase tracking-wider text-[10px]">{m.label}:</span>
                      <span className="text-slate-800 font-medium">{m.value}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons (matches live site) */}
              <div className="flex flex-wrap items-center gap-2">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 rounded bg-slate-900 text-xs font-medium text-white hover:bg-slate-800 transition">
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
              </div>
            </header>

            {/* ════════════ HERO IMAGE ════════════ */}
            <div className="rounded-lg overflow-hidden border border-slate-100 mb-8 bg-slate-50">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80";
                }}
              />
            </div>

            {/* ════════════ CONTENT SECTIONS (same order as live site) ════════════ */}

            {/* Abstract */}
            <SH>{sectionConfig.abstract}</SH>
            <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>

            {/* Introduction */}
            {project.longDescription?.trim() && (
              <>
                <SH>{sectionConfig.introduction}</SH>
                <p className="text-sm leading-relaxed text-slate-600">{project.longDescription}</p>
              </>
            )}

            {/* Problem + Solution side-by-side */}
            {(problem || implSteps.length > 0) && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {problem && (
                  <div className="border-l-2 border-amber-400 pl-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                      <AlertTriangle size={14} className="text-amber-500" /> The Challenge
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-600">{problem}</p>
                  </div>
                )}
                {implSteps.length > 0 && (
                  <div className="border-l-2 border-blue-400 pl-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                      <Cpu size={14} className="text-blue-500" /> The Solution
                    </h4>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {implSteps.map((s, i) => <li key={i} className="leading-relaxed">— {s}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Objectives */}
            {objectives.length > 0 && (
              <>
                <SH>{sectionConfig.objectives}</SH>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Target size={12} className="text-blue-500 mt-1 shrink-0" /><span>{o}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Methodology */}
            {methods.length > 0 && (
              <>
                <SH>{sectionConfig.methodology}</SH>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {methods.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Wrench size={12} className="text-slate-400 mt-1 shrink-0" /><span>{m}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Results */}
            {results.length > 0 && (
              <>
                <SH>{sectionConfig.results}</SH>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {results.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <BarChart3 size={12} className="text-emerald-500 mt-1 shrink-0" /><span>{r}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Challenges */}
            {challenges.length > 0 && (
              <>
                <SH>Challenges</SH>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle size={12} className="text-amber-500 mt-1 shrink-0" /><span>{c}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Solutions */}
            {solutions.length > 0 && (
              <>
                <SH>Solutions</SH>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  {solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Target size={12} className="text-blue-500 mt-1 shrink-0" /><span>{s}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* ════════════ SIDEBAR INFO (rendered inline in drawer) ════════════ */}
            <div className="mt-10 pt-8 border-t border-slate-100 space-y-4">

              {/* Tech Stack */}
              <div className="border border-slate-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tech Stack</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{stack.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              {tools.length > 0 && (
                <div className="border border-slate-100 rounded-lg p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="border border-slate-100 rounded-lg p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="border border-slate-100 rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Links</h4>
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-3 py-2 rounded text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition">
                    <Github size={14} className="mr-2" /> View Code
                  </a>
                )}
                {project.articleLink && (
                  <a href={project.articleLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-3 py-2 rounded border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition">
                    <FileText size={14} className="mr-2" /> Read Paper
                  </a>
                )}
                {project.liveDemoLink && (
                  <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-3 py-2 rounded bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 transition">
                    <ExternalLink size={14} className="mr-2" /> Live Demo
                  </a>
                )}
                {!project.githubLink && !project.articleLink && !project.liveDemoLink && (
                  <span className="text-xs text-slate-400 italic">No links added</span>
                )}
              </div>
            </div>

            {/* Timestamps */}
            {(project.created_at || project.updated_at) && (
              <div className="text-[11px] text-slate-400 pt-6 mt-6 border-t border-slate-100 space-y-1">
                {project.created_at && (
                  <p>
                    Created:{" "}
                    {new Date(project.created_at).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                )}
                {project.updated_at && (
                  <p>
                    Updated:{" "}
                    {new Date(project.updated_at).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer actions ── */}
        <div className="p-4 border-t border-slate-200 flex items-center gap-3 shrink-0">
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-all flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailDrawer;

/* ═══════════════ Shared sub-components ═══════════════ */

/** Section heading — matches ProjectDetail.tsx SH component */
function SH({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-8 mb-2 first:mt-0">
      {children}
    </h3>
  );
}
