import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Building2,
  Users,
  Award,
  FlaskConical,
  Megaphone,
  Code,
  ChevronDown
} from 'lucide-react';
import { SiReact, SiNodedotjs, SiTypescript } from 'react-icons/si';

// --- (Interfaces and Data remain the same) ---
interface Role {
  id: number;
  title: string;
  duration: string;
  description: string[];
}

interface ExperienceItem {
  id: number;
  company: string;
  location: string;
  totalDuration: string;
  roles: Role[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Developers' Society, IIT-Kharagpur",
    location: "IIT Kharagpur, Kharagpur, West Bengal",
    totalDuration: "Jan 2023 - Present",
    roles: [
      { id: 100, title: "Advisor", duration: "Jan 2025 - Present", description: ["Guided and mentored students in web development, software development, and project management.", "Provided guidance and support to help students excel in their chosen fields."] },
      { id: 101, title: "Development Head", duration: "Jan 2024 - Dec 2024", description: ["Promoted to lead and manage development teams for society-wide web projects.", "Responsible for project planning, architecture design, and code reviews."] },
      { id: 102, title: "Development Member", duration: "Jan 2023 - Dec 2023", description: ["Contributed to various projects by developing features using React and Node.js.", "Collaborated with team members to build and maintain web applications."] }
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'Team Leadership']
  },
  {
    id: 2,
    company: "PPGS, IIT-Kharagpur",
    location: "IIT Kharagpur, Kharagpur, West Bengal",
    totalDuration: "Feb 2022 - Jan 2024",
    roles: [
      { id: 201, title: "Executive Member", duration: "Feb 2023 - Jan 2024", description: ["Worked as Executive Member in Public Policy and Governance Society, IIT Kharagpur from 2022 to 2024."] },
      { id: 202, title: "Associate Member", duration: "Feb 2022 - Jan 2023", description: ["Worked as Associate Member in Public Policy and Governance Society, IIT Kharagpur from 2022 to 2023."] }
    ],
    skills: ['Public Policy', 'Governance', 'Leadership']
  },
  {
    id: 3,
    company: "Chemical Engineering Association",
    location: "IIT Kharagpur, Kharagpur, West Bengal",
    totalDuration: "Jan 2023 - Jan 2024",
    roles: [{ id: 301, title: "Web Development Member", duration: "Jan 2023 - Jan 2024", description: ["Worked as Web Team Member in Chemical Engineering Association, IIT Kharagpur from 2023 to 2024."] }],
    skills: ['Web Development', 'UI/UX Design', 'Frontend Development']
  },
  {
    id: 4,
    company: "Students' Branding and Relations Cell",
    location: "IIT Kharagpur, Kharagpur, West Bengal",
    totalDuration: "Feb 2023 - Feb 2024",
    roles: [{ id: 401, title: "Associate Member", duration: "Feb 2023 - Feb 2024", description: ["Worked as Associate Member in Students' Branding and Relations Cell, IIT Kharagpur from 2023 to 2024."] }],
    skills: ['Branding', 'Public Relations', 'Communication']
  }
];

const companyIcons: Record<string, JSX.Element> = {
  "Developers' Society, IIT-Kharagpur": <Users className="w-5 h-5 text-blue-600" />,
  "PPGS, IIT-Kharagpur": <Award className="w-5 h-5 text-blue-600" />,
  "Chemical Engineering Association": <FlaskConical className="w-5 h-5 text-blue-600" />,
  "Students' Branding and Relations Cell": <Megaphone className="w-5 h-5 text-blue-600" />,
};

const skillIcons: Record<string, JSX.Element> = {
  'React': <SiReact className="w-4 h-4" />,
  'Node.js': <SiNodedotjs className="w-4 h-4" />,
  'TypeScript': <SiTypescript className="w-4 h-4" />,
};

// --- Reusable Experience Card Component (No changes needed here) ---
const ExperienceCard = ({ exp }: { exp: ExperienceItem }) => (
  <motion.div
    layout="position"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
  >
    {/* Card content is identical to before */}
    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
      <div>
        <div className="flex items-center gap-2">
          {companyIcons[exp.company] || <Building2 className="w-6 h-6 text-blue-600" />}
          <h3 className="text-1xl font-semibold text-gray-900">{exp.company}</h3>
        </div>
        <p className="text-sm text-gray-500 ml-8 mt-1">{exp.location}</p>
      </div>
      <div className="text-sm text-gray-500 text-left sm:text-right flex-shrink-0 mt-2 sm:mt-0">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{exp.totalDuration}</span>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      {exp.roles.map((role, roleIndex) => (
        <div key={role.id} className={roleIndex > 0 ? "pt-4 border-t border-gray-100" : ""}>
          <div className="flex flex-col sm:flex-row justify-between items-start"><h4 className="text-sm font-semibold text-gray-800">{role.title}</h4><p className="text-xs text-gray-500 mt-1 sm:mt-0">{role.duration}</p></div>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 text-xs">{role.description.map((desc, i) => (<li key={i}>{desc}</li>))}</ul>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap gap-2 mt-6">
      {exp.skills.map((skill, i) => (
        <div key={i} className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-medium">
          {skillIcons[skill] || <Code className="w-4 h-4" />}<span>{skill}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

// --- Main Experience Component (Updated) ---
export default function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentExperiences = experiences.filter(exp => exp.totalDuration.includes('Present'));
  const pastExperiences = experiences.filter(exp => !exp.totalDuration.includes('Present'));

  return (
    <div className="py-16 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Professional Experience
        </h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-12" />

        <div className="space-y-8">
          {/* Always display current experiences */}
          {currentExperiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>

        {/* Conditionally render past experiences */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="space-y-8 mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {pastExperiences.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render button at the end, only if there are past experiences */}
        {pastExperiences.length > 0 && (
          <motion.div
            layout
            transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-white border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span>{isExpanded ? 'Show Less' : 'Show All Experiences'}</span>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5 transition-transform duration-300" />
              </motion.div>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}