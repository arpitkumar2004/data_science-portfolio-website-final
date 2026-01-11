import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Database, Binary, FileSearch, Globe, Lock, ArrowRight, Fingerprint, Building, Building2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const RoleGateway = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole === 'Admin') {
      const token = sessionStorage.getItem('adminToken');
      if (token) {
        axios.get('http://localhost:8000/admin/validate', { params: { admin_token: token } })
          .then(() => setRole('Admin'))
          .catch(() => {
            localStorage.removeItem('userRole');
            sessionStorage.removeItem('adminToken');
            setRole(null);
          })
          .finally(() => setIsReady(true));
        return;
      } else {
        // token missing — clear saved admin role
        localStorage.removeItem('userRole');
      }
    }
    if (savedRole) setRole(savedRole);
    setIsReady(true);
  }, []);

  // allow external components to reopen the gateway
  useEffect(() => {
    const openHandler = () => {
      setRole(null);
      sessionStorage.removeItem('roleNotifShown');
      // focus the first role button for keyboard users
      setTimeout(() => {
        const btn = document.querySelector('[data-role-button]') as HTMLElement | null;
        if (btn) btn.focus();
      }, 50);
    };
    window.addEventListener('role:open', openHandler);
    return () => window.removeEventListener('role:open', openHandler);
  }, []);

  // toast helper
  const { showToast } = useToast();

  // show role notification once per session when role becomes available
  useEffect(() => {
    if (role && !sessionStorage.getItem('roleNotifShown')) {
      showToast(`You are viewing as ${role}`, 'info', 5000, 'top');
      sessionStorage.setItem('roleNotifShown', '1');
    }
  }, [role, showToast]);

  const handleSelect = (selectedRole: string) => {
    localStorage.setItem('userRole', selectedRole);

    // If changing away from Admin, revoke any existing admin token and session
    if (selectedRole.toLowerCase() !== 'admin') {
      sessionStorage.removeItem('adminToken');
      // also clear any admin-related session flags
      sessionStorage.removeItem('isAdmin');
    }

    setRole(selectedRole);
    sessionStorage.setItem('roleNotifShown', '1');
    showToast(`You are viewing as ${selectedRole}`, 'info', 5000, 'top');
    // notify other components (Header) to update badge
    window.dispatchEvent(new Event('role:updated'));
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('password', password);
      const res = await axios.post('http://localhost:8000/admin/login', form);
      if (res.data && res.data.is_admin) {
        sessionStorage.setItem('adminToken', res.data.admin_token);
        handleSelect('Admin');
        setIsAdminMode(false);
        showToast('Admin session established', 'success');
      } else {
        showToast('Verification Failed', 'error');
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        showToast('Verification Failed: Invalid Credentials', 'error');
      } else {
        showToast('Verification Failed: Server Error', 'error');
      }
    }
  };

  if (!isReady) return null;
  if (role) return <>{children}</>;

const roles = [
    { 
        id: 'Researcher', 
        icon: <FileSearch size={32} />, 
        title: 'Academic / Researcher', 
        desc: 'Analyzing research methodologies, thesis work, and technical publications.',
        tag: '01_RES'
    },
    { 
        id: 'Developer', 
        icon: <Binary size={32} />, 
        title: 'Software Engineer', 
        desc: 'Inspecting system architecture, GitHub repositories, and code implementation.',
        tag: '02_DEV'
    },
    { 
        id: 'Recruiter', 
        icon: <Building2 size={32} />, 
        title: 'Hiring Manager', 
        desc: 'Evaluating professional milestones, core competencies, and work history.',
        tag: '03_REC'
    },
    { 
        id: 'Other', 
        icon: <Globe size={32} />, 
        title: 'General Visitor', 
        desc: 'Exploring personal projects, creative blogs, and general background.',
        tag: '04_EXT'
    },
  ];
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-slate-900 overflow-hidden font-sans">
      
      {/* Technical Background: Dot Grid & Coordinate Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#2563eb 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}>
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute left-1/2 top-0 w-px h-full bg-blue-600"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-blue-600"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6">
        {!isAdminMode ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header Section */}
            <div className="mb-16 text-center">
              <div className="inline-block px-3 py-1 mb-4 border border-blue-200 bg-blue-50 text-blue-700 text-[10px] font-mono tracking-widest uppercase rounded">
                Access Protocol v2.0
              </div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900">
                Identify <span className="font-bold text-blue-600">User Context</span>
              </h1>
              <p className="mt-4 text-slate-500 font-mono text-sm uppercase tracking-tighter">
                Select your functional role to optimize data visualization
              </p>
            </div>

            {/* Role Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map((r, idx) => (
                <button
                  key={r.id}
                  onClick={() => handleSelect(r.id)}
                  data-role-button={idx === 0 ? 'true' : undefined}
                  aria-label={`Select role: ${r.title}`}
                  className="group relative flex flex-col items-start p-8 bg-white border border-slate-200 hover:border-blue-500 transition-all duration-300 text-left hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <span className="absolute top-4 right-4 font-mono text-[10px] text-slate-300 group-hover:text-blue-400 transition-colors">
                    {r.tag}
                  </span>
                  
                  <div className="p-3 mb-6 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 rounded-sm">
                    {r.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{r.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">{r.desc}</p>
                  
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    Initialize Session <ArrowRight size={12} />
                  </div>
                </button>
              ))}
            </div>

            {/* Admin Bypass */}
            <div className="mt-16 text-center">
              <button
                onClick={() => setIsAdminMode(true)}
                className="group flex items-center gap-3 mx-auto text-slate-400 hover:text-blue-600 transition-all font-mono text-xs uppercase tracking-[0.2em]"
              >
                <Lock size={14} className="group-hover:rotate-12 transition-transform" /> 
                Administrative Override
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
            <div className="bg-white border border-slate-200 p-10 shadow-2xl relative">
               {/* Decorative corner accents */}
               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-600"></div>
               <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-600"></div>
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-600"></div>
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-600"></div>

                <div className="flex justify-center mb-8">
                  <Fingerprint size={48} className="text-blue-600 animate-pulse" />
                </div>
                
                <h2 className="text-center font-bold text-2xl tracking-tight mb-2 uppercase">Root Access</h2>
                <p className="text-center text-slate-400 text-xs font-mono mb-8 uppercase tracking-widest">Identity verification required</p>

                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="ACCESS_TOKEN"
                      autoFocus
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 font-mono text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white font-mono text-xs font-bold uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl">
                    Authorize
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdminMode(false)}
                    className="w-full text-center text-slate-400 text-[10px] font-mono uppercase tracking-widest hover:text-slate-600"
                  >
                    Cancel Authentication
                  </button>
                </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer Meta Data */}
      <div className="absolute bottom-6 left-6 hidden lg:block">
        <p className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.5em]">
          Core Systems: Active | Data Streams: Encrypted
        </p>
      </div>
    </div>
  );
};

export default RoleGateway;