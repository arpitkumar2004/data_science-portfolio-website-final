import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

interface LeadBulkActionsProps {
  selectedCount: number;
  onClear: () => void;
  onBulkDelete: () => void;
  onBulkStatusChange?: (status: string) => void;
}

const LeadBulkActions: React.FC<LeadBulkActionsProps> = ({
  selectedCount,
  onClear,
  onBulkDelete,
  onBulkStatusChange,
}) => {
  if (selectedCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3"
    >
      <span className="text-sm font-medium text-blue-900">
        {selectedCount} lead{selectedCount > 1 ? "s" : ""} selected
      </span>
      <div className="flex gap-2">
        {onBulkStatusChange && (
          <select
            onChange={(e) => {
              if (e.target.value) onBulkStatusChange(e.target.value);
              e.target.value = "";
            }}
            defaultValue=""
            className="px-3 py-1.5 text-sm bg-white text-slate-700 border border-slate-300 rounded-lg outline-none"
          >
            <option value="" disabled>
              Change status...
            </option>
            <option value="unread">Unread</option>
            <option value="processing">Processing</option>
            <option value="contacted">Contacted</option>
            <option value="archived">Archived</option>
          </select>
        )}
        <button
          onClick={onClear}
          className="px-3 py-1.5 text-sm bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={onBulkDelete}
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default LeadBulkActions;
