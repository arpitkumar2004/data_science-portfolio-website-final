import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  skills: string[];
}

// Experience Section Data
const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Development Head",
    company: "Developers' Society, IIT-Kharagpur",
    location: "Kharagpur, West Bengal",
    duration: "Jan 2024 - Present",
    description: [
      "Promoted to Developer Head in Developers' Society, IIT Kharagpur in 2024 from Development Member since 2023."
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'Team Leadership']
  },
  {
    id: 2,
    role: "Executive Member",
    company: "PPGS, IIT-Kharagpur",
    location: "Kharagpur, West Bengal",
    duration: "Feb 2022 - Present",
    description: [
      "Worked as Executive Member in Public Policy and Governance Society, IIT Kharagpur from 2022 to 2024."
    ],
    skills: ['Public Policy', 'Governance', 'Leadership']
  },
  {
    id: 3,
    role: "Web Development Member",
    company: "Chemical Engineering Association",
    location: "Kharagpur, West Bengal",
    duration: "Jan 2023 - Present",
    description: [
      "Worked as Web Team Member in Chemical Engineering Association, IIT Kharagpur from 2023 to 2024."
    ],
    skills: ['Web Development', 'UI/UX Design', 'Frontend Development']
  },
  {
    id: 4,
    role: "Associate Member",
    company: "Students' Branding and Relations Cell",
    location: "Kharagpur, West Bengal",
    duration: "Feb 2023 - Present",
    description: [
      "Worked as Associate Member in Students' Branding and Relations Cell, IIT Kharagpur from 2023 to 2024."
    ],
    skills: ['Branding', 'Public Relations', 'Communication']
  }
];

export default function Experience() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-5">Professional Experience</h2>
      <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full mb-8" />

      <div className="max-w-4xl mx-auto">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative pl-8 pb-12 last:pb-0"
          >
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-200">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white" />
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-6 ml-6">
              <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Building2 className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
