import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  BarChart,
  Brain,
  Code,
  Award,
  Github,
  Linkedin,
  Mail,
  Building2,
} from "lucide-react";
import SkillBar from "../components/SkillBar";
import Achievement from "../components/Achievement";
import ProjectCard from "../components/ProjectCard";
import Experiences from "../components/Experience";

// Skills and Expetise section data
const skills = [
  {
    skill: "Python",
    level: 90,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    skill: "Machine Learning",
    level: 85,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    skill: "Data Analysis",
    level: 88,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  {
    skill: "Deep Learning",
    level: 80,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    skill: "SQL",
    level: 85,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    skill: "Data Visualization",
    level: 82,
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
  },
];


// Expereince Section Data

const experiences = [
  {
    icon: <Building2 size={32} />,
    title: "Development Head at Developers' Society, IIT-Kharagpur",
    description:
      "Promoted to Developer Head in Developers' Society, IIT Kharagpur in 2024 from Development Member since 2023.",
  },
  {
    icon: <Building2 size={32} />,
    title: "Executive Member at PPGS, IIT-Kharagpur",
    description:
      "Worked as Executive Member in Public Policy and Governance Society, IIT Kharagpur from 2022 to 2024.",
  },
  {
    icon: <Building2 size={32} />,
    title: "Web-development Member at ChEA, IIT-Kharagpur",
    description:
      "Worked as Web Team Member in Chemical Engineering Association, IIT Kharagpur from 2023 to 2024.",
  },
  {
    icon: <Building2 size={32} />,
    title: "Associate Member at SBRC, IIT-Kharagpur",
    description:
      "Worked as Associate Memeber in Students' Branding and Relations Cell, IIT Kharagpur from 2023 to 2024.",
  },
]
// Achievement Section Data

const achievements = [
  {
    icon: <Award size={32} />,
    title: "Top 20 in DTL Quant-challenge 2024",
    description:
      "Acheved rank in top 20 in the DTL Quant-Challenge 2024 in all over India and 4th in college ",
  },
  {
    icon: <Award size={32} />,
    title: "Gold in GC Data - Analytics IIT KGP",
    description:
      "Received Gold in the General Championship Data-Analyitcs 2024 (Inter-Hall Competiotion) in IIT Kharagpur",
  },
  {
    icon: <Award size={32} />,
    title: "Silver in Open IIT Data - Analytics",
    description:
      "Received Silver in the Open-IIT Data-Analytics 2023 among in IIT Kharagpur community",
  },
  {
    icon: <Award size={32} />,
    title: "Silver in Open IIT Case - Study",
    description:
      "Received Silver in the Open-IIT Case-Study 2023 among in IIT Kharagpur community",
  },
  {
    icon: <Award size={32} />,
    title: "Silver in GC ChemQuest",
    description:
      "Received Silver in the General Championship ChemQuest 2023 in IIT Kharagpur",
  },
  {
    icon: <Brain size={32} />,
    title: "Secured Under 1500 in JEE - Adavance",
    description:
      "Acheived rank under 1500 in JEE Advanced 2022 among 0.15 Mn+ students all over India in 2022",
  },
  {
    icon: <Brain size={32} />,
    title: "Secured 99.42 %ile in JEE - mains",
    description:
      "Acheived 99.42 percentile in JEE mains 2022 among 1 Mn+ students all over India in 2022",
  },
];

// Projects Section Data

const featuredProjects = [
  // ... (previous project data)
  {
    id: 1,
    title: "Customer-Satisfaction using MLOps (ZenML)",
    description:
      "Developed and deployed a regression model pipeline to predict customer review scores, enhancing forecasting accuracy by 20% through feature engineering and automated monitoring.",
    image:
      "https://plus.unsplash.com/premium_vector-1683134673277-bfcd86efa0f7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["MLOps", "Regression", "ZenML", "MLflow", "Data Engineering"],
  },

  {
    id: 2,
    title: "House Price Prediction using MLOps (ZenML)",
    description:
      "Developed a dynamic, end-to-end pipeline for house price prediction, with automated deployment and real-time forecasting capabilities.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: [
      "MLOps",
      "Regression",
      "ZenML",
      "Feature Engineering",
      "Real-time Prediction",
    ],
  },
  {
    id: 9,
    title: "Recommendation Engine for E-commerce Platform",
    description:
      "Built a personalized recommendation engine, increasing average order value by 15% and customer engagement by 22%.",
    image:
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Recommendation Systems", "Collaborative Filtering", "Python"],
  },
];

const Home: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Introduction Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Arpit Kumar
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">
              <h3
                style={{
                  background: "linear-gradient(90deg, #0056b3, #00aaff)", // Gradient color
                  WebkitBackgroundClip: "text", // Clip background to text
                  WebkitTextFillColor: "transparent", // Make text fill transparent
                  color: "#0056b3", // Dark blue color
                  margin: "20px 0", // Space around the heading
                  fontSize: "0.9em", // Larger font size
                  fontFamily: "Roboto, sans-serif", // Updated font family to Roboto
                }}
              >
                IIT Kharagpur
              </h3>{" "}
              Data Science, Machine Learning, AI Enthusiast
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Transforming complex data into actionable insights and innovative
              AI solutions. Innovating with data to develop transformative AI
              solutions that solve real-world problems.
            </p>
            <div className="flex space-x-4 mb-8">
              <Link to="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Me
              </Link>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/arpitkumar2004"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/arpit-kumar-shivam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.kaggle.com/kumararpitiitkgp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.5-6.5l2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5-2.5 2.5-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5z" />
                </svg>
              </a>
              <a
                href="mailto:arpit.kumar.iitkgp@gmail.com"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div
            className="md:w-1/2 max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
            style={{ backgroundColor: "#f10f10f10" }} // Replace with your website's background color
          >
            <img
              src="my_photo2.png"
              alt="Arpit Kumar"
              className="rounded-lg w-full h-auto" // Make the image responsive
            />
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section className="mb-16">
        <h2 className="section-title">Featured Projects</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {featuredProjects.slice(0, 6).map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center">
          <Link
            to="/projects"
            className="btn btn-primary inline-flex items-center"
          >
            View More Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Skill And Expertise Section */}
      {/* Skill And Expertise Section */}
      <section className="mb-16">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill.skill} logo={skill.logo} />
          ))}
        </div>
      </section>

      {/* Experience  */}
      <section className="mb-16">
        <h2 className="section-title">Experiences</h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Experiences experiences={experiences} />
        </motion.div>
      </section>

      {/* Achievement  */}
      <section className="mb-16">
        <h2 className="section-title">Achievements</h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Achievement achievements={achievements} />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

