import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    GraduationCap,
    Award,
    ChevronDown
} from 'lucide-react';
import iitkgpLogo from '../data/img/me/2.png';

interface EducationItem {
    id: number;
    institution: string;
    location: string;
    degree: string;
    duration: string;
    description: string[];
    gpa?: string;
    link?: string;
}

const educationData: EducationItem[] = [
    {
        id: 1,
        institution: "Indian Institute of Technology, Kharagpur",
        location: "Kharagpur, West Bengal, India",
        degree: "Integrated Dual Degree (B.Tech + M.Tech) in Chemical Engineering",
        duration: "2022 - 2027",
        description: [
            "Focused on process design, simulation, and optimization, applying chemical engineering principles to industrial-scale systems.",
            "Research Experience: Worked on projects integrating machine learning with chemical process modeling, including simulation-based optimization and predictive analytics for process efficiency."
        ],
        gpa: "8.46/10",
        link: "https://www.iitkgp.ac.in/"
    },
    // Add more if needed,
];

const EducationCard = ({ edu }: { edu: EducationItem }) => (
    <motion.div
        layout="position"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
    >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
            <div className="flex items-center">
                <img src={iitkgpLogo} alt="IIT Kharagpur" className="w-12 h-12" />
                <div className="flex flex-col ml-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{edu.institution}</h3>
                    <p className="text-sm md:text-md text-gray-600">{edu.degree}</p>
                    <p className="text-xs md:text-sm text-gray-500 flex items-center gap-2 mt-1 ml-0.5">
                        {/* <MapPin className="w-4 h-4" /> */}
                        {edu.location}
                    </p>
                </div>
            </div>
            <div className="text-xs md:text-sm text-gray-500 text-left sm:text-right flex-shrink-0 mt-2 sm:mt-0">
                <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{edu.duration}</span>
                </div>
                {edu.gpa && (
                    <div className="flex items-center gap-2 mt-1">
                        <Award className="w-3 h-3 md:w-4 md:h-4" />
                        <span>GPA: {edu.gpa}</span>
                    </div>
                )}
            </div>
        </div>
        <ul className="list-disc pl-5 mt-4 space-y-1 text-gray-700 text-sm">
            {edu.description.map((desc, i) => (
                <li key={i}>{desc}</li>
            ))}
        </ul>
    </motion.div>
);

export default function Education() {
    const [isExpanded, setIsExpanded] = useState(false);

    // For now, all are shown, but can add logic if more data
    const displayedEducation = isExpanded ? educationData : educationData.slice(0, 1);

    return (
        <div className="py-16 bg-white font-sans">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">
                    My Educational Background
                </h2>
                <div className="w-20 h-1 md:w-24 md:h-1.5 bg-blue-600 mx-auto rounded-full mb-12" />

                <div className="space-y-8">
                    <AnimatePresence mode="popLayout">
                        {displayedEducation.map((edu) => (
                            <EducationCard key={edu.id} edu={edu} />
                        ))}
                    </AnimatePresence>
                </div>

                {educationData.length > 1 && (
                    <motion.div
                        layout
                        transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="group flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-white border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <span>{isExpanded ? 'Show Less' : 'Show All Education'}</span>
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
