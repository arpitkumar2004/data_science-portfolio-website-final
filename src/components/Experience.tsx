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
// import { SiReact, SiNodedotjs, SiTypescript } from 'react-icons/si';
import cheaLogo from '../data/img/chea_logo.png';
import devsocLogo from '../data/img/devsoc_logo.jpg';
import ppgsLogo from '../data/img/ppgs_logo.png';
import sbrcLogo from '../data/img/sbrc_logo.jpg';

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
  link: string;
  location: string;
  totalDuration: string;
  roles: Role[];
  // skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Developers' Society, IIT-Kharagpur",
    link: "https://devsoc.in",
    location: "IIT Kharagpur, Kharagpur, West Bengal",
    totalDuration: "Sep 2023 - Present",
    roles: [
      { id: 100, title: "Advisor, Web Development Team", duration: "Sep 2025 - Present", description: ["Guided and mentored students in web development, software development, and project management.", "Provided guidance and support to help students excel in their chosen fields."] },
      { id: 101, title: "Development Head, Full Stack Team", duration: "Oct 2024 - Sep 2025", description: ["Promoted to lead and manage development teams for society-wide web projects.", "Responsible for project planning, architecture design, and code reviews."] },
      { id: 102, title: "Development Member, Backend Team", duration: "Sep 2023 - Oct 2024", description: ["Contributed to various projects by developing features using React and Node.js.", "Collaborated with team members to build and maintain web applications."] }
    ],
    // skills: ['React', 'Node.js', 'TypeScript', 'Team Leadership']
  },
  {
    id: 2,
    company: "Public Policy and Governance Society, IIT-Kharagpur",
    link: "https://ppgsiitkgp.in",
    location: "IIT Kharagpur, Kharagpur, West Bengal",
    totalDuration: "Feb 2022 - Jan 2024",
    roles: [
      { id: 201, title: "Executive Member, Policy Research Team", duration: "Feb 2023 - Jan 2024", description: ["Worked as Executive Member in Public Policy and Governance Society, IIT Kharagpur from 2022 to 2024."] },
      { id: 202, title: "Associate Member, Policy Research Team", duration: "Feb 2022 - Jan 2023", description: ["Worked as Associate Member in Public Policy and Governance Society, IIT Kharagpur from 2022 to 2023."] }
    ],
    // skills: ['Public Policy', 'Governance', 'Leadership']
  },
  {
    id: 3,
    company: "Chemical Engineering Association, IIT-Kharagpur",
    link: "https://che.iitkgp.ac.in/association.php",
    location: "IIT Kharagpur, Kharagpur, West Bengal",
    totalDuration: "Jan 2023 - Jan 2024",
    roles: [{ id: 301, title: "Web Development Member", duration: "Jan 2023 - Jan 2024", description: ["Worked as Web Team Member in Chemical Engineering Association, IIT Kharagpur from 2023 to 2024."] }],
    // skills: ['Web Development', 'UI/UX Design', 'Frontend Development']
  },
  {
    id: 4,
    company: "Students' Branding and Relations Cell, IIT Kharagpur",
    link: "https://sbrc.iitkgp.ac.in",
    location: "IIT Kharagpur, Kharagpur, West Bengal",
    totalDuration: "Feb 2023 - Feb 2024",
    roles: [{ id: 401, title: "Associate Member", duration: "Feb 2023 - Feb 2024", description: ["Worked as Associate Member in Students' Branding and Relations Cell, IIT Kharagpur from 2023 to 2024."] }],
    // skills: ['Branding', 'Public Relations', 'Communication']
  }
];

const companyIcons: Record<string, JSX.Element> = {
  "Developers' Society, IIT-Kharagpur": <img src={devsocLogo} alt="Developers' Society logo" className="w-10 h-11 rounded-full" />,
  "Public Policy and Governance Society, IIT-Kharagpur": <img src={ppgsLogo} alt="Public Policy and Governance Society logo" className="w-10 h-10 rounded-full" />,
  "Chemical Engineering Association, IIT-Kharagpur": <img src={cheaLogo} alt="Chemical Engineering Association logo" className="w-10 h-10 rounded-full" />,
  "Students' Branding and Relations Cell, IIT Kharagpur": <img src={sbrcLogo} alt="Students' Branding and Relations Cell logo" className="w-10 h-10 rounded-full" />,
};

// const skillIcons: Record<string, JSX.Element> = {
//   'React': <SiReact className="w-4 h-4" />,
//   'Node.js': <SiNodedotjs className="w-4 h-4" />,
//   'TypeScript': <SiTypescript className="w-4 h-4" />,
// };

// --- Reusable Experience Card Component (Updated for expandable functionality) ---
const ExperienceCard = ({ exp }: { exp: ExperienceItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Minimized view: Company, last position, location, duration */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
        <div className='flex items-center'>
          {companyIcons[exp.company] || <Building2 className="w-6 h-6 text-blue-600" />}
          <div className="flex flex-col">
            <a href={exp.link} title='Link to company page' className="text-lg font-semibold text-gray-900 ml-6 hover:text-blue-600 hover:underline transition-colors">{exp.company}</a>
            <p className="text-md text-gray-700 ml-6 mt-1">{exp.roles[0]?.title}</p>
            <p className="text-sm text-gray-500 ml-6 mt-1 flex items-center gap-2">
              {/* <MapPin className="w-4 h-4" /> */}
              {exp.location}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500 text-left sm:text-right flex-shrink-0 mt-2 sm:mt-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{exp.totalDuration}</span>
          </div>
        </div>
      </div>

      {/* Expanded view: Roles and descriptions */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {exp.roles.map((role, roleIndex) => (
              <div key={role.id} className={roleIndex > 0 ? "pt-4 border-t border-gray-100" : ""}>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <h4 className="text-sm font-semibold text-gray-800">{role.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 sm:mt-0">{role.duration}</p>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 text-xs">
                  {role.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand/Collapse indicator */}
      <div className="flex justify-center mt-4">
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Main Experience Component (Updated) ---
export default function Experience() {
  return (
    <div className="py-16 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          My Professional Experience till date
        </h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-12" />

        <div className="space-y-2">
          {/* Display all experiences as expandable cards */}
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </div>
  );
}
