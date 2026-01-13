import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useToast } from '../hooks/useToast';
import {
  Mail, MapPin, User, MessageSquare, Send, Terminal,
  Linkedin, Github, ExternalLink
} from 'lucide-react';
import { SiKaggle } from "react-icons/si";
import { Link } from 'react-router-dom';

// Use VITE_API_URL if it exists, otherwise fall back to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('userRole'));

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for role changes from RoleGateway
  useEffect(() => {
    const onRoleUpdated = () => {
      const updatedRole = localStorage.getItem('userRole');
      setUserRole(updatedRole);
    };

    window.addEventListener('role:updated', onRoleUpdated);
    return () => window.removeEventListener('role:updated', onRoleUpdated);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('formType', 'contacts');
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('subject', data.subject);
      formData.append('message', data.message);

      await fetch(`${API_BASE_URL}/submit-contact`, { method: "POST", body: formData });
      showToast('Transmission Successful', 'success');
      reset();
    } catch (error) {
      showToast('Transmission Failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* --- HEADER --- */}
        <header className="mb-16">
          <div className="flex justify-between items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Terminal size={14} className="text-blue-600" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700 underline decoration-blue-600/30">
                Authorized as: {userRole?.toUpperCase() || 'GUEST'}
              </span>
            </motion.div>
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
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input {...register('name', { required: 'Name is required' })} className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium" placeholder="Name" />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs font-mono">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium" placeholder="Email" />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs font-mono">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Subject</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select {...register('subject')} className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium appearance-none">
                      <option>Research Collaboration</option>
                      <option>Hiring / Recruitment</option>
                      <option>Project Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-500 ml-1">Message Brief</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                    <textarea rows={5} {...register('message', { required: 'Message is required' })} className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium resize-none" placeholder="Details..."></textarea>
                  </div>
                  {errors.message && <p className="text-red-500 text-xs font-mono">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-5 px-8 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                  {isSubmitting ? "TRANSMITTING..." : <><span className="uppercase tracking-[0.2em] text-xs">Initiate Submission</span><Send size={18}/></>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;