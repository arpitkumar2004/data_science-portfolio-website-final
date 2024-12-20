import React from 'react';
import { motion } from 'framer-motion';

interface AchievementProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Achievement: React.FC<{ achievements: AchievementProps[] }> = ({ achievements }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-3">
            <div className="text-primary-600 mr-4">{achievement.icon}</div>
            <h3 className="text-xl font-semibold">{achievement.title}</h3>
          </div>
          <p className="text-gray-600 flex-grow">{achievement.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Achievement;
