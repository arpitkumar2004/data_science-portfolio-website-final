import React, { useState } from 'react';
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
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Updated + restructured data
export const achievementData = [
  {
    title: "Academic & Research Excellence",
    accentColor: "sky",
    items: [
      {
        description:
          "Pursuing an Integrated Dual Degree (B.Tech + M.Tech) in Chemical Engineering at IIT Kharagpur, specializing in Process Systems Engineering with a focus on AI-driven modeling, optimization, and applied data science in engineering systems.",
        verificationLink: { url: "#", label: "View Details" }
      },
      {
        description:
          "Awarded Merit-cum-Means Scholarship at IIT Kharagpur (2023) for consistent academic excellence and research-driven academic performance.",
        verificationLink: { url: "#", label: "View Award" }
      },
      {
        description:
          "Attended SPARC International Conferences and Workshops on AI and Applied AI in Engineering, gaining exposure to interdisciplinary applications of machine learning in real-world systems.",
        verificationLink: { url: "#", label: "View Award" }
      },
      {
        description:
          "Performed process modeling under Prof. Sourav Mondal — designed MeOH–EtOH–PrOH columns, optimized debutanizers via FUG methods, and simulated C2–C3 separations cutting reboiler energy by 20%, optimized multi-stage distillation design achieving 98% MeOH purity and 20% reboiler energy savings via simulation-based optimization.",
        verificationLink: {
          url: "https://github.com/arpitkumar2004/Assigment-PMS",
          label: "Project Repository"
        }
      },
      {
        description:
          "Performed energy-efficient process optimization through pinch analysis and COMSOL heat-exchanger simulations, reducing utility costs by 30% and enhancing heat transfer by 15%.",
        verificationLink: { url: "#", label: "View Simulation" }
      },
      {
        description:
          "Developed sustainable process models integrating Machine Learning — created Neural Network-based boiling point prediction models (R² > 0.85) and automated flash separations improving Benzene recovery to 95%.",
        verificationLink: { url: "#", label: "Learn More" }
      },
      {
        description:
          "Simulated core unit operations (heat exchangers, distillation, CSTR/PFR) in Aspen HYSYS under Prof. Nikita Saxena, translating chemical process theory into industrially relevant solutions.",
        verificationLink: {
          url: "https://github.com/arpitkumar2004/CAPE-Laboratory-Simulations",
          label: "GitHub Repository"
        },
      },
    ]
  },
  {
    title: "Technical & Coding Credentials",
    accentColor: "indigo",
    items: [
      {
        description:
          "Achieved Expert title (Max Rating: 1612, Handle: _Badassium), demonstrating strong algorithmic thinking. Ranked 203 in Div 2 Round 1032, showcasing competitive problem-solving under pressure.",
        verificationLink: {
          url: "https://codeforces.com/profile/_Badassium",
          label: "Profile"
        }
      },
      {
        description:
          "ML/DL & Quantitative Research Expertise — Built modular ML pipelines and applied interpretable AI for real-world datasets. Skilled in Python, PyTorch, TensorFlow, Scikit-learn, and Streamlit for end-to-end solutions.",
        verificationLink: { url: "#", label: "View Code" }
      }
    ]
  },
  {
    title: "Technical Projects & Applied AI Systems",
    accentColor: "blue",
    items: [
      {
        description:
          "Developed a Deep Learning Text Summarization System processing 100K+ documents, achieving 35% ROUGE-L F1 improvement and reducing manual review workload by 60%.",
        verificationLink: {
          url: "https://github.com/arpitkumar2004/Text-Summarizer-Project",
          label: "View Project"
        }
      },
      {
        description:
          "Built a Social and Healthcare Risk Scorecard for Evva Health using a Voting Ensemble (BERT + Naive Bayes + Decision Tree), achieving 82.89% accuracy and automating real-time risk scoring.",
        verificationLink: {
          url: "https://github.com/arpitkumar2004/DA96_webapp",
          label: "App Demo"
        }
      },
      {
        description:
          "Designed an AI-driven price prediction pipeline for pulses and vegetables using GBM, LightGBM, CatBoost, and XGBoost. Achieved a SMAPE of 42.89, ranking 42nd out of 8690 teams on the competition leaderboard.",
        verificationLink: { url: "#", label: "Case Study" }
      }
    ]
  },
  {
    title: "Competitions, Hackathons & Conferences",
    accentColor: "yellow",
    items: [
      {
        description:
          "Amazon ML Challenge 2025 — Multimodal Price Prediction Challenge — Built a cutting-edge ML pipeline combining text, images, and tabular data. Ranked top 0.5% globally with SMAPE 42.89%, showcasing world-class predictive skills.",
        verificationLink: { url: "#", label: "Competition Details" }
      },
      {
        description:
          "Volatility Curve Prediction — NK Securities Hackathon 2025 — Pioneered a geometric ensembling strategy with Transformers for volatility forecasting. Delivered highly accurate predictions integrating ML, stats, and geometric principles.",
        verificationLink: { url: "#", label: "Competition Details" }
      },
      {
        description:
          "DTL Quant Challenge 2024 — Top 20 Nationally — Engineered a dynamic alpha model capturing diverse market regimes. Ranked 19th nationally, proving robust performance across in-sample, out-of-sample, and live data.",
        verificationLink: { url: "#", label: "Leaderboard" }
      },
      {
        description:
          "General Championship Data Analytics — Evva Health '2023 — Built a Healthcare Risk Scorecard using ensemble AI models. Achieved 82.89% accuracy and slashed manual data collection by 60% with a real-time app.",
        verificationLink: { url: "#", label: "Report" }
      },
      {
        description:
          "Open IIT Data Analytics — Silver Medal — Predicted city footfall using advanced time-series and ensemble models. Secured 2nd place, achieving 86.63% accuracy with actionable forecasts.",
        verificationLink: { url: "#", label: "Report" }
      },
      {
        description:
          "General Championship ChemQuest — Bronze Medal — Investigated EMI threats in bio & electronic systems, proposing novel shielding materials. Achieved 40 dB attenuation, highlighting practical real-world solutions.",
        verificationLink: { url: "#", label: "Research Summary" }
      },
      {
        description:
          "SPARC International Workshops & Conferences — Collaborated with global experts on advanced electrochemical systems and smart engineering. Gained hands-on knowledge in multiphase flows, ion transport, and industrial ML integration.",
        verificationLink: { url: "#", label: "Workshop Details" }
      }
    ]
  },
  {
    title: "Leadership & Professional Engagement",
    accentColor: "emerald",
    items: [
      {
        description:
          "Head of Developers’ Society, IIT Kharagpur — led AI/ML projects, organized workshops, and mentored early-stage developers.",
        verificationLink: { url: "#", label: "Team Page" }
      },
      {
        description:
          "Executive Member, Public Policy & Governance Society (2022–24) — applied analytics for socio-economic policy modeling.",
        verificationLink: {
          url: "https://certificate.givemycertificate.com/c/6e149c8a-bb09-48bf-bd7b-8fd41719f0db",
          label: "Certificate"
        }
      }
    ]
  }
];

// Helper for icons
const getIconForAchievement = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("academic")) return <GraduationCap className="text-sky-500 w-6 h-6" />;
  if (lower.includes("technical")) return <Code className="text-indigo-600 w-6 h-6" />;
  if (lower.includes("competition")) return <Trophy className="text-yellow-500 w-6 h-6" />;
  if (lower.includes("leadership")) return <Users className="text-emerald-500 w-6 h-6" />;
  if (lower.includes("credential")) return <Award className="text-indigo-400 w-6 h-6" />;
  return <Briefcase className="text-gray-500 w-6 h-6" />;
};

export default function Achievements() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
  const INITIAL_VISIBLE_COUNT = 2;

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 font-sans py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          My Achievements & Professional Journey
        </h2>
        <p className="text-center text-gray-600 mb-10">
          A snapshot of my academic, technical, and leadership milestones demonstrating analytical rigor, innovation, and impact.
        </p>
        <div className="space-y-6">
          {achievementData.map((category, i) => {
            const isOpen = expanded[i];
            const showAll = category.items.length > INITIAL_VISIBLE_COUNT;
            const shown = isOpen ? category.items : category.items.slice(0, INITIAL_VISIBLE_COUNT);

            return (
              <motion.div
                key={category.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden"
              >
                <div className={`flex items-center gap-3 p-5 border-b border-${category.accentColor}-200`}>
                  {getIconForAchievement(category.title)}
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>

                <div className="divide-y divide-gray-100">
                  {shown.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="mt-1.5">
                        <Award className={`w-4 h-4 text-${category.accentColor}-500`} />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed flex-1">
                        {item.description}
                      </p>
                      <a
                        href={item.verificationLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                      >
                        {item.verificationLink.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>

                {showAll && (
                  <div className="p-4 text-center border-t border-gray-100">
                    <button
                      onClick={() => toggle(i)}
                      className="text-sm font-semibold text-blue-600 flex items-center gap-2 mx-auto hover:text-blue-800"
                    >
                      {isOpen ? (
                        <>
                          Show Less <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}