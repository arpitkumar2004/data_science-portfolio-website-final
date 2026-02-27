import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';

type ThemeMode = 'light' | 'dark';

const THEME_KEY = 'portfolio_theme';

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (location.pathname.startsWith('/admin')) {
      document.documentElement.classList.remove('dark');
      return;
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, location.pathname]);

  const isDark = theme === 'dark';

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-white/90 px-4 py-3 text-slate-900 shadow-[0_18px_40px_rgba(59,130,246,0.18)] backdrop-blur transition-all hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-[#161616]/90 dark:text-[#f8fafc] dark:shadow-[0_18px_40px_rgba(15,23,42,0.6)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-blue-600 dark:bg-white/10 dark:text-blue-400">
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </span>
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-[#94a3b8]">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
