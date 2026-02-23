import React, { useState, useEffect, useMemo, useRef } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import {
  Mail,
  User,
  Building2Icon,
  Linkedin,
  Github,
  Loader2,
  Clock,
  ArrowRight,
  Briefcase,
  AlertCircle,
  CheckCircle,
  Download,
} from "lucide-react";
import { SiKaggle } from "react-icons/si";

import { projects } from "../data/projectsData";
import { techData } from "../data/skillsData";
import { achievementData } from "../data/AchievementData";
import { API_ENDPOINTS, buildApiUrl } from "../config/api";

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
        throw new Error(errorData.detail || "Failed to send request");
      }

      showToast(
        "Package sent! Check your inbox.",
        "success",
      );
      setSubmitStatus("success");
      reset();
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Network error. Please try again.";
      setSubmitStatus("error");
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-sans text-slate-900 dark:text-slate-100 pb-20">
      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* --- HEADER --- */}
        <header className="mb-10 max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-slate-900 dark:text-slate-100"
          >
            Get Extended Portfolio Package
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Get comprehensive project documentation, technical details, and research publications delivered to your inbox.
          </motion.p>
        </header>

        {/* --- MAIN CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* --- LEFT: STATS (Dynamic Data) --- */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Portfolio Overview */}
            <div className="p-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Portfolio Overview
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Total Projects", value: careerStats.totalProjects },
                  { label: "Research Papers", value: careerStats.researchPapers },
                  { label: "Technical Skills", value: careerStats.technicalSkills },
                  { label: "Awards & Honors", value: careerStats.totalHonors },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{stat.label}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-base">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="p-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Package Contents
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Extended CV with full project details</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Technical architecture breakdowns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Research publications & citations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Performance metrics & impact analysis</span>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="p-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Connect
              </h3>
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
          </motion.div>

          {/* --- RIGHT: FORM --- */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8">
              {/* FEEDBACK MESSAGES */}
              <AnimatePresence>
                {showWakeUpNotice && !submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-5 p-3.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-900 dark:text-blue-100 flex items-start gap-2"
                  >
                    <Clock size={16} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Server warming up</p>
                      <p className="text-xs opacity-80 mt-0.5">First request may take 30-45 seconds.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    ref={errorRef}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-lg dark:bg-red-500/10 dark:border-red-500/30"
                  >
                    <div className="flex items-start gap-2 text-red-700 dark:text-red-200">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Request failed</p>
                        <p className="text-xs mt-0.5 opacity-80">{errorMessage}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Name"
                    placeholder="Your full name"
                    error={errors.name?.message}
                    icon={<User size={16} />}
                    registration={register("name", {
                      required: "Name is required",
                    })}
                  />
                  <FormInput
                    label="Email"
                    placeholder="your@email.com"
                    error={errors.email?.message}
                    icon={<Mail size={16} />}
                    registration={register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>

                {/* Company & Interest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Company/Organization
                    </label>
                    <div className="relative">
                      <Building2Icon
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />
                      <input
                        {...register("company", { required: "Company is required" })}
                        className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                        placeholder="Your company or university"
                      />
                    </div>
                    {errors.company && (
                      <p className="text-red-500 text-xs">{errors.company.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      I'm interested in
                    </label>
                    <div className="relative">
                      <Briefcase
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />
                      <select
                        {...register("subject")}
                        className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option>Full-Time Hiring</option>
                        <option>Summer Internship 2026</option>
                        <option>Research Collaboration</option>
                        <option>Contract/Freelance Work</option>
                        <option>General Portfolio Review</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Additional context <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    {...register("message", { required: false })}
                    className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                    placeholder="Tell me more about the opportunity or what you're looking for..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
                      ${isSubmitting
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
                        <Download size={18} />
                        <span>Request Portfolio Package</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
                    Instant delivery • No spam
                  </p>
                </div>
              </form>

              {/* Success Message */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 text-green-700 dark:bg-green-500/10 dark:border-green-500/30 dark:text-green-200"
                >
                  <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Package sent successfully!</p>
                    <p className="text-xs mt-1 opacity-90">
                      Check your inbox for the extended portfolio package. It should arrive within 2 minutes.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

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
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
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
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </div>
      <input
        {...registration}
        className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
        placeholder={placeholder}
      />
    </div>
    {error && (
      <p className="text-red-500 text-xs">
        {error}
      </p>
    )}
  </div>
);

export default RequestCV;
