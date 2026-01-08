import { motion } from 'framer-motion';
// import { details } from 'framer-motion/client';
import { useState } from 'react';

import {
  Award,
  GraduationCap,
  Users,
  Trophy,
  Code,
  Briefcase,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Updated + restructured data
export const achievementData = [
  {
    title: "My Academic & Research Profile",
    accentColor: "sky",
    items: [
      {
        description:
          "Pursuing an Integrated Dual Degree (B.Tech + M.Tech) in Chemical Engineering at IIT Kharagpur, specializing in Process Systems Engineering with a focus on AI-driven modeling, optimization, and applied data science in engineering systems.",
        verificationLink: { url: "https://iitkgp.ac.in/", label: "View Details", page: "#", pagelabel: "About IIT Kharagpur" }
      },
      {
        description:
          "Awarded the Merit-cum-Means Scholarship at IIT Kharagpur (2023) in recognition of consistent academic excellence, strong research orientation, and outstanding overall performance.",
        verificationLink: { url: "/", label: "View Award", page: "#", pagelabel: "View Award" }
      },
      {
        description:
          "Participated in multiple International Conferences, Workshops, and Short-Term Courses organisde by  SPARC on AI and its interdisciplinary applications in engineering. Gained exposure to advanced computational modelling, electrochemical systems, and the integration of machine learning in real-world engineering processes.",
        verificationLink: { url: "/#projects", label: "View Conference Details", page: "#", pagelabel: "View Conference Details" }
      },
      {
        description:
          "Performed advanced process modeling under Prof. Sourav Mondal, focusing on multicomponent distillation systems. Designed and optimized MeOH–EtOH–PrOH columns and debutanizers using FUG methods, achieving 98% methanol purity and 20% energy savings through simulation-based optimization.",
        verificationLink: {
          url: "https://github.com/arpitkumar2004/Assigment-PMS",
          label: "GitHub Repository", page: "#", pagelabel: "GitHub Repository"
        }
      },
      // {
      //   description:
      //     "Performed energy-efficient process optimization through pinch analysis and COMSOL heat-exchanger simulations, reducing utility costs by 30% and enhancing heat transfer by 15%.",
      //   verificationLink: { url: "#", label: "View Simulation" }
      // },
      // {
      //   description:
      //     "Developed sustainable process models integrating Machine Learning — created Neural Network-based boiling point prediction models (R² > 0.85) and automated flash separations improving Benzene recovery to 95%.",
      //   verificationLink: { url: "#", label: "Learn More" }
      // },
      {
        description:
          "Simulated key unit operations—heat exchangers, distillation columns, and CSTR/PFR reactors—in Aspen HYSYS under Prof. Nikita Saxena, applying chemical process principles to develop industrially relevant process solutions.",
        verificationLink: {
          url: "https://github.com/arpitkumar2004/CAPE-Laboratory-Simulations",
          label: "GitHub Repository", page: "#", pagelabel: "GitHub Repository"
        },
      },
    ]
  },
  {
    title: "Technical & Coding Credentials in Competitive Programming",
    accentColor: "indigo",
    items: [
      {
        description:
          "Achieved Expert title (Max Rating: 1612, Handle: _Badassium), demonstrating strong algorithmic thinking. Ranked 203 in Div 2 Round 1032, showcasing competitive problem-solving under pressure.",
        verificationLink: {
          url: "https://codeforces.com/profile/_Badassium", label: "Profile", page: "#", pagelabel: "Codeforces Profile"
        }
      },
      {
        description:
          "ML/DL & Quantitative Research Expertise — Built modular ML pipelines and applied interpretable AI for real-world datasets. Skilled in Python, PyTorch, TensorFlow, Scikit-learn, and Streamlit for end-to-end solutions.",
        verificationLink: { url: "/#projects", label: "Explore Projects", page: "https://github.com/arpitkumar2004", pagelabel: "View Code" }
      }
    ]
  },
  {
    title: "Glimpses of Technical Projects & Applied AI Systems",
    accentColor: "blue",
    items: [
      {
        description:
          "Developed a Deep Learning Text Summarization System processing 100K+ documents, achieving 35% ROUGE-L F1 improvement and reducing manual review workload by 60%.",
        verificationLink: {
          url: "/#projects", label: "Explore Project", page: "https://github.com/arpitkumar2004/Text-Summarizer-Project", pagelabel: "View Code"
        }
      },
      {
        description:
          "Built a Social and Healthcare Risk Scorecard for Evva Health using a Voting Ensemble (BERT + Naive Bayes + Decision Tree), achieving 82.89% accuracy and automating real-time risk scoring.",
        verificationLink: {
          url: "https://github.com/arpitkumar2004/DA96_webapp",
          label: "View Code", page: "/#projects", pagelabel: "Explore Project"
        }
      },
      {
        description:
          "Designed an AI-driven price prediction pipeline for Amazon ML Challenge 2025 — Multimodal Price Prediction Challenge — using GBM, LightGBM, CatBoost, and XGBoost. Achieved a SMAPE of 42.89, ranking 42nd out of 8690 teams on the competition leaderboard.",
        verificationLink: { url: "/#projects", label: "See Case Study", page: "https://github.com/arpitkumar2004/A_ML_25", pagelabel: "View Code" }
      }
    ]
  },
  {
    title: "Competitions & Hackathons in Data Science & AI",
    accentColor: "yellow",
    items: [
      {
        description:
          "Amazon ML Challenge 2025 — Multimodal Price Prediction Challenge 2025 — Built a cutting-edge ML pipeline combining text, images, and tabular data. Ranked top 0.5% globally with SMAPE 42.89%, showcasing exceptional performance in the competition.",
        verificationLink: { url: "/#projects", label: "See Case Study", page: "https://github.com/arpitkumar2004/A_ML_25", pagelabel: "View Code" }
      },
      {
        description:
          "Volatility Curve Prediction — NK Securities Hackathon 2025 — Pioneered a geometric ensembling strategy with Transformers for volatility forecasting. Delivered highly accurate predictions integrating ML, stats, and geometric principles.",
        verificationLink: { url: "#", label: "Competition Details", page: "#", pagelabel: "Competition Details" }
      },
      {
        description:
          "DTL Quant Challenge 2024 — Top 20 Nationally — Engineered a dynamic alpha model capturing diverse market regimes. Ranked 19th nationally, proving robust performance and scored 2.42 in-sample, 1.32 out-sample, and 0.48 in real-time",
        verificationLink: { url: "#", label: "Leaderboard", page: "#", pagelabel: "Leaderboard" }
      },
      {
        description:
          "Gold Medal — General Championship Data Analytics by Evva Health '2023 — Built a Healthcare Risk Scorecard using ensemble AI models. Achieved 82.89% accuracy and slashed manual data collection by 60% with a real-time app.",
        verificationLink: { url: "#", label: "Report", page: "#", pagelabel: "Report" }
      },
      {
        description:
          "Silver Medal — Open IIT Data Analytics — Predicted city footfall using advanced time-series and ensemble models. Secured 2nd place, achieving 86.63% accuracy with actionable forecasts.",
        verificationLink: { url: "#", label: "Report", page: "#", pagelabel: "Report" }
      },
      {
        description:
          "Bronze Medal — General Championship ChemQuest — Investigated Electromagnetic Interference (EMI) threats in bio & electronic systems, proposing novel shielding materials. Achieved 40 dB attenuation, highlighting practical real-world solutions.",
        verificationLink: { url: "#", label: "Research Summary", page: "#", pagelabel: "Research Summary" }
      },
      {
        description:
          "SPARC International Workshops & Conferences — Collaborated with global experts on advanced electrochemical systems and smart engineering. Gained hands-on knowledge in multiphase flows, ion transport, and industrial ML integration.",
        verificationLink: { url: "#", label: "Workshop Details", page: "#", pagelabel: "Workshop Details" }
      }
    ]
  },
  {
    title: "Leadership & Professional Engagement",
    accentColor: "emerald",
    items: [
      {
        description:
          "Head of Developers’ Society, IIT Kharagpur — led several AI/ML projects, organized workshops, and mentored early-stage developers.",
        verificationLink: { url: "#", label: "Team Page", page: "#", pagelabel: "Team Page" }
      },
      {
        description:
          "Executive Member, Public Policy & Governance Society (2022–24) — applied analytics for socio-economic policy modeling and policy research.",
        verificationLink: {
          url: "https://certificate.givemycertificate.com/c/6e149c8a-bb09-48bf-bd7b-8fd41719f0db",
          label: "Certificate", page: "https://ppgsiitkgp.in/", pagelabel: "View Website "
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
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          My Achievements & Professional Journey
        </h2>
        <div className="w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-10" />

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
                <div className={`flex items-center gap-3 p-3 md:p-5 border-b border-${category.accentColor}-200`}>
                  <div className="w-5 h-5 md:w-6 md:h-6">
                    {getIconForAchievement(category.title)}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>

                <div className="divide-y divide-gray-100">
                  {shown.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 md:gap-4 p-3 md:p-5 hover:bg-slate-50 transition-colors"
                    >
                      <div className="mt-1.5">
                        <Award className={`w-3 h-3 md:w-4 md:h-4 text-${category.accentColor}-500`} />
                      </div>
                      <p className="text-gray-700 text-xs md:text-sm leading-relaxed flex-1">
                        {item.description}
                        {item.verificationLink.url !== "#" && (
                          <a
                            href={item.verificationLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline hover:text-blue-800 font-medium ml-2 inline-flex items-center gap-1 md:gap-2 gap-1"
                          >
                            {item.verificationLink.label}
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                          </a>
                        )}
                        {item.verificationLink.page !== "#" && (
                          <a
                            href={item.verificationLink.page}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline hover:text-blue-800 font-medium ml-2 inline-flex items-center gap-1 md:gap-2 gap-1"
                          >
                            {item.verificationLink.pagelabel}
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                          </a>
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {showAll && (
                  <div className="p-3 md:p-4 text-center border-t border-gray-100">
                    <button
                      onClick={() => toggle(i)}
                      className="text-xs md:text-sm font-semibold text-blue-600 flex items-center gap-2 mx-auto hover:text-blue-800"
                    >
                      {isOpen ? (
                        <>
                          Show Less <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
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