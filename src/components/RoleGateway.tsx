import React, { useState, useEffect } from 'react';
import { Binary, FileSearch, Globe, Lock, ArrowRight, Fingerprint, Building2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

// Simple auth API client for RoleGateway
const adminAPI = {
  async login(password: string) {
    const url = buildApiUrl(API_ENDPOINTS.ADMIN_LOGIN);
    console.log(' Admin Login Request:', { url, password: '***' });
    
    const formData = new FormData();
    formData.append('password', password);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      console.log(' Login Response Status:', response.status);
      
      const data = await response.json();
      console.log(' Login Response Data:', { access_token: data.access_token ? '***' : 'none', ...data });
      
      if (!response.ok) {
        console.error(' Login Error:', data);
        throw new Error(data.detail || data.message || `HTTP ${response.status}`);
      }
      
      if (data.access_token) {
        sessionStorage.setItem('admin_token', data.access_token);
        localStorage.setItem('admin_token', data.access_token);
        console.log(' Token saved to storage');
      }
      return data;
    } catch (err) {
      console.error(' Login Error:', err);
      throw err;
    }
  },

  async validateToken() {
    const token = sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token');
    if (!token) {
      console.log(' No token found');
      return false;
    }
    
    const url = buildApiUrl(API_ENDPOINTS.ADMIN_ME);
    console.log(' Validating Token:', { url, token: '***' });
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      console.log(' Token Validation Response:', response.status);
      return response.ok;
    } catch (err) {
      console.error(' Token Validation Error:', err);
      return false;
    }
  },
};

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

  return '/admin-panel/';
};

const redirectToAdminPanel = () => {
  if (typeof window !== 'undefined') {
    window.location.href = getAdminPanelUrl();
  }
};

const RoleGateway = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole === 'Admin') {
      const token = sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token');
      if (token) {
        adminAPI
          .validateToken()
          .then((valid) => {
            if (valid) {
              setRole('Admin');
            } else {
              localStorage.removeItem('userRole');
              sessionStorage.removeItem('adminToken');
            }
          })
          .finally(() => setIsReady(true));
        return;
      }

      localStorage.removeItem('userRole');
    }

    if (savedRole) setRole(savedRole);
    setIsReady(true);
  }, []);

  // Redirect to the dedicated admin SPA whenever admin role is active
  useEffect(() => {
    if (role === 'Admin') {
      redirectToAdminPanel();
    }
  }, [role]);

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
    if (selectedRole.toLowerCase() !== 'admin') {
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('isAdmin');
    }
    setRole(selectedRole);
    sessionStorage.setItem('roleNotifShown', '1');
    showToast(`Session Initialized: ${selectedRole}`, 'success', 5000, 'top');
    window.dispatchEvent(new Event('role:updated'));

    // Route admins straight into the dedicated panel
    if (selectedRole.toLowerCase() === 'admin') {
      redirectToAdminPanel();
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(' Admin Login Started');
    
    if (isBlocked) {
      console.log(' Blocked - too many attempts');
      showToast(' Access Blocked: Too many failed attempts. Try again in 3 hours.', 'error');
      return;
    }

    if (!password || password.trim() === '') {
      console.log(' Empty password');
      showToast('Please enter admin password', 'error');
      return;
    }

    try {
      console.log('Sending login to:', buildApiUrl(API_ENDPOINTS.ADMIN_LOGIN));
      const res = await adminAPI.login(password);
      console.log('Got response:', res);
      if (res && res.access_token) {
        setFailedAttempts(0);
        setIsBlocked(false);
        handleSelect('Admin');
        setIsAdminMode(false);
        setPassword('');
        showToast('✓ Root Access Granted', 'success');
      } else {
        showToast('Authentication failed - Invalid response', 'error');
      }
    } catch (err: unknown) {
      console.error('Admin login error:', err);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setPassword('');

      // Check if rate limited by backend (429)
      const errorMsg = (err instanceof Error) ? err.message : '';
      if (errorMsg.includes('429') || errorMsg.toLowerCase().includes('rate limit')) {
        setIsBlocked(true);
        showToast('Access Blocked: Too many failed attempts. Your IP is blocked for 3 hours.', 'error');
        setTimeout(() => {
          setIsBlocked(false);
          setFailedAttempts(0);
        }, 3 * 60 * 60 * 1000); // 3 hours
        return;
      }

      const attemptsLeft = 10 - newAttempts;
      const errorMessage = errorMsg || 'Invalid Credentials';
      
      if (attemptsLeft <= 3 && attemptsLeft > 0) {
        showToast(`Authentication Failed: ${errorMessage}\n Warning: ${attemptsLeft} attempts remaining before 3-hour block`, 'error');
      } else if (attemptsLeft <= 0) {
        setIsBlocked(true);
        showToast('Access Blocked: Maximum attempts exceeded. Blocked for 3 hours.', 'error');
        setTimeout(() => {
          setIsBlocked(false);
          setFailedAttempts(0);
        }, 3 * 60 * 60 * 1000); // 3 hours
      } else {
        showToast(`✗ Authentication Failed: ${errorMessage}\n(${attemptsLeft}/10 attempts remaining)`, 'error');
      }
    }
  };

  if (!isReady) return null;

  if (role === 'Admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] text-slate-700 dark:text-slate-300">
        <p className="font-mono text-xs uppercase tracking-[0.2em]">Redirecting to Admin Panel...</p>
      </div>
    );
  }

  if (role) return <>{children}</>;

  const roles = [
    { 
        id: 'Researcher', 
        icon: <FileSearch className="w-6 h-6 md:w-8 md:h-8" />, 
        title: 'Research Peer', 
        desc: 'Get mathematical derivations, validate methodologies, and inspect the integrity of my scientific projects.',
        tag: '01_RSCH',
        action: "Initialize Research Review"
    },
    { 
        id: 'Developer', 
        icon: <Binary className="w-6 h-6 md:w-8 md:h-8" />, 
        title: 'Developer Meetup', 
        desc: 'Get modular codebases, evaluate backend architectures, and verify implementations engineered from first principles. ',
        tag: '02_DEV',
        action : "Inspect Source Code"
    },
    { 
        id: 'Recruiter', 
        icon: <Building2 className="w-6 h-6 md:w-8 md:h-8" />, 
        title: 'Recruitment Lead', 
        desc: 'Download my verified Technical CV, analyze professional milestones, and evaluate my readiness for high-impact roles.',
        tag: '03_REC',
        action: "Access Professional CV"
    },
    { 
        id: 'Guest', 
        icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />, 
        title: 'General Explorer', 
        desc: 'Explore technical blogs, browse the project portfolio, and navigate my professional narrative from the outside.',
        tag: '04_EXT',
        action: "Initialize Public View"
    },
  ];

  return (
    <div className="fixed inset-0 z-[9998] bg-[#020617] text-white overflow-y-auto font-sans selection:bg-cyan-200 selection:text-slate-950">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px)`, backgroundSize: '26px 26px' }} />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#3b82f6]/20 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[#6366f1]/15 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-6xl">
          {!isAdminMode ? (
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
                  Route into the right context for signal-rich review
                </p>
              </div>

              {/* Role Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {roles.map((r, idx) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r.id)}
                    data-role-button={idx === 0 ? 'true' : undefined}
                    className="group relative flex flex-col items-start p-6 md:p-8 rounded-2xl bg-[#161616] border border-white/10 hover:border-white/20 transition-all duration-300 text-left hover:bg-[#1c1c1c] hover:shadow-[0_22px_50px_rgba(59,130,246,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                  >
                    <span className="absolute top-4 right-4 font-mono text-[10px] text-[#94a3b8] group-hover:text-white transition-colors">
                      {r.tag}
                    </span>

                    <div className="p-3 mb-4 md:mb-6 bg-gradient-to-br from-white/10 to-white/5 text-[#94a3b8] group-hover:from-[#3b82f6]/30 group-hover:to-[#6366f1]/20 group-hover:text-white transition-all duration-500 rounded-2xl">
                      {r.icon}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-[#f8fafc] transition-colors tracking-tight uppercase">{r.title}</h3>
                    <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed mb-6 md:mb-8">{r.desc}</p>

                    <div className="mt-auto flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 sm:translate-x-[-10px] group-hover:translate-x-0">
                      <span>{r.action}</span><ArrowRight size={12} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Admin Bypass */}
              <div className="mt-12 md:mt-16 text-center">
                <button
                  onClick={() => setIsAdminMode(true)}
                  className="group flex items-center gap-3 mx-auto text-[#94a3b8] hover:text-[#3b82f6] transition-all font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]"
                >
                  <Lock size={14} className="group-hover:rotate-12 transition-transform" /> 
                  Initialize Root Access
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto animate-in fade-in zoom-in duration-500 px-4">
              <div className="bg-[#161616] border border-white/10 p-6 sm:p-10 shadow-2xl relative rounded-2xl backdrop-blur">
                 {/* Decorative corner accents */}
                 <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#3b82f6]"></div>
                 <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#3b82f6]"></div>
                 <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#3b82f6]"></div>
                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#3b82f6]"></div>

                  <div className="flex justify-center mb-6 md:mb-8">
                    <Fingerprint size={48} className="text-[#3b82f6] animate-pulse" />
                  </div>
                  
                  <h2 className="text-center font-bold text-xl md:text-2xl tracking-tight mb-2 uppercase text-[#f8fafc]">Root Access</h2>
                  <p className="text-center text-[#94a3b8] text-[10px] font-mono mb-6 md:mb-8 uppercase tracking-widest">Execute identity verification</p>

                  <form onSubmit={handleAdminLogin} className="space-y-4 md:space-y-6">
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="ACCESS_TOKEN"
                        autoFocus
                        className="w-full px-4 py-3 md:py-4 bg-[#1c1c1c] border border-white/10 text-[#f8fafc] font-mono text-sm focus:border-[#3b82f6] outline-none transition-all placeholder:text-[#94a3b8]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button className="w-full py-3 md:py-4 bg-gradient-to-br from-[#3b82f6] via-[#06b6d4] to-[#10b981] text-[#0a0a0a] font-mono text-xs font-bold uppercase tracking-[0.3em] hover:from-[#60a5fa] hover:via-[#22d3ee] hover:to-[#34d399] transition-all shadow-[0_18px_40px_rgba(59,130,246,0.3)]">
                      Authorize
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdminMode(false)}
                      className="w-full text-center text-[#94a3b8] text-[10px] font-mono uppercase tracking-widest hover:text-[#f8fafc]"
                    >
                      Abort Authentication
                    </button>
                  </form>
              </div>
            </div>
          )}
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