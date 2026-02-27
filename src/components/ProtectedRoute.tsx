import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Building2 } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import RecruiterGate from './RecruiterGate';
import { getRecruiterProfile } from '../utils/recruiterProfile';

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
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [showInlineGate, setShowInlineGate] = useState(false);

  useEffect(() => {
    const checkAuthorization = () => {
      const userRole = localStorage.getItem('userRole');
      setCurrentRole(userRole);
      
      if (!userRole) {
        setIsAuthorized(false);
        setNeedsVerification(false);
        return;
      }

      // Check if role is in allowed list
      const roleAllowed = allowedRoles.some(
        role => role.toLowerCase() === userRole.toLowerCase()
      );

      if (!roleAllowed) {
        setIsAuthorized(false);
        setNeedsVerification(false);
        trackEvent('protected_route_blocked', { role: userRole, page: window.location.pathname });
        return;
      }

      // Special check for Admin role - must have token only if requireAdminToken is true
      if (requireAdminToken && userRole.toLowerCase() === 'admin') {
        const adminToken = sessionStorage.getItem('adminToken');
        setIsAuthorized(!!adminToken);
        setNeedsVerification(false);
        return;
      }

      // Recruiters must have a verified profile
      if (userRole.toLowerCase() === 'recruiter') {
        const profile = getRecruiterProfile();
        if (!profile) {
          setIsAuthorized(false);
          setNeedsVerification(true);
          return;
        }
      }

      setIsAuthorized(true);
      setNeedsVerification(false);
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
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
          <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-sm">Verifying access...</span>
        </div>
      </div>
    );
  }

  // Not authorized — show access denied or inline verification
  if (!isAuthorized) {
    // If user already has Recruiter role but hasn't verified, or wants to verify now
    if (showInlineGate || needsVerification) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] px-4 py-12">
          <RecruiterGate
            variant="inline"
            onVerified={() => {
              localStorage.setItem('userRole', 'Recruiter');
              window.dispatchEvent(new Event('role:updated'));
              trackEvent('recruiter_verified_from_protected_route', { from: currentRole });
            }}
            onCancel={() => {
              setShowInlineGate(false);
              // If they came here as non-recruiter, just go back to blocked view
              if (!needsVerification) {
                setNeedsVerification(false);
              } else {
                // They ARE recruiter role but refuse to verify — reset to Guest
                localStorage.setItem('userRole', 'Guest');
                window.dispatchEvent(new Event('role:updated'));
              }
            }}
          />
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#020617] px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Shield className="h-12 w-12 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Recruiter Access Only
            </h1>
            
            <div className="flex items-start gap-3 mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-200 text-left">
                This page contains confidential availability details, compensation expectations, and role preferences exclusively for <strong>recruiters and hiring managers</strong>.
              </p>
            </div>

            {currentRole && (
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                You're currently viewing as <strong className="text-slate-700 dark:text-slate-300">{currentRole}</strong>.
              </p>
            )}
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowInlineGate(true);
                  trackEvent('recruiter_gate_opened_from_protected', { from: currentRole });
                }}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Building2 size={18} />
                I'm a Recruiter — Verify with Company Email
                <ArrowRight size={16} />
              </button>
              <Link
                to="/"
                className="w-full px-6 py-3 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-700 text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authorized — render children
  return <>{children}</>;
};

export default ProtectedRoute;
