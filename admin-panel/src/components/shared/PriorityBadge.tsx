import React from "react";

const priorityStyles: Record<string, string> = {
  urgent: "text-red-600 bg-red-500/10",
  high: "text-orange-600 bg-orange-500/10",
  medium: "text-yellow-600 bg-yellow-500/10",
  low: "text-slate-600 bg-slate-500/10",
};

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className = "" }) => {
  const style = priorityStyles[priority] || priorityStyles.medium;
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${style} ${className}`}>
      {priority}
    </span>
  );
};

export const getPriorityColorClass = (p: string = "medium") => {
  return priorityStyles[p] || priorityStyles.medium;
};

export default PriorityBadge;
