import React from "react";
import { Settings, Shield, Clock, Bell, Database, Zap } from "lucide-react";
import TopBar from "../components/layout/TopBar";
import { SHORTCUT_MAP } from "../hooks/useKeyboardShortcuts";
import PageTransition from "../components/shared/PageTransition";

const SettingsPage: React.FC = () => {
  return (
    <PageTransition>
      <TopBar title="Settings" />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* System Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Settings size={20} className="text-slate-600" />
            System Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingCard
              icon={<Shield className="text-blue-600" size={20} />}
              title="JWT Authentication"
              description="Token-based auth with auto-logout on expiry"
              detail="Token TTL: 60 minutes"
            />
            <SettingCard
              icon={<Clock className="text-amber-600" size={20} />}
              title="Auto-Refresh"
              description="Dashboard data refreshes via SWR"
              detail="Interval: 5 minutes • Revalidate on focus"
            />
            <SettingCard
              icon={<Zap className="text-purple-600" size={20} />}
              title="Rate Limiting"
              description="API request throttling per endpoint"
              detail="Public: 10 req/min • Admin: 100 req/min"
            />
            <SettingCard
              icon={<Database className="text-emerald-600" size={20} />}
              title="Database"
              description="PostgreSQL with SQLAlchemy ORM"
              detail="Auto-migrations • JSON metadata fields"
            />
            <SettingCard
              icon={<Bell className="text-orange-600" size={20} />}
              title="Notifications"
              description="Email notifications via Resend API"
              detail="Admin alerts • Lead acknowledgments • CV dispatch"
            />
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Keyboard Shortcuts</h3>
          <p className="text-sm text-slate-500 mb-4">Press <kbd className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-xs rounded border border-slate-200 font-mono font-bold">?</kbd> anywhere to toggle this list</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SHORTCUT_MAP.map((shortcut, i) => (
              <ShortcutItem key={i} keys={shortcut.keys} label={shortcut.label} />
            ))}
          </div>
        </div>

        {/* Version */}
        <div className="text-center text-xs text-slate-400 py-4">
          Admin Panel v2.0.0 — Restructured Architecture
        </div>
      </div>
    </PageTransition>
  );
};

const SettingCard = ({
  icon,
  title,
  description,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
}) => (
  <div className="p-4 bg-slate-50 rounded-lg flex items-start gap-4">
    <div className="p-2 bg-white rounded-lg border border-slate-200">{icon}</div>
    <div>
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      <div className="text-[10px] text-slate-400 mt-1 font-mono">{detail}</div>
    </div>
  </div>
);

const ShortcutItem = ({ keys, label }: { keys: string[]; label: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-1">
      {keys.map((k) => (
        <kbd
          key={k}
          className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded border border-slate-200 font-mono font-bold"
        >
          {k}
        </kbd>
      ))}
    </div>
    <span className="text-xs text-slate-500">{label}</span>
  </div>
);

export default SettingsPage;
