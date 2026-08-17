import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LayoutDashboard, Mail, FileText, BarChart3, Activity, Settings, Download, ShieldCheck, X } from "lucide-react";
import adminAPI from "../../services/adminAPI";
import { useToast } from "../../hooks/useToast";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: "dash", label: "Go to Dashboard Overview", category: "Navigation", icon: LayoutDashboard, action: () => navigate("/") },
    { id: "leads", label: "Go to Leads CRM & Inbox", category: "Navigation", icon: Mail, action: () => navigate("/#leads") },
    { id: "projects", label: "Manage Projects", category: "Navigation", icon: FileText, action: () => navigate("/projects") },
    { id: "analytics", label: "View GA4 & Search Console Analytics", category: "Navigation", icon: BarChart3, action: () => navigate("/analytics") },
    { id: "content", label: "Website Content & Feature Flags", category: "Navigation", icon: Settings, action: () => navigate("/content") },
    { id: "observability", label: "System Health & Diagnostics", category: "Navigation", icon: Activity, action: () => navigate("/observability") },
    { id: "settings", label: "Admin Settings", category: "Navigation", icon: Settings, action: () => navigate("/settings") },
    {
      id: "backup",
      label: "Download Full Database JSON Backup",
      category: "System Action",
      icon: Download,
      action: async () => {
        try {
          await adminAPI.triggerDatabaseBackup();
          showToast("Database backup downloaded successfully", "success");
        } catch {
          showToast("Failed to generate backup", "error");
        }
      }
    },
    {
      id: "diag",
      label: "Run Observability Health Diagnostics",
      category: "System Action",
      icon: ShieldCheck,
      action: () => navigate("/observability")
    }
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search... (Press Esc to exit)"
            className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 text-sm focus:outline-none placeholder-slate-400"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">No matching commands found.</div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="w-full flex items-center px-3 py-2.5 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 mr-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.label}</p>
                    <p className="text-[11px] text-slate-400">{item.category}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
          <span>Google Apps Command Style</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-mono text-[10px]">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
