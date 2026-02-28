import React, { useState, useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Users, TrendingUp, Target, Activity } from "lucide-react";
import { useLeads, useLeadStats, useOptimisticLeadUpdate } from "../hooks/useAdminData";
import { useToast } from "../hooks/useToast";
import adminAPI, { Lead, LeadStats } from "../services/adminAPI";
import TopBar from "../components/layout/TopBar";
import { KPICard, Pagination, ConfirmDialog } from "../components/shared";
import LeadFilters from "../components/leads/LeadFilters";
import LeadBulkActions from "../components/leads/LeadBulkActions";
import LeadTable from "../components/leads/LeadTable";
import LeadGrid from "../components/leads/LeadGrid";
import LeadDetailDrawer from "../components/leads/LeadDetailDrawer";
import PageTransition from "../components/shared/PageTransition";

interface LayoutContext {
  stats: LeadStats | null;
  newLeadCount: number;
  clearNewLeadCount: () => void;
}

const DashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const { stats, clearNewLeadCount } = useOutletContext<LayoutContext>();
  const { leads: swrLeads, isLoading: leadsLoading, refresh: refreshLeads } = useLeads();
  const { refresh: refreshStats } = useLeadStats();
  const { updateLead } = useOptimisticLeadUpdate();

  // UI State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  // Confirm dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ open: false, title: "", message: "", onConfirm: () => {} });

  const leads = swrLeads || [];

  // Clear new lead badge when visiting dashboard
  React.useEffect(() => {
    clearNewLeadCount?.();
  }, []);

  // Filter + Sort
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

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime());
    } else if (sortBy === "priority") {
      const order: Record<string, number> = { urgent: 4, high: 3, medium: 2, low: 1 };
      result.sort((a, b) => (order[b.priority] || 0) - (order[a.priority] || 0));
    }

    return result;
  }, [leads, search, statusFilter, priorityFilter, roleFilter, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredLeads.length / perPage);
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredLeads.slice(start, start + perPage);
  }, [filteredLeads, currentPage, perPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, priorityFilter, roleFilter, sortBy]);

  // KPI computation
  const conversionRate = useMemo(() => {
    if (stats?.conversion_rate != null) return stats.conversion_rate;
    const total = stats?.total_leads || 0;
    const contacted = stats?.contacted_count || 0;
    return total === 0 ? 0 : (contacted / total) * 100;
  }, [stats]);

  // --- Handlers ---
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refreshLeads(), refreshStats()]);
      showToast("Data refreshed", "success");
    } catch {
      showToast("Data sync failed", "error");
    } finally {
      setIsRefreshing(false);
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
      window.URL.revokeObjectURL(url);
      showToast("Export downloaded", "success");
    } catch {
      showToast("Export failed", "error");
    }
  };

  const handleUpdate = useCallback(
    async (id: number, field: string, value: unknown) => {
      const normalizedValue =
        field === "quality_score"
          ? parseFloat(value as string)
          : typeof value === "string"
          ? value.toLowerCase()
          : value;

      const serverCallMap: Record<string, () => Promise<unknown>> = {
        status: () => adminAPI.updateLeadStatus(id, normalizedValue as any),
        priority: () => adminAPI.updateLeadPriority(id, normalizedValue as any),
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
        showToast(`${field.replace("_", " ")} updated`, "success");
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Update failed";
        showToast(msg, "error");
      }
    },
    [updateLead, showToast]
  );

  const toggleFlag = async (lead: Lead) => {
    try {
      await updateLead(
        lead.id,
        (current) => ({ ...current, flagged: !lead.flagged }),
        () => (lead.flagged ? adminAPI.unflagLead(lead.id) : adminAPI.flagLead(lead.id))
      );
      showToast(`Lead ${lead.flagged ? "unflagged" : "flagged"}`, "success");
    } catch {
      showToast("Failed to toggle flag", "error");
    }
  };

  const handleDelete = (id: number) => {
    setConfirmDialog({
      open: true,
      title: "Delete Lead",
      message: "Permanently delete this lead? This action cannot be undone.",
      onConfirm: async () => {
        try {
          await adminAPI.deleteLead(id);
          refreshLeads();
          if (selectedLead?.id === id) setSelectedLead(null);
          showToast("Lead deleted", "success");
        } catch {
          showToast("Delete failed", "error");
        }
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleBulkDelete = () => {
    setConfirmDialog({
      open: true,
      title: "Bulk Delete",
      message: `Delete ${selectedIds.length} leads permanently?`,
      onConfirm: async () => {
        try {
          await adminAPI.bulkDelete(selectedIds);
          refreshLeads();
          setSelectedIds([]);
          showToast(`Deleted ${selectedIds.length} leads`, "success");
        } catch {
          showToast("Bulk delete failed", "error");
        }
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleBulkStatusChange = async (status: string) => {
    try {
      await adminAPI.bulkUpdateStatus(selectedIds, status as any);
      refreshLeads();
      refreshStats();
      setSelectedIds([]);
      showToast(`Updated ${selectedIds.length} leads to ${status}`, "success");
    } catch {
      showToast("Bulk status update failed", "error");
    }
  };

  const handleTagsUpdate = async (id: number, tags: string[]) => {
    try {
      await adminAPI.updateLeadTags(id, tags);
      refreshLeads();
      showToast("Tags updated", "success");
    } catch {
      showToast("Tag update failed", "error");
    }
  };

  return (
    <PageTransition>
      <TopBar
        title="Lead Management"
        subtitle={`${filteredLeads.length} lead${filteredLeads.length !== 1 ? "s" : ""}`}
        isLoading={leadsLoading || isRefreshing}
        onRefresh={refreshData}
        onExport={handleExport}
      />

      <div className="flex-1 overflow-auto p-6 space-y-5">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICard
            label="Total Leads"
            value={stats?.total_leads || 0}
            icon={<Users className="text-blue-600" size={24} />}
            trend={stats?.leads_last_7d ? `+${stats.leads_last_7d} this week` : undefined}
            trendUp
          />
          <KPICard
            label="Lead Velocity (24h)"
            value={stats?.leads_last_24h || 0}
            icon={<TrendingUp className="text-emerald-600" size={24} />}
            trendUp
          />
          <KPICard
            label="Conversion Rate"
            value={`${conversionRate.toFixed(1)}%`}
            icon={<Target className="text-purple-600" size={24} />}
            subtitle="contacted / total"
          />
          <KPICard
            label="Avg Lead Quality"
            value={(stats?.avg_quality_score || 0).toFixed(2)}
            icon={<Activity className="text-amber-600" size={24} />}
            trend={stats?.high_priority_count ? `${stats.high_priority_count} high priority` : undefined}
            trendUp
          />
        </div>

        {/* Filters */}
        <LeadFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          roleFilter={roleFilter}
          onRoleChange={setRoleFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Bulk Actions */}
        <LeadBulkActions
          selectedCount={selectedIds.length}
          onClear={() => setSelectedIds([])}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
        />

        {/* Lead List */}
        {viewMode === "table" ? (
          <>
            <LeadTable
              leads={paginatedLeads}
              selectedIds={selectedIds}
              onSelectAll={(checked) =>
                setSelectedIds(checked ? paginatedLeads.map((l) => l.id) : [])
              }
              onSelectOne={(id) =>
                setSelectedIds((prev) =>
                  prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                )
              }
              onViewLead={setSelectedLead}
              onStatusChange={(id, status) => handleUpdate(id, "status", status)}
              onPriorityChange={(id, priority) => handleUpdate(id, "priority", priority)}
              onQualityChange={(id, score) => handleUpdate(id, "quality_score", score)}
              onToggleFlag={toggleFlag}
              onDelete={handleDelete}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredLeads.length}
              perPage={perPage}
              onPageChange={setCurrentPage}
              onPerPageChange={(pp) => {
                setPerPage(pp);
                setCurrentPage(1);
              }}
            />
          </>
        ) : (
          <LeadGrid leads={paginatedLeads} onViewLead={setSelectedLead} />
        )}
      </div>

      {/* Lead Detail Drawer */}
      <LeadDetailDrawer
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onTagsUpdate={handleTagsUpdate}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
      />
    </PageTransition>
  );
};

export default DashboardPage;
