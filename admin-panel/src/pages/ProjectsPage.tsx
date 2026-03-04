import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Search,
  FolderKanban,
  ExternalLink,
  Github,
  Eye,
  RefreshCw,
  Filter,
  X,
  BarChart3,
  Pencil,
} from "lucide-react";
import adminAPI, {
  ProjectResponse,
  ProjectCreatePayload,
  ProjectCategory,
} from "../services/adminAPI";
import { useToast } from "../hooks/useToast";
import TopBar from "../components/layout/TopBar";
import { ConfirmDialog, EmptyState } from "../components/shared";
import PageTransition from "../components/shared/PageTransition";
import ProjectFormModal from "../components/projects/ProjectFormModal";

/* ═══════════════════ CONSTANTS ═══════════════════ */

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "data-science": "Data Science",
  "web-app": "Web App",
  "system-design": "System Design",
  "chemical-research": "Chemical Research",
};

const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  "data-science": "bg-purple-100 text-purple-700",
  "web-app": "bg-blue-100 text-blue-700",
  "system-design": "bg-emerald-100 text-emerald-700",
  "chemical-research": "bg-amber-100 text-amber-700",
};

const TYPE_TABS = [
  { key: "all", label: "All" },
  { key: "project", label: "Projects" },
  { key: "competition", label: "Competitions" },
  { key: "research", label: "Research" },
  { key: "website", label: "Websites & Blogs" },
];

/* ── Sort helper (newest first) ── */
const parseEndDate = (duration: string): Date => {
  const parts = duration.split(/ - |–/);
  let endPart = parts.length > 1 ? parts[1] : parts[0];
  const rangeParts = endPart.split("–");
  if (rangeParts.length > 1) endPart = rangeParts[rangeParts.length - 1];
  const [month, year] = endPart.trim().split(" ");
  if (month && year) {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    if (!isNaN(monthIndex)) return new Date(parseInt(year), monthIndex, 1);
  }
  return new Date(0);
};

/* ═══════════════════ PAGE ═══════════════════ */

const ProjectsPage: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Data
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // UI state
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagFilters, setShowTagFilters] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editProject, setEditProject] = useState<ProjectResponse | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    project: ProjectResponse | null;
  }>({ open: false, project: null });

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      const data = await adminAPI.getProjects();
      setProjects(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load projects";
      showToast(message, "error");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchProjects();
  };

  /* ── Sorted projects (newest first) ── */
  const sortedProjects = useMemo(
    () =>
      [...projects].sort(
        (a, b) =>
          parseEndDate(b.duration).getTime() -
          parseEndDate(a.duration).getTime()
      ),
    [projects]
  );

  /* ── All tags (for filter pills) ── */
  const allTags = useMemo(
    () => Array.from(new Set(sortedProjects.flatMap((p) => p.tags || []))),
    [sortedProjects]
  );

  /* ── Filtered list ── */
  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((p) => {
      const typeMatch =
        activeTab === "all" ||
        (p.type || "").toLowerCase().includes(activeTab);
      const catMatch =
        categoryFilter === "all" || p.category === categoryFilter;
      const searchMatch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => p.tags?.includes(tag));
      return typeMatch && catMatch && searchMatch && tagMatch;
    });
  }, [sortedProjects, activeTab, categoryFilter, search, selectedTags]);

  /* ── Tab counts ── */
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sortedProjects.length };
    TYPE_TABS.slice(1).forEach((tab) => {
      counts[tab.key] = sortedProjects.filter((p) =>
        (p.type || "").toLowerCase().includes(tab.key)
      ).length;
    });
    return counts;
  }, [sortedProjects]);

  /* ── Category distribution (for stat cards) ── */
  const categoryDistribution = useMemo(() => {
    const dist: Record<string, number> = {};
    projects.forEach((p) => {
      dist[p.category] = (dist[p.category] || 0) + 1;
    });
    return dist;
  }, [projects]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Create project
  const handleCreate = async (payload: ProjectCreatePayload) => {
    try {
      await adminAPI.createProject(payload);
      showToast("Project created successfully!", "success");
      setShowFormModal(false);
      fetchProjects();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create project";
      showToast(message, "error");
    }
  };

  // Update project
  const handleUpdate = async (payload: ProjectCreatePayload) => {
    if (!editProject) return;
    try {
      await adminAPI.updateProject(editProject.id, payload);
      showToast("Project updated successfully!", "success");
      setEditProject(null);
      fetchProjects();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update project";
      showToast(message, "error");
    }
  };

  // Delete project
  const handleDelete = async () => {
    if (!deleteConfirm.project) return;
    try {
      await adminAPI.deleteProject(deleteConfirm.project.id);
      showToast("Project deleted successfully!", "success");
      setDeleteConfirm({ open: false, project: null });
      fetchProjects();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete project";
      showToast(message, "error");
    }
  };

  // Stats
  const totalCount = projects.length;

  return (
    <PageTransition>
      <TopBar
        title="Projects"
        subtitle={`${totalCount} project${totalCount !== 1 ? "s" : ""}`}
        isLoading={isRefreshing}
        onRefresh={handleRefresh}
        actions={
          <button
            onClick={() => {
              setEditProject(null);
              setShowFormModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <Plus size={16} />
            Add Project
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto">

        {/* ═══════════════ STATS ROW ═══════════════ */}
        <div className="px-6 pt-5 pb-2">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Total */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={14} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total
                </span>
              </div>
              <p className="text-xl font-black text-slate-900">{totalCount}</p>
            </div>
            {/* Per-category */}
            {(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((cat) => (
              <div
                key={cat}
                className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer hover:shadow-sm transition"
                onClick={() =>
                  setCategoryFilter(categoryFilter === cat ? "all" : cat)
                }
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      CATEGORY_COLORS[cat].split(" ")[0]
                    }`}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {CATEGORY_LABELS[cat]}
                  </span>
                </div>
                <p className="text-xl font-black text-slate-900">
                  {categoryDistribution[cat] || 0}
                </p>
                {categoryFilter === cat && (
                  <span className="text-[9px] text-blue-600 font-medium">
                    Filtered
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════ TYPE TABS + CONTROLS ═══════════════ */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-3">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            {/* Type tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              {TYPE_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.key
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {typeCounts[tab.key]}
                  </span>
                </button>
              ))}
            </div>

            {/* Search + Category + Filter */}
            <div className="flex items-center gap-2 md:ml-auto w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition"
                  data-search-input
                />
              </div>

              {/* Category dropdown */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              >
                <option value="all">All categories</option>
                {(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </option>
                  )
                )}
              </select>

              {/* Tag filter toggle */}
              <button
                onClick={() => setShowTagFilters(!showTagFilters)}
                className={`flex items-center gap-1 p-2 rounded-lg border transition-all ${
                  showTagFilters || selectedTags.length > 0
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                }`}
                title="Filter by tags"
              >
                <Filter size={14} />
                {selectedTags.length > 0 && (
                  <span className="text-[10px] font-medium">
                    {selectedTags.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Tag filter pills */}
          {showTagFilters && (
            <div className="flex flex-wrap gap-1.5 pt-3 mt-2 border-t border-slate-100">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium text-red-500 hover:bg-red-50 transition"
                >
                  <X size={12} className="inline mr-0.5" /> Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* ═══════════════ RESULT COUNT ═══════════════ */}
        <div className="px-6 pt-4 pb-1">
          <p className="text-xs text-slate-400">
            Showing {filteredProjects.length} of {totalCount} projects
            {search && (
              <span>
                {" "}
                matching &ldquo;
                <span className="text-slate-600">{search}</span>&rdquo;
              </span>
            )}
            {categoryFilter !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="text-slate-600">
                  {CATEGORY_LABELS[categoryFilter as ProjectCategory]}
                </span>
              </span>
            )}
            {activeTab !== "all" && (
              <span>
                {" "}
                &middot;{" "}
                <span className="text-slate-600 capitalize">{activeTab}s</span>
              </span>
            )}
          </p>
        </div>

        {/* ═══════════════ CONTENT ═══════════════ */}
        <div className="px-6 pb-8">
          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={24} className="animate-spin text-blue-500" />
              <span className="ml-3 text-slate-500">Loading projects...</span>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredProjects.length === 0 && (
            <EmptyState
              icon={<FolderKanban size={64} />}
              title={
                search ||
                categoryFilter !== "all" ||
                activeTab !== "all" ||
                selectedTags.length > 0
                  ? "No projects match your filters"
                  : "No projects yet"
              }
              description={
                search ||
                categoryFilter !== "all" ||
                activeTab !== "all" ||
                selectedTags.length > 0
                  ? "Try adjusting your search, tab, or filter."
                  : "Click 'Add Project' to create your first project."
              }
              action={
                search ||
                categoryFilter !== "all" ||
                activeTab !== "all" ||
                selectedTags.length > 0 ? (
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveTab("all");
                      setCategoryFilter("all");
                      setSelectedTags([]);
                    }}
                    className="px-4 py-2 text-sm text-blue-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                ) : (
                  <button
                    onClick={() => setShowFormModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    <Plus size={16} className="inline mr-1" />
                    Add Project
                  </button>
                )
              }
            />
          )}

          {/* Project cards grid */}
          {!isLoading && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-40 bg-slate-100 overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80";
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-sm">
                        {(project.type || "project").replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          CATEGORY_COLORS[
                            project.category as ProjectCategory
                          ] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {CATEGORY_LABELS[
                          project.category as ProjectCategory
                        ] || project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2 mb-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[10px]">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                      <span>{project.role}</span>
                      <span>{project.duration}</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2 mb-3">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                          title="GitHub"
                        >
                          <Github size={14} className="text-slate-500" />
                        </a>
                      )}
                      {project.liveDemoLink && (
                        <a
                          href={project.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink size={14} className="text-slate-500" />
                        </a>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye size={13} />
                        View
                      </button>
                      <button
                        onClick={() => {
                          setEditProject(project);
                          setShowFormModal(true);
                        }}
                        className="flex-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirm({ open: true, project })
                        }
                        className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Modal (Create / Edit) */}
      {showFormModal && (
        <ProjectFormModal
          project={editProject}
          onSubmit={editProject ? handleUpdate : handleCreate}
          onClose={() => {
            setShowFormModal(false);
            setEditProject(null);
          }}
        />
      )}

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteConfirm.open}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${deleteConfirm.project?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm({ open: false, project: null })}
      />
    </PageTransition>
  );
};

export default ProjectsPage;
