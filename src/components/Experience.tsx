import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronRight,
  Terminal,
  ExternalLink,
  History,
  Layers,
  MapPin
} from 'lucide-react';

// Logos (Assumed paths from your previous code)
import cheaLogo from '../data/img/chea_logo.png';
import devsocLogo from '../data/img/devsoc_logo.jpg';
import ppgsLogo from '../data/img/ppgs_logo.png';
import sbrcLogo from '../data/img/sbrc_logo.jpg';

const companyIcons: Record<string, string> = {
  "Developers' Society, IIT-Kharagpur": devsocLogo,
  "Public Policy and Governance Society, IIT-Kharagpur": ppgsLogo,
  "Chemical Engineering Association, IIT-Kharagpur": cheaLogo,
  "Students' Branding and Relations Cell, IIT Kharagpur": sbrcLogo,
};

const experiences = [
  {
    id: 1,
    company: "Developers' Society, IIT-Kharagpur",
    link: "https://devsoc.in",
    location: "IIT Kharagpur",
    category: "Technical Leadership",
    totalDuration: "Sep 2023 - Present",
    roles: [
      {
        id: 100,
        title: "Advisor | Web & Software Architecture",
        duration: "Sep 2025 - Present",
        description: [
          "Strategizing the technical roadmap for the society's primary software products and research-oriented web tools.",
          "Mentoring 30+ junior developers in modern full-stack patterns, focusing on scalability and clean architecture.",
          "Providing high-level code reviews and architectural guidance for society-wide software deployments."
        ]
      },
      {
        id: 101,
        title: "Development Head | Full Stack Systems",
        duration: "Oct 2024 - Sep 2025",
        description: [
          "Spearheaded the end-to-end development lifecycle for multi-tier web applications using React, Node.js, and PostgreSQL.",
          "Managed cross-functional teams to deliver high-traffic society portals, ensuring 99.9% uptime during peak event registrations.",
          "Implemented CI/CD pipelines and automated testing suites to reduce deployment errors by 40%."
        ]
      },
      {
        id: 102,
        title: "Development Member | Backend Systems",
        duration: "Sep 2023 - Oct 2024",
        description: [
          "Optimized server-side logic and database schemas for internal tools, reducing API latency by 25%.",
          "Engineered robust RESTful APIs and integrated third-party authentication services (OAuth) for secure data handling.",
          "Collaborated in an Agile environment using Git for version control and Jira for project tracking."
        ]
      }
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"]
  },
  {
    id: 2,
    company: "Public Policy and Governance Society, IIT-Kharagpur",
    link: "https://ppgsiitkgp.in",
    location: "IIT Kharagpur",
    category: "Policy Research",
    totalDuration: "Feb 2022 - Jan 2024",
    roles: [
      {
        id: 201,
        title: "Executive Member | Quantitative Policy Research",
        duration: "Feb 2023 - Jan 2024",
        description: [
          "Conducted data-driven research on governance frameworks, analyzing the socio-economic impact of digital policies.",
          "Led a team of researchers to produce white papers on tech-policy intersection, presented at campus-wide symposiums.",
          "Organized high-level policy debates and governance workshops, engaging with 500+ student participants."
        ]
      },
      {
        id: 202,
        title: "Associate Member | Research Analytics",
        duration: "Feb 2022 - Jan 2023",
        description: [
          "Assisted in gathering and cleaning large datasets for policy impact analysis using Python and Excel.",
          "Contributed to the society's quarterly journal, focusing on the role of AI in public governance.",
          "Facilitated stakeholder communication between society members and guest speakers from various governmental bodies."
        ]
      }
    ],
    techStack: ["Data Analysis", "Python", "Policy Modeling", "Economic Research"]
  },
  {
    id: 3,
    company: "Chemical Engineering Association, IIT-Kharagpur",
    link: "https://che.iitkgp.ac.in/",
    location: "IIT Kharagpur",
    category: "Digital Transformation",
    totalDuration: "Jan 2023 - Jan 2024",
    roles: [
      {
        id: 301,
        title: "Web Development Specialist",
        duration: "Jan 2023 - Jan 2024",
        description: [
          "Redesigned the official association portal to improve UX/UI, resulting in a 50% increase in mobile engagement.",
          "Automated the student database management system, streamlining the process for departmental event registrations.",
          "Collaborated with the core committee to digitize the departmental journal archives."
        ]
      }
    ],
    techStack: ["Frontend Engineering", "UI/UX", "Database Automation"]
  },
  {
    id: 4,
    company: "Students' Branding and Relations Cell, IIT Kharagpur",
    link: "https://sbrc.iitkgp.ac.in",
    location: "IIT Kharagpur",
    category: "Strategic Outreach",
    totalDuration: "Feb 2023 - Feb 2024",
    roles: [
      {
        id: 401,
        title: "Associate Member | Corporate Relations",
        duration: "Feb 2023 - Feb 2024",
        description: [
          "Managed institutional branding initiatives, enhancing the cell's visibility across social media and corporate platforms.",
          "Facilitated outreach programs to connect IIT Kharagpur with alumni and potential industrial partners.",
          "Drafted technical reports and branding collateral for flagship institutional events."
        ]
      }
    ],
    techStack: ["Public Relations", "Brand Strategy", "Technical Writing"]
  }
];

const ExperienceCard = ({ exp, index }: { exp: any, index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const brandBlue = "rgb(37 99 235)";

  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Vertical Rail */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-100" />
      
      {/* Brand Icon Node */}
      <div 
        className="absolute left-[-18px] top-0 w-9 h-9 rounded-xl bg-white border-2 border-slate-100 flex items-center justify-center z-10 shadow-sm transition-all"
        style={{ borderColor: isExpanded ? brandBlue : 'rgb(241 245 249)' }}
      >
        <img 
          src={companyIcons[exp.company]} 
          alt="logo" 
          className={`w-6 h-6 rounded object-contain transition-all ${isExpanded ? 'scale-110' : 'grayscale'}`} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group cursor-pointer bg-white border rounded-3xl p-6 lg:p-8 transition-all duration-500 ${
          isExpanded ? 'border-blue-600 shadow-2xl shadow-blue-900/5' : 'border-slate-100 hover:border-blue-300 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                {exp.category}
              </span>
              <ExternalLink size={12} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">Visit Website</a>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors">
              {exp.company}
            </h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
              <span className="text-sm font-bold text-slate-700">{exp.roles[0].title}</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin size={14} />
                <span className="text-xs font-medium">{exp.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
              <Calendar size={14} className="text-blue-600" />
              <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-tighter">{exp.totalDuration}</span>
            </div>
            <motion.div 
              animate={{ rotate: isExpanded ? 90 : 0 }}
              className="mt-6 text-slate-300 hidden lg:block"
            >
              <ChevronRight size={24} />
            </motion.div>
          </div>
        </div>

        {/* Roles & Descriptions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-10 pt-8 border-t border-slate-100 space-y-12">
                {exp.roles.map((role: any, idx: number) => (
                  <div key={role.id} className="relative pl-8">
                    {/* Role Connector */}
                    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-600 shadow-lg shadow-blue-200" />
                    {idx < exp.roles.length - 1 && (
                      <div className="absolute left-[3px] top-4 bottom-[-48px] w-[2px] bg-slate-100" />
                    )}
                    
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-4">
                      <h4 className="font-bold text-slate-900 text-base">{role.title}</h4>
                      <span className="text-[10px] font-mono font-black text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded tracking-tighter">
                        {role.duration}
                      </span>
                    </div>
                    
                    <ul className="space-y-3">
                      {role.description.map((desc: string, i: number) => (
                        <li key={i} className="text-slate-600 text-sm leading-relaxed flex gap-3">
                          <span className="text-blue-600 font-mono mt-0.5">0{i+1}.</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {exp.techStack.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 bg-slate-50 text-slate-500 border border-slate-200 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default function Experience() {
  return (
    <div className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <History size={16} className="text-blue-600" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-blue-600">
              Technical Dossier
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Career Journey
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full" />
        </div>

        <div className="relative">
          {/* Animated Line Marker */}
          <div className="absolute left-[-4px] bottom-0 w-2 h-2 rounded-full bg-slate-200" />
          
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Recruiter Footnote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-8 lg:p-12 bg-slate-900 text-white relative overflow-hidden rounded-3xl shadow-2xl shadow-blue-900/10 cursor-pointer hover:shadow-blue-900/20"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Layers size={120} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h4 className="text-2xl font-black tracking-tighter mb-2">Detailed CV required?</h4>
              <p className="text-slate-400 text-sm max-w-sm">I have an extended complete CV available for inernship for <b className="font-bold">Summer 2026</b> and industrial R&D roles as well and academic inquiries.</p>
            </div>
            <a href='#/request-cv' className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20 flex items-center gap-3">
              <Terminal size={18} />
              Request Full CV
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}