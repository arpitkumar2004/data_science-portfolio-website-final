import React, { useEffect, useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  requireAdminToken?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles,
  requireAdminToken = false 
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthorization = () => {
      const userRole = localStorage.getItem('userRole');
      
      if (!userRole) {
        setIsAuthorized(false);
        return;
      }

      // Check if role is in allowed list
      const roleAllowed = allowedRoles.some(
        role => role.toLowerCase() === userRole.toLowerCase()
      );

      if (!roleAllowed) {
        setIsAuthorized(false);
        return;
      }

      // Special check for Admin role - must have token
      if (userRole.toLowerCase() === 'admin' && requireAdminToken) {
        const adminToken = sessionStorage.getItem('adminToken');
        setIsAuthorized(!!adminToken);
        return;
      }

      setIsAuthorized(true);
    };

    checkAuthorization();

    // Listen for role updates
    const handleRoleUpdate = () => checkAuthorization();
    window.addEventListener('role:updated', handleRoleUpdate);

    return () => window.removeEventListener('role:updated', handleRoleUpdate);
  }, [allowedRoles, requireAdminToken]);

  // Loading state
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617]">
        <div className="animate-pulse text-slate-600 dark:text-slate-400">
          Verifying access...
        </div>
      </div>
    );
  }

  // Not authorized - show access denied
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                <Shield className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Access Restricted
            </h1>
            
            <div className="flex items-start gap-3 mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200 text-left">
                This page is exclusively available to <strong>Recruiters</strong> and <strong>Admin</strong> users.
              </p>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Please select the appropriate role from the role gateway to access this content.
            </p>
            
            <button
              onClick={() => window.location.href = '/'}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authorized - render children
  return <>{children}</>;
};

export default ProtectedRoute;
