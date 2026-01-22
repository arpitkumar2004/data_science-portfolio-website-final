import { useEffect } from 'react';

// Resolve admin panel URL. Priority: env override > localhost > same-origin /admin-panel/.
const getAdminPanelUrl = (): string => {
  const fromEnv = import.meta.env.VITE_ADMIN_PANEL_URL as string | undefined;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/+$|$/, '/');
  }

  if (typeof window !== 'undefined') {
    const { origin, hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5174/';
    }
    if (origin) {
      return `${origin}/admin-panel/`;
    }
  }

  return '/admin-panel/';
};

const AdminDashboardPage: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = getAdminPanelUrl();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Redirecting to Admin Panel...</p>
        <p className="mt-2 text-slate-400 text-sm">If you are not redirected automatically, <a className="text-blue-600 underline" href={getAdminPanelUrl()}>click here</a>.</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
