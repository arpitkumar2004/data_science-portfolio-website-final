import React from 'react';

interface SkillBarProps {
  skill: string;
  logo: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, logo }) => {
  return (
    <div className="mb-4 bg-white rounded-lg shadow-md p-4 flex items-center">
      <img src={logo} alt={skill} className="w-12 h-12 mr-4" /> {/* Increased size for better visibility */}
      <span className="text-lg font-semibold text-gray-800">{skill}</span> {/* Increased font size and changed color */}
    </div>
  );
};

export default SkillBar;
