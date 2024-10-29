import React from 'react';
import { motion } from 'framer-motion';

interface ExperiencesProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Experiences: React.FC<{ experiences: ExperiencesProps[] }> = ({ experiences }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-3">
            <div className="text-primary-600 mr-4">{experience.icon}</div>
            <h3 className="text-xl font-semibold">{experience.title}</h3>
          </div>
          <p className="text-gray-600 flex-grow">{experience.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Experiences;
