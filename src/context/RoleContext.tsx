/**
 * RoleContext
 *
 * Centralised role state for the entire app. Eliminates scattered
 * `localStorage.getItem('userRole')` reads and provides a reactive
 * value that all consumers can subscribe to.
 *
 * Usage:
 *   const { role, setRole, hasCompletedSelection } = useRole();
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

/* ─── Types ─── */
export type AppRole = 'Recruiter' | 'Researcher' | 'Developer' | 'Guest' | 'Admin';

interface RoleContextValue {
  /** Current user role (defaults to 'Guest' while pending). */
  role: AppRole;

  /** Update the role both in context and localStorage. */
  setRole: (newRole: AppRole) => void;

  /**
   * `true` once the user has either:
   *  1. Explicitly chosen a role via the modal, or
   *  2. Dismissed the modal (defaulting to Guest).
   *
   * Before this becomes `true`, popup‑style overlays like OpenToWork
   * should NOT auto‑open — this is the sequencing gate that prevents
   * the "popup storm".
   */
  hasCompletedSelection: boolean;

  /** Mark role selection as complete (called by RoleGateway). */
  completeSelection: () => void;

  /** Open the role‑picker modal (used by footer "Set role" link). */
  openRoleModal: () => void;

  /** Whether the role‑picker modal is open. */
  isRoleModalOpen: boolean;

  /** Close the role‑picker modal. */
  closeRoleModal: () => void;
}

/* ─── Context ─── */
const RoleContext = createContext<RoleContextValue | null>(null);

/* ─── Provider ─── */
export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<AppRole>('Guest');
  const [hasCompletedSelection, setHasCompletedSelection] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userRole') as AppRole | null;
    if (saved) {
      setRoleState(saved);
      setHasCompletedSelection(true); // returning visitor
    }
    // First‑time visitor — leave hasCompletedSelection false
  }, []);

  // Keep in‑sync when *other* tabs change the value
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'userRole' && e.newValue) {
        setRoleState(e.newValue as AppRole);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Also listen for the legacy 'role:updated' custom event
  useEffect(() => {
    const handler = () => {
      const current = localStorage.getItem('userRole') as AppRole | null;
      if (current) setRoleState(current);
    };
    window.addEventListener('role:updated', handler);
    return () => window.removeEventListener('role:updated', handler);
  }, []);

  const setRole = useCallback((newRole: AppRole) => {
    localStorage.setItem('userRole', newRole);
    setRoleState(newRole);
    setHasCompletedSelection(true);
    window.dispatchEvent(new Event('role:updated'));
  }, []);

  const completeSelection = useCallback(() => {
    setHasCompletedSelection(true);
  }, []);

  const openRoleModal = useCallback(() => {
    setIsRoleModalOpen(true);
  }, []);

  const closeRoleModal = useCallback(() => {
    setIsRoleModalOpen(false);
  }, []);

  const value = useMemo<RoleContextValue>(
    () => ({
      role,
      setRole,
      hasCompletedSelection,
      completeSelection,
      openRoleModal,
      isRoleModalOpen,
      closeRoleModal,
    }),
    [role, setRole, hasCompletedSelection, completeSelection, openRoleModal, isRoleModalOpen, closeRoleModal],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

/* ─── Hook ─── */
export const useRole = (): RoleContextValue => {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error('useRole must be used within a <RoleProvider>');
  }
  return ctx;
};

export default RoleContext;
