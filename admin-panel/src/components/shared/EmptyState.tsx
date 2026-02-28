import React from "react";
import { Users } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="mb-4 text-slate-200">
      {icon || <Users size={64} />}
    </div>
    <p className="text-slate-400 font-medium text-lg">{title}</p>
    {description && <p className="text-slate-400 text-sm mt-2">{description}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
