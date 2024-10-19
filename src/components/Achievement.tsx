import React from 'react';
import { motion } from 'framer-motion';

interface AchievementProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Achievement: React.FC<AchievementProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className="text-primary-600 mr-4">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 flex-grow">{description}</p>
    </motion.div>
  );
};

export default Achievement;