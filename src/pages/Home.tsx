import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";import {
  BarChart,
  Brain,
  Code,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Cloud,
} from "lucide-react";
import SkillLogo from "../components/SkillBar";
import Achievement from "../components/Achievement";
import ProjectCard from "../components/ProjectCard";
import Experience from "../components/Experience";
import achievementData from '../data/AchievementData';
import skillsData from "../data/skillsData";
import { projects } from "../data/projectsData";
import iitkgplogo from "../data/img/me/2.png";
import myphoto from "../data/img/me/my_photo2.png";

// // Skills and Expertise section data
const skillsByCategory = skillsData;

// Achievement data structure
const achievements = achievementData;

const Home: React.FC = () => {
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const styles = {
    hero: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      fontSize: '16px', // Reduced font size
      marginTop: '60px'
    },
    '@media (max-width: 600px)': {
      hero: {
        padding: '10px',
        fontSize: '12px', // Further reduced font size for mobile
        marginTop: '60px',
      },
    },
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="min-h-[calc(80vh-px)] flex items-center justify-center mb-10" style={styles.hero}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="mb-8">
              <h1 className="text-4xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Arpit Kumar
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <img src={iitkgplogo} alt="IIT KGP" className="w-6 h-6" />
                <p className="text-1xl text-gray-750">IIT Kharagpur</p>
              </div>
              <h2 className="text-1xl md:text-1xl text-gray-800 font-semibold mb-2">
                Data Scientist & ML Engineer
              </h2>
              <p className="text-1xl md:text-1xl text-gray-700 mb-4 text-sm md:text leading-relaxed">
                Specializing in developing end-to-end machine learning solutions 
                with expertise in predictive modeling, deep learning, and 
                large-scale data processing.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-blue-600">15+</h3>
                <p className="text-sm text-gray-600">ML Projects</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-blue-600">5+</h3>
                <p className="text-sm text-gray-600">Research Papers</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-blue-600">2+</h3>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center mb-6">
              <Link
                to="/projects"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                View ML Projects <ArrowRight size={16} />
              </Link>
              {/* <Link
                to="/contact"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Me
              </Link> */}
              <Link
                to="/request-cv"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Download CV
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              <motion.a
                href="https://github.com/arpitkumar2004"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all group"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 group-hover:text-blue-600" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/arpit-kumar-shivam/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all group"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5 group-hover:text-blue-600" />
              </motion.a>
              <motion.a
                href="mailto:kumararpit17773@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3  bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all group"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 group-hover:text-blue-600" />
              </motion.a>
            </div>
          </motion.div>

          
          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              <div className="w-[320px] h-[500px] mx-auto overflow-hidden rounded-full border-4 border-blue-100 shadow-xl">
                <img
                  src={myphoto}
                  alt="Arpit Kumar"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Floating Tech Icons */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
                className="absolute -left-4 top-1/4 bg-white p-3 rounded-full shadow-lg"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  alt="Python"
                  className="w-8 h-8"
                />
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
                className="absolute -right-4 top-1/3 bg-white p-3 rounded-full shadow-lg"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
                  alt="TensorFlow"
                  className="w-8 h-8"
                />
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
                className="absolute left-1/4 -bottom-8 bg-white p-3 rounded-full shadow-lg"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg"
                  alt="PyTorch"
                  className="w-8 h-8"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full mb-10" />

      {/* About Me Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/your-professional-photo.jpg"
                  alt="Professional headshot"
                  className="w-full h-full object-cover"
                />
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full z-0" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500/5 rounded-full z-0" />
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <motion.h2 
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                About Me
              </motion.h2>
              
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="space-y-4 text-gray-600 text-sm"
              >
                <p>
                  I'm a passionate Data Scientist and Machine Learning Engineer currently pursuing my B.Tech in Chemical Engineering at IIT Kharagpur. With a deep fascination for AI and data-driven solutions, I've dedicated myself to developing innovative solutions that bridge the gap between complex data and actionable insights.
                </p>
                <p>
                  My journey in data science has been marked by successful projects in predictive modeling, computer vision, and natural language processing. I believe in the power of AI to transform industries and improve lives, and I'm constantly exploring new technologies and methodologies to push the boundaries of what's possible.
                </p>
                <p>
                  Beyond technical skills, I'm an active member of the developer community, regularly contributing to open-source projects and sharing knowledge through workshops and mentoring sessions.
                </p>
              </motion.div>

              {/* Key Points */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                className="grid grid-cols-2 gap-4 pt-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">ML Specialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">Data Analytics</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">Problem Solver</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">Team Leader</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Areas of Expertise */}
      <section className="mb-16">

          {/* Summary Text */}
          <motion.p 
            className="text-center text-gray-900 mt-10 max-w-8xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Proficient in modern machine learning frameworks, data analysis tools, and cloud technologies. 
            Experienced in developing end-to-end ML solutions and handling large-scale data processing.
          </motion.p>
        <h2 className="text-3xl font-bold mb-4 text-center">Research Interests</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Brain size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-lg font-semibold mb-3">Machine Learning</h3>
            </div>
            <p className="text-sm text-gray-600">
              Expertise in developing and deploying scalable ML models for real-world applications.
              Proficient in classification, regression, and clustering algorithms.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <BarChart size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-lg font-semibold mb-3">Data Analysis</h3>
            </div>
            
            <p className="text-sm text-gray-600">
              Advanced statistical analysis, feature engineering, and data visualization
              using Python, Pandas, and visualization libraries.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Code size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-lg font-semibold">Deep Learning</h3>
            </div>
            <p className="text-sm text-gray-600">
              Implementation of neural networks using PyTorch and TensorFlow.
              Experience with CNNs, RNNs, and Transformers.
            </p>
          </motion.div>
        </div>
        
      </section>

      {/* Project Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Showcasing innovative solutions in machine learning, computer vision, and data science
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <AnimatePresence mode="popLayout">
              <ProjectCard
                key={projects[8].id}
                {...projects[8]}
              />
              <ProjectCard
                key={projects[1].id}
                {...projects[1]}
              />
              <ProjectCard
                key={projects[2].id}
                {...projects[2]}
              />
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
            >
              View All Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      
      {/* Technical Proficiencies Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Technical Proficiencies
          </motion.h2>
          <div className="w-40 h-1 bg-blue-500 mx-auto rounded-full mb-8" />

          <div className="space-y-8">
            {/* Machine Learning & AI */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Brain className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Machine Learning & AI</h3>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {skillsByCategory["Machine Learning & AI"].map((skill) => (
                  <SkillLogo key={skill.skill} {...skill} />
                ))}
              </div>
            </div>

            {/* Data Analysis & Visualization */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <BarChart className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Data Analysis & Visualization</h3>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {skillsByCategory["Data Analysis & Visualization"].map((skill) => (
                  <SkillLogo key={skill.skill} {...skill} />
                ))}
              </div>
            </div>

            {/* Big Data & Cloud */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Cloud className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Big Data & Cloud</h3>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {skillsByCategory["Big Data & Cloud"].map((skill) => (
                  <SkillLogo key={skill.skill} {...skill} />
                ))}
              </div>
            </div>

            {/* Programming & Tools */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Programming & Tools</h3>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {skillsByCategory["Programming & Tools"].map((skill) => (
                  <SkillLogo key={skill.skill} {...skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-16">
        {/* <h2 className="section-title">Experience</h2> */}
        <Experience />
      </section>

      {/* Achievements and Leadership Section */}
      <section className="py-3 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Achievements & Leadership
          </motion.h2>
          <div className="w-40 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
          <Achievement sections={achievements} />
        </div>
      </section>
    </div>
  );
};


export default Home;