import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";
import type { LeadStats } from "../../services/adminAPI";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
  stats: LeadStats | null;
  newLeadCount?: number;
}

const navItems = [
  { to: "/", icon: Users, label: "Leads", end: true },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, onLogout, stats, newLeadCount = 0 }) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 264 }}
      className="bg-slate-900 text-white flex flex-col border-r border-slate-800 relative z-20 shrink-0"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        {!collapsed && (
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
          onClick={onToggle}
          className="p-1.5 hover:bg-slate-800 rounded transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            <Icon size={20} />
            {!collapsed && <span>{label}</span>}
            {!collapsed && label === "Leads" && newLeadCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {newLeadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Quick Stats */}
      {!collapsed && stats && (
        <div className="p-3 border-t border-slate-800 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider px-1">
            Quick Stats
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800 rounded-lg p-2.5">
              <div className="text-xl font-black text-white">{stats.total_leads || 0}</div>
              <div className="text-[9px] text-slate-400 uppercase">Total</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-2.5">
              <div className="text-xl font-black text-blue-400">{stats.leads_last_24h || 0}</div>
              <div className="text-[9px] text-slate-400 uppercase">Today</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-2.5">
              <div className="text-xl font-black text-amber-400">{stats.unread_count || 0}</div>
              <div className="text-[9px] text-slate-400 uppercase">Unread</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-2.5">
              <div className="text-xl font-black text-emerald-400">{stats.leads_last_7d || 0}</div>
              <div className="text-[9px] text-slate-400 uppercase">This Week</div>
            </div>
          </div>
        </div>
      )}

      {/* Notification + Logout */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        {!collapsed && newLeadCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-600/10 rounded-lg border border-blue-500/20 mb-1">
            <Bell size={14} className="text-blue-400" />
            <span className="text-[11px] text-blue-300 font-medium">
              {newLeadCount} new lead{newLeadCount > 1 ? "s" : ""}
            </span>
          </div>
        )}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all border border-red-500/20"
        >
          <LogOut size={18} />
          {!collapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
