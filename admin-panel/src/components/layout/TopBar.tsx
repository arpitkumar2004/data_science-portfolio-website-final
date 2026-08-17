import React, { useState } from "react";
import { RefreshCw, Download, Search } from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import CommandPalette from "./CommandPalette";

interface TopBarProps {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  actions?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, subtitle, isLoading, onRefresh, onExport, actions }) => {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
        {subtitle && (
          <>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-sm text-slate-500">{subtitle}</div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Google Apps style Command Palette search input button */}
        <button
          onClick={() => setCmdOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search or command...</span>
          <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-[10px] font-mono rounded text-slate-600 dark:text-slate-300">Ctrl K</kbd>
        </button>

        <NotificationCenter />

        {actions}
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            disabled={isLoading}
            title="Refresh data"
          >
            <RefreshCw size={18} className={`text-slate-600 dark:text-slate-300 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        )}
        {onExport && (
          <button
            onClick={onExport}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Download size={16} />
            Export CSV
          </button>
        )}
      </div>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
};

export default TopBar;

