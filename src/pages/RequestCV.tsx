import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../hooks/useToast';
import { 
  Download, 
  Send, 
  User, 
  Mail, 
  Building, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Terminal,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

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

  const resumeUrl = '/Arpit_Kumar_Resume.pdf';
  const brandBlue = "rgb(37 99 235)";

  const { showToast } = useToast();
  const lastFormRef = useRef<FormData | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

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
    formData.append('formType', 'cvRequest');
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('company', data.company);
    formData.append('reason', data.reason);

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Server returned an error');
      setSubmitStatus('success');
      showToast('Request logged — I will transmit the credentials shortly', 'success');
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
    if (lastFormRef.current) {
      await onSubmit(lastFormRef.current);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 overflow-x-hidden">
      {/* --- HUGE DISPLAY HEADER --- */}
      <header className="pt-12 pb-12 px-6 md:px-10 lg:px-16 border-b border-slate-100">
      <div className="flex flex-col lg:flex-row justify-center gap-10">
        
        <div className="max-w-4xl">
          <h1 className="text-[11vw] lg:text-[4rem] font-extrabold text-slate-900 leading-[0.85] tracking-[-0.04em]">
            Technical Dossier
          </h1>
        </div>

        {/* <div className="max-w-xs mb-3">
          <div className="flex items-center gap-2 mb-3 px-3 py-1 bg-green-50 border border-green-100 rounded-full w-fit">
            <ShieldCheck size={13} className="text-green-600" />
            <span className="text-[9px] font-mono font-semibold text-green-700 uppercase tracking-wider">
              Verified IIT KGP Candidate
            </span>
          </div>

          <p className="text-slate-400 font-mono text-[11px] uppercase leading-relaxed tracking-wide">
            // Direct access to technical background, research publications, and professional trajectory.
          </p>
        </div> */}

      </div>
    </header>


      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: DIRECT DOWNLOAD (THE PRIMARY ACTION) --- */}
          <div className="lg:col-span-5 space-y-12">
            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Direct Download</h3>
              <div className="p-8 lg:p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
                 {/* Visual Background Decoration */}
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  <Terminal size={120} />
                </div>
                <h2 className="text-3xl font-black tracking-tighter mb-6">Ready for immediate review?</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                  The quickest way to evaluate my background for Machine Learning or Quantitative Analyst roles.
                </p>

                <a
                  href={resumeUrl}
                  download="Arpit_Kumar_Resume.pdf"
                  style={{ backgroundColor: brandBlue }}
                  className="flex items-center justify-between px-8 py-5 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-900/30 hover:brightness-110 group"
                >
                  <span className="uppercase tracking-widest text-xs">Download PDF</span>
                  <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </section>

            {/* Quick Stats Block */}
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 border border-slate-100 rounded-3xl bg-blue-500">
                <p className="text-3xl font-black text-white tracking-tighter">3+</p>
                <p className="text-[10px] font-mono font-bold text-white uppercase mt-1">Years of Experience</p>
              </div>
              <div className="p-6 border border-slate-100 rounded-3xl bg-blue-400">
                <p className="text-3xl font-black text-white tracking-tighter">10+</p>
                <p className="text-[10px] font-mono font-bold text-white uppercase mt-1">Completed Projects and Competitions</p>
              </div>
              <div className="p-6 border border-slate-100 rounded-3xl bg-slate-50">
                <p className="text-2xl font-black text-blue-600 tracking-tighter">2+</p>
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase mt-1">Ongoing Projects</p>
              </div>
              
            </div>
          </div>

          {/* --- RIGHT: FORMAL REQUEST (THE RECRUITER CHANNEL) --- */}
          <div className="lg:col-span-7">
            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Professional Inquiry</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 lg:p-12 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-sm"
                          placeholder="Dr. John Smith"
                        />
                      </div>
                      {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Work Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input
                          type="email"
                          {...register('email', { required: 'Required', pattern: /^\S+@\S+$/i })}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-sm"
                          placeholder="smith@corporate.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Organization / Department</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input
                        type="text"
                        {...register('company', { required: 'Required' })}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-sm"
                        placeholder="Organization Name"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Inquiry Purpose</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 text-slate-300" size={18} />
                      <textarea
                        rows={4}
                        {...register('reason', { required: 'Required' })}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-sm resize-none"
                        placeholder="Describe the opportunity or collaboration scope..."
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl shadow-slate-200 disabled:bg-slate-300 hover:bg-slate-800"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span className="uppercase tracking-widest text-xs">Initiate Log Request</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-xl border border-green-100">
                      <CheckCircle size={20} />
                      <p className="text-xs font-bold font-mono uppercase">Request Logged. I will transmit the credentials shortly.</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div ref={errorRef} tabIndex={-1} role="alert" aria-live="assertive" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col items-start gap-3 text-red-700 bg-red-50 p-4 rounded-xl border border-red-100">
                      <div className="w-full flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <AlertCircle size={20} />
                          <p className="text-xs font-bold font-mono uppercase">Transmission Failed</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={retrySubmit} className="px-3 py-1 bg-red-600 text-white rounded-md text-xs font-bold">Retry</button>
                          <a href="mailto:kumararpit17773@gmail.com" className="px-3 py-1 border border-red-200 rounded-md text-xs font-bold">Use Email</a>
                        </div>
                      </div>
                      {submitErrorMessage && <p className="text-xs text-red-700/90 mt-1">{submitErrorMessage}</p>}
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