import React from 'react';
import { motion } from 'framer-motion';

interface SkillLogoProps {
  skill: string;
  logo: string;
}

const SkillLogo: React.FC<SkillLogoProps> = ({ skill, logo }) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-14 h-14 bg-white rounded-lg shadow-sm flex items-center justify-center p-2.5 mb-2">
        <img 
          src={logo} 
          alt={skill} 
          className="w-full h-full object-contain" 
        />
      </div>
      <span className="text-xs font-medium text-gray-600 text-center">
        {skill}
      </span>
    </motion.div>
  );
};

export default SkillLogo;
