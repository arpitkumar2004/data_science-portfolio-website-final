import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  FileText,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  Calendar,
  User,
  Building2,
  Layers,
  Target,
  Wrench,
  BarChart3,
  AlertTriangle,
  Cpu,
  Plus,
  Code2,
  BookOpen,
  MessageSquare,
  Flag,
  Rocket,
  Link2,
  Heart,
  Hash,
} from "lucide-react";
import adminAPI, {
  ProjectResponse,
  ProjectCreatePayload,
  ProjectCategory,
} from "../services/adminAPI";
import { useToast } from "../hooks/useToast";
import { ConfirmDialog } from "../components/shared";

/* ═══════════════════ CONSTANTS ═══════════════════ */

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

const CATEGORY_OPTIONS: { value: ProjectCategory; label: string }[] = [
  { value: "data-science", label: "Data Science" },
  { value: "web-app", label: "Web App" },
  { value: "system-design", label: "System Design" },
  { value: "chemical-research", label: "Chemical Research" },
];

/* ═══════════════════ INLINE EDIT COMPONENTS ═══════════════════ */

/** Wrapper that shows a pencil icon on hover and toggles edit mode */
function EditableSection({
  label,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  saving,
  children,
  editContent,
  isEmpty,
}: {
  label: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  children: React.ReactNode;
  editContent: React.ReactNode;
  isEmpty?: boolean;
}) {
  return (
    <div className="group/sec relative rounded-lg transition-all hover:bg-slate-50/50 -mx-3 px-3 py-2">
      {isEditing ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Editing: {label}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onCancel}
                disabled={saving}
                className="px-2.5 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-md transition"
              >
                <X size={12} className="inline mr-1" />
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={saving}
                className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-1"
              >
                {saving ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Check size={12} />
                )}
                Save
              </button>
            </div>
          </div>
          <div className="border border-blue-200 rounded-lg p-4 bg-white shadow-sm">
            {editContent}
          </div>
        </div>
      ) : (
        <>
          {/* Hover edit overlay */}
          <button
            onClick={onEdit}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-all opacity-0 group-hover/sec:opacity-100 z-10"
            title={`Edit ${label}`}
          >
            <Pencil size={13} />
          </button>
          {isEmpty ? (
            <button
              onClick={onEdit}
              className="w-full py-3 border border-dashed border-slate-200 rounded-lg text-xs text-slate-400 hover:text-blue-500 hover:border-blue-300 transition flex items-center justify-center gap-1.5"
            >
              <Plus size={13} />
              Add {label}
            </button>
          ) : (
            children
          )}
        </>
      )}
    </div>
  );
}

/* ── Reusable edit inputs ── */

function InlineTextInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  label?: string;
}) {
  return (
    <div>
      {label && (
        <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
      />
    </div>
  );
}

function InlineTextarea({
  value,
  onChange,
  placeholder,
  label,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
}) {
  return (
    <div>
      {label && (
        <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-y"
      />
    </div>
  );
}

function InlineListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const addItem = () => {
    const trimmed = input.trim();
    if (trimmed) {
      onChange([...items, trimmed]);
      setInput("");
    }
  };

  const removeItem = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, val: string) => {
    const updated = [...items];
    updated[idx] = val;
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <span className="text-xs text-slate-400 mt-2.5 select-none w-5 text-right shrink-0">
            {idx + 1}.
          </span>
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(idx, e.target.value)}
            className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
          <button
            type="button"
            onClick={() => removeItem(idx)}
            className="p-1 text-slate-300 hover:text-red-500 transition mt-1"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder || "Add item and press Enter"}
          className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={!input.trim()}
          className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded transition disabled:opacity-40"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function InlineTagsEditor({
  tags,
  onChange,
  placeholder,
}: {
  tags: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
  };

  const removeTag = (idx: number) => {
    onChange(tags.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 p-2 border border-slate-200 rounded-lg min-h-[40px] bg-white">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="hover:text-blue-900"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[100px] outline-none text-sm bg-transparent"
        />
      </div>
    </div>
  );
}

/* ── Section heading (matches live ProjectDetail.tsx) ── */
function SH({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-slate-900 tracking-tight mt-8 mb-2 first:mt-0">
      {children}
    </h3>
  );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [project, setProject] = useState<ProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Draft state for the currently-editing section
  const [draft, setDraft] = useState<Record<string, unknown>>({});

  /* ── Fetch project ── */
  const fetchProject = useCallback(async () => {
    if (!id) return;
    try {
      const data = await adminAPI.getProject(Number(id));
      setProject(data);
    } catch {
      showToast("Failed to load project", "error");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  /* ── Start editing a section ── */
  const startEdit = (section: string, initialDraft: Record<string, unknown>) => {
    setEditingSection(section);
    setDraft(initialDraft);
  };

  /* ── Cancel editing ── */
  const cancelEdit = () => {
    setEditingSection(null);
    setDraft({});
  };

  /* ── Save the current section ── */
  const saveSection = async (payload: Partial<ProjectCreatePayload>) => {
    if (!project) return;
    setSaving(true);
    try {
      const updated = await adminAPI.updateProject(project.id, payload);
      setProject(updated);
      setEditingSection(null);
      setDraft({});
      showToast("Saved successfully", "success");
    } catch {
      showToast("Failed to save changes", "error");
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete project ── */
  const handleDelete = async () => {
    if (!project) return;
    try {
      await adminAPI.deleteProject(project.id);
      showToast("Project deleted", "success");
      navigate("/projects");
    } catch {
      showToast("Failed to delete project", "error");
    }
  };

  /* ── Derived data (mirrors live ProjectDetail.tsx) ── */
  const catLabel = project ? CAT_LABEL[project.category] ?? "Project" : "";
  const catBadge = project ? CAT_BADGE[project.category] ?? "bg-slate-50 text-slate-700" : "";

  const sectionConfig = useMemo((): Record<string, string> => {
    const cat = project?.category || "";
    const base: Record<string, string> = {
      abstract: "Abstract",
      introduction: "Introduction",
      problem: "Problem Statement",
      objectives: "Objectives",
      methodology: "Methodology",
      implementation: "Implementation",
      results: "Results & Analysis",
    };
    const overrides: Record<string, Record<string, string>> = {
      "web-app": { methodology: "Architecture", implementation: "Implementation", results: "Outcomes" },
      "system-design": { methodology: "System Architecture", results: "Performance" },
      "chemical-research": { methodology: "Experimental Design", implementation: "Experimentation" },
    };
    return { ...base, ...(overrides[cat] || {}) };
  }, [project?.category]);

  /* ── Meta row ── */
  const meta = project
    ? [
        project.role && { icon: <User size={13} />, label: "Role", value: project.role },
        project.company && { icon: <Building2 size={13} />, label: "Company", value: project.company },
        project.duration && { icon: <Calendar size={13} />, label: "Timeline", value: project.duration },
        project.type && { icon: <Layers size={13} />, label: "Type", value: project.type },
      ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[]
    : [];

  /* ═══════════════════ LOADING / NOT FOUND ═══════════════════ */

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={24} className="animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-900 mb-2">Project not found</p>
          <button
            onClick={() => navigate("/projects")}
            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} /> Back to Projects
          </button>
        </div>
      </div>
    );
  }

  /* ── Shorthand extractors ── */
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
  const implSteps = project.implementation?.length ? project.implementation : [];
  const acknowledgements = project.acknowledgements ?? [];
  const discussion = project.discussion ?? [];
  const conclusion = project.conclusion ?? [];
  const limitations = project.limitations ?? [];
  const futureWork = project.futureWork ?? [];
  const references = project.references ?? [];
  const gallery = project.galleryImages ?? [];
  const similarIds = project.similarProjectIds ?? [];

  /* ═══════════════════ RENDER ═══════════════════ */
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* ── Top bar ── */}
      <div className="shrink-0 border-b border-slate-200 bg-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/projects")}
            className="p-1.5 rounded-md hover:bg-slate-100 transition text-slate-400 hover:text-slate-600"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-slate-900 line-clamp-1">{project.title}</h1>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              Project #{project.id} &middot; {catLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`${window.location.origin.replace(':5174', ':5173')}/projects/${project.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-md transition inline-flex items-center gap-1.5"
          >
            <ExternalLink size={13} />
            View Live
          </a>
          <button
            onClick={() => setDeleteConfirm(true)}
            className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-md transition inline-flex items-center gap-1.5"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>

      {/* ── Page content (mirrors ProjectDetail.tsx layout exactly) ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-10">

          {/* ════════════════ HEADER SECTION ════════════════ */}
          <EditableSection
            label="Header & Meta"
            isEditing={editingSection === "header"}
            onEdit={() =>
              startEdit("header", {
                title: project.title,
                tldr: project.tldr || "",
                role: project.role,
                company: project.company || "",
                duration: project.duration,
                type: project.type,
                category: project.category,
                standings: project.standings || "",
              })
            }
            onSave={() =>
              saveSection({
                title: draft.title as string,
                tldr: (draft.tldr as string) || undefined,
                role: draft.role as string,
                company: (draft.company as string) || undefined,
                duration: draft.duration as string,
                type: draft.type as string,
                category: draft.category as ProjectCategory,
              })
            }
            onCancel={cancelEdit}
            saving={saving}
            editContent={
              <div className="space-y-3">
                <InlineTextInput
                  label="Title"
                  value={draft.title as string || ""}
                  onChange={(v) => setDraft((d) => ({ ...d, title: v }))}
                  placeholder="Project title"
                />
                <InlineTextarea
                  label="TL;DR"
                  value={draft.tldr as string || ""}
                  onChange={(v) => setDraft((d) => ({ ...d, tldr: v }))}
                  placeholder="One-line summary"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-3">
                  <InlineTextInput
                    label="Role"
                    value={draft.role as string || ""}
                    onChange={(v) => setDraft((d) => ({ ...d, role: v }))}
                  />
                  <InlineTextInput
                    label="Company"
                    value={draft.company as string || ""}
                    onChange={(v) => setDraft((d) => ({ ...d, company: v }))}
                  />
                  <InlineTextInput
                    label="Duration"
                    value={draft.duration as string || ""}
                    onChange={(v) => setDraft((d) => ({ ...d, duration: v }))}
                  />
                  <InlineTextInput
                    label="Type"
                    value={draft.type as string || ""}
                    onChange={(v) => setDraft((d) => ({ ...d, type: v }))}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={draft.category as string || "data-science"}
                    onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <InlineTextInput
                  label="Standings (optional)"
                  value={draft.standings as string || ""}
                  onChange={(v) => setDraft((d) => ({ ...d, standings: v }))}
                  placeholder="e.g. Gold, Silver"
                />
              </div>
            }
          >
            {/* Display mode — matches live site header */}
            <header className="mb-2">
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
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                {project.title}
              </h1>
              <p className="text-sm leading-relaxed text-slate-600 max-w-3xl mb-4">{tldr}</p>
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
              {meta.length > 0 && (
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                  {meta.map((m) => (
                    <span key={m.label} className="flex items-center gap-1.5">
                      {m.icon}
                      <span className="uppercase tracking-wider text-[10px]">{m.label}:</span>
                      <span className="text-slate-800 font-medium">{m.value}</span>
                    </span>
                  ))}
                </div>
              )}
            </header>
          </EditableSection>

          {/* ════════════════ LINKS ════════════════ */}
          <EditableSection
            label="Links"
            isEditing={editingSection === "links"}
            onEdit={() =>
              startEdit("links", {
                githubLink: project.githubLink || "",
                articleLink: project.articleLink || "",
                liveDemoLink: project.liveDemoLink || "",
              })
            }
            onSave={() =>
              saveSection({
                githubLink: (draft.githubLink as string) || undefined,
                articleLink: (draft.articleLink as string) || undefined,
                liveDemoLink: (draft.liveDemoLink as string) || undefined,
              })
            }
            onCancel={cancelEdit}
            saving={saving}
            editContent={
              <div className="space-y-3">
                <InlineTextInput
                  label="GitHub Link"
                  value={draft.githubLink as string || ""}
                  onChange={(v) => setDraft((d) => ({ ...d, githubLink: v }))}
                  placeholder="https://github.com/..."
                />
                <InlineTextInput
                  label="Article Link"
                  value={draft.articleLink as string || ""}
                  onChange={(v) => setDraft((d) => ({ ...d, articleLink: v }))}
                  placeholder="https://medium.com/..."
                />
                <InlineTextInput
                  label="Live Demo Link"
                  value={draft.liveDemoLink as string || ""}
                  onChange={(v) => setDraft((d) => ({ ...d, liveDemoLink: v }))}
                  placeholder="https://..."
                />
              </div>
            }
            isEmpty={!project.githubLink && !project.articleLink && !project.liveDemoLink}
          >
            <div className="flex flex-wrap items-center gap-2 mt-4">
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
          </EditableSection>

          {/* ════════════════ HERO IMAGE ════════════════ */}
          <EditableSection
            label="Image"
            isEditing={editingSection === "image"}
            onEdit={() => startEdit("image", { image: project.image })}
            onSave={() => saveSection({ image: draft.image as string })}
            onCancel={cancelEdit}
            saving={saving}
            editContent={
              <div className="space-y-3">
                <InlineTextInput
                  label="Image URL"
                  value={draft.image as string || ""}
                  onChange={(v) => setDraft((d) => ({ ...d, image: v }))}
                  placeholder="https://images.unsplash.com/..."
                />
                {(draft.image as string) && (
                  <img
                    src={draft.image as string}
                    alt="Preview"
                    className="w-full rounded-lg border border-slate-200 max-h-64 object-cover"
                  />
                )}
              </div>
            }
          >
            <div className="rounded-lg overflow-hidden border border-slate-100 mt-6 mb-2 bg-slate-50">
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
          </EditableSection>

          {/* ════════════════ TWO-COLUMN (matches live) ════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">

            {/* ── Main content column ── */}
            <div className="lg:col-span-8 min-w-0 space-y-1">

              {/* Abstract */}
              <EditableSection
                label={sectionConfig.abstract}
                isEditing={editingSection === "abstract"}
                onEdit={() => startEdit("abstract", { description: project.description })}
                onSave={() => saveSection({ description: draft.description as string })}
                onCancel={cancelEdit}
                saving={saving}
                editContent={
                  <InlineTextarea
                    value={draft.description as string || ""}
                    onChange={(v) => setDraft((d) => ({ ...d, description: v }))}
                    placeholder="Short project description"
                    rows={3}
                  />
                }
              >
                <SH>{sectionConfig.abstract}</SH>
                <p className="text-sm leading-relaxed text-slate-600">{project.description}</p>
              </EditableSection>

              {/* Introduction */}
              <EditableSection
                label={sectionConfig.introduction}
                isEditing={editingSection === "introduction"}
                onEdit={() => startEdit("introduction", { longDescription: project.longDescription || "" })}
                onSave={() => saveSection({ longDescription: draft.longDescription as string })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={!project.longDescription?.trim()}
                editContent={
                  <InlineTextarea
                    value={draft.longDescription as string || ""}
                    onChange={(v) => setDraft((d) => ({ ...d, longDescription: v }))}
                    placeholder="Full detailed description"
                    rows={5}
                  />
                }
              >
                {project.longDescription?.trim() && (
                  <>
                    <SH>{sectionConfig.introduction}</SH>
                    <p className="text-sm leading-relaxed text-slate-600">{project.longDescription}</p>
                  </>
                )}
              </EditableSection>

              {/* Problem + Implementation */}
              <EditableSection
                label="Problem & Solution"
                isEditing={editingSection === "problem"}
                onEdit={() =>
                  startEdit("problem", {
                    ProblemStatement: problem,
                    implementation: implSteps,
                  })
                }
                onSave={() =>
                  saveSection({
                    ProblemStatement: (draft.ProblemStatement as string) || undefined,
                    implementation: (draft.implementation as string[]) || undefined,
                  })
                }
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={!problem && implSteps.length === 0}
                editContent={
                  <div className="space-y-4">
                    <InlineTextarea
                      label="Problem Statement"
                      value={draft.ProblemStatement as string || ""}
                      onChange={(v) => setDraft((d) => ({ ...d, ProblemStatement: v }))}
                      placeholder="What problem does this solve?"
                      rows={3}
                    />
                    <div>
                      <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-2">
                        Implementation Steps
                      </label>
                      <InlineListEditor
                        items={draft.implementation as string[] || []}
                        onChange={(v) => setDraft((d) => ({ ...d, implementation: v }))}
                        placeholder="Add an implementation step"
                      />
                    </div>
                  </div>
                }
              >
                {(problem || implSteps.length > 0) && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          {implSteps.map((s, i) => (
                            <li key={i} className="leading-relaxed">— {s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </EditableSection>

              {/* Objectives */}
              <EditableSection
                label={sectionConfig.objectives}
                isEditing={editingSection === "objectives"}
                onEdit={() => startEdit("objectives", { objectives })}
                onSave={() => saveSection({ objectives: draft.objectives as string[] })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={objectives.length === 0}
                editContent={
                  <InlineListEditor
                    items={draft.objectives as string[] || []}
                    onChange={(v) => setDraft((d) => ({ ...d, objectives: v }))}
                    placeholder="Add an objective"
                  />
                }
              >
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
              </EditableSection>

              {/* Methodology */}
              <EditableSection
                label={sectionConfig.methodology}
                isEditing={editingSection === "methods"}
                onEdit={() => startEdit("methods", { methods })}
                onSave={() => saveSection({ methods: draft.methods as string[] })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={methods.length === 0}
                editContent={
                  <InlineListEditor
                    items={draft.methods as string[] || []}
                    onChange={(v) => setDraft((d) => ({ ...d, methods: v }))}
                    placeholder="Add a method"
                  />
                }
              >
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
              </EditableSection>

              {/* Results */}
              <EditableSection
                label={sectionConfig.results}
                isEditing={editingSection === "results"}
                onEdit={() => startEdit("results", { results })}
                onSave={() => saveSection({ results: draft.results as string[] })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={results.length === 0}
                editContent={
                  <InlineListEditor
                    items={draft.results as string[] || []}
                    onChange={(v) => setDraft((d) => ({ ...d, results: v }))}
                    placeholder="Add a result"
                  />
                }
              >
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
              </EditableSection>

              {/* Challenges */}
              <EditableSection
                label="Challenges"
                isEditing={editingSection === "challenges"}
                onEdit={() => startEdit("challenges", { challenges })}
                onSave={() => saveSection({ challenges: draft.challenges as string[] })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={challenges.length === 0}
                editContent={
                  <InlineListEditor
                    items={draft.challenges as string[] || []}
                    onChange={(v) => setDraft((d) => ({ ...d, challenges: v }))}
                    placeholder="Add a challenge"
                  />
                }
              >
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
              </EditableSection>

              {/* Solutions */}
              <EditableSection
                label="Solutions"
                isEditing={editingSection === "solutions"}
                onEdit={() => startEdit("solutions", { solutions })}
                onSave={() => saveSection({ solutions: draft.solutions as string[] })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={solutions.length === 0}
                editContent={
                  <InlineListEditor
                    items={draft.solutions as string[] || []}
                    onChange={(v) => setDraft((d) => ({ ...d, solutions: v }))}
                    placeholder="Add a solution"
                  />
                }
              >
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
              </EditableSection>

              {/* Key Impact Metrics */}
              <EditableSection
                label="Key Impact Metrics"
                isEditing={editingSection === "impact"}
                onEdit={() =>
                  startEdit("impact", {
                    keyImpactMetrics: project.keyImpactMetrics || [],
                  })
                }
                onSave={() =>
                  saveSection({
                    keyImpactMetrics: (draft.keyImpactMetrics as string[]) || undefined,
                  })
                }
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={!project.keyImpactMetrics?.length}
                editContent={
                  <InlineListEditor
                    items={draft.keyImpactMetrics as string[] || []}
                    onChange={(v) => setDraft((d) => ({ ...d, keyImpactMetrics: v }))}
                    placeholder="Add a metric (e.g. 40% cost reduction)"
                  />
                }
              >
                {project.keyImpactMetrics && project.keyImpactMetrics.length > 0 && (
                  <>
                    <SH>Key Impact Metrics</SH>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {project.keyImpactMetrics.map((m, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1.5 shrink-0">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </EditableSection>

              {/* Acknowledgements */}
              <EditableSection
                label="Acknowledgements"
                isEditing={editingSection === "acknowledgements"}
                onEdit={() => startEdit("acknowledgements", { acknowledgements })}
                onSave={() => saveSection({ acknowledgements: draft.acknowledgements as string[] })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={acknowledgements.length === 0}
                editContent={
                  <InlineListEditor
                    items={draft.acknowledgements as string[] || []}
                    onChange={(v) => setDraft((d) => ({ ...d, acknowledgements: v }))}
                    placeholder="Add an acknowledgement"
                  />
                }
              >
                {acknowledgements.length > 0 && (
                  <>
                    <SH>Acknowledgements</SH>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {acknowledgements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Heart size={12} className="text-pink-500 mt-1 shrink-0" /><span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </EditableSection>

              {/* Code Snapshot */}
              <EditableSection
                label="Code Snapshot"
                isEditing={editingSection === "codeSnippet"}
                onEdit={() => startEdit("codeSnippet", { codeSnippet: project.codeSnippet || "" })}
                onSave={() => saveSection({ codeSnippet: (draft.codeSnippet as string) || undefined })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={!project.codeSnippet?.trim()}
                editContent={
                  <InlineTextarea
                    label="Code Snippet (paste code or a URL)"
                    value={draft.codeSnippet as string || ""}
                    onChange={(v) => setDraft((d) => ({ ...d, codeSnippet: v }))}
                    placeholder="Paste code snippet or a URL to the source"
                    rows={8}
                  />
                }
              >
                {project.codeSnippet?.trim() && (
                  <>
                    <SH>Code Snapshot</SH>
                    <p className="text-xs text-slate-500 mb-2">Critical logic path — condensed snippet.</p>
                    {project.codeSnippet.trim().startsWith("http") ? (
                      <a
                        href={project.codeSnippet.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <Code2 size={14} /> View code source <ExternalLink size={12} />
                      </a>
                    ) : (
                      <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-xs leading-relaxed overflow-x-auto max-h-64 overflow-y-auto">
                        <code>{project.codeSnippet}</code>
                      </pre>
                    )}
                  </>
                )}
              </EditableSection>

              {/* ═══════ Advanced Details (collapsible group) ═══════ */}
              <div className="mt-8">
                <details className="group" open={
                  editingSection === "literatureReview" ||
                  editingSection === "discussion" ||
                  editingSection === "conclusionSec" ||
                  editingSection === "limitations" ||
                  editingSection === "futureWork" ||
                  editingSection === "references"
                }>
                  <summary className="cursor-pointer text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <BookOpen size={14} className="text-slate-500" />
                    Advanced Details
                    <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▾</span>
                  </summary>
                  <div className="space-y-1 border-l-2 border-slate-200 pl-3 ml-1">

                    {/* Literature Review */}
                    <EditableSection
                      label="Literature Review"
                      isEditing={editingSection === "literatureReview"}
                      onEdit={() => startEdit("literatureReview", { LiteratureReview: project.LiteratureReview || "" })}
                      onSave={() => saveSection({ LiteratureReview: (draft.LiteratureReview as string) || undefined })}
                      onCancel={cancelEdit}
                      saving={saving}
                      isEmpty={!project.LiteratureReview?.trim()}
                      editContent={
                        <InlineTextarea
                          value={draft.LiteratureReview as string || ""}
                          onChange={(v) => setDraft((d) => ({ ...d, LiteratureReview: v }))}
                          placeholder="Literature review content"
                          rows={5}
                        />
                      }
                    >
                      {project.LiteratureReview?.trim() && (
                        <>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                            <BookOpen size={12} /> Literature Review
                          </h4>
                          <p className="text-sm leading-relaxed text-slate-600">{project.LiteratureReview}</p>
                        </>
                      )}
                    </EditableSection>

                    {/* Discussion */}
                    <EditableSection
                      label="Discussion"
                      isEditing={editingSection === "discussion"}
                      onEdit={() => startEdit("discussion", { discussion })}
                      onSave={() => saveSection({ discussion: draft.discussion as string[] })}
                      onCancel={cancelEdit}
                      saving={saving}
                      isEmpty={discussion.length === 0}
                      editContent={
                        <InlineListEditor
                          items={draft.discussion as string[] || []}
                          onChange={(v) => setDraft((d) => ({ ...d, discussion: v }))}
                          placeholder="Add a discussion point"
                        />
                      }
                    >
                      {discussion.length > 0 && (
                        <>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                            <MessageSquare size={12} /> Discussion
                          </h4>
                          <ul className="space-y-1 text-sm text-slate-600">
                            {discussion.map((d, i) => <li key={i}>— {d}</li>)}
                          </ul>
                        </>
                      )}
                    </EditableSection>

                    {/* Conclusion */}
                    <EditableSection
                      label="Conclusion"
                      isEditing={editingSection === "conclusionSec"}
                      onEdit={() => startEdit("conclusionSec", { conclusion })}
                      onSave={() => saveSection({ conclusion: draft.conclusion as string[] })}
                      onCancel={cancelEdit}
                      saving={saving}
                      isEmpty={conclusion.length === 0}
                      editContent={
                        <InlineListEditor
                          items={draft.conclusion as string[] || []}
                          onChange={(v) => setDraft((d) => ({ ...d, conclusion: v }))}
                          placeholder="Add a conclusion point"
                        />
                      }
                    >
                      {conclusion.length > 0 && (
                        <>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                            <Flag size={12} /> Conclusion
                          </h4>
                          <ul className="space-y-1 text-sm text-slate-600">
                            {conclusion.map((c, i) => <li key={i}>— {c}</li>)}
                          </ul>
                        </>
                      )}
                    </EditableSection>

                    {/* Limitations */}
                    <EditableSection
                      label="Limitations"
                      isEditing={editingSection === "limitations"}
                      onEdit={() => startEdit("limitations", { limitations })}
                      onSave={() => saveSection({ limitations: draft.limitations as string[] })}
                      onCancel={cancelEdit}
                      saving={saving}
                      isEmpty={limitations.length === 0}
                      editContent={
                        <InlineListEditor
                          items={draft.limitations as string[] || []}
                          onChange={(v) => setDraft((d) => ({ ...d, limitations: v }))}
                          placeholder="Add a limitation"
                        />
                      }
                    >
                      {limitations.length > 0 && (
                        <>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                            <AlertTriangle size={12} /> Limitations
                          </h4>
                          <ul className="space-y-1 text-sm text-slate-600">
                            {limitations.map((l, i) => <li key={i}>— {l}</li>)}
                          </ul>
                        </>
                      )}
                    </EditableSection>

                    {/* Future Work */}
                    <EditableSection
                      label="Future Work"
                      isEditing={editingSection === "futureWork"}
                      onEdit={() => startEdit("futureWork", { futureWork })}
                      onSave={() => saveSection({ futureWork: draft.futureWork as string[] })}
                      onCancel={cancelEdit}
                      saving={saving}
                      isEmpty={futureWork.length === 0}
                      editContent={
                        <InlineListEditor
                          items={draft.futureWork as string[] || []}
                          onChange={(v) => setDraft((d) => ({ ...d, futureWork: v }))}
                          placeholder="Add a future work item"
                        />
                      }
                    >
                      {futureWork.length > 0 && (
                        <>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                            <Rocket size={12} /> Future Work
                          </h4>
                          <ul className="space-y-1 text-sm text-slate-600">
                            {futureWork.map((f, i) => <li key={i}>— {f}</li>)}
                          </ul>
                        </>
                      )}
                    </EditableSection>

                    {/* References */}
                    <EditableSection
                      label="References"
                      isEditing={editingSection === "references"}
                      onEdit={() => startEdit("references", { references })}
                      onSave={() => saveSection({ references: draft.references as string[] })}
                      onCancel={cancelEdit}
                      saving={saving}
                      isEmpty={references.length === 0}
                      editContent={
                        <InlineListEditor
                          items={draft.references as string[] || []}
                          onChange={(v) => setDraft((d) => ({ ...d, references: v }))}
                          placeholder="Add a reference"
                        />
                      }
                    >
                      {references.length > 0 && (
                        <>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                            <Link2 size={12} /> References
                          </h4>
                          <ul className="space-y-1 text-sm text-slate-600">
                            {references.map((r, i) => <li key={i} className="text-xs">{r}</li>)}
                          </ul>
                        </>
                      )}
                    </EditableSection>

                  </div>
                </details>
              </div>

              {/* Gallery */}
              <EditableSection
                label="Gallery"
                isEditing={editingSection === "gallery"}
                onEdit={() => startEdit("gallery", { galleryImages: gallery })}
                onSave={() => saveSection({ galleryImages: draft.galleryImages as string[] })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={gallery.length === 0}
                editContent={
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">Add image URLs for the results gallery.</p>
                    <InlineListEditor
                      items={draft.galleryImages as string[] || []}
                      onChange={(v) => setDraft((d) => ({ ...d, galleryImages: v }))}
                      placeholder="Paste image URL and press Enter"
                    />
                    {(draft.galleryImages as string[] || []).length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {(draft.galleryImages as string[]).map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`Preview ${i + 1}`}
                            className="rounded border border-slate-200 aspect-video object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&q=80";
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                }
              >
                {gallery.length > 0 && (
                  <>
                    <SH>Results Gallery</SH>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {gallery.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Result ${i + 1}`}
                          className="rounded-lg object-cover aspect-video border border-slate-100 hover:opacity-80 transition-opacity"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&q=80";
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </EditableSection>

              {/* Similar Project IDs */}
              <EditableSection
                label="Similar Projects"
                isEditing={editingSection === "similarIds"}
                onEdit={() => startEdit("similarIds", { similarProjectIds: similarIds })}
                onSave={() => saveSection({ similarProjectIds: draft.similarProjectIds as number[] })}
                onCancel={cancelEdit}
                saving={saving}
                isEmpty={similarIds.length === 0}
                editContent={
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">Enter project IDs of related/similar projects.</p>
                    <div className="flex flex-wrap gap-1.5 p-2 border border-slate-200 rounded-lg min-h-[40px] bg-white">
                      {(draft.similarProjectIds as number[] || []).map((pid, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                        >
                          #{pid}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (draft.similarProjectIds as number[]).filter(
                                (_, i) => i !== idx
                              );
                              setDraft((d) => ({ ...d, similarProjectIds: updated }));
                            }}
                            className="hover:text-blue-900"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      <input
                        type="number"
                        placeholder="Add ID"
                        className="flex-1 min-w-[60px] outline-none text-sm bg-transparent"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = parseInt((e.target as HTMLInputElement).value);
                            if (!isNaN(val) && val > 0) {
                              const current = (draft.similarProjectIds as number[]) || [];
                              if (!current.includes(val)) {
                                setDraft((d) => ({ ...d, similarProjectIds: [...current, val] }));
                              }
                              (e.target as HTMLInputElement).value = "";
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                }
              >
                {similarIds.length > 0 && (
                  <>
                    <SH>Similar Projects</SH>
                    <div className="flex flex-wrap gap-2">
                      {similarIds.map((pid) => (
                        <span
                          key={pid}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium border border-slate-200"
                        >
                          <Hash size={11} /> Project #{pid}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </EditableSection>
            </div>

            {/* ── Sidebar column ── */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-4 space-y-4">

                {/* Tech Stack */}
                <EditableSection
                  label="Tech Stack"
                  isEditing={editingSection === "stack"}
                  onEdit={() =>
                    startEdit("stack", {
                      technologies,
                      coreStack: project.coreStack || [],
                    })
                  }
                  onSave={() =>
                    saveSection({
                      technologies: draft.technologies as string[],
                      coreStack: (draft.coreStack as string[]) || undefined,
                    })
                  }
                  onCancel={cancelEdit}
                  saving={saving}
                  editContent={
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                          Technologies
                        </label>
                        <InlineTagsEditor
                          tags={draft.technologies as string[] || []}
                          onChange={(v) => setDraft((d) => ({ ...d, technologies: v }))}
                          placeholder="Press Enter to add"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                          Core Stack
                        </label>
                        <InlineTagsEditor
                          tags={draft.coreStack as string[] || []}
                          onChange={(v) => setDraft((d) => ({ ...d, coreStack: v }))}
                          placeholder="Press Enter to add"
                        />
                      </div>
                    </div>
                  }
                >
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
                </EditableSection>

                {/* Tools */}
                <EditableSection
                  label="Tools"
                  isEditing={editingSection === "tools"}
                  onEdit={() => startEdit("tools", { tools })}
                  onSave={() => saveSection({ tools: draft.tools as string[] })}
                  onCancel={cancelEdit}
                  saving={saving}
                  isEmpty={tools.length === 0}
                  editContent={
                    <InlineTagsEditor
                      tags={draft.tools as string[] || []}
                      onChange={(v) => setDraft((d) => ({ ...d, tools: v }))}
                      placeholder="Press Enter to add"
                    />
                  }
                >
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
                </EditableSection>

                {/* Tags */}
                <EditableSection
                  label="Tags"
                  isEditing={editingSection === "tags"}
                  onEdit={() => startEdit("tags", { tags })}
                  onSave={() => saveSection({ tags: draft.tags as string[] })}
                  onCancel={cancelEdit}
                  saving={saving}
                  isEmpty={tags.length === 0}
                  editContent={
                    <InlineTagsEditor
                      tags={draft.tags as string[] || []}
                      onChange={(v) => setDraft((d) => ({ ...d, tags: v }))}
                      placeholder="Press Enter to add"
                    />
                  }
                >
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
                </EditableSection>

                {/* Timestamps */}
                {(project.created_at || project.updated_at) && (
                  <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-100 space-y-1">
                    {project.created_at && (
                      <p>
                        Created:{" "}
                        {new Date(project.created_at).toLocaleDateString("en-US", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    )}
                    {project.updated_at && (
                      <p>
                        Updated:{" "}
                        {new Date(project.updated_at).toLocaleDateString("en-US", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Delete confirmation ── */}
      <ConfirmDialog
        open={deleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${project.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
      />
    </div>
  );
};

export default ProjectDetailPage;
