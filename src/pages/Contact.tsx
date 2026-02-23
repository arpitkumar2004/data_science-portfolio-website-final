import React, { useState, useEffect } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import {
  Mail,
  MapPin,
  User,
  MessageSquare,
  Building2Icon,
  Linkedin,
  Github,
  Loader2,
  Clock,
  ArrowRight,
  Calendar,
  Video,
  CheckCircle2,
} from "lucide-react";
import { SiKaggle } from "react-icons/si";
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import { trackContactForm } from '../utils/analytics';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
  formType: string;
  role: string;
};

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem("userRole"),
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

  // 2. Cold-Start Logic: Show notice if request takes > 15 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitting) {
      timer = setTimeout(() => setShowWakeUpNotice(true), 15000);
    } else {
      setShowWakeUpNotice(false);
    }
    return () => clearTimeout(timer);
  }, [isSubmitting]);

  // 3. Submission Handler (Updated for JSON Backend)
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    trackContactForm('form_submitted', { role: userRole || 'GUEST', subject: data.subject });
    try {
      // We must use the FormData API to match your backend's Form(...) requirements
      const bodyFormData = new FormData();
      bodyFormData.append("name", data.name);
      bodyFormData.append("email", data.email);
      bodyFormData.append("subject", data.subject);
      bodyFormData.append("message", data.message);
      bodyFormData.append("company", data.company || "");
      bodyFormData.append("formType", "contacts");
      bodyFormData.append("role", localStorage.getItem("userRole") || "GUEST");

      const response = await fetch(buildApiUrl(API_ENDPOINTS.SUBMIT_CONTACT), {
        method: "POST",
        // IMPORTANT: Do NOT set Content-Type header when sending FormData,
        // the browser will set it automatically with the correct "boundary".
        body: bodyFormData,
      });

      if (!response.ok) throw new Error();

      showToast(
        "Message sent successfully! I'll get back to you soon.",
        "success",
      );
      reset();
    } catch (error) {
      trackContactForm('form_error', { role: userRole || 'GUEST', error: String(error) });
      showToast("Failed to send message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 dark:selection:bg-blue-500/20 pb-20 dark:bg-[#020617] dark:text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        {/* --- HEADER --- */}
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Let's Work Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed"
          >
            Have a project in mind or looking to collaborate? Drop me a message and I'll get back to you within 24 hours.
          </motion.p>
        </header>

        {/* --- APPOINTMENT BOOKING SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12 max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-8 lg:p-10 border border-blue-200 dark:border-blue-800/50 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Info */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Calendar size={14} />
                  <span>Quick Booking</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                  Schedule a Meeting
                </h2>
                
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                  Skip the form and book a 30-minute slot directly on my calendar. Perfect for project discussions, technical interviews, or collaboration opportunities.
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  {[
                    { icon: <CheckCircle2 size={18} />, text: "Instant confirmation via email" },
                    { icon: <Video size={18} />, text: "Google Meet link included" },
                    { icon: <Clock size={18} />, text: "Choose your preferred time" },
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTA */}
              <div className="flex flex-col gap-4">
                {/* Primary Booking Button */}
                <a
                  href="https://calendly.com/kumararpit17773/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-between overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-3">
                    <Calendar size={24} />
                    <span>Book 30-Min Meeting</span>
                  </div>
                  <ArrowRight size={24} className="relative group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Info Card */}
                <div className="p-5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <strong className="text-slate-900 dark:text-slate-100">Available Mon-Fri,</strong> 9 AM - 6 PM IST. 
                      You'll receive a confirmation email with meeting details immediately after booking.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
            <span className="px-4 text-sm font-medium text-slate-500 dark:text-slate-400">OR SEND A MESSAGE</span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* --- LEFT: CONTACT INFO --- */}
          <div className="lg:col-span-1 space-y-8">
            <section>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <ContactLink
                  href="mailto:kumararpit17773@gmail.com"
                  icon={<Mail size={18} />}
                  label="Email"
                  value="kumararpit17773@gmail.com"
                />
                <ContactLink
                  href="https://www.google.com/maps"
                  icon={<MapPin size={18} />}
                  label="Location"
                  value="India (Remote)"
                />
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Connect
              </h3>
              <div className="flex flex-wrap gap-2">
                <EcosystemLink
                  href="https://www.linkedin.com/in/arpitkumar2004"
                  icon={<Linkedin size={16} />}
                  label="LinkedIn"
                />
                <EcosystemLink
                  href="https://github.com/arpitkumar2004"
                  icon={<Github size={16} />}
                  label="GitHub"
                />
                <EcosystemLink
                  href="https://www.kaggle.com/arpitkumar2004"
                  icon={<SiKaggle size={16} />}
                  label="Kaggle"
                />
              </div>
            </section>
          </div>

          {/* --- RIGHT: CONTACT FORM --- */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm"
            >
              {/* Cold Start Notice */}
              <AnimatePresence mode="wait">
                {showWakeUpNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm text-blue-900 dark:text-blue-100 flex items-start gap-3"
                  >
                    <Clock size={18} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Server is starting up</p>
                      <p className="text-xs opacity-80 mt-1">
                        First request may take up to 45 seconds. Thank you for your patience.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    icon={<User size={18} />}
                    registration={register("name", {
                      required: "Name is required",
                    })}
                  />
                  <FormInput
                    label="Email"
                    placeholder="your@email.com"
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Company (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Building2Icon size={18} />
                      </div>
                      <input
                        {...register("company")}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm placeholder:text-slate-400"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <select
                        {...register("subject")}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option>Project Consultation</option>
                        <option>Hiring / Recruitment</option>
                        <option>Research Collaboration</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-3 top-3 text-slate-400"
                      size={18}
                    />
                    <textarea
                      rows={5}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none placeholder:text-slate-400"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
                      ${
                        isSubmitting
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400"
                          : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-md hover:shadow-lg"
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS FOR CLEANER CODE ---

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ContactLink = ({ href, icon, label, value }: ContactLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
  >
    <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-all">{value}</p>
    </div>
  </a>
);

interface EcosystemLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const EcosystemLink = ({ href, icon, label }: EcosystemLinkProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className="inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-all"
    >
      {icon} <span>{label}</span>
    </a>
  );
};

interface FormInputProps {
  label: string;
  placeholder: string;
  error?: string;
  icon: React.ReactNode;
  registration: UseFormRegisterReturn;
}

const FormInput = ({ label, placeholder, error, icon, registration }: FormInputProps) => (
  <div className="space-y-2 flex-1">
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </div>
      <input
        {...registration}
        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm placeholder:text-slate-400"
        placeholder={placeholder}
      />
    </div>
    {error && (
      <p className="text-red-500 text-xs mt-1">
        {error}
      </p>
    )}
  </div>
);

export default Contact;
