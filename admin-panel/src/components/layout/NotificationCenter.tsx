import React, { useEffect, useState, useRef } from "react";
import { Bell, ShieldCheck, Mail } from "lucide-react";
import adminAPI from "../../services/adminAPI";
import { useToast } from "../../hooks/useToast";

interface NotificationCenterProps {
  onUnreadCountChange?: (count: number) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onUnreadCountChange }) => {
  const { showToast } = useToast();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const prevCountRef = useRef<number>(0);

  // Poll for unread leads every 15 seconds for zero-miss alerting
  useEffect(() => {
    const checkUnread = async () => {
      try {
        const res = await adminAPI.getUnreadCount();
        const count = res.unread_count || 0;
        
        if (count > prevCountRef.current && prevCountRef.current !== 0) {
          // Play audio notification chime & show toast
          showToast(`🔔 New lead received! (${count} unread)`, "info");
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("New Lead Alert — Portfolio Admin", {
              body: `You have ${count} unread leads waiting in your inbox.`,
              icon: "/favicon.ico"
            });
          }
        }
        
        prevCountRef.current = count;
        setUnreadCount(count);
        if (onUnreadCountChange) onUnreadCountChange(count);
      } catch {
        // Silent catch during initial loading
      }
    };

    checkUnread();
    const interval = setInterval(checkUnread, 15000);
    return () => clearInterval(interval);
  }, [showToast, onUnreadCountChange]);

  const requestPushPermission = () => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          showToast("Browser push notifications enabled for zero-miss lead alerts!", "success");
        }
      });
    } else {
      showToast("Push notifications are already active.", "info");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Notifications & Alerts"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> Lead Notification Hub
            </span>
            <button
              onClick={requestPushPermission}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Enable Push
            </button>
          </div>

          <div className="p-3 space-y-2">
            <div className="flex items-start gap-2.5 p-2 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {unreadCount > 0 ? `${unreadCount} Unread Leads` : "No Unread Leads"}
                </p>
                <p className="text-[11px] text-slate-500">
                  {unreadCount > 0
                    ? "Check your inbox to review and respond immediately."
                    : "Zero-miss lead tracker is monitoring incoming inquiries 24/7."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
