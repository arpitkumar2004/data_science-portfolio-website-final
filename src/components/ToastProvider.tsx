import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  type: ToastType;
  message: string;
  position?: 'top' | 'bottom';
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType, duration?: number, position?: 'top' | 'bottom') => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 5000, position: 'top' | 'bottom' = 'bottom') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((t) => [{ id, type, message, position }, ...t].slice(0, 5));

    // auto remove
    if (duration > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, duration);
    }
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Top - center toasts */}
      <div aria-live="polite" className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] flex flex-col gap-3 w-[320px] pointer-events-none">
        <AnimatePresence>
          {toasts.filter((t) => t.position === 'top').map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="pointer-events-auto"
            >
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toast.type === 'success' ? 'bg-green-50 text-green-800 border-green-100' : toast.type === 'error' ? 'bg-red-50 text-red-800 border-red-100' : 'bg-slate-50 text-slate-800 border-slate-100'}`}>
                <div className="flex-shrink-0">
                  {toast.type === 'success' && <CheckCircle size={18} />}
                  {toast.type === 'error' && <AlertCircle size={18} />}
                  {toast.type === 'info' && <Info size={18} />}
                </div>
                <div className="text-sm font-medium whitespace-pre-line">{toast.message}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom-right toasts (default) */}
      <div aria-live="polite" className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 w-[320px] pointer-events-none">
        <AnimatePresence>
          {toasts.filter((t) => t.position !== 'top').map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="pointer-events-auto"
            >
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toast.type === 'success' ? 'bg-green-50 text-green-800 border-green-100' : toast.type === 'error' ? 'bg-red-50 text-red-800 border-red-100' : 'bg-slate-50 text-slate-800 border-slate-100'}`}>
                <div className="flex-shrink-0">
                  {toast.type === 'success' && <CheckCircle size={18} />}
                  {toast.type === 'error' && <AlertCircle size={18} />}
                  {toast.type === 'info' && <Info size={18} />}
                </div>
                <div className="text-sm font-medium whitespace-pre-line">{toast.message}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
