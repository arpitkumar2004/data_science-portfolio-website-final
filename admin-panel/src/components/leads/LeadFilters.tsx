import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, FileText, Grid3x3 } from "lucide-react";

interface LeadFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  priorityFilter: string;
  onPriorityChange: (v: string) => void;
  roleFilter: string;
  onRoleChange: (v: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
  viewMode: "table" | "grid";
  onViewModeChange: (v: "table" | "grid") => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  roleFilter,
  onRoleChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  showFilters,
  onToggleFilters,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
      {/* Search + View Toggle */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, subject, or message... (Press / to focus)"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            data-search-input
          />
        </div>
        <button
          onClick={onToggleFilters}
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
            onClick={() => onViewModeChange("table")}
            className={`p-2 rounded text-sm font-medium ${
              viewMode === "table"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FileText size={16} />
          </button>
          <button
            onClick={() => onViewModeChange("grid")}
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
                onChange={(e) => onStatusChange(e.target.value)}
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
                onChange={(e) => onPriorityChange(e.target.value)}
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
                onChange={(e) => onRoleChange(e.target.value)}
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
                onChange={(e) => onSortChange(e.target.value)}
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
    </div>
  );
};

export default LeadFilters;
