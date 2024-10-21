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
} from "lucide-react";
import SkillBar from "../components/SkillBar";
import Achievement from "../components/Achievement";
import ProjectCard from "../components/ProjectCard";

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

// Achievement Section Data

const achievements = [
  {
    icon: <Award size={32} />,
    title: "Top Data Scientist Award",
    description:
      "Recognized as the top-performing data scientist in the annual company awards.",
  },
  {
    icon: <Brain size={32} />,
    title: "AI Research Publication",
    description:
      "Published a research paper on advanced AI techniques in a leading academic journal.",
  },
  {
    icon: <BarChart size={32} />,
    title: "Data-Driven Cost Savings",
    description:
      "Implemented data analytics solution resulting in $2M annual cost savings for the company.",
  },
  {
    icon: <Code size={32} />,
    title: "Open Source Contribution",
    description:
      "Major contributor to popular data science libraries, with over 1000 GitHub stars.",
  },
];

// Projects Section Data

const featuredProjects = [
  // ... (previous project data)
  {
    id: 4,
    title: "Real-time Fraud Detection System",
    description:
      "Implemented a real-time fraud detection system for a financial institution, reducing fraudulent transactions by 40%.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Anomaly Detection", "Apache Spark", "Machine Learning"],
  },

  {
    id: 5,
    title: "Computer Vision for Quality Control",
    description:
      "Developed a computer vision system for automated quality control in manufacturing, improving defect detection accuracy by 35%.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Computer Vision", "Deep Learning", "OpenCV"],
  },
  {
    id: 6,
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
          <div className="md:w-1/2 max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
            <img
              src="https://images.unsplash.com/photo-1719212752796-5d9767ea0f83?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Arpit Kumar"
              className="rounded-lg shadow-lg w-full h-auto" // Make the image responsive
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

      {/* Achievement  */}
      <section className="mb-16">
        <h2 className="section-title">Experiences & Achievements</h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Achievement {...achievement} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
