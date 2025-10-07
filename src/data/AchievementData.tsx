import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  GraduationCap, 
  Users, 
  Trophy, 
  Code, 
  Briefcase,
  Megaphone,
  BookOpen,
  ExternalLink 
} from 'lucide-react';

// Data from the previous step
export const achievementData = [
  {
    title: "Academic & Research Excellence",
    items: [
      {
        description: "Pursuing an Integrated Dual Degree (B.Tech + M.Tech) in Chemical Engineering with a Minor in Machine Learning & AI at IIT Kharagpur.",
        verificationLink: { url: "#", label: "View Details" }
      },
      {
        description: "Presented work at international conferences and workshops on AI, Quantitative Research, and Applied AI in Engineering.",
        verificationLink: { url: "#", label: "View Research" }
      },
      {
        description: "Published and contributed to research in AI-driven process modeling, optimization, and data-centric engineering.",
        verificationLink: { url: "#", label: "View Publications" }
      },
      {
        description: "Recognized for consistent academic excellence and awarded merit scholarships at IIT Kharagpur.",
        verificationLink: { url: "#", label: "View Award" }
      }
    ]
  },
  {
    title: "Hackathons & Competitive Achievements",
    items: [
      {
        description: "Head Organizer of the Kharagpur Data Science Hackathon — one of India’s largest campus data competitions.",
        verificationLink: { url: "#", label: "Event Page" }
      },
      {
        description: "Achieved strong performance in national and international AI & Data Science hackathons with end-to-end ML solutions.",
        verificationLink: { url: "#", label: "View Results" }
      },
      {
        description: "Active participant on Codeforces, Kaggle, and Data Science competitions with competitive ratings.",
        verificationLink: { url: "#", label: "View Profile" }
      },
      {
        description: "Awarded for innovation and model interpretability in ML-based problem-solving challenges.",
        verificationLink: { url: "#", label: "View Certificate" }
      }
    ]
  },
  {
    title: "Leadership & Community",
    items: [
      {
        description: "Serving as the Head of the Kharagpur Data Analytics Group (KDAG), leading interdisciplinary AI projects and mentoring young researchers.",
        verificationLink: { url: "#", label: "Team Page" }
      },
      {
        description: "Organized workshops, bootcamps, and research seminars on AI, ML, and Quantitative Modeling.",
        verificationLink: { url: "#", label: "View Events" }
      },
      {
        description: "Collaborated with research teams to apply ML models in chemical processes, optimization, and decision systems.",
        verificationLink: { url: "#", label: "View Projects" }
      }
    ]
  },
  {
    title: "Professional & Applied AI Impact",
    items: [
      {
        description: "Worked on AI-driven financial modeling, alpha generation, and predictive analytics for real-world datasets.",
        verificationLink: { url: "#", label: "Case Studies" }
      },
      {
        description: "Developed interpretable ML frameworks bridging engineering models with data science for process optimization.",
        verificationLink: { url: "#", label: "Learn More" }
      },
      {
        description: "Applied hybrid modeling (physics + ML) for predictive maintenance and dynamic system monitoring.",
        verificationLink: { url: "#", label: "View Application" }
      }
    ]
  },
  {
    title: "Technical & Coding Milestones",
    items: [
      {
        description: "Rated participant on Codeforces and Kaggle, demonstrating strong algorithmic and analytical thinking.",
        verificationLink: { url: "#", label: "View Profile" }
      },
      {
        description: "Built robust ML pipelines and quantitative research frameworks in Python, PyTorch, TensorFlow, and Scikit-learn.",
        verificationLink: { url: "#", label: "View Code" }
      },
      {
        description: "Contributed to open-source AI repositories and research-oriented projects in applied machine learning.",
        verificationLink: { url: "#", label: "View Contributions" }
      }
    ]
  }
];

// Helper function updated to get the icon from the description text
const getIconForAchievement = (description: string): React.ReactNode => {
  const lowerDesc = description.toLowerCase();
  if (lowerDesc.includes('hackathon') || lowerDesc.includes('awarded for innovation')) return <Trophy className="w-6 h-6 text-yellow-500" />;
  if (lowerDesc.includes('scholarship') || lowerDesc.includes('strong performance')) return <Award className="w-6 h-6 text-slate-500" />;
  if (lowerDesc.includes('degree') || lowerDesc.includes('iit kharagpur')) return <GraduationCap className="w-6 h-6 text-sky-500" />;
  if (lowerDesc.includes('head') || lowerDesc.includes('organizer') || lowerDesc.includes('mentoring')) return <Users className="w-6 h-6 text-blue-600" />;
  if (lowerDesc.includes('conference') || lowerDesc.includes('published')) return <BookOpen className="w-6 h-6 text-green-600" />;
  if (lowerDesc.includes('codeforces') || lowerDesc.includes('kaggle') || lowerDesc.includes('pipelines')) return <Code className="w-6 h-6 text-indigo-600" />;
  if (lowerDesc.includes('workshops') || lowerDesc.includes('seminars')) return <Megaphone className="w-6 h-6 text-orange-500" />;
  if (lowerDesc.includes('financial modeling') || lowerDesc.includes('professional') || lowerDesc.includes('hybrid modeling')) return <Briefcase className="w-6 h-6 text-amber-700" />;
  return <Award className="w-6 h-6 text-gray-500" />;
};


export default function Achievements() {
  return (
    <div className="bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Awards & Achievements
        </h2>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-12" />

        <div className="space-y-5 mb-8">
          {achievementData.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
              <div>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 mt-1 text-sm">
                        {getIconForAchievement(item.description)}
                      </div>
                      <div className="flex-grow text-xs">
                        {/* MODIFICATION: Displaying the description directly as the main text */}
                        <p className="text-gray-700 text-xs">
                          {item.description}
                        </p>
                      </div>
                      <a
                        href={item.verificationLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1.5 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {item.verificationLink.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}