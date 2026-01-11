import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../hooks/useToast';
import { 
  Download, Send, User, Mail, Building, MessageSquare, 
  CheckCircle, AlertCircle, FileText, Terminal, 
  ShieldCheck, Activity, Cpu, Microscope, Award, Binary,
  Database, Star, Code2, GraduationCap
} from 'lucide-react';

// --- DATA IMPORTS FOR REAL-TIME CALCULATION ---
import { projects } from '../data/projectsData';
import { techData } from '../data/skillsData'; // Assuming this is where techData is
import { achievementData } from '../data/AchievementData'; // Assuming this is where achievements are

type FormData = {
  name: string;
  email: string;
  company: string;
  reason: string;
};

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzoD1wzkI7pmnps0_kXvFCRoL4MKfK-Bx5z7eahO9dHLw5-qMwQrvbRv9aNOnFvGGk3/exec';

const RequestCV: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const { showToast } = useToast();
  
  const resumeUrl = '/Arpit_Kumar_Resume.pdf';
  const brandBlue = "rgb(37 99 235)";
  const errorRef = useRef<HTMLDivElement | null>(null);
  const lastFormRef = useRef<FormData | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  // --- REAL-TIME ANALYTICS CALCULATION ---
  const careerStats = useMemo(() => {
    const totalProjects = projects.length;
    const researchPapers = projects.filter(p => p.type?.toLowerCase().includes('paper') || p.type?.toLowerCase().includes('research')).length;
    const technicalSkills = techData.reduce((acc, curr) => acc + curr.tools.length, 0);
    const totalHonors = achievementData.reduce((acc, curr) => acc + curr.items.length, 0);
    const deployedSystems = projects.filter(p => p.tags?.some(t => t.toLowerCase().includes('live') || t.toLowerCase().includes('deployed'))).length;

    return {
      totalProjects,
      researchPapers,
      technicalSkills,
      totalHonors,
      deployedSystems,
      academicStatus: "IIT Kharagpur (Dual Degree)"
    };
  }, []);

  useEffect(() => {
    if (submitStatus === 'error' && errorRef.current) {
      errorRef.current.focus();
    }
  }, [submitStatus]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitErrorMessage(null);
    lastFormRef.current = data;
    
    const formData = new FormData();
    formData.append('formType', 'CV_Request');
    formData.append('timestamp', new Date().toISOString());
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('organisation', data.company);
    formData.append('message', data.reason);

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Server returned an error');
      setSubmitStatus('success');
      showToast('Request logged — credentials will be transmitted shortly', 'success');
      reset();
    } catch (error: any) {
      const message = error?.message || 'Network error';
      setSubmitStatus('error');
      setSubmitErrorMessage(message);
      showToast(`Transmission failed: ${message}`, 'error');
    }
    setIsSubmitting(false);
  };

  const retrySubmit = async () => {
    if (lastFormRef.current) await onSubmit(lastFormRef.current);
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="pt-12 pb-12 px-6 md:px-12 lg:px-20 border-b border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-40">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-blue-600" size={15} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-blue-600">Credential Access</span>
            </div>
            <h1 className="text-5xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Dossier
            </h1>
          </div>
          
          {/* HIRING SNAPSHOT DASHBOARD (Recruiter's First Look) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full md:w-auto">
            {[
              { label: "Systems Built", val: careerStats.totalProjects, icon: <Cpu size={14}/> },
              { label: "Research Papers", val: careerStats.researchPapers, icon: <Microscope size={14}/> },
              { label: "Technical Honors", val: careerStats.totalHonors, icon: <Award size={14}/> },
              { label: "Tech Stack Depth", val: `${careerStats.technicalSkills}+`, icon: <Code2 size={14}/> },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm min-w-[140px]">
                <div className="text-blue-600 mb-2">{stat.icon}</div>
                <div className="text-2xl font-black text-slate-900 tracking-tighter">{stat.val}</div>
                <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: DIRECT DOWNLOAD & VALIDATION --- */}
          <div className="lg:col-span-5 space-y-12">
            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Direct Access</h3>
              <div className="p-8 lg:p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Terminal size={140} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6 px-3 py-1 bg-white/10 border border-white/10 rounded-full w-fit">
                    <ShieldCheck size={14} className="text-blue-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Verified Researcher</span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter mb-6 leading-tight text-white">Ready for Technical Review?</h2>
                  <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                    Evaluated against industrial standards in Machine Learning, Quantitative Finance, and System Optimization. 
                  </p>

                  <a
                    href={resumeUrl}
                    download="Arpit_Kumar_Resume.pdf"
                    style={{ backgroundColor: brandBlue }}
                    className="flex items-center justify-between px-8 py-5 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-900/30 hover:brightness-110 group"
                  >
                    <span className="uppercase tracking-widest text-xs">Download Research CV</span>
                    <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </section>

          </div>

          {/* --- RIGHT: FORMAL REQUEST (THE RECRUITER CHANNEL) --- */}
          <div className="lg:col-span-7">
            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Professional Inquiry</h3>
              <div className="bg-white border border-slate-200 rounded-[3rem] p-8 lg:p-12 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Identity</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input
                          type="text"
                          {...register('name', { required: 'Identity required' })}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-sm"
                          placeholder="Lead Recruiter / PI"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Communication Log</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input
                          type="email"
                          {...register('email', { required: 'Required', pattern: /^\S+@\S+$/i })}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-sm"
                          placeholder="official@company.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Organization</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input
                        type="text"
                        {...register('company', { required: 'Organization required' })}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-sm"
                        placeholder="Company / Institution Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Engagement Brief</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 text-slate-300" size={18} />
                      <textarea
                        rows={4}
                        {...register('reason', { required: 'Please specify purpose' })}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-sm resize-none"
                        placeholder="Describe the opportunity or collaboration scope..."
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-between px-8 py-5 bg-slate-900 text-white font-bold rounded-2xl transition-all shadow-xl shadow-slate-200 hover:bg-slate-800 disabled:bg-slate-300 group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                         <span className="uppercase tracking-widest text-xs">Transmitting Request...</span>
                      </div>
                    ) : (
                      <>
                        <span className="uppercase tracking-widest text-xs">Initiate Formal Log</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* --- STATUS MESSAGES --- */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-xl border border-green-100">
                      <CheckCircle size={20} />
                      <p className="text-xs font-bold font-mono uppercase">Log Entry Successful. Connection established.</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div ref={errorRef} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3 text-red-700">
                            <AlertCircle size={20} />
                            <p className="text-xs font-bold font-mono uppercase">Transmission Failed</p>
                         </div>
                         <button onClick={retrySubmit} className="text-[10px] font-black uppercase text-red-600 hover:underline">Retry System</button>
                      </div>
                      <p className="text-[10px] text-red-500 mt-2 ml-8 italic">{submitErrorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RequestCV;