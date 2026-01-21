import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import { useLeads, useLeadStats, useOptimisticLeadUpdate } from "../hooks/useAdminData";
import adminAPI, { Lead, LeadStats, LeadStatus, LeadPriority } from "../services/adminAPI";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Mail,
  Trash2,
  Star,
  Clock,
  TrendingUp,
  Target,
  Activity,
  X,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronUp,
  Grid3x3,
} from "lucide-react";


interface AdminDashboardProps {
  onLogout?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { showToast } = useToast();

  // SWR Data
  const { leads: swrLeads, isLoading: leadsLoading, refresh: refreshLeads } = useLeads();
  const { stats: swrStats, isLoading: statsLoading, refresh: refreshStats } = useLeadStats();
  const { updateLead } = useOptimisticLeadUpdate();


  // Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);

  // UI State
  const [sidebarView, setSidebarView] = useState<"dashboard" | "analytics" | "settings">("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "priority">("newest");

  useEffect(() => {
    setLeads(swrLeads || []);
  }, [swrLeads]);

  useEffect(() => {
    setStats(swrStats || null);
  }, [swrStats]);

  useEffect(() => {
    setIsLoading(leadsLoading || statsLoading);
  }, [leadsLoading, statsLoading]);


  const refreshData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([refreshLeads(), refreshStats()]);
      showToast("✓ Data refreshed", "success");
    } catch {
      showToast("✗ Data sync failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLead = () => {
    if (!selectedLead) return;
    const subject = encodeURIComponent(`Re: ${selectedLead.subject}`);
    const body = encodeURIComponent(
      `Hi ${selectedLead.name},\n\nI hope this email finds you well. I wanted to follow up with you about your query.\n\n[Your message here]\n\nBest regards,\nArpit Kumar`
    );
    window.location.href = `mailto:${selectedLead.email}?subject=${subject}&body=${body}`;
  };


  // Unified update handler with optimistic UI
  const handleUpdate = async (id: number, field: string, value: unknown) => {
    const normalizedValue =
      field === "quality_score"
        ? parseFloat(value as string)
        : typeof value === "string"
        ? value.toLowerCase()
        : value;

    const serverCallMap: Record<string, () => Promise<unknown>> = {
      status: () => adminAPI.updateLeadStatus(id, normalizedValue as string),
      priority: () => adminAPI.updateLeadPriority(id, normalizedValue as string),
      quality_score: () => adminAPI.updateLeadQualityScore(id, normalizedValue as number),
      internal_notes: () => adminAPI.updateLeadNotes(id, normalizedValue as string),
    };

    const serverUpdate = serverCallMap[field];
    if (!serverUpdate) return;

    try {
      await updateLead(
        id,
        (lead) => ({ ...lead, [field]: normalizedValue }),
        serverUpdate
      );
      showToast(`✓ ${field.replace("_", " ")} updated`, "success");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Update failed";
      showToast(`✗ ${errorMessage}`, "error");
    }
  };

  const toggleFlag = async (lead: Lead) => {
    try {
      await updateLead(
        lead.id,
        (current) => ({ ...current, flagged: !lead.flagged }),
        () => (lead.flagged ? adminAPI.unflagLead(lead.id) : adminAPI.flagLead(lead.id))
      );
      showToast(`✓ Lead ${lead.flagged ? "unflagged" : "flagged"}`, "success");
    } catch {
      showToast("✗ Failed to toggle flag", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Permanently delete this lead?")) return;
    try {
      await adminAPI.deleteLead(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      showToast("✓ Lead deleted", "success");
    } catch {
      showToast("✗ Delete failed", "error");
    }
  };

  const bulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} leads permanently?`)) return;
    try {
      await adminAPI.bulkDelete(selectedIds);
      setLeads((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
      setSelectedIds([]);
      showToast(`✓ Deleted ${selectedIds.length} leads`, "success");
    } catch {
      showToast("✗ Bulk delete failed", "error");
    }
  };

  const handleExport = async () => {
    try {
      const blob = await adminAPI.exportLeads("csv");
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      showToast("✓ Export downloaded", "success");
    } catch {
      showToast("✗ Export failed", "error");
    }
  };

  const handleLogout = () => {
    if (!confirm("Logout from admin panel?")) return;
    adminAPI.logout();
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = "/";
    }
  };


  // --- Helpers ---
  const filteredLeads = useMemo(() => {
    const result = leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase()) ||
        l.subject.toLowerCase().includes(search.toLowerCase()) ||
        l.message.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || l.priority === priorityFilter;
      const matchesRole = roleFilter === "all" || l.role === roleFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesRole;
    });

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime());
    } else if (sortBy === "priority") {
      const priorityOrder: Record<string, number> = { urgent: 4, high: 3, medium: 2, low: 1 };
      result.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
    }

    return result;
  }, [leads, search, statusFilter, priorityFilter, roleFilter, sortBy]);

  const getStatusBadge = (s: string = "unread") => {
    const styles: Record<string, string> = {
      unread: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      processing: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      contacted: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      archived: "bg-slate-400/10 text-slate-600 border-slate-400/20",
    };
    return `px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${styles[s] || styles.unread}`;
  };

  const getPriorityColor = (p: string = "medium") => {
    const colors: Record<string, string> = {
      urgent: "text-red-600 bg-red-500/10",
      high: "text-orange-600 bg-orange-500/10",
      medium: "text-yellow-600 bg-yellow-500/10",
      low: "text-slate-600 bg-slate-500/10",
    };
    return colors[p] || colors.medium;
  };

  // Fallback conversion rate if backend doesn't send it
  const conversionRate = useMemo(() => {
    const total = (stats?.total_leads as number) || 0;
    const contacted = (stats?.contacted_count as number) || 0;
    if (stats?.conversion_rate !== undefined && stats?.conversion_rate !== null) {
      return stats.conversion_rate;
    }
    if (total === 0) return 0;
    return (contacted / total) * 100;
  }, [stats]);


  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarCollapsed ? 80 : 280 }}
        className="bg-slate-900 text-white flex flex-col border-r border-slate-800 relative z-20"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard size={18} />
              </div>
              <div>
                <div className="font-bold text-sm">Admin Panel</div>
                <div className="text-[10px] text-slate-400">Lead Manager Pro</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 hover:bg-slate-800 rounded transition-colors"
          >
            {isSidebarCollapsed ? <ChevronDown size={16} className="rotate-90" /> : <ChevronUp size={16} className="rotate-90" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setSidebarView("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              sidebarView === "dashboard"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <Users size={20} />
            {!isSidebarCollapsed && <span className="font-medium text-sm">Leads</span>}
          </button>

          <button
            onClick={() => setSidebarView("analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              sidebarView === "analytics"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <BarChart3 size={20} />
            {!isSidebarCollapsed && <span className="font-medium text-sm">Analytics</span>}
          </button>

          <button
            onClick={() => setSidebarView("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              sidebarView === "settings"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <Settings size={20} />
            {!isSidebarCollapsed && <span className="font-medium text-sm">Settings</span>}
          </button>
        </nav>

        {/* Stats Summary */}
        {!isSidebarCollapsed && stats && (
          <div className="p-4 border-t border-slate-800 space-y-3">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Quick Stats</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-2xl font-black text-white">{(stats?.total_leads as number) || 0}</div>
                <div className="text-[9px] text-slate-400 uppercase">Total</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="text-2xl font-black text-blue-400">{(stats?.leads_last_24h as number) || 0}</div>
                <div className="text-[9px] text-slate-400 uppercase">Today</div>
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="m-4 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all border border-red-500/20"
        >
          <LogOut size={18} />
          {!isSidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-900">
              {sidebarView === "dashboard" && "Lead Management Dashboard Pro"}
              {sidebarView === "analytics" && "Analytics & Insights"}
              {sidebarView === "settings" && "Settings"}
            </h1>
            <div className="h-5 w-px bg-slate-200" />
            <div className="text-sm text-slate-500">
              {filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <RefreshCw size={18} className={`text-slate-600 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button onClick={handleExport} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2">
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {sidebarView === "dashboard" && (
            <div className="p-6 space-y-6">
              {/* KPI Cards - Enhanced */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPICard
                  label="Total Leads"
                  value={(stats?.total_leads as number) || 0}
                  icon={<Users className="text-blue-600" size={24} />}
                  trend="+12%"
                  trendUp
                />
                <KPICard
                  label="Lead Velocity (24h)"
                  value={(stats?.leads_last_24h as number) || 0}
                  icon={<TrendingUp className="text-emerald-600" size={24} />}
                  trend="+8 leads"
                  trendUp
                />
                <KPICard
                  label="Conversion Rate"
                  value={`${conversionRate.toFixed(1)}%`}
                  icon={<Target className="text-purple-600" size={24} />}
                  trend="+2.3%"
                  trendUp
                />
                <KPICard
                  label="Avg Lead Quality"
                  value={`${((stats?.avg_quality_score as number) || 0).toFixed(2)}`}
                  icon={<Activity className="text-amber-600" size={24} />}
                  trend={`${stats?.high_priority_count || 0} urgent`}
                  trendUp
                />
              </div>

              {/* Filters & Actions */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
                {/* Search & View Toggle */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search by name, email, subject, or message..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all border ${
                      showFilters
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Filter size={16} />
                    Filters
                  </button>
                  <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                    <button
                      onClick={() => setViewMode("table")}
                      className={`p-2 rounded text-sm font-medium ${
                        viewMode === "table"
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded text-sm font-medium ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Grid3x3 size={16} />
                    </button>
                  </div>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-200">
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="px-3 py-2 bg-white text-slate-800 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="all">All Status</option>
                          <option value="unread">Unread</option>
                          <option value="processing">Processing</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
                        </select>

                        <select
                          value={priorityFilter}
                          onChange={(e) => setPriorityFilter(e.target.value)}
                          className="px-3 py-2 bg-white text-slate-800 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="all">All Priority</option>
                          <option value="urgent">Urgent</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>

                        <select
                          value={roleFilter}
                          onChange={(e) => setRoleFilter(e.target.value)}
                          className="px-3 py-2 bg-white text-slate-800 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="all">All Roles</option>
                          <option value="Recruiter">Recruiter</option>
                          <option value="Researcher">Researcher</option>
                          <option value="Developer">Developer</option>
                          <option value="Guest">Guest</option>
                        </select>

                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "priority")}
                          className="px-3 py-2 bg-white text-slate-800 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="priority">By Priority</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bulk Actions */}
                {selectedIds.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3"
                  >
                    <span className="text-sm font-medium text-blue-900">
                      {selectedIds.length} lead{selectedIds.length > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedIds([])}
                        className="px-3 py-1.5 text-sm bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Clear
                      </button>
                      <button
                        onClick={bulkDelete}
                        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Leads Table/Grid */}
              {viewMode === "table" ? (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="p-4 w-10">
                            <input
                              type="checkbox"
                              checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0}
                              onChange={(e) =>
                                setSelectedIds(e.target.checked ? filteredLeads.map((l) => l.id) : [])
                              }
                              className="rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                            />
                          </th>
                          <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Lead</th>
                          <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
                          <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Priority</th>
                          <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Role</th>
                          <th className="p-4 text-center text-xs font-bold text-slate-600 uppercase">Score</th>
                          <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Date</th>
                          <th className="p-4 text-right text-xs font-bold text-slate-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="hover:bg-slate-50 transition-colors group"
                          >
                            <td className="p-4">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(lead.id)}
                                onChange={() =>
                                  setSelectedIds((prev) =>
                                    prev.includes(lead.id)
                                      ? prev.filter((id) => id !== lead.id)
                                      : [...prev, lead.id]
                                  )
                                }
                                className="rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                              />
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                                    lead.flagged
                                      ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400"
                                      : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {lead.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-slate-900 flex items-center gap-2 truncate">
                                    {lead.name}
                                    {lead.flagged && <Star size={12} className="fill-amber-500 text-amber-500 flex-shrink-0" />}
                                  </div>
                                  <div className="text-xs text-slate-500 truncate">{lead.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.status || "unread"}
                                onChange={(e) => handleUpdate(lead.id, "status", e.target.value)}
                                className={`${getStatusBadge(lead.status)} cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all`}
                              >
                                <option value="unread">UNREAD</option>
                                <option value="processing">PROCESSING</option>
                                <option value="contacted">CONTACTED</option>
                                <option value="archived">ARCHIVED</option>
                              </select>
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.priority || "medium"}
                                onChange={(e) => handleUpdate(lead.id, "priority", e.target.value)}
                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getPriorityColor(
                                  lead.priority
                                )} cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all`}
                              >
                                <option value="low">LOW</option>
                                <option value="medium">MEDIUM</option>
                                <option value="high">HIGH</option>
                                <option value="urgent">URGENT</option>
                              </select>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                                {lead.role || "Guest"}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <input
                                type="number"
                                step="0.2"
                                min="0"
                                max="1"
                                value={lead.quality_score || 0}
                                onChange={(e) =>
                                  handleUpdate(lead.id, "quality_score", parseFloat(e.target.value))
                                }
                                className="w-16 text-center text-sm font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500/20 outline-none"
                              />
                            </td>
                            <td className="p-4">
                              <div className="text-sm text-slate-600">
                                {new Date(lead.created_at || "").toLocaleDateString()}
                              </div>
                              <div className="text-xs text-slate-400">
                                {new Date(lead.created_at || "").toLocaleTimeString()}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => toggleFlag(lead)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    lead.flagged
                                      ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                  }`}
                                  title={lead.flagged ? "Unflag" : "Flag"}
                                >
                                  <Star size={16} />
                                </button>
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                  title="View Details"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(lead.id)}
                                  className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredLeads.length === 0 && (
                    <div className="p-20 text-center">
                      <Users className="mx-auto text-slate-200 mb-4" size={64} />
                      <p className="text-slate-400 font-medium text-lg">No leads found</p>
                      <p className="text-slate-400 text-sm mt-2">Try adjusting your filters</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {leads.length === 0 ? (
                    // ✨ GRACEFUL NULL STATE: System Idle
                    <div className="flex flex-col items-center justify-center py-32 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-200">
                      <div className="text-center">
                        <Activity size={64} className="mx-auto text-slate-300 mb-6" />
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">System Idle</h2>
                        <p className="text-slate-600 text-lg mb-1">No Pending Inquiries</p>
                        <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
                          Your lead management system is ready. New visitor inquiries will appear here in real-time.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span>System Online • Auto-refresh enabled</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredLeads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      layout
                      className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                              lead.flagged
                                ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{lead.name}</div>
                            <div className="text-xs text-slate-500">{lead.email}</div>
                          </div>
                        </div>
                        {lead.flagged && <Star size={14} className="fill-amber-500 text-amber-500" />}
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="text-sm font-medium text-slate-700 line-clamp-1">{lead.subject}</div>
                        <div className="text-xs text-slate-500 line-clamp-2">{lead.message}</div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className={getStatusBadge(lead.status)}>{lead.status}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getPriorityColor(lead.priority)}`}>
                          {lead.priority}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{new Date(lead.created_at || "").toLocaleDateString()}</span>
                        <span>Score: {(lead.quality_score || 0).toFixed(1)}</span>
                      </div>
                    </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {sidebarView === "analytics" && (
            <AnalyticsView stats={stats} leads={leads} />
          )}

          {sidebarView === "settings" && <SettingsView />}
        </div>
      </div>

      {/* Lead Detail Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                    {selectedLead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedLead.name}</h2>
                    <p className="text-sm text-slate-500">{selectedLead.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-xs text-slate-500 mb-1">Status</div>
                    <div className={`${getStatusBadge(selectedLead.status)} inline-block`}>
                      {selectedLead.status}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-xs text-slate-500 mb-1">Priority</div>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase inline-block ${getPriorityColor(selectedLead.priority)}`}>
                      {selectedLead.priority}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-xs text-slate-500 mb-1">Score</div>
                    <div className="text-lg font-black text-slate-900">{(selectedLead.quality_score || 0).toFixed(2)}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-xs text-slate-500 mb-1">Role</div>
                    <div className="text-sm font-semibold text-slate-700">{selectedLead.role || "Guest"}</div>
                  </div>
                </div>

                {/* Subject & Message */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" /> Inquiry Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Subject</div>
                      <div className="font-semibold text-slate-900">{selectedLead.subject}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Message</div>
                      <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700 leading-relaxed border border-slate-200">
                        {selectedLead.message}
                      </div>
                    </div>
                    {selectedLead.company && (
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Company</div>
                        <div className="text-sm text-slate-700">{selectedLead.company}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" /> Timeline
                  </h4>
                  <div className="space-y-4 border-l-2 border-slate-200 pl-6 ml-2">
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white" />
                      <div className="text-xs font-bold text-slate-900">Lead Created</div>
                      <div className="text-[11px] text-slate-500">
                        {new Date(selectedLead.created_at || "").toLocaleString()}
                      </div>
                    </div>
                    {selectedLead.last_contacted && (
                      <div className="relative">
                        <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white" />
                        <div className="text-xs font-bold text-slate-900">Last Contacted</div>
                        <div className="text-[11px] text-slate-500">
                          {new Date(selectedLead.last_contacted).toLocaleString()}
                        </div>
                      </div>
                    )}
                    {selectedLead.updated_at && (
                      <div className="relative">
                        <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-slate-400 border-4 border-white" />
                        <div className="text-xs font-bold text-slate-900">Last Updated</div>
                        <div className="text-[11px] text-slate-500">
                          {new Date(selectedLead.updated_at).toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Activity size={16} className="text-slate-400" /> Internal Notes
                  </h4>
                  <textarea
                    className="w-full p-4 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm min-h-[120px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="Add private notes about this lead..."
                    defaultValue={selectedLead.internal_notes}
                    onBlur={(e) => handleUpdate(selectedLead.id, "internal_notes", e.target.value)}
                  />
                </div>

                {/* Metadata */}
                {selectedLead.metadata && Object.keys(selectedLead.metadata).length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Technical Info</h4>
                    <div className="bg-slate-900 rounded-lg p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                      <pre>{JSON.stringify(selectedLead.metadata, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex flex-col gap-3">
                {/* Primary Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleEmailLead}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    <Mail size={18} />
                    Email Lead
                  </button>
                  <button
                    onClick={() => handleDelete(selectedLead.id)}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-100 transition-all border border-red-200"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>

                {/* Intelligence Actions: LinkedIn & Google Search */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                  <a
                    href={adminAPI.generateLinkedInSearchUrl(selectedLead)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-all border border-blue-200 text-sm"
                    title="Search LinkedIn profile"
                  >
                    <span>🔗</span>
                    LinkedIn
                  </a>
                  <a
                    href={adminAPI.generateGoogleSearchUrl(selectedLead)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-amber-50 text-amber-600 py-2 rounded-lg font-semibold hover:bg-amber-100 transition-all border border-amber-200 text-sm"
                    title="Google search for lead"
                  >
                    <span>🔍</span>
                    Google
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};


// KPI Card Component
const KPICard = ({ label, value, icon, trend, trendUp }: { label: string; value: number | string; icon: React.ReactNode; trend: string; trendUp: boolean }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
      <div className={`text-xs font-bold px-2 py-1 rounded ${trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
        {trend}
      </div>
    </div>
    <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</div>
  </div>
);

// Analytics View Component
const AnalyticsView = ({ stats, leads }: { stats: LeadStats | null; leads: Lead[] }) => {
  // Derive pipeline counts from leads as a fallback if stats is null/stale
  const derivedCounts = useMemo(() => {
    const counters = { unread: 0, processing: 0, contacted: 0, archived: 0 };
    for (const lead of leads) {
      const key = (lead.status || "unread") as keyof typeof counters;
      if (counters[key] !== undefined) counters[key] += 1;
    }
    const total = leads.length;
    return { ...counters, total };
  }, [leads]);

  const pipelineData = useMemo(() => {
    return ["unread", "processing", "contacted", "archived"].map((status) => {
      const countKey = `${status}_count` as keyof LeadStats;
      const countFromStats = (stats?.[countKey] as number) ?? null;
      const count = countFromStats !== null ? countFromStats : (derivedCounts as any)[status];
      const total = stats?.total_leads ?? derivedCounts.total;
      const pct = total > 0 ? ((count / total) * 100).toFixed(0) : "0";
      return { status, count, pct };
    });
  }, [stats, derivedCounts]);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-600" />
            Pipeline Distribution
          </h3>
          <div className="space-y-4">
            {pipelineData.map(({ status, count, pct }) => (
              <div key={status}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 capitalize">{status}</span>
                  <span className="text-sm font-bold text-slate-900">{count} ({pct}%)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Role Distribution - Intent Analytics */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Users size={20} className="text-purple-600" />
          Intent Analytics
        </h3>
        <div className="space-y-4">
          {stats?.role_distribution && Object.entries(stats.role_distribution).map(([role, count]) => {
            const total = (stats?.total_leads as number) || 1;
            const pct = (((count as number) / total) * 100).toFixed(0);
            
            // Intent icons based on role
            const intentIcon = role.toLowerCase().includes("dev") ? "💻" :
                             role.toLowerCase().includes("recruit") ? "👔" :
                             role.toLowerCase().includes("found") ? "🚀" : "👤";
            
            return (
              <div key={role}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    <span className="mr-2">{intentIcon}</span>{role}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{count} ({pct}%)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 col-span-2">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Activity size={20} className="text-emerald-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {leads.slice(0, 10).map((lead: Lead) => (
            <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{lead.name}</div>
                  <div className="text-xs text-slate-500">{lead.email}</div>
                </div>
              </div>
              <div className="text-xs text-slate-400">
                {new Date(lead.created_at || "").toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

// Settings View Component
const SettingsView = () => (
  <div className="p-6 space-y-6">
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Settings size={20} className="text-slate-600" />
        Admin Settings
      </h3>
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="text-sm font-semibold text-slate-900 mb-1">Auto-Refresh</div>
          <div className="text-xs text-slate-500">Dashboard refreshes every 30 seconds automatically</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="text-sm font-semibold text-slate-900 mb-1">Rate Limiting</div>
          <div className="text-xs text-slate-500">Public: 10 req/min • Admin: 100 req/min</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="text-sm font-semibold text-slate-900 mb-1">JWT Authentication</div>
          <div className="text-xs text-slate-500">Token expires after 60 minutes</div>
        </div>
      </div>
    </div>
  </div>
);

// --- Old Sub-components (kept for compatibility) ---

export default AdminDashboard;