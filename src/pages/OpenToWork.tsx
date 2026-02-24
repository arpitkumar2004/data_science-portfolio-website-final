import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Download,
  Linkedin,
  Github,
  ArrowRight,
  Users,
  Brain,
  Trophy,
} from "lucide-react";
import { trackResumeDownload } from "../utils/analytics";
import {
  heroData,
  trackRecordMetrics,
  seekingData,
  getTopAchievements,
  getFeaturedProjects,
  technicalSkills,
  logisticsData,
  finalCtaData,
  colorMappings,
} from "../data/openToWorkPageData";

const OpenToWorkPage: React.FC = () => {
  // Helper to get color classes
  const getColorClasses = (color: keyof typeof colorMappings) => {
    return colorMappings[color];
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-full"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              {heroData.availabilityBadge.status} • {heroData.availabilityBadge.message}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl md:text-6xl font-black mb-4 leading-tight text-slate-900 dark:text-white"
          >
            {heroData.title.main}
            <span className="block text-blue-600 dark:text-blue-400">
              {heroData.title.subtitle}
            </span>
          </motion.h1>

          {/* Key Credentials */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed"
          >
            <span className="font-semibold text-slate-900 dark:text-white">
              {heroData.credentials[0]}
            </span>{" "}
            • {heroData.credentials.slice(1).join(" • ")}
          </motion.p>

          {/* Direct Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-2 mb-10 text-slate-600 dark:text-slate-400"
          >
            <span className="text-sm font-medium">📧</span>
            <a href={`mailto:${heroData.contact.email}`} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              {heroData.contact.email}
            </a>
            <span className="text-sm">• {heroData.contact.responseTime}</span>
          </motion.div>



          {/* Availability Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 mb-10 text-sm text-slate-600 dark:text-slate-400"
          >
            {heroData.availability.map((item, idx) => {
              const IconComponent = item.icon === "Calendar" ? Calendar : item.icon === "MapPin" ? MapPin : Clock;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <IconComponent className="text-blue-600 dark:text-blue-400" size={18} />
                  <span>
                    <span className="font-semibold text-slate-900 dark:text-white">{item.label}</span> {item.detail}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={heroData.cta.primary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Calendar size={20} />
                <span className="text-lg">{heroData.cta.primary.text}</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </a>
            <a
              href={heroData.cta.secondary.url}
              download={heroData.cta.secondary.downloadName}
              onClick={() => trackResumeDownload("open_to_work_page_hero")}
              className="group px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl hover:border-slate-400 dark:hover:border-slate-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Download size={20} />
                <span className="text-lg">{heroData.cta.secondary.text}</span>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Impact & Metrics Section - Streamlined */}
      <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
              Track Record That Speaks
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              4 metrics that prove I can deliver from day one
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {trackRecordMetrics.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <div className={`text-3xl md:text-4xl font-black mb-2 ${getColorClasses(stat.color as keyof typeof colorMappings).text}`}>
                  {stat.number}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {stat.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: What I'm Looking For Section */}
      <section className="py-16 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
              What I'm Looking For
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              My ideal internship match
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Target Companies
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                {seekingData.targetCompanies.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>{item.label}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Role Preferences
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                {seekingData.rolePreferences.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>{item.label}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Learning Goals
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                {seekingData.learningGoals.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong>{item.label}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Top Achievements - Streamlined to 4 */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Top Achievements
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              4 wins that demonstrate ML excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {getTopAchievements().map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getColorClasses(achievement.badgeColor as keyof typeof colorMappings).bg} ${getColorClasses(achievement.badgeColor as keyof typeof colorMappings).badgeText}`}>
                    {achievement.badge}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      {achievement.rank}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {achievement.detail}
                </p>
                <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <p className="text-xs font-mono text-slate-700 dark:text-slate-300">
                    {achievement.tech}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                  <CheckCircle2 size={16} />
                  {achievement.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Projects Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              End-to-end ML systems from research to production
            </p>
          </motion.div>

          <div className="grid gap-6">
            {getFeaturedProjects().map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full whitespace-nowrap">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy size={16} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {project.impact}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      TECH STACK
                    </p>
                    <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      {project.technologies}
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      BUILD METHODOLOGY
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {project.methodology}
                    </p>
                  </div>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    <Github size={16} />
                    View Code
                    <ArrowRight size={16} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
              Technical Skills
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Full-stack ML capabilities from research to production
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Brain className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  ML/AI Stack
                </h3>
              </div>
              <ul className="space-y-3">
                {technicalSkills.mlAiStack.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Trophy className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Other Strengths
                </h3>
              </div>
              <ul className="space-y-3">
                {technicalSkills.otherStrengths.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-purple-600 dark:text-purple-400 flex-shrink-0"
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEW: Logistics & Work Authorization */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
              Logistics & Availability
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              All the practical details you need to know
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="text-blue-600 dark:text-blue-400" size={20} />
                Timeline & Duration
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                {logisticsData.timeline.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                    <span><strong className="text-slate-900 dark:text-white">{item.label}:</strong> {item.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="text-purple-600 dark:text-purple-400" size={20} />
                Location & Work Authorization
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                {logisticsData.location.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                    <span><strong className="text-slate-900 dark:text-white">{item.label}:</strong> {item.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="text-orange-600 dark:text-orange-400" size={20} />
                Work Preferences
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                {logisticsData.workPreferences.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                    <span><strong className="text-slate-900 dark:text-white">{item.label}:</strong> {item.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="text-blue-600 dark:text-blue-400" size={20} />
                What You Get (Day 1)
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                {logisticsData.valueProposition.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <span><strong className="text-slate-900 dark:text-white">{item.label}:</strong> {item.value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-slate-900 dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {finalCtaData.heading}
            </h2>

            <p className="text-xl text-slate-300 mb-2">
              {finalCtaData.subheading}
            </p>

            <p className="text-slate-400 mb-10">
              {finalCtaData.tagline}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <a
              href={finalCtaData.primaryCta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-3">
                <Calendar size={20} />
                <span>{finalCtaData.primaryCta.text}</span>
                <ArrowRight size={20} />
              </div>
            </a>

            <a
              href={finalCtaData.secondaryCta.url}
              download={finalCtaData.secondaryCta.downloadName}
              onClick={() => trackResumeDownload("open_to_work_page_footer")}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-3">
                <Download size={20} />
                <span>{finalCtaData.secondaryCta.text}</span>
              </div>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-6 pt-8 border-t border-slate-800"
          >
            <span className="text-slate-400 text-sm">Connect:</span>
            {finalCtaData.socialLinks.map((social, idx) => {
              const IconComponent = social.icon === "Linkedin" ? Linkedin : Github;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{social.platform}</span>
                </a>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OpenToWorkPage;
