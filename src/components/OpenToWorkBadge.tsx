import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Briefcase } from "lucide-react";
import { trackEvent } from "../utils/analytics";
import { getRecruiterProfile } from "../utils/recruiterProfile";

/**
 * Simple badge component that links to the dedicated Open to Work page
 * Displays a pulsing badge in the top-right corner
 * Only visible to verified Recruiters and Admin roles
 */
const OpenToWorkBadge: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Check if user has authorized role (verified Recruiter or Admin)
  useEffect(() => {
    const checkAuthorization = () => {
      const userRole = localStorage.getItem("userRole");
      const isAdmin = userRole === "Admin";
      const isVerifiedRecruiter = userRole === "Recruiter" && !!getRecruiterProfile();
      const authorized = isAdmin || isVerifiedRecruiter;
      setIsAuthorized(authorized);
      
      // Also check visibility preference
      const savedState = localStorage.getItem("openToWorkBadge");
      setVisible(authorized && savedState !== "hidden");
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
        {/* Subtle pulse ring — single animation instead of 3 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 animate-pulse opacity-30" />

        {/* Badge Content */}
        <div className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all group-hover:scale-105">
          <Sparkles size={16} />
          <span className="text-sm whitespace-nowrap">Open to Work</span>
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
