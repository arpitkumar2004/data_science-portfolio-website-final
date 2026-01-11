import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ChevronRight } from 'lucide-react';
import { isOpenToWork, setOpenToWork, onOpenToWorkChange } from '../utils/openToWork';
import { openToWorkPositions } from '../data/openToWorkData';

const ADMIN_PIN = '1234'; // Simple PIN as requested. Consider server-side validation for production.

const OpenToWork: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(isOpenToWork());
  const [open, setOpen] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ensure the flag exists (set to true by default) so visibility persists across reloads
  useEffect(() => {
    try {
      const key = localStorage.getItem('openToWork');
      if (key === null) setOpenToWork(true);
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onOpenToWorkChange((v) => setVisible(v));
    return unsubscribe;
  }, []);

  // Track whether the current user is an Admin (set by RoleGateway)
  useEffect(() => {
    const read = () => setIsAdmin(localStorage.getItem('userRole') === 'Admin');
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'userRole') read();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Keyboard shortcuts: Escape closes dropdown/modal; Ctrl+R re-shows badge
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setShowPinModal(false);
      }

      // Ctrl+R to reappear
      if ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R')) {
        e.preventDefault();
        setOpenToWork(true);
        setVisible(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const submitPin = () => {
    if (pin === ADMIN_PIN) {
      setOpenToWork(false);
      setVisible(false);
      setShowPinModal(false);
      setPin('');
      setPinError(null);
      setAttempts(0);
    } else {
      setAttempts((a) => a + 1);
      setPinError('Incorrect PIN');
      setPin('');
    }
  };

  const handleHideClick = () => {
    setPin('');
    setPinError(null);
    setShowPinModal(true);
  };

  if (!visible) return null;

  return (
    <>
      <div className="absolute -right-6 -top-6 z-50">
        <div
          ref={containerRef}
          className="relative inline-block"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Link
            to="/request-cv"
            onFocus={() => setOpen(true)}
            onBlur={(e) => {
              const related = e.relatedTarget as Node | null;
              if (!related || (containerRef.current && !containerRef.current.contains(related))) setOpen(false);
            }}
            aria-haspopup="true"
            aria-expanded={open}
            className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-full font-bold shadow-md hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 transition"
            title="Open to work — click to request CV"
          >
            <Briefcase size={16} />
            <span className="text-sm">Open to work</span>
          </Link>

          <div
            id="open-to-work-list"
            role="menu"
            aria-label="Open to work menu"
            className={`absolute right-0 mt-2 w-80 bg-white text-slate-700 rounded-lg shadow-lg p-3 transform origin-top-right transition-all z-50 ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="text-xs font-mono font-bold text-emerald-600 uppercase mb-3">Looking for Internship Opportunities in summer 2026</div>

            <ul className="space-y-2">
              {openToWorkPositions.map((p, i) => (
                <li key={i}>
                  <Link
                    to="/request-cv"
                    state={{ role: p.title }}
                    role="menuitem"
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
                    aria-label={`Request CV for ${p.title} in ${p.field}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-900">{p.title}</span>
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{p.field}</span>
                    </div>
                    {p.level && <span className="text-xs text-slate-500">{p.level}</span>}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex gap-2">
              <Link to="/request-cv" className="flex-row items-center gap-2 inline-flex text-center px-3 py-2 bg-emerald-600 text-white rounded-md font-bold hover:bg-emerald-700">
                <ChevronRight size={16} /> Hire Me 
              </Link>
              {isAdmin && (
                <button
                  type="button"
                  className="px-3 py-2 border rounded-md text-sm text-slate-600 hover:bg-slate-100"
                  onClick={handleHideClick}
                >
                  Hide
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-30" aria-hidden="true" />
          <div role="dialog" aria-modal="true" className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-sm z-70">
            <h3 className="text-lg font-bold mb-2">Confirm Hide</h3>
            <p className="text-sm text-slate-600 mb-4">Enter admin PIN to hide the Open-to-work badge.</p>
            <label className="sr-only" htmlFor="pin-input">Admin PIN</label>
            <input
              id="pin-input"
              autoFocus
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              type="password"
              inputMode="numeric"
              className="w-full px-3 py-2 border rounded-md mb-2"
              placeholder="Enter PIN"
              onKeyDown={(e) => { if (e.key === 'Enter') submitPin(); }}
            />
            {pinError && <div className="text-sm text-red-600 mb-2">{pinError}</div>}
            <div className="flex justify-end gap-2">
              <button className="px-3 py-2 rounded-md bg-slate-100" onClick={() => setShowPinModal(false)}>Cancel</button>
              <button className="px-3 py-2 rounded-md bg-emerald-600 text-white" onClick={submitPin}>Confirm</button>
            </div>
            {attempts > 0 && <div className="mt-3 text-xs text-slate-400">Attempts: {attempts}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default OpenToWork;
