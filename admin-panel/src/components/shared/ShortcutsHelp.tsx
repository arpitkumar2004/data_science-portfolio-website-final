import React from "react";
import { X } from "lucide-react";
import { SHORTCUT_MAP } from "../../hooks/useKeyboardShortcuts";

interface ShortcutsHelpProps {
  open: boolean;
  onClose: () => void;
}

const ShortcutsHelp: React.FC<ShortcutsHelpProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {SHORTCUT_MAP.map((shortcut, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{shortcut.label}</span>
              <div className="flex gap-1.5">
                {shortcut.keys.map((k) => (
                  <kbd
                    key={k}
                    className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-mono font-bold shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-slate-100 text-center">
          <span className="text-xs text-slate-400">
            Press <kbd className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono font-bold">?</kbd> to toggle
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsHelp;
