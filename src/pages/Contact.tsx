import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import {
  Mail,
  MapPin,
  User,
  MessageSquare,
  Send,
  Terminal,
  Linkedin,
  Github,
  ExternalLink,
  Loader2,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { SiKaggle } from "react-icons/si";
import { Link } from "react-router-dom";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem("userRole")
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWakeUpNotice, setShowWakeUpNotice] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      subject: "Project Consultation",
    },
  });

  // 1. Listen for Role Updates
  useEffect(() => {
    const onRoleUpdated = () => {
      setUserRole(localStorage.getItem("userRole"));
    };
    window.addEventListener("role:updated", onRoleUpdated);
    return () => window.removeEventListener("role:updated", onRoleUpdated);
  }, []);

  // 2. Cold-Start Logic: Show notice if request takes > 8 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitting) {
      timer = setTimeout(() => setShowWakeUpNotice(true), 8000);
    } else {
      setShowWakeUpNotice(false);
    }
    return () => clearTimeout(timer);
  }, [isSubmitting]);

  // 3. Submission Handler (Updated for JSON Backend)
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // We must use the FormData API to match your backend's Form(...) requirements
      const bodyFormData = new FormData();
      bodyFormData.append("name", data.name);
      bodyFormData.append("email", data.email);
      bodyFormData.append("subject", data.subject);
      bodyFormData.append("message", data.message);
      bodyFormData.append("formType", "contacts");

      const response = await fetch(`${API_BASE_URL}/submit-contact`, {
        method: "POST",
        // IMPORTANT: Do NOT set Content-Type header when sending FormData,
        // the browser will set it automatically with the correct "boundary".
        body: bodyFormData,
      });

      if (!response.ok) throw new Error();

      showToast("Thankyou for reaching out!\nYour message has been sent, Arpit will get back to you soon", "success");
      reset();
    } catch (error) {
      showToast("Transmission Failed, Please Try Again", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-18">
        {/* --- HEADER --- */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 mb-6 shadow-xl"
          >
            <ShieldCheck size={12} className="text-white" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300">
              System Access: {userRole?.toUpperCase() || "GUEST"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]"
          >
            Let's build the
            <span className="text-blue-600 italic tracking-widest ml-4">
              Next Big Thing.
            </span>
          </motion.h1>
          <p className="text-slate-500 max-w-2xl text-lg font-medium leading-relaxed">
            Have a question or a proposal? Drop a message in the secure terminal
            below.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* --- LEFT: CHANNELS & ECOSYSTEM --- */}
          <div className="lg:col-span-4 space-y-12">
            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <div className="w-8 h-px bg-slate-200" /> Secure Nodes
              </h3>
              <div className="space-y-4">
                <ContactLink
                  href="mailto:kumararpit17773@gmail.com"
                  icon={<Mail size={20} />}
                  label="Primary Email"
                  value="kumararpit17773@gmail.com"
                  color="blue"
                />
                <ContactLink
                  href="https://www.google.com/maps"
                  icon={<MapPin size={20} />}
                  label="Location"
                  value="Based in India (Remote)"
                  color="amber"
                />
              </div>
            </section>

            <section>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <div className="w-8 h-px bg-slate-200" /> Ecosystem
              </h3>
              <div className="flex flex-wrap gap-2">
                <EcosystemLink
                  to="/"
                  icon={<Terminal size={14} />}
                  label="Home"
                  dark
                />
                <EcosystemLink
                  to="/request-cv"
                  icon={<ExternalLink size={14} />}
                  label="Request CV"
                />
                <EcosystemLink
                  href="https://www.linkedin.com/in/arpitkumar2004"
                  icon={<Linkedin size={14} />}
                  label="LinkedIn"
                />
                <EcosystemLink
                  href="https://github.com/arpitkumar2004"
                  icon={<Github size={14} />}
                  label="GitHub"
                />
                <EcosystemLink
                  href="https://www.kaggle.com/arpitkumar2004"
                  icon={<SiKaggle size={14} />}
                  label="Kaggle"
                />
              </div>
            </section>
          </div>

          {/* --- RIGHT: THE SECURE FORM --- */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-50 border border-slate-200/60 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden"
            >
              {/* Cold Start Notice */}
              <AnimatePresence>
                {showWakeUpNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-8 p-4 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-200 flex items-start gap-4"
                  >
                    <div className="p-2 bg-white/20 rounded-lg animate-pulse">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">
                        Cold Start in Progress
                      </p>
                      <p className="text-xs opacity-90 leading-relaxed">
                        The server is currently waking up from its eco-sleep.
                        This first request might take about 45s. Thanks for your
                        patience!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Identity"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    icon={<User size={18} />}
                    registration={register("name", {
                      required: "Identity is required",
                    })}
                  />
                  <FormInput
                    label="Work Email"
                    placeholder="john@company.com"
                    error={errors.email?.message}
                    icon={<Mail size={18} />}
                    registration={register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 ml-1">
                    Context
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <select
                      {...register("subject")}
                      className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                    >
                      <option>Research Collaboration</option>
                      <option>Hiring / Recruitment</option>
                      <option>Project Consultation</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 ml-1">
                    Brief
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-4 top-4 text-slate-400"
                      size={18}
                    />
                    <textarea
                      rows={5}
                      {...register("message", {
                        required: "Message body cannot be empty",
                      })}
                      className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-medium resize-none"
                      placeholder="What's on your mind?"
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-[10px] font-mono mt-1 ml-1 uppercase">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="pt-4 relative">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 px-8 rounded-2xl font-black transition-all flex items-center justify-center gap-3 relative overflow-hidden group
                      ${
                        isSubmitting
                          ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-slate-900 active:scale-[0.98] shadow-2xl shadow-blue-200"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span className="uppercase tracking-[0.2em] text-xs">
                          {showWakeUpNotice
                            ? "Still Transmitting..."
                            : "Encrypting & Sending..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="uppercase tracking-[0.2em] text-xs">
                          Send Message 
                        </span>
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>

                  {/* Submission Progress Simulation */}
                  {isSubmitting && (
                    <motion.div
                      className="absolute -bottom-2 left-6 right-6 h-0.5 bg-slate-200 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "98%" }}
                        transition={{ duration: 55, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </div>

                {isSubmitting && (
                  <p className="text-center text-[9px] text-slate-400 font-mono uppercase tracking-[0.3em] mt-6">
                    Connection Established • Do not interrupt
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS FOR CLEANER CODE ---

const ContactLink = ({ href, icon, label, value, color }: any) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group flex items-start gap-4 p-5 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all"
  >
    <div
      className={`p-3 rounded-xl transition-all ${
        color === "blue"
          ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600"
          : "bg-amber-50 text-amber-600 group-hover:bg-amber-600"
      } group-hover:text-white`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800 break-all">{value}</p>
    </div>
  </a>
);

const EcosystemLink = ({ to, href, icon, label, dark }: any) => {
  const styles = `px-4 py-3 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border ${
    dark
      ? "bg-slate-900 text-white border-slate-800 hover:bg-blue-600"
      : "bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
  }`;

  if (to)
    return (
      <Link to={to} className={styles}>
        {icon} {label}
      </Link>
    );
  return (
    <a href={href} target="_blank" rel="noreferrer" className={styles}>
      {icon} {label}
    </a>
  );
};

const FormInput = ({ label, placeholder, error, icon, registration }: any) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-[10px] font-mono font-bold uppercase text-slate-400 ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </div>
      <input
        {...registration}
        className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all text-sm font-bold placeholder:text-slate-300"
        placeholder={placeholder}
      />
    </div>
    {error && (
      <p className="text-red-500 text-[10px] font-mono mt-1 ml-1 uppercase">
        {error}
      </p>
    )}
  </div>
);

export default Contact;
