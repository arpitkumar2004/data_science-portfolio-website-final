import React from "react";
import { RefreshCw, Download } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  actions?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, subtitle, isLoading, onRefresh, onExport, actions }) => (
  <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      {subtitle && (
        <>
          <div className="h-5 w-px bg-slate-200" />
          <div className="text-sm text-slate-500">{subtitle}</div>
        </>
      )}
    </div>

    <div className="flex items-center gap-3">
      {actions}
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          disabled={isLoading}
          title="Refresh data (R)"
        >
          <RefreshCw size={18} className={`text-slate-600 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      )}
      {onExport && (
        <button
          onClick={onExport}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <Download size={16} />
          Export CSV
        </button>
      )}
    </div>
  </div>
);

export default TopBar;
