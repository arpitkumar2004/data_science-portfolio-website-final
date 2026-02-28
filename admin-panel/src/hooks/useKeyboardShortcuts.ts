/**
 * Global keyboard shortcuts for the admin panel.
 * Shortcuts are disabled when user is typing in an input/textarea/select.
 */
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface ShortcutAction {
  key: string;
  description: string;
  handler: () => void;
  ctrl?: boolean;
  shift?: boolean;
}

interface UseKeyboardShortcutsOptions {
  onFocusSearch?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onCloseDrawer?: () => void;
  onToggleShortcutsHelp?: () => void;
  enabled?: boolean;
}

const isInputFocused = () => {
  const active = document.activeElement;
  if (!active) return false;
  const tag = active.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    (active as HTMLElement).isContentEditable
  );
};

export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions = {}) {
  const {
    onFocusSearch,
    onRefresh,
    onExport,
    onCloseDrawer,
    onToggleShortcutsHelp,
    enabled = true,
  } = options;

  let navigate: ReturnType<typeof useNavigate>;
  try {
    navigate = useNavigate();
  } catch {
    // Not inside a Router — shortcuts that need navigation won't work
    navigate = (() => {}) as any;
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      if (isInputFocused() && e.key !== "Escape") return;

      // Ctrl/Cmd combos
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "k":
            e.preventDefault();
            onFocusSearch?.();
            return;
        }
      }

      // Single key shortcuts (no modifier)
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        switch (e.key) {
          case "/":
            e.preventDefault();
            onFocusSearch?.();
            return;
          case "r":
            if (e.shiftKey) return; // Don't capture Shift+R
            e.preventDefault();
            onRefresh?.();
            return;
          case "e":
            e.preventDefault();
            onExport?.();
            return;
          case "Escape":
            onCloseDrawer?.();
            return;
          case "?":
            e.preventDefault();
            onToggleShortcutsHelp?.();
            return;
          // Navigation shortcuts — g then key
          case "1":
            e.preventDefault();
            navigate("/");
            return;
          case "2":
            e.preventDefault();
            navigate("/analytics");
            return;
          case "3":
            e.preventDefault();
            navigate("/settings");
            return;
        }
      }
    },
    [enabled, onFocusSearch, onRefresh, onExport, onCloseDrawer, onToggleShortcutsHelp, navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

/** All available shortcuts for display in the help dialog */
export const SHORTCUT_MAP: Array<{ keys: string[]; label: string }> = [
  { keys: ["/", "Ctrl+K"], label: "Focus search" },
  { keys: ["R"], label: "Refresh data" },
  { keys: ["E"], label: "Export CSV" },
  { keys: ["Esc"], label: "Close drawer / dialog" },
  { keys: ["?"], label: "Toggle shortcuts help" },
  { keys: ["1"], label: "Go to Leads" },
  { keys: ["2"], label: "Go to Analytics" },
  { keys: ["3"], label: "Go to Settings" },
];

export default useKeyboardShortcuts;
