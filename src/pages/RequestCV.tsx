import React, { useState, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import {
  Mail,
  User,
  Info,
  Activity,
  Layout,
  Globe,
  BookOpen,
  Building2Icon,
  Terminal,
  Linkedin,
  Github,
  Loader2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Cpu,
  Microscope,
  Award,
  Code2,
  Database,
  Binary,
  ListFilter,
  AlertCircle,
  CheckCircle,
  RefreshCcw,
} from "lucide-react";
import { SiKaggle } from "react-icons/si";
import { Link } from "react-router-dom";

// Data Imports
import { projects } from "../data/projectsData";
import { techData } from "../data/skillsData";
import { achievementData } from "../data/AchievementData";
import { API_ENDPOINTS, buildApiUrl } from "../config/api";

// const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/+$/, "");

type FormData = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  formType: string;
  role: string;
};

const RequestCV: React.FC = () => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWakeUpNotice, setShowWakeUpNotice] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const errorRef = useRef<HTMLDivElement | null>(null);
  const lastAttemptData = useRef<FormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      subject: "Summer Internship 2026",
    },
  });

  // 1. Dynamic Dashboard (Real-time calculation)
  const careerStats = useMemo(() => {
    const safeProjects = Array.isArray(projects) ? projects : [];
    const safeTech = Array.isArray(techData) ? techData : [];
    const safeAchievements = Array.isArray(achievementData)
      ? achievementData
      : [];

    return {
      totalProjects: safeProjects.length,
      researchPapers: safeProjects.filter(
        (p) =>
          p?.type?.toLowerCase().includes("paper") ||
          p?.type?.toLowerCase().includes("research"),
      ).length,
      technicalSkills: safeTech.reduce(
        (acc, curr) => acc + (curr?.tools?.length || 0),
        0,
      ),
      totalHonors: safeAchievements.reduce(
        (acc, curr) => acc + (curr?.items?.length || 0),
        0,
      ),
    };
  }, []);

  // 2. Cold-Start & Error Focus
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitting) {
      timer = setTimeout(() => setShowWakeUpNotice(true), 15000);
    } else {
      setShowWakeUpNotice(false);
    }
    return () => clearTimeout(timer);
  }, [isSubmitting]);

  useEffect(() => {
    if (submitStatus === "error" && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitStatus]);

  // 3. Robust Submission Logic
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);
    lastAttemptData.current = data;

    try {
      const bodyFormData = new FormData();
      bodyFormData.append("name", data.name);
      bodyFormData.append("email", data.email);
      bodyFormData.append("company", data.company);
      bodyFormData.append("subject", `CV Request: ${data.subject}`);
      bodyFormData.append("message", data.message);
      bodyFormData.append("formType", "cv_dispatch");
      bodyFormData.append("role", localStorage.getItem("userRole") || "GUEST");

      const response = await fetch(buildApiUrl(API_ENDPOINTS.REQUEST_CV), {
        method: "POST",
        body: bodyFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Server transmission failed");
      }

      showToast(
        "Verification Successful. Check your inbox for the complete CV dossier.",
        "success",
      );
      setSubmitStatus("success");
      reset();
    } catch (error: any) {
      const msg =
        error.message || "Network Timeout. Server might be initializing.";
      setSubmitStatus("error");
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-18">
        {/* --- HEADER ARCHIVE --- */}
        <header className="mb-16 border-b border-slate-100 pb-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 mb-6 shadow-xl"
              >
                <Terminal size={12} className="text-blue-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-blue-600 text-slate-50">
                  Automated Dispatch Terminal
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none">
                Download my CV <span className="text-blue-600 italic">Dossier.</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium">
                Fill out the form to receive a comprehensive technical CV dossier in a few seconds via email automatically to your inbox.
              </p>
            </div>

            {/* DASHBOARD */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
              {[
                {
                  label: "Project Built",
                  val: careerStats.totalProjects,
                  icon: <Cpu size={14} />,
                },
                {
                  label: "Research Papers",
                  val: careerStats.researchPapers,
                  icon: <Microscope size={14} />,
                },
                {
                  label: "Awards & Honors",
                  val: careerStats.totalHonors,
                  icon: <Award size={14} />,
                },
                {
                  label: "Skills Aquired",
                  val: careerStats.technicalSkills,
                  icon: <Code2 size={14} />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 bg-white border border-slate-200 rounded-2xl text-center lg:text-left shadow-sm"
                >
                  <div className="text-blue-600 mb-2 flex justify-center lg:justify-start">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tighter">
                    {stat.val}+
                  </div>
                  <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* --- LEFT: SIDEBAR --- */}
          <div className="lg:col-span-4 space-y-8">
            {/* --- PRIMARY DISPATCH CARD --- */}
            <section className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl shadow-blue-200">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 px-3 py-1 bg-white/10 border border-white/20 rounded-full w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-100">
                    System: Active
                  </span>
                </div>

                <h3 className="text-2xl font-black mb-3 tracking-tighter uppercase">
                  Technical Fulfillment
                </h3>
                <p className="text-blue-50 text-sm leading-relaxed mb-3 font-medium">
                  Upon successful Submission of form, the dispatch system will
                  transmit a PDF CV dossier directly to your provided work
                  email. You will be notified upon completion.
                </p>
                <p className="text-red-500 text-sm leading-relaxed font-medium mb-6 flex items-center gap-2">
                  <Info size={42} /> Please ensure your email address is valid and accessible.
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-3">
                    <Binary className="text-white" size={16} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      SSL_ENCRYPTED_PIPELINE
                    </span>
                  </div>
                  <div className="p-3 bg-white/10 border border-white/20 rounded-xl flex items-center gap-3">
                    <Activity className="text-white" size={16} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      AUTO_MAIL_TRIGGER: ENABLED
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* --- CATEGORIZED NAVIGATION --- */}
            <div className="space-y-6 pt-4">
              {/* Internal Repository Links */}
              <div>
                <h4 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2 flex items-center gap-2">
                  <Layout size={12} /> Repository Index
                </h4>
                <div className="flex flex-wrap gap-2">
                  <EcosystemLink
                    to="/"
                    icon={<Terminal size={14} />}
                    label="Home"
                    dark
                  />
                  <EcosystemLink
                    to="/projects"
                    icon={<Database size={14} />}
                    label="Research"
                  />
                  <EcosystemLink
                    to="/aboutme"
                    icon={<BookOpen size={14} />}
                    label="Dossier"
                  />
                </div>
              </div>

              {/* External Technical Nodes */}
              <div>
                <h4 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2 flex items-center gap-2">
                  <Globe size={12} /> External Nodes
                </h4>
                <div className="flex flex-wrap gap-2">
                  <EcosystemLink
                    href="https://github.com/arpitkumar2004"
                    icon={<Github size={14} />}
                    label="GitHub"
                  />
                  <EcosystemLink
                    href="https://linkedin.com/in/arpit-kumar-shivam"
                    icon={<Linkedin size={14} />}
                    label="LinkedIn"
                  />
                  <EcosystemLink
                    href="https://kaggle.com/kumararpitiitkgp"
                    icon={<SiKaggle size={14} />}
                    label="Kaggle"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: FORM --- */}
          <div className="lg:col-span-8">
            <motion.div className="bg-slate-50 border border-slate-200/60 rounded-[3rem] p-8 lg:p-12 relative">
              {/* FEEDBACK OVERLAYS */}
              <AnimatePresence>
                {showWakeUpNotice && !submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 flex items-start gap-4"
                  >
                    <Clock className="animate-pulse mt-1" size={20} />
                    <p className="text-xs font-bold uppercase tracking-tight">
                      System Wake-up in progress. Please remain connected.
                    </p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    ref={errorRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-red-50 border border-red-200 rounded-3xl"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 text-red-700">
                        <AlertCircle size={20} />
                        <p className="text-sm font-black uppercase tracking-tight">
                          Dispatch Failed
                        </p>
                      </div>
                      <button
                        onClick={() => onSubmit(lastAttemptData.current!)}
                        className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg text-[10px] font-bold uppercase hover:bg-red-700 transition-all"
                      >
                        <RefreshCcw size={12} /> Retry
                      </button>
                    </div>
                    <p className="text-xs text-red-600 mt-2 font-medium ml-8">
                      {errorMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Full Name"
                    placeholder="Dr. John Doe"
                    error={errors.name?.message}
                    icon={<User size={18} />}
                    registration={register("name", {
                      required: "Identity required",
                    })}
                  />
                  <FormInput
                    label="Destination Email"
                    placeholder="official@org.com"
                    error={errors.email?.message}
                    icon={<Mail size={18} />}
                    registration={register("email", {
                      required: "Email required",
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-400 ml-1">
                      Organization
                    </label>
                    <div className="relative">
                      <Building2Icon
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <input
                        {...register("company", { required: "Required" })}
                        className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-600 outline-none transition-all text-sm font-bold"
                        placeholder="Company / University"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-400 ml-1">
                      Context
                    </label>
                    <div className="relative">
                      <ListFilter
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <select
                        {...register("subject")}
                        className="w-full pl-12 pr-10 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-600 outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                      >
                        <option>Summer Internship 2026</option>
                        <option>Research Collaboration</option>
                        <option>Full-time Opportunity</option>
                        <option>Technical Consultation</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase text-slate-400 ml-1">
                    Briefing Purpose
                  </label>
                  <textarea
                    rows={4}
                    {...register("message", { required: "Detail required" })}
                    className="w-full p-5 bg-white border border-slate-200 rounded-2xl focus:border-blue-600 outline-none transition-all text-sm font-medium resize-none"
                    placeholder="Provide context for the request..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-2xl ${isSubmitting ? "bg-slate-200 text-slate-500 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-blue-600 shadow-blue-200"}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />{" "}
                        <span className="uppercase tracking-widest text-xs">
                          Transmitting...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="uppercase tracking-widest text-xs">
                          Get Technical CV
                        </span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  {isSubmitting && (
                    <div className="mt-6 h-0.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 45 }}
                        className="h-full bg-blue-600"
                      />
                    </div>
                  )}
                </div>
              </form>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-green-50 border border-green-100 rounded-3xl flex items-center gap-4 text-green-700"
                >
                  <CheckCircle size={24} />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tight">
                      Transmission Complete 
                    </p>
                    <p className="text-xs font-medium">
                      The CV dossier has been sent to your email inbox.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE HELPERS ---

const EcosystemLink = ({ to, href, icon, label, dark }: any) => {
  const styles = `px-4 py-3 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border ${
    dark
      ? "bg-slate-900 text-white border-slate-800 hover:bg-blue-600 shadow-lg shadow-slate-200"
      : "bg-white text-slate-600 border-slate-200 hover:text-blue-600 hover:border-blue-200 shadow-sm"
  }`;
  return to ? (
    <Link to={to} className={styles}>
      {icon} {label}
    </Link>
  ) : (
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
        className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-600 outline-none transition-all text-sm font-bold placeholder:text-slate-300"
        placeholder={placeholder}
      />
    </div>
    {error && (
      <p className="text-red-500 text-[9px] font-mono uppercase mt-1 ml-1">
        {error}
      </p>
    )}
  </div>
);

export default RequestCV;
