/**
 * Action Drawer Component
 * Side-panel for contextual lead actions and intelligence
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  MapPin,
  Clock,
  Tag,
  AlertCircle,
  Linkedin,
  Globe,
  Lead,
  Edit,
  Save,
  Trash2,
} from "lucide-react";

interface ActionDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (lead: Lead) => void;
  onDelete: (id: number) => void;
}

const ActionDrawer: React.FC<ActionDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<LeadPriority | null>(null);

  if (!lead) return null;

  React.useEffect(() => {
    setNotes(lead.internal_notes || "");
    setSelectedStatus(lead.status);
    setSelectedPriority(lead.priority);
  }, [lead]);

  const handleStatusChange = (status: LeadStatus) => {
    setSelectedStatus(status);
    onUpdate({ ...lead, status });
  };

  const handlePriorityChange = (priority: LeadPriority) => {
    setSelectedPriority(priority);
    onUpdate({ ...lead, priority });
  };

  const handleSaveNotes = () => {
    onUpdate({ ...lead, internal_notes: notes });
    setIsEditingNotes(false);
  };

  const getStatusColor = (status: LeadStatus) => {
    const colors = {
      unread: "bg-blue-500 text-white",
      processing: "bg-yellow-500 text-black",
      contacted: "bg-green-500 text-white",
      archived: "bg-gray-500 text-white",
    };
    return colors[status];
  };

  const getPriorityColor = (priority: LeadPriority) => {
    const colors = {
      low: "bg-gray-400",
      medium: "bg-blue-400",
      high: "bg-orange-400",
      urgent: "bg-red-500",
    };
    return colors[priority];
  };

  const searchLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(lead.name)}`,
      "_blank"
    );
  };

  const verifyDomain = () => {
    const domain = lead.email.split("@")[1];
    window.open(`https://www.${domain}`, "_blank");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Lead Intelligence
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["unread", "processing", "contacted", "archived"] as LeadStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                          selectedStatus === status
                            ? getStatusColor(status)
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["low", "medium", "high", "urgent"] as LeadPriority[]).map((priority) => (
                      <button
                        key={priority}
                        onClick={() => handlePriorityChange(priority)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                          selectedPriority === priority
                            ? `${getPriorityColor(priority)} text-white`
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
                <h3 className="font-semibold text-lg">{lead.name}</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                      {lead.email}
                    </a>
                  </div>
                  
                  {lead.company && (
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-gray-500" />
                      <span>{lead.company}</span>
                    </div>
                  )}
                  
                  {lead.role && (
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-gray-500" />
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded">
                        {lead.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Inquiry Details */}
              <div>
                <h4 className="font-semibold mb-2">Subject</h4>
                <p className="text-gray-700 dark:text-gray-300">{lead.subject}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Message</h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {lead.message}
                </p>
              </div>

              {/* Metadata - Honey Trap */}
              {lead.metadata && Object.keys(lead.metadata).length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    Intelligence Data
                  </h4>
                  <div className="space-y-1 text-sm">
                    {lead.metadata.ip_address && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-500" />
                        <span>IP: {lead.metadata.ip_address}</span>
                      </div>
                    )}
                    {lead.metadata.user_agent && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                        Browser: {lead.metadata.user_agent}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Internal Notes */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Internal Notes</h4>
                  {!isEditingNotes ? (
                    <button
                      onClick={() => setIsEditingNotes(true)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                    >
                      <Edit size={14} /> Edit
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveNotes}
                      className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm"
                    >
                      <Save size={14} /> Save
                    </button>
                  )}
                </div>
                {isEditingNotes ? (
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 min-h-[100px]"
                    placeholder="Add internal notes..."
                  />
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {lead.internal_notes || "No notes yet"}
                  </p>
                )}
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <Clock size={14} /> Created
                  </div>
                  <p>{formatDate(lead.created_at)}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <Clock size={14} /> Updated
                  </div>
                  <p>{formatDate(lead.updated_at)}</p>
                </div>
              </div>

              {/* External Intelligence */}
              <div className="space-y-2">
                <h4 className="font-semibold mb-2">External Intelligence</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={searchLinkedIn}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Linkedin size={16} />
                    Search LinkedIn
                  </button>
                  <button
                    onClick={verifyDomain}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    <Globe size={16} />
                    Verify Domain
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this lead?")) {
                      onDelete(lead.id);
                      onClose();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <Trash2 size={16} />
                  Delete Lead
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ActionDrawer;
