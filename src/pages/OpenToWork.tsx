import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Download,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  ArrowRight,
  Award,
  Target,
  Users,
  Zap,
  Star,
  Code,
  Brain,
  Rocket,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { trackResumeDownload } from "../utils/analytics";
import { openToWorkPositions } from "../data/openToWorkData";

const OpenToWorkPage: React.FC = () => {
  // Premium stats for recruiters
  const stats = [
    {
      icon: Award,
      label: "Top 0.5%",
      value: "Amazon ML Challenge",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      label: "Mentored 30+",
      value: "Developers",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      label: "IIT Kharagpur",
      value: "Dual Degree",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Code,
      label: "Production",
      value: "ML Systems",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/20">
      {/* Premium Hero Section with Animated Background */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 dark:from-emerald-500/10 dark:to-cyan-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-400/20 dark:via-orange-400/20 dark:to-amber-400/20 backdrop-blur-xl border border-amber-200/50 dark:border-amber-400/30 rounded-full shadow-lg"
          >
            <div className="relative">
              <Sparkles
                size={18}
                className="text-amber-600 dark:text-amber-400 animate-pulse"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-amber-400 rounded-full blur-sm"
              />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-300 dark:to-amber-400 bg-clip-text text-transparent">
              🔥 AVAILABLE FOR IMMEDIATE HIRE
            </span>
            <Star
              size={18}
              className="text-amber-600 dark:text-amber-400 animate-pulse"
            />
          </motion.div>

          {/* Premium Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <span className="text-slate-900 dark:text-white block mb-2">
              AI & ML Engineer
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent block">
              Summer 2026
            </span>
          </motion.h1>

          {/* Premium Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-12 max-w-6xl font-medium leading-relaxed"
          >
            <span className="font-bold text-slate-900 dark:text-white">
              IIT Kharagpur
            </span>{" "}
            Dual Degree •
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {" "}
              Top 0.5%
            </span>{" "}
            Amazon ML Challenge •
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {" "}
              Production ML
            </span>{" "}
            Systems Expert
          </motion.p>

          {/* Premium Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.value}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Availability Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-4 mb-10 p-6 md:gap-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Calendar className="text-white" size={20} />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Duration
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  May 2026 - July 2026
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <MapPin className="text-white" size={20} />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Location
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Global (Relocation Ready)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg">
                <Clock className="text-white" size={20} />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Commitment
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  10-12 Weeks
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
                <Zap className="text-white" size={20} />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Start
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Immediate
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/Arpit_Kumar_Resume.pdf"
              download="Arpit_Kumar_IIT_KGP_ML_Intern.pdf"
              onClick={() => trackResumeDownload("open_to_work_page_hero")}
              className="group relative px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative flex items-center gap-3">
                <Download size={22} />
                <span className="text-lg">Download Resume</span>
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </a>
            <a
              href="https://calendly.com/kumararpit17773/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-5 bg-white dark:bg-slate-800 border-3 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-bold rounded-2xl hover:bg-blue-50 dark:hover:bg-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Mail size={22} />
                <span className="text-lg">Schedule Interview</span>
                <Rocket
                  size={22}
                  className="group-hover:translate-y-[-4px] transition-transform duration-300"
                />
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Premium Value Proposition Section */}
      {/* <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full border border-blue-200/50 dark:border-blue-700/50">
              <Brain className="text-blue-600 dark:text-blue-400" size={18} />
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                VALUE PROPOSITION
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Why Top Companies Choose Me
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Not just another ML intern—a proven performer ready to deliver
              impact from day one
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Award,
                title: "Proven Excellence",
                desc: "Top 0.5% (42/8,690) in Amazon ML Challenge. Multiple Kaggle medals. Not theoretical knowledge—battle-tested skills.",
                gradient: "from-amber-500 to-orange-500",
                iconBg: "from-amber-500/20 to-orange-500/20",
              },
              {
                icon: Rocket,
                title: "Production-Ready Code",
                desc: "Built ML systems serving real users. Experience with FastAPI, Docker, AWS deployment. Code that ships, not just notebooks.",
                gradient: "from-blue-500 to-cyan-500",
                iconBg: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: Users,
                title: "Leadership Experience",
                desc: "Mentored 30+ developers as Technical Advisor. Can work independently or lead small teams. Clear communicator.",
                gradient: "from-purple-500 to-pink-500",
                iconBg: "from-purple-500/20 to-pink-500/20",
              },
              {
                icon: Zap,
                title: "Fast Execution",
                desc: "Get up to speed in days, not weeks. Self-directed learner who thrives in ambiguous environments. Ship fast, iterate faster.",
                gradient: "from-emerald-500 to-teal-500",
                iconBg: "from-emerald-500/20 to-teal-500/20",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-900/50 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />
                <div className="relative">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.iconBg} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon
                      className={`bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}
                      size={32}
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why Recruiters Should Care - Premium Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-start gap-5 mb-6">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                className="p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl"
              >
                <ShieldCheck size={36} className="text-white" />
              </motion.div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800/50">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    RECRUITER BRIEF
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                  Why Recruiters Should Care
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  TL;DR — What makes me different from 1000+ other ML candidates
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Production Experience, Not Just Theory",
                desc: "Built production systems serving high-traffic applications. I ship code, not just papers.",
                icon: Rocket,
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Proven Under Pressure",
                desc: "Ranked 42nd/8,690 teams (Top 0.5%) in Amazon ML Challenge 2025. Proven ability to deliver under tight deadlines.",
                icon: Trophy,
                color: "from-amber-500 to-orange-500",
              },
              {
                title: "Full-Stack + ML = Rare Combo",
                desc: "React, Node.js, Docker, PyTorch, TensorFlow. I build the entire pipeline, end-to-end.",
                icon: Code,
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Leadership Experience",
                desc: "Mentored 30+ developers, led technical roadmaps, shipped 8+ features per quarter as Technical Advisor.",
                icon: Users,
                color: "from-emerald-500 to-teal-500",
              },
              {
                title: "IIT Kharagpur Pedigree",
                desc: "Dual Degree from India's top engineering institute with 7.86 CGPA. Rigorous training in first principles.",
                icon: Award,
                color: "from-indigo-500 to-blue-500",
              },
              {
                title: "Available for Summer Internship 2026",
                desc: "Open to summer internship roles globally. Can start full-time immediately after graduation.",
                icon: Calendar,
                color: "from-green-500 to-emerald-500",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex gap-4 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="shrink-0">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="text-white" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="text-green-500" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Results - Premium Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-400/20 dark:to-orange-400/20 rounded-full border border-amber-200/50 dark:border-amber-700/50">
              <Trophy
                className="text-amber-600 dark:text-amber-400"
                size={18}
              />
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Validated Excellence
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Recognition & Results
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Proven by competition performance and production impact
            </p>
          </motion.div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                badge: "🏆 Competition",
                title: "Top 0.5%",
                desc: "Amazon ML Challenge 2025 (42nd/8,690 teams globally)",
                gradient: "from-yellow-500 to-amber-500",
                bgGradient:
                  "from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10",
                border: "border-yellow-200 dark:border-yellow-800/30",
              },
              {
                badge: "🚀 Production",
                title: "Production Scale",
                desc: "Built systems designed for high availability with zero critical bugs",
                gradient: "from-green-500 to-emerald-500",
                bgGradient:
                  "from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10",
                border: "border-green-200 dark:border-green-800/30",
              },
              {
                badge: "🎓 Academic",
                title: "7.86 CGPA",
                desc: "IIT Kharagpur Dual Degree - Top cohort performance",
                gradient: "from-blue-500 to-indigo-500",
                bgGradient:
                  "from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10",
                border: "border-blue-200 dark:border-blue-800/30",
              },
              {
                badge: "👨‍💻 Leadership",
                title: "30+ Devs",
                desc: "Mentored engineers as Technical Advisor at DevSoc",
                gradient: "from-purple-500 to-pink-500",
                bgGradient:
                  "from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10",
                border: "border-purple-200 dark:border-purple-800/30",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className={`group relative p-6 bg-gradient-to-br ${item.bgGradient} rounded-2xl border ${item.border} shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full text-xs font-bold mb-4 shadow-md">
                  {item.badge}
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2 group-hover:scale-110 transition-transform origin-left">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
                <div
                  className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-10 rounded-tl-full transition-opacity group-hover:opacity-20`}
                />
              </motion.div>
            ))}
          </div>

          {/* Performance Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                {
                  value: "6+",
                  label: "Projects Shipped",
                  color: "text-blue-400",
                },
                {
                  value: "Reliable",
                  label: "High Availability System",
                  color: "text-green-400",
                },
                {
                  value: "8+",
                  label: "Features/Quarter",
                  color: "text-purple-400",
                },
                {
                  value: "3+",
                  label: "Years Shipping",
                  color: "text-amber-400",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  className="group"
                >
                  <div
                    className={`text-4xl md:text-5xl font-black ${stat.color} mb-2 group-hover:scale-110 transition-transform`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Roles Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:50px_50px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <Target className="text-blue-300" size={18} />
              <span className="text-sm font-bold text-blue-200">
                OPEN POSITIONS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Roles I'm Targeting
            </h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Specialized expertise in these high-impact ML domains
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {openToWorkPositions.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 hover:border-white/40 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black rounded-full mb-4 shadow-lg">
                    <Star size={12} />
                    {role.level}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {role.title}
                  </h3>

                  <div className="inline-block px-3 py-1 bg-blue-500/30 text-blue-200 text-sm font-bold rounded-full mb-4">
                    {role.field}
                  </div>

                  <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                    {role.description}
                  </p>

                  {role.tags && (
                    <div className="flex flex-wrap gap-2">
                      {role.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg font-medium transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Skills Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/20 dark:to-teal-400/20 rounded-full border border-emerald-200/50 dark:border-emerald-700/50">
              <Code
                className="text-emerald-600 dark:text-emerald-400"
                size={18}
              />
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                SKILL MATRIX
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Complete Skill Arsenal
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Full-stack ML capabilities from research to production deployment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-3xl border border-blue-200/50 dark:border-blue-800/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <Brain className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Technical Expertise
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  { skill: "PyTorch, TensorFlow, Scikit-learn", level: 95 },
                  { skill: "React, Node.js, FastAPI", level: 90 },
                  { skill: "Docker, AWS, CI/CD Pipeline", level: 85 },
                  { skill: "Computer Vision, NLP, Gen AI", level: 92 },
                  { skill: "MLOps, Monitoring, Deployment", level: 88 },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-semibold">
                        <CheckCircle2
                          size={20}
                          className="text-emerald-600 flex-shrink-0"
                        />
                        {item.skill}
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-3xl border border-purple-200/50 dark:border-purple-800/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <Users className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Leadership & Soft Skills
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  { skill: "Team Leadership & Mentoring", level: 93 },
                  { skill: "Technical Communication", level: 90 },
                  { skill: "Cross-functional Collaboration", level: 88 },
                  { skill: "Problem-Solving Mindset", level: 95 },
                  { skill: "Deadline-Driven Execution", level: 92 },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-semibold">
                        <CheckCircle2
                          size={20}
                          className="text-purple-600 flex-shrink-0"
                        />
                        {item.skill}
                      </span>
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
        {/* Premium background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(59,130,246,0.3)_0%,_transparent_50%)]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_rgba(168,85,247,0.3)_0%,_transparent_50%)]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Exclusive badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-white" size={20} />
              </motion.div>
              <span className="text-sm font-black text-white uppercase tracking-wider">
                Limited Availability
              </span>
              <Star className="text-white" size={16} />
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Make an
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                Immediate Impact?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-200 mb-4 max-w-3xl mx-auto leading-relaxed">
              Join elite teams building the future of AI. Available{" "}
              <span className="font-black text-white">May 2026</span>.
            </p>

            <p className="text-base text-blue-300 mb-12 max-w-2xl mx-auto">
              🚀 Fast onboarding • 💡 Day-one contributions • 🎯 Result-oriented
              • ⚡ Zero ramp-up time
            </p>
          </motion.div>

          {/* Premium Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
          >
            <a
              href="/Arpit_Kumar_Resume.pdf"
              download="Arpit_Kumar_IIT_KGP_ML_Intern.pdf"
              onClick={() => trackResumeDownload("open_to_work_page_footer")}
              className="group relative px-10 py-6 bg-white text-slate-900 font-black text-lg rounded-2xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 blur-xl" />
              <div className="relative flex items-center justify-center gap-3">
                <Download size={24} />
                <span>Download Resume</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </div>
            </a>

            <a
              href="https://calendly.com/kumararpit17773/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 border-2 border-white/20"
            >
              <div className="flex items-center justify-center gap-3">
                <Mail size={24} />
                <span>Schedule Interview</span>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Rocket size={24} />
                </motion.div>
              </div>
            </a>
          </motion.div>

          {/* Premium Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-8 mb-8"
          >
            <span className="text-blue-300 font-semibold">
              Connect with me:
            </span>
            <a
              href="https://linkedin.com/in/arpit-kumar-shivam"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <Linkedin
                className="text-blue-400 group-hover:text-blue-300 transition-colors"
                size={24}
              />
              <span className="text-white font-bold">LinkedIn</span>
              <ExternalLink
                className="text-blue-400 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </a>
            <a
              href="https://github.com/arpitkumar2004"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <Github
                className="text-purple-400 group-hover:text-purple-300 transition-colors"
                size={24}
              />
              <span className="text-white font-bold">GitHub</span>
              <ExternalLink
                className="text-purple-400 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-blue-300/70 space-y-2"
          >
            <p className="flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Immediate response within 24 hours</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>References and portfolio available upon request</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OpenToWorkPage;
