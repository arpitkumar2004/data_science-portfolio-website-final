import React, { useState, useEffect } from 'react';
import { Binary, FileSearch, Globe, Lock, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';

// Resolve admin panel target once. Priority: env override > localhost default > same-origin /admin-panel/.
const getAdminPanelUrl = (): string => {
  const fromEnv = import.meta.env.VITE_ADMIN_PANEL_URL as string | undefined;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.replace(/\/+$|$/, "/");
  }

  if (typeof window !== 'undefined') {
    const { origin, hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5174/';
    }
    if (origin) {
      return `${origin}/admin-panel/`;
    }
  }

  return 'https://admin.arpitkumar.dev/'; // Fallback URL
};

const redirectToAdminPanel = () => {
  if (typeof window !== 'undefined') {
    window.location.href = getAdminPanelUrl();
  }
};

const RoleGateway = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) setRole(savedRole);
    setIsReady(true);
  }, []);

  useEffect(() => {
    const openHandler = () => {
      setRole(null);
      sessionStorage.removeItem('roleNotifShown');
      setTimeout(() => {
        const btn = document.querySelector('[data-role-button]') as HTMLElement | null;
        if (btn) btn.focus();
      }, 50);
    };
    window.addEventListener('role:open', openHandler);
    return () => window.removeEventListener('role:open', openHandler);
  }, []);

  const { showToast } = useToast();

  useEffect(() => {
    if (role && !sessionStorage.getItem('roleNotifShown')) {
      showToast(`Interface Optimized for ${role}`, 'info', 5000, 'top');
      sessionStorage.setItem('roleNotifShown', '1');
    }
  }, [role, showToast]);

  const handleSelect = (selectedRole: string) => {
    localStorage.setItem('userRole', selectedRole);
    setRole(selectedRole);
    sessionStorage.setItem('roleNotifShown', '1');
    showToast(`Session Initialized: ${selectedRole}`, 'success', 5000, 'top');
    window.dispatchEvent(new Event('role:updated'));
  };


  if (!isReady) return null;

  if (role) return <>{children}</>;

  const roles = [
    {
      id: 'Researcher',
      icon: <FileSearch className="h-6 w-6" />,
      title: 'Research Peer',
      desc: 'Methods, derivations, and results.',
      action: 'Research View',
      bullets: ['Derivations', 'Methods', 'Results'],
    },
    {
      id: 'Developer',
      icon: <Binary className="h-6 w-6" />,
      title: 'Developer Meetup',
      desc: 'Architecture and code walk-throughs.',
      action: 'Source View',
      bullets: ['Architecture', 'APIs & SDKs', 'Implementation'],
    },
    {
      id: 'Recruiter',
      icon: <Building2 className="h-6 w-6" />,
      title: 'Recruitment Lead',
      desc: 'My CV, impact, and role fit analysis.',
      action: 'CV View',
      bullets: ['Verified CV', 'Impact Metrics', 'Culture Fit'],
    },
    {
      id: 'Guest',
      icon: <Globe className="h-6 w-6" />,
      title: 'General Explorer',
      desc: 'Projects and public highlights overview.',
      action: 'Public View',
      bullets: ['Projects Overview', 'Writing Samples', 'About Me'],
    },
  ];

  return (
    <div className="fixed inset-0 z-[9998] bg-[#060b16] text-white overflow-y-auto font-sans selection:bg-cyan-200 selection:text-slate-950">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(34,197,94,0.12),_transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(#94a3b8 0.6px, transparent 0.6px)`, backgroundSize: '30px 30px' }} />
      </div>

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-6xl">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {/* Header Section */}
              <div className="mb-8 md:mb-14 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 border border-white/10 bg-white/5 text-[#94a3b8] text-[10px] font-mono tracking-[0.3em] uppercase rounded-full">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Select Interaction Mode
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-[#f8fafc] leading-tight">
                  Choose Your <span className="text-[#3b82f6]">Access Layer</span>
                </h1>
                <p className="mt-4 text-[#94a3b8] font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                  Select a role to enter the portfolio
                </p>
              </div>

              {/* Role Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {roles.map((r, idx) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r.id)}
                    data-role-button={idx === 0 ? 'true' : undefined}
                    className={
                      `group relative flex flex-col items-start p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${
                        r.id === 'Recruiter'
                          ? 'hover:border-amber-300/70 hover:bg-white/10 hover:shadow-[0_18px_40px_rgba(251,191,36,0.25)]'
                          : r.id === 'Developer'
                            ? 'hover:border-sky-300/60 hover:bg-white/8 hover:shadow-[0_18px_40px_rgba(56,189,248,0.18)]'
                            : r.id === 'Researcher'
                              ? 'hover:border-emerald-300/60 hover:bg-white/8 hover:shadow-[0_18px_40px_rgba(52,211,153,0.18)]'
                              : 'hover:border-slate-200/50 hover:bg-white/7 hover:shadow-[0_18px_40px_rgba(226,232,240,0.12)]'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3 mb-3 text-[#e2e8f0]">
                      {r.icon}
                      <h3 className="text-base md:text-lg font-semibold tracking-tight">{r.title}</h3>
                    </div>

                    <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed mb-4">{r.desc}</p>

                    <ul className="space-y-2 text-xs md:text-sm text-[#cbd5f5] mb-5">
                      {r.bullets.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#cbd5f5]">
                      <span className={r.id === 'Recruiter' ? 'text-amber-200' : undefined}>Enter</span>
                      <ArrowRight size={12} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Admin Bypass */}
              <div className="mt-12 md:mt-16 text-center">
                <button
                  onClick={redirectToAdminPanel}
                  className="group flex items-center gap-3 mx-auto text-[#94a3b8] hover:text-[#3b82f6] transition-all font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]"
                >
                  <Lock size={14} className="group-hover:rotate-12 transition-transform" /> 
                  Initialize Root Access
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Footer Meta Data */}
      <div className="fixed bottom-6 left-6 hidden lg:block pointer-events-none">
        <p className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-[0.5em]">
          Core Systems: Active | Data Streams: Encrypted
        </p>
      </div>
    </div>
  );
};

export default RoleGateway;