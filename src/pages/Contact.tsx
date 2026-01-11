import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../hooks/useToast';
import { 
  Mail, MapPin, User, MessageSquare, Send, CheckCircle, 
  AlertCircle, Terminal, Linkedin, Github, ShieldCheck, 
  Lock, Eye, Trash2, Filter, Clock, Search, Briefcase, Microscope,
  Award, Code2, GraduationCap, ChevronRight,  Database, ExternalLink, Link as LinkIcon
} from 'lucide-react';
import { SiKaggle, SiMedium } from "react-icons/si";
import axios from 'axios'; // Ensure axios is installed
import { Link } from 'react-router-dom';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Types for the Admin Dashboard
type Lead = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  flagged?: boolean;
};

const Contact: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('userRole'));
  const [isAdminAuth, setIsAdminAuth] = useState(sessionStorage.getItem('isAdmin') === 'true');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // Admin UI helpers
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const brandBlue = "rgb(37 99 235)";
  // Admin verification is handled server-side now. Tokens are stored in sessionStorage under 'adminToken'

  // --- ADMIN LOGIC: FETCH LEADS ---
  useEffect(() => {
    if (isAdminAuth) {
      fetchLeads();
    }
  }, [isAdminAuth]);

  // On mount, validate any existing token in sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      axios.get('http://localhost:8000/admin/validate', { params: { admin_token: token } })
        .then(() => setIsAdminAuth(true))
        .catch(() => {
          sessionStorage.removeItem('adminToken');
          setIsAdminAuth(false);
        });
    }
  }, []);

  // Listen for role changes from RoleGateway and react accordingly
  useEffect(() => {
    const onRoleUpdated = () => {
      const updatedRole = localStorage.getItem('userRole');
      setUserRole(updatedRole);
      if (!updatedRole || updatedRole.toLowerCase() !== 'admin') {
        // Clear any admin session if we switched away from admin
        setIsAdminAuth(false);
        sessionStorage.removeItem('adminToken');
        setLeads([]);
      } else {
        const token = sessionStorage.getItem('adminToken');
        if (token) {
          axios.get('http://localhost:8000/admin/validate', { params: { admin_token: token } })
            .then(() => { setIsAdminAuth(true); fetchLeads(); })
            .catch(() => { sessionStorage.removeItem('adminToken'); setIsAdminAuth(false); setLeads([]); });
        }
      }
    };

    window.addEventListener('role:updated', onRoleUpdated);
    return () => window.removeEventListener('role:updated', onRoleUpdated);
  }, []);

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const adminToken = sessionStorage.getItem('adminToken');
      const res = await axios.get(`http://localhost:8000/admin/leads`, { params: { admin_token: adminToken }});
      // Ensure flagged is a boolean even if schema was missing previously
      setLeads(res.data.map((l: any) => ({ ...l, flagged: !!l.flagged })));
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        showToast("Access Denied: Invalid Admin Token", "error");
        setIsAdminAuth(false);
        sessionStorage.removeItem('adminToken');
      } else {
        showToast("Failed to sync lead database", "error");
      }
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const handleRoleSelection = (role: string) => {
    if (role === 'admin') {
      // Stay on modal to ask for password
      setUserRole('admin');
    } else {
      setUserRole(role);
      localStorage.setItem('userRole', role);
    }
  };

  const handleAdminLogin = async () => {
    try {
      const form = new FormData();
      form.append('password', password);
      const res = await axios.post('http://localhost:8000/admin/login', form);
      if (res.data && res.data.is_admin) {
        sessionStorage.setItem('adminToken', res.data.admin_token);
        setIsAdminAuth(true);
        localStorage.setItem('userRole', 'admin');
        showToast("Encrypted Session Established", "success");
      } else {
        showToast("Access Denied: Invalid Credentials", "error");
      }
    } catch (err) {
      showToast("Access Denied: Invalid Credentials", "error");
    }
  };

  // --- ADMIN ACTIONS: delete, flag, search, filter, stats ---
  const deleteLead = async (leadId: number) => {
    const token = sessionStorage.getItem('adminToken');
    if (!confirm('Permanently delete this lead?')) return;
    try {
      await axios.delete(`http://localhost:8000/admin/leads/${leadId}`, { params: { admin_token: token } });
      setLeads(prev => prev.filter(l => l.id !== leadId));
      showToast('Lead deleted', 'success');
    } catch (err) {
      showToast('Failed to delete lead', 'error');
    }
  };

  const flagLead = async (leadId: number) => {
    const token = sessionStorage.getItem('adminToken');
    try {
      const res = await axios.post(`http://localhost:8000/admin/leads/${leadId}/flag`, null, { params: { admin_token: token } });
      // Update local state
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, flagged: true } : l));
      showToast('Lead flagged', 'success');
    } catch (err) {
      showToast('Failed to flag lead', 'error');
    }
  };

  const unflagLead = async (leadId: number) => {
    const token = sessionStorage.getItem('adminToken');
    try {
      const res = await axios.post(`http://localhost:8000/admin/leads/${leadId}/unflag`, null, { params: { admin_token: token } });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, flagged: false } : l));
      showToast('Lead unflagged', 'success');
    } catch (err) {
      showToast('Failed to unflag lead', 'error');
    }
  };

  const searchLeads = async () => {
    const token = sessionStorage.getItem('adminToken');
    if (!searchQuery) { fetchLeads(); return; }
    setIsLoadingLeads(true);
    try {
      const res = await axios.get('http://localhost:8000/admin/leads/search', { params: { query: searchQuery, admin_token: token } });
      setLeads(res.data.map((l: any) => ({ ...l, flagged: !!l.flagged })));
    } catch (err) {
      showToast('Search failed', 'error');
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const filterLeads = async () => {
    const token = sessionStorage.getItem('adminToken');
    if (!filterStart || !filterEnd) {
      showToast('Please select both start and end dates', 'error');
      return;
    }
    setIsLoadingLeads(true);
    try {
      const res = await axios.get('http://localhost:8000/admin/leads/filter', { params: { start_date: filterStart, end_date: filterEnd, admin_token: token } });
      setLeads(res.data.map((l: any) => ({ ...l, flagged: !!l.flagged })));
    } catch (err) {
      showToast('Filter failed', 'error');
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const fetchStats = async () => {
    const token = sessionStorage.getItem('adminToken');
    setIsLoadingStats(true);
    try {
      const res = await axios.get('http://localhost:8000/admin/leads/stats', { params: { admin_token: token } });
      setStats(res.data);
    } catch (err) {
      showToast('Failed to fetch stats', 'error');
    } finally {
      setIsLoadingStats(false);
    }
  };

  // const migrateSchema = async () => {
  //   const token = sessionStorage.getItem('adminToken');
  //   try {
  //     const res = await axios.post('http://localhost:8000/admin/migrate-schema', null, { params: { admin_token: token } });
  //     if (res.data && res.data.applied && res.data.applied.length) {
  //       showToast(`Applied migrations: ${res.data.applied.join(',')}`, 'success');
  //     } else {
  //       showToast('No migrations needed', 'info');
  //     }
  //     fetchLeads();
  //   } catch (err) {
  //     showToast('Migration failed', 'error');
  //   }
  // };

  const openCase = (lead: Lead) => {
    // Simple case view: show toast and log to console. Could be modal in future.
    showToast(`${lead.name}: ${lead.message.slice(0, 150)}`, 'info', 8000);
    console.log('Open Case:', lead);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('formType', 'contacts');
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('subject', data.subject);
      formData.append('message', data.message);

      await fetch("http://localhost:8000/submit-contact", { method: "POST", body: formData });
      setSubmitStatus('success');
      showToast('Transmission Successful', 'success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SUB-COMPONENT: ROLE SELECTOR ---
  if (!userRole || (userRole?.toLowerCase() === 'admin' && !isAdminAuth)) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-6 font-sans">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <Terminal className="text-blue-500 mb-6" size={32} />
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">Identify System Role</h2>
          <p className="text-slate-400 text-sm mb-8 font-mono">Select your access level to proceed to the technical dossier.</p>
          
          {!userRole ? (
            <div className="grid gap-3">
              {['Researcher', 'Recruiter', 'General', 'Admin'].map((role) => (
                <button 
                  key={role} 
                  onClick={() => handleRoleSelection(role.toLowerCase())}
                  className="w-full py-4 px-6 rounded-2xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-blue-600 hover:border-blue-500 transition-all flex items-center justify-between group"
                >
                  {role}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  placeholder="Enter Admin Access Key"
                  className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white focus:border-blue-500 outline-none transition-all font-mono text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={handleAdminLogin} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-900/20">Authenticate Session</button>
              <button onClick={() => setUserRole(null)} className="w-full text-slate-500 text-xs font-mono uppercase tracking-widest hover:text-white transition-colors">Back to Roles</button>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* --- HEADER --- */}
        <header className="mb-16">
          <div className="flex justify-between items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Terminal size={14} className="text-blue-600" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700 underline decoration-blue-600/30">
                Authorized as: {userRole.toUpperCase()}
              </span>
            </motion.div>
            {isAdminAuth && (
                <button onClick={async () => { const token = sessionStorage.getItem('adminToken'); try { await axios.post('http://localhost:8000/admin/logout', null, { params: { admin_token: token } }); } catch (e) {} finally { sessionStorage.clear(); window.location.reload(); } }} className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest border border-red-100 px-3 py-1 rounded-full hover:bg-red-50 transition-all">Terminate Admin Session</button>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Let's build the <span className="text-blue-600">Future</span>.
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* --- LEFT: CHANNELS --- */}
          <div className="lg:col-span-4 space-y-12">
            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Secure Nodes</h3>
              <div className="space-y-6">
                <a href="mailto:kumararpit17773@gmail.com" className="group flex items-start gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><Mail size={20} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Email</p>
                    <p className="text-sm font-bold">kumararpit17773@gmail.com</p>
                  </div>
                </a>

                <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="group flex items-start gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all"><MapPin size={20} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Location</p>
                    <p className="text-sm font-bold">Based in India (Remote available)</p>
                  </div>
                </a>

              </div>
            </section>

            <section>
               <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Ecosystem</h3>
               <div className="flex flex-wrap gap-3">
                  <Link to="/" className="p-4 rounded-2xl bg-slate-900 text-white hover:bg-blue-600 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-200">
                    <Terminal size={14} /> Main Terminal
                  </Link>

                  <Link to="/request-cv" className="p-4 rounded-2xl bg-white text-slate-900 border border-slate-200 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <ExternalLink size={14} /> Request CV
                  </Link>

                  <a href="https://www.linkedin.com/in/arpitkumar2004" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-white text-slate-900 border border-slate-200 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Linkedin size={14} /> LinkedIn
                  </a>

                  <a href="https://github.com/arpitkumar2004" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-white text-slate-900 border border-slate-200 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Github size={14} /> GitHub
                  </a>

                  <a href="https://www.kaggle.com/arpitkumar2004" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-white text-slate-900 border border-slate-200 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <SiKaggle size={14} /> Kaggle
                  </a>

               </div>
            </section>
          </div>

          {/* --- RIGHT: FORM --- */}
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 lg:p-12 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Identity</label>
                    <input {...register('name', { required: true })} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium" placeholder="Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Work Email</label>
                    <input {...register('email', { required: true })} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium" placeholder="Email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Subject</label>
                  <select {...register('subject')} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium appearance-none">
                    <option>Research Collaboration</option>
                    <option>Hiring / Recruitment</option>
                    <option>Project Consultation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Message Brief</label>
                  <textarea rows={5} {...register('message', { required: true })} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium resize-none" placeholder="Details..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-5 px-8 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                  {isSubmitting ? "TRANSMITTING..." : <><span className="uppercase tracking-[0.2em] text-xs">Initiate Submission</span><Send size={18}/></>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* --- ADMIN ONLY SECTION: THE LEAD VAULT --- */}
        <AnimatePresence>
          {isAdminAuth && (
            <motion.section initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="mt-32 border-t-2 border-slate-100 pt-24">
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck className="text-blue-600" size={24} />
                        <h2 className="text-4xl font-black tracking-tighter">Inquiry Database</h2>
                    </div>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Confidential Log // Accessing Lead Repository</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <button onClick={fetchLeads} className="p-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white transition-all"><Clock size={20}/></button>
                    <button onClick={fetchStats} className="p-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white transition-all">Stats</button>
                    {/* <button onClick={migrateSchema} className="p-3 rounded-xl bg-amber-50 hover:bg-amber-600 hover:text-white transition-all">Migrate</button> */}
                 </div>
              </div>

              {/* Controls: Search & Filter */}
              <div className="mb-6 flex flex-col md:flex-row gap-3 items-center">
                <div className="flex-1 flex gap-2">
                  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search messages" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl" />
                  <button onClick={searchLeads} className="px-4 py-3 bg-blue-600 text-white rounded-2xl">Search</button>
                </div>

                <div className="flex gap-2 items-center">
                  <input type="date" value={filterStart} onChange={(e) => setFilterStart(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-2xl" />
                  <input type="date" value={filterEnd} onChange={(e) => setFilterEnd(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-2xl" />
                  <button onClick={filterLeads} className="px-4 py-3 bg-slate-900 text-white rounded-2xl">Filter</button>
                </div>

                <div className="hidden md:flex items-center gap-4 ml-4 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-xs font-mono text-slate-500">Total</div>
                  <div className="font-black text-lg">{stats?.total_leads ?? '—'}</div>
                  <div className="text-xs font-mono text-slate-500">Flagged</div>
                  <div className="font-black text-lg">{stats?.total_flagged_leads ?? '—'}</div>
                </div>
              </div>

              {isLoadingLeads ? (
                <div className="h-64 flex items-center justify-center font-mono text-slate-400 animate-pulse uppercase tracking-[0.5em]">Syncing_Database...</div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 lg:p-8 hover:border-blue-600 transition-all group">
                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-bold">{lead.name.charAt(0)}</div>
                             <div>
                                <h4 className="font-black text-slate-900">{lead.name}</h4>
                                <p className="text-xs text-slate-500 font-mono">{lead.email}</p>
                             </div>
                          </div>
                          <div className="flex gap-2 items-center">
                             <span className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase border ${lead.subject === 'Hiring / Recruitment' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                {lead.subject}
                             </span>
                             <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase bg-white border border-slate-200 text-slate-400">
                                {new Date(lead.timestamp).toLocaleDateString()}
                             </span>
                             {lead.flagged && (
                               <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase bg-amber-50 text-amber-600 border border-amber-100">FLAGGED</span>
                             )}
                          </div>
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 italic">"{lead.message}"</p>
                       <div className="mt-6 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openCase(lead)} className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-blue-600 hover:underline"><Eye size={14}/> Open Case</button>
                          {lead.flagged ? (
                            <button onClick={() => unflagLead(lead.id)} className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-amber-600 hover:underline"><ShieldCheck size={14}/> Unflag</button>
                          ) : (
                            <button onClick={() => flagLead(lead.id)} className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-amber-600 hover:underline"><Award size={14}/> Flag</button>
                          )}
                          <button onClick={() => deleteLead(lead.id)} className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-red-500 hover:underline"><Trash2 size={14}/> Purge</button>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Contact;