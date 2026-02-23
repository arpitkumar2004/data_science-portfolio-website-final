import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Briefcase } from "lucide-react";
import { trackEvent } from "../utils/analytics";

/**
 * Simple badge component that links to the dedicated Open to Work page
 * Displays a pulsing badge in the top-right corner
 * Only visible to Recruiter and Admin roles
 */
const OpenToWorkBadge: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Check if user has authorized role (Recruiter or Admin)
  useEffect(() => {
    const checkAuthorization = () => {
      const userRole = localStorage.getItem("userRole");
      const isRecruiterOrAdmin = userRole === "Recruiter" || userRole === "Admin";
      setIsAuthorized(isRecruiterOrAdmin);
      
      // Also check visibility preference
      const savedState = localStorage.getItem("openToWorkBadge");
      setVisible(isRecruiterOrAdmin && savedState !== "hidden");
    };

    checkAuthorization();

    // Listen for role updates
    const handleRoleUpdate = () => checkAuthorization();
    window.addEventListener("role:updated", handleRoleUpdate);

    return () => window.removeEventListener("role:updated", handleRoleUpdate);
  }, []);

  const handleBadgeClick = () => {
    trackEvent("open_to_work_badge_click", { 
      action: "navigate_to_page",
      source: "floating_badge" 
    });
  };

  // Hide badge if not authorized or manually hidden
  if (!visible || !isAuthorized) return null;

  return (
    <Link
      to="/open-to-work"
      onClick={handleBadgeClick}
      className="fixed top-20 md:top-24 right-4 md:right-6 z-50 group"
      aria-label="View internship opportunities"
    >
      {/* Main Badge */}
      <div className="relative">
        {/* Pulse Animation Rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 animate-ping opacity-75" />
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 animate-pulse opacity-50"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Badge Content */}
        <div className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all group-hover:scale-105">
          <Sparkles size={16} className="animate-pulse" />
          <span className="text-sm whitespace-nowrap">Currently Open to Work</span>
          <Briefcase size={16} />
        </div>
      </div>

      {/* Tooltip on hover */}
      <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap">
          Click to view complete details →
        </div>
      </div>
    </Link>
  );
};

export default OpenToWorkBadge;
