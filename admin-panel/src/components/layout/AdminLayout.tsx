import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useLeadStats } from "../../hooks/useAdminData";
import { useToast } from "../../hooks/useToast";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import adminAPI from "../../services/adminAPI";
import ConfirmDialog from "../shared/ConfirmDialog";
import ShortcutsHelp from "../shared/ShortcutsHelp";

interface AdminLayoutProps {
  onLogout: (reason?: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const { showToast } = useToast();
  const { stats, refresh: refreshStats } = useLeadStats();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Track new leads since last view
  const [newLeadCount, setNewLeadCount] = useState(0);
  const prevTotalRef = useRef<number | null>(null);

  // Global keyboard shortcuts
  useKeyboardShortcuts({
    onFocusSearch: () => {
      const searchInput = document.querySelector<HTMLInputElement>('[data-search-input]');
      searchInput?.focus();
    },
    onRefresh: () => {
      refreshStats();
      showToast("Refreshing data...", "info");
    },
    onExport: async () => {
      try {
        const blob = await adminAPI.exportLeads("csv");
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Export downloaded", "success");
      } catch {
        showToast("Export failed", "error");
      }
    },
    onCloseDrawer: () => {
      // Dispatch a custom event that drawers/dialogs can listen to
      window.dispatchEvent(new CustomEvent("shortcut:escape"));
    },
    onToggleShortcutsHelp: () => setShowShortcuts((prev) => !prev),
  });

  useEffect(() => {
    if (stats?.total_leads != null) {
      if (prevTotalRef.current !== null && stats.total_leads > prevTotalRef.current) {
        const diff = stats.total_leads - prevTotalRef.current;
        setNewLeadCount((prev) => prev + diff);
        showToast(`${diff} new lead${diff > 1 ? "s" : ""} arrived!`, "info");
      }
      prevTotalRef.current = stats.total_leads;
    }
  }, [stats?.total_leads]);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    adminAPI.logout();
    onLogout();
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
        stats={stats || null}
        newLeadCount={newLeadCount}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet context={{ stats, newLeadCount, clearNewLeadCount: () => setNewLeadCount(0) }} />
      </main>

      <ShortcutsHelp open={showShortcuts} onClose={() => setShowShortcuts(false)} />

      <ConfirmDialog
        open={showLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout from the admin panel?"
        confirmLabel="Logout"
        variant="warning"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
};

export default AdminLayout;
