import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import {
  ShieldCheck,
  Trash2,
  Search,
  Eye,
  Database,
  Download,
  RefreshCw,
  ChevronRight,
  X,
  Mail,
  Phone,
  Calendar,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Award,
  Clock,
  TrendingUp,
  Users,
  Target,
  Activity,
  Star,
  Tag,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// --- Types ---
type Lead = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  flagged?: boolean;
  status?: string;
  priority?: string;
  quality_score?: number;
  internal_notes?: string;
  follow_up_date?: string;
  contact_history?: any[];
  tags?: string[];
  source?: string;
};

const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();

  // Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<any>(null);

  // UI State
  const [viewMode, setViewMode] = useState<"leads" | "analytics">("leads");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const adminToken = sessionStorage.getItem("adminToken");

  useEffect(() => {
    if (adminToken) {
      refreshData();
    }
  }, [adminToken]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/leads`, {
          params: { admin_token: adminToken },
        }),
        axios.get(`${API_BASE_URL}/admin/leads/stats`, {
          params: { admin_token: adminToken },
        }),
      ]);
      setLeads(leadsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      showToast("Data sync failed", "error");
    } finally {
      setIsLoading(false);
    }
  };
  // Handle emailing the lead with mailto link (pre-filled)
  const handleEmailLead = () => {
    if (!selectedLead) return;
    const subject = encodeURIComponent(`Re: ${selectedLead.subject}`);
    const body = encodeURIComponent(
      `Hi ${selectedLead.name},\n\nI hope this email finds you well. I wanted to follow up with you about your query. \n\n\n [Your message here]\n\n\nI am always open to any feedback or suggestions. Thank you for your time. \n\nBest regards,\nArpit Kumar\nkumararpit1773@gmail.com`
    );
    window.location.href = `mailto:${selectedLead.email}?subject=${subject}&body=${body}`;
  }

  // 1. IMPROVED UPDATE HANDLER (Matches your backend routes exactly)
  const handleUpdate = async (id: number, field: string, value: any) => {
    const adminToken = sessionStorage.getItem("adminToken");

    // 1. Determine the correct URL path for the backend
    const endpointMap: Record<string, string> = {
      status: "status",
      priority: "priority",
      quality_score: "quality-score",
      internal_notes: "notes",
    };
    const path = endpointMap[field] || field;

    // 2. Clean the data (Backend expects specific types)
    let finalValue = value;
    if (field === "quality_score") finalValue = parseFloat(value);
    if (field === "priority" || field === "status")
      finalValue = String(value).toLowerCase();

    try {
      // 3. Make the API call
      await axios.put(
        `${API_BASE_URL}/admin/leads/${id}/${path}`,
        { [field]: finalValue }, // Key matches Pydantic model
        { params: { admin_token: adminToken } }
      );

      // 4. Update UI state on success
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, [field]: finalValue } : l))
      );

      showToast(`${field.replace("_", " ")} updated`, "success");
    } catch (error: any) {
      // <--- FIXED: Explicitly naming the error 'error' or 'err'
      console.error("Update Error:", error.response?.data || error.message);

      // Check if it's a validation error from FastAPI
      const errorMsg =
        error.response?.data?.detail?.[0]?.msg || "Update failed";
      showToast(errorMsg, "error");
    }
  };

  // 2. FLAG/UNFLAG HANDLER
  const toggleFlag = async (lead: Lead) => {
    const adminToken = sessionStorage.getItem("adminToken");
    const action = lead.flagged ? "unflag" : "flag";
    try {
      await axios.post(
        `${API_BASE_URL}/admin/leads/${lead.id}/${action}`,
        null,
        {
          params: { admin_token: adminToken },
        }
      );
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id ? { ...l, flagged: !lead.flagged } : l
        )
      );
      showToast(`Lead ${action}ged`, "success");
    } catch (err) {
      showToast(`Failed to ${action}`, "error");
    }
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Confirm permanent deletion?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/leads/${id}`, {
        params: { admin_token: adminToken },
      });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      showToast("Lead removed", "success");
    } catch (err) {
      showToast("Delete failed", "error");
    }
  };

  const bulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} leads?`)) return;
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`${API_BASE_URL}/admin/leads/${id}`, {
            params: { admin_token: adminToken },
          })
        )
      );
      setLeads((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
      setSelectedIds([]);
      showToast("Bulk deletion complete", "success");
    } catch (err) {
      showToast("Bulk action failed", "error");
    }
  };

  // --- Helpers ---
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || l.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [leads, search, statusFilter, priorityFilter]);

  const getStatusBadge = (s: string = "new") => {
    const styles: any = {
      new: "bg-blue-50 text-blue-700 border-blue-200",
      contacted: "bg-amber-50 text-amber-700 border-amber-200",
      qualified: "bg-emerald-50 text-emerald-700 border-emerald-200",
      converted: "bg-purple-50 text-purple-700 border-purple-200",
      lost: "bg-slate-100 text-slate-600 border-slate-300",
    };
    return `px-2.5 py-1 rounded-md text-xs font-bold border ${
      styles[s] || styles.new
    }`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-2 rounded-lg">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <h1 className="font-bold text-slate-900 tracking-tight">
              LeadManager{" "}
              <span className="text-slate-400 font-normal">Pro</span>
            </h1>
          </div>

          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("leads")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === "leads"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Leads
            </button>
            <button
              onClick={() => setViewMode("analytics")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === "analytics"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Analytics
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
            >
              <RefreshCw
                size={18}
                className={isLoading ? "animate-spin" : ""}
              />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-1" />
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all">
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 space-y-6">
        {viewMode === "analytics" ? (
          <AnalyticsView stats={stats} />
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                label="Total Leads"
                value={stats?.total_leads}
                icon={<Users className="text-blue-600" />}
              />
              <StatCard
                label="Conversion"
                value={`${(stats?.conversion_rate || 0).toFixed(2)}%`}
                icon={<Target className="text-emerald-600" />}
              />
              <StatCard
                label="Avg. Score"
                value={stats?.avg_quality_score?.toFixed(1)}
                icon={<Star className="text-amber-500" />}
              />
              <StatCard
                label="Active Month"
                value={stats?.leads_last_30_days}
                icon={<Activity className="text-purple-600" />}
              />
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-1 min-w-[300px] relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select
                  className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                </select>
                <select
                  className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            <AnimatePresence>
              {selectedIds.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-between shadow-lg shadow-blue-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold">
                      {selectedIds.length} leads selected
                    </span>
                    <div className="h-4 w-px bg-blue-400" />
                    <button
                      onClick={() => setSelectedIds([])}
                      className="text-xs hover:underline"
                    >
                      Clear Selection
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={bulkDelete}
                      className="px-4 py-1.5 bg-red-500 hover:bg-red-400 rounded-lg text-sm font-bold transition-colors"
                    >
                      Delete Permanently
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 w-10">
                        <input
                          type="checkbox"
                          checked={
                            selectedIds.length === filteredLeads.length &&
                            filteredLeads.length > 0
                          }
                          onChange={(e) =>
                            setSelectedIds(
                              e.target.checked
                                ? filteredLeads.map((l) => l.id)
                                : []
                            )
                          }
                          className="rounded border-slate-300"
                        />
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                        Lead Name
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                        Status
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                        Priority
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">
                        Score
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase">
                        Date
                      </th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => (
                      <tr onClick={selectedLead?.id !== lead.id ? () => setSelectedLead(lead) : undefined}
                        key={lead.id}
                        className="hover:bg-blue-100/50 transition-colors group"
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
                            className="rounded border-slate-300"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                lead.flagged
                                  ? "bg-amber-100 text-amber-600 ring-2 ring-amber-400"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {lead.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                {lead.name}
                                {lead.flagged && (
                                  <Star
                                    size={12}
                                    className="fill-amber-400 text-amber-400"
                                  />
                                )}
                              </div>
                              <div className="text-xs text-slate-500">
                                {lead.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* EDITABLE STATUS */}
                        <td className="p-4">
                          <select
                            value={lead.status || "new"}
                            onChange={(e) =>
                              handleUpdate(lead.id, "status", e.target.value)
                            }
                            className="text-xs font-bold bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none focus:border-blue-400"
                          >
                            <option value="new">NEW</option>
                            <option value="contacted">CONTACTED</option>
                            <option value="qualified">QUALIFIED</option>
                            <option value="converted">CONVERTED</option>
                            <option value="lost">LOST</option>
                          </select>
                        </td>

                        {/* EDITABLE PRIORITY */}
                        <td className="p-4">
                          <select
                            value={lead.priority || "medium"}
                            onChange={(e) =>
                              handleUpdate(lead.id, "priority", e.target.value)
                            }
                            className={`text-[10px] font-black uppercase px-2 py-1 rounded border outline-none ${
                              lead.priority === "high"
                                ? "bg-red-50 border-red-200 text-red-700"
                                : lead.priority === "medium"
                                ? "bg-amber-50 border-amber-200 text-amber-700"
                                : "bg-slate-50 border-slate-200 text-slate-600"
                            }`}
                          >
                            <option value="low">LOW</option>
                            <option value="medium">MEDIUM</option>
                            <option value="high">HIGH</option>
                          </select>
                        </td>

                        {/* EDITABLE QUALITY SCORE */}
                        <td className="p-4 text-center">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="1"
                            value={lead.quality_score || 0}
                            onChange={(e) =>
                              handleUpdate(
                                lead.id,
                                "quality_score",
                                parseFloat(e.target.value)
                              )
                            }
                            className="w-14 text-center font-mono text-sm font-bold bg-slate-50 border border-slate-200 rounded px-1"
                          />
                        </td>

                        <td className="p-4 text-xs text-slate-500 font-medium">
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </td>

                        {/* ACTIONS (ALWAYS VISIBLE) */}
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => toggleFlag(lead)}
                              className={`p-2 rounded-lg transition-colors ${
                                lead.flagged
                                  ? "text-amber-500 bg-amber-50"
                                  : "text-slate-400 hover:bg-slate-100"
                              }`}
                              title={lead.flagged ? "Unflag" : "Flag Lead"}
                            >
                              <Award size={16} />
                            </button>
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                              title="Quick View"
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
                  <Database className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-400 font-medium">
                    No leads found matching your filters
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Side Detail Panel (Drawer) */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-slate-900/40 z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-10 h-screen w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 mt-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedLead.name}
                  </h2>
                  <p className="text-sm text-slate-500">{selectedLead.email}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="overflow-y-auto p-6 space-y-6">
                {/* Meta Grid */}
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                      Status
                    </span>
                    <div className="uppercase ">{selectedLead.status} </div>
                  </div>
                  <div className="col-span-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                      Priority
                    </span>
                    <div className="uppercase ">{selectedLead.priority} </div>
                  </div>

                  {/* Timeline / Contact History */}
                  <div className="col-span-6">
                    <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Clock size={16} className="text-slate-400" /> Timeline
                    </h4>
                    <div className="space-y-4 border-l-2 border-slate-100 ml-2 pl-6">
                      <div className="relative">
                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                        <div className="text-xs font-bold text-slate-900">
                          Lead Created
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {new Date(selectedLead.timestamp).toLocaleString()}
                        </div>
                      </div>
                      {/* Add more timeline items from contact_history here */}
                    </div>
                  </div>
                </div>

                {/* Message Section */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" /> Lead Inquiry
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed italic">
                    "{selectedLead.message}"
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Activity size={16} className="text-slate-400" /> Internal Notes
                  </h4>
                  <textarea
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm min-h-[120px] focus:ring-2 focus:ring-blue-500/10 outline-none"
                    placeholder="Add private notes about this lead..."
                    defaultValue={selectedLead.internal_notes}
                    onBlur={(e) =>
                      handleUpdate(
                        selectedLead.id,
                        "internal_notes",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-slate-100 flex gap-3 bg-slate-50/50">
                <button onClick={handleEmailLead} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
                  <Mail size={18} />
                  Email Lead
                </button>
                <button onClick={() => setSelectedLead(null)} className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-300 transition-all">
                  <ChevronRight size={18} />
                  Close
                </button>
              
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
    <div>
      <div className="text-2xl font-black text-slate-900 leading-tight">
        {value || 0}
      </div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  </div>
);

const AnalyticsView = ({ stats }: any) => (
  <div className="space-y-6">
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Pipeline Distribution
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {["new", "contacted", "qualified", "converted", "lost"].map(
          (status) => {
            const count = stats?.status_distribution?.[status] || 0;
            const total = stats?.total_leads || 1;
            const pct = ((count / total) * 100).toFixed(0);
            return (
              <div
                key={status}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center"
              >
                <div className="text-3xl font-black text-slate-900 mb-1">
                  {count}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase mb-3">
                  {status}
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-2 text-[10px] font-bold text-slate-400">
                  {pct}% Total
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
    {/* Add more charts here using a library like Recharts if needed */}
  </div>
);

export default AdminDashboard;
