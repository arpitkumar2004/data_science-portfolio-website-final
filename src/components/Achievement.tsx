import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface AchievementItemProps {
  title: string;
  verificationLink?: {
    url: string;
    label: string;
  };
}

interface AchievementSectionProps {
  title: string;
  items: AchievementItemProps[];
}

interface AchievementsProps {
  sections: AchievementSectionProps[];
}

const Achievement: React.FC<AchievementsProps> = ({ sections }) => {
  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={sectionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">{section.title}</h3>
          <ul className="space-y-3">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <div>
                  <p className="text-sm text-gray-700">
                    {item.title}
                    {item.verificationLink && (
                      <a
                        href={item.verificationLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 ml-2 text-xs inline-flex items-center"
                      >
                        {item.verificationLink.label}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default Achievement;
