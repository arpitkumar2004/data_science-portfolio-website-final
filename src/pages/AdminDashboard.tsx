import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import AdminDashboard from '../components/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has admin token
    const adminToken = sessionStorage.getItem('adminToken');
    const userRole = localStorage.getItem('userRole');

    if (adminToken && userRole === 'Admin') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleGoToLogin = () => {
    // Trigger the role gateway to open admin login
    window.dispatchEvent(new Event('role:open'));
    // Navigate to home page where role gateway will appear
    navigate('/');
  };

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShieldCheck className="mx-auto text-blue-600 animate-pulse" size={48} />
          <p className="mt-4 text-slate-600 font-mono uppercase tracking-widest">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Unauthorized access - show login prompt
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl">
          <div className="mb-6">
            <Lock className="mx-auto text-red-500" size={48} />
          </div>

          <h1 className="text-2xl font-black text-slate-900 mb-4">Access Restricted</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            This area requires administrative privileges. Please authenticate to continue.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleGoToLogin}
              className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={20} />
              Authenticate as Admin
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Return to Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated - show admin dashboard
  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gray-50">
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
