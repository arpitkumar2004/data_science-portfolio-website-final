import React from 'react';

interface SkillBarProps {
  skill: string;
  level: number;
  logo: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, level, logo }) => {
  return (
    <div className="mb-4 bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-2">
        <img src={logo} alt={skill} className="w-8 h-8 mr-2" />
        <span className="text-base font-medium text-primary-700">{skill}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${level}%` }}></div>
      </div>
      <span className="text-sm font-medium text-primary-700 mt-1 block text-right">{level}%</span>
    </div>
  );
};

export default SkillBar;