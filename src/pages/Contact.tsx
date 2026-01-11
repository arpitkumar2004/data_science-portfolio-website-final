import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../hooks/useToast';
import { 
  Mail, 
  MapPin, 
  User, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Terminal, 
  Linkedin,
  Github
} from 'lucide-react';
import { SiKaggle, SiMedium } from "react-icons/si";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const GoogleScholar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
  </svg>
);

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzoD1wzkI7pmnps0_kXvFCRoL4MKfK-Bx5z7eahO9dHLw5-qMwQrvbRv9aNOnFvGGk3/exec';

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

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
    formData.append('formType', 'contacts');
    formData.append('timestamp', new Date().toISOString());
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('message', data.message);

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Server returned an error');
      setSubmitStatus('success');
      showToast('Message sent — I will respond shortly', 'success');
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

  const brandBlue = "rgb(37 99 235)";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* Header Section */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <Terminal size={14} className="text-blue-600" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">Communication Terminal</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Let's build the <span className="text-blue-600">Future</span>.
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl font-medium leading-relaxed">
            I'm open to research collaborations, industrial AI projects, and quantitative analyst opportunities. Drop a message to start a technical discussion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Communication Channels */}
          <div className="lg:col-span-4 space-y-12">
            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Direct Channels</h3>
              <div className="space-y-6">
                <a href="mailto:kumararpit17773@gmail.com" className="group flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Email</p>
                    <p className="text-sm font-bold text-slate-700">kumararpit17773@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Location</p>
                    <p className="text-sm font-bold text-slate-700">Lucknow / IIT Kharagpur, India</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Professional Network</h3>
              <div className="flex gap-4 flex-wrap">
                <a href="#" aria-label="LinkedIn" className="p-4 rounded-xl border border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" aria-label="GitHub" className="p-4 rounded-xl border border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all">
                  <Github size={20} />
                </a>
                <a href="#" aria-label="Medium" className="p-4 rounded-xl border border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all">
                  <SiMedium size={20} />
                </a>
                <a href="#" aria-label="Kaggle" className="p-4 rounded-xl border border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all">
                  <SiKaggle size={20} />
                </a>
                <a href="#" aria-label="Google Scholar" className="p-4 rounded-xl border border-slate-100 hover:border-blue-600 hover:text-blue-600 transition-all">
                  <GoogleScholar  />
                </a>
              </div>
            </section>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 lg:p-12"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        {...register('name', { required: 'Identity is required' })}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all font-medium"
                        placeholder="e.g. Dr. John Doe"
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid domain format' }
                        })}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all font-medium"
                        placeholder="john@research.org"
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Inquiry Subject</label>
                  <select 
                    {...register('subject')}
                    className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all font-medium appearance-none"
                  >
                    <option>Research Collaboration</option>
                    <option>Hiring / Recruitment</option>
                    <option>Project Consultation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Technical Brief / Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-5 text-slate-400" size={18} />
                    <textarea
                      rows={5}
                      {...register('message', { required: 'Briefing content required' })}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all font-medium resize-none"
                      placeholder="Describe the research objective or project scope..."
                    ></textarea>
                  </div>
                  {errors.message && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: isSubmitting ? '#cbd5e1' : brandBlue }}
                  className="w-full flex items-center justify-center gap-3 text-white font-bold py-5 px-8 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-200"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span className="uppercase tracking-widest text-sm">Initiate Submission</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-xl border border-green-100"
                  >
                    <CheckCircle size={20} />
                    <p className="text-sm font-bold font-mono uppercase tracking-tight">Transmission Successful. I will respond shortly.</p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div 
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 flex flex-col items-start gap-3 text-red-700 bg-red-50 p-4 rounded-xl border border-red-100"
                  >
                    <div className="w-full flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <AlertCircle size={20} />
                        <p className="text-sm font-bold font-mono uppercase tracking-tight">Transmission Failed</p>
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;