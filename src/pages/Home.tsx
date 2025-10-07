import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Brain,
  Code,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";
// import Achievements from "../components/Achievement";
import ProjectCard from "../components/ProjectCard";
import Experience from "../components/Experience";
// import achievementData from '../data/AchievementData';
import { projects } from "../data/projectsData";
import iitkgplogo from "../data/img/me/2.png";
import myphoto from "../data/img/me/my_photo2.png";
import TechnicalProficiencies from "../data/skillsData";
import Achievements from "../data/AchievementData";

// Achievement data structure
// const achievements = achievementData;

const Home: React.FC = () => {
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const GoogleScholar = () => (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 26 26"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Google Scholar</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"
      />
    </motion.svg>
  );

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
                <p className="text-1xl text-gray-750">IIT Kharagpur | Applied ML & AI Researcher</p>
              </div>
              <h2 className="text-1xl md:text-1xl text-gray-800 font-semibold mb-2">
                Applied ML & Quantitative Finance Enthusiast
              </h2>
              <p className="text-1xl md:text-1xl text-gray-700 mb-4 text-sm md:text leading-relaxed">
                Building intelligent, data-driven systems that bridge Machine Learning, Engineering, and Quantitative Finance. I specialize in developing scalable AI solutions for prediction, optimization, and decision-making — transforming research into real-world impact.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-blue-600">9+</h3>
                <p className="text-sm text-gray-600">Deployed ML Solutions</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-blue-600">3+</h3>
                <p className="text-sm text-gray-600">Published & Ongoing Research</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-blue-600">2+</h3>
                <p className="text-sm text-gray-600">Years in Applied AI Research</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center mb-6">
              <Link
                to="/projects"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Explore Projects <ArrowRight size={16} />
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
                Download Resume
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              <motion.a
                href="https://github.com/arpitkumar2004"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all group"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 group-hover:text-blue-600" />
              </motion.a>

              <motion.a
                href="https://scholar.google.com/citations?user=arpitkumar2004&hl=en"
                target="_blank"
                title="Google Scholar"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-all group"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.95 }}
              >
                <GoogleScholar className="w-5 h-5 group-hover:text-blue-600" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/arpit-kumar-shivam/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all group"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5 group-hover:text-blue-600" />
              </motion.a>
              <motion.a
                href="mailto:kumararpit17773@gmail.com"
                target="_blank"
                title="Email"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all group"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 group-hover:text-blue-600" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-[340px] h-[520px]">
              {/* Gradient Halo Background */}

              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-200 via-indigo-200 to-purple-200 blur-3xl opacity-60 animate-pulse"></div>

              {/* Profile Image */}
              <div className="relative z-10 w-[320px] h-[500px] mx-auto overflow-hidden rounded-[2rem] border-[3px] border-blue-200 shadow-2xl hover:shadow-blue-400/50 transition-all duration-500 hover:scale-[1.03]">
                <img
                  src={myphoto}
                  alt="Arpit Kumar"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}

      <h2 className="text-2xl font-bold mb-4 text-center">About Me</h2>
      <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full mb-10" />

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
                  src={myphoto}
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
              {/* <motion.h2
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                About Me
              </motion.h2> */}


              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="space-y-4 text-gray-600 text-xs gap-6"
              >
                <p>Hi, My name is <strong>Arpit Kumar</strong>, an aspiring Machine Learning and AI Researcher. I’m a Machine Learning and AI Researcher passionate about building intelligent systems that unite data science, applied engineering, and applied finance to solve complex, real-world problems.
                  I’m currently pursuing an <strong>Integrated Dual Degree (B.Tech + M.Tech)</strong> in Chemical Engineering at <strong>IIT Kharagpur</strong>.</p>
                <p>
                  My academic and research journey revolves around leveraging AI for optimization, prediction, and discovery across engineering and financial systems. Over the years, I’ve worked on projects spanning <strong>Statistical Machine Learning, Time Series Forecasting, Quantitative Finance</strong>, and <strong>AI-driven Process Systems</strong>. I thrive at the intersection of mathematical modeling and machine learning, where I design models that not only predict but also explain and optimize complex systems.
                </p>
                <p>
                  With hands-on experience in <strong>predictive modeling, computer vision, NLP, and data visualization</strong>, I’m constantly exploring new technologies to push the boundaries of applied AI.
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
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">Machine Learning Specialist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">Predictive Modeling & Forecasting</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">Time-Series Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-medium text-gray-700">Optimization & Statistical Inference</span>
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
          className="text-center text-gray-900 mt-10 max-w-8xl mx-auto mb-10 text-sm md:text-base px-4 leading-relaxed "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          I specialize in developing scalable AI solutions for prediction, optimization, and decision-making — transforming research into real-world impact.
        </motion.p>
        <h2 className="text-2xl font-bold mb-4 text-center">Research Interests</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Brain size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-sm font-semibold mb-3">Applied AI in Engineering Systems</h3>
            </div>
            <p className="text-xs text-gray-600">
              Integration of machine learning with engineering processes for optimization, anomaly detection, and intelligent control. Focused on data-driven discovery and efficiency enhancement in process systems.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Brain size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-sm font-semibold mb-3">Research & Innovation</h3>
            </div>
            <p className="text-xs text-gray-600">
              Passionate about exploring the intersection of AI, mathematics, and domain science. Dedicated to developing interpretable and scalable models that bridge research and real-world impact.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Brain size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-sm font-semibold mb-3">Machine Learning Systems</h3>
            </div>
            <p className="text-xs text-gray-600">
              Expertise in developing robust ML models for predictive analytics, optimization, and decision-making. Skilled in supervised and unsupervised learning, including regression, classification, and ensemble methods.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <BarChart size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-sm font-semibold mb-3">Data Science & Analytics</h3>
            </div>

            <p className="text-xs text-gray-600">
              Proficient in extracting insights from complex datasets through feature engineering, statistical modeling, and visualization. Strong command of Python, Pandas, and advanced analytics tools.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Code size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-sm font-semibold">Deep Learning & Neural Networks</h3>
            </div>
            <p className="text-xs text-gray-600">
              Hands-on experience with neural networks using PyTorch and TensorFlow. Worked with CNNs, RNNs, LSTMs, and Transformers for applications in vision, NLP, and time-series forecasting.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <Code size={32} className="mr-6 mb-1 text-blue-600" />
              <h3 className="text-sm font-semibold">Quantitative Finance</h3>
            </div>
            <p className="text-xs text-gray-600">
              Application of AI and mathematical modeling for market prediction, alpha generation, and portfolio optimization. Experienced in time-series analysis, risk modeling, and simulation-based strategies.
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm">
              Showcasing innovative solutions in machine learning, computer vision, and data science
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <AnimatePresence mode="popLayout">
              <ProjectCard
                key={projects[3].id}
                {...projects[3]}
              />
              <ProjectCard
                key={projects[4].id}
                {...projects[4]}
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
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium bg-transparent hover:bg-blue-50 border border-blue-500 hover:border-blue-600 px-5 py-3 rounded-lg transition"
            >
              View All Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* Technical Proficiencies Section */}
      <section className="py-5">
        <TechnicalProficiencies />
      </section>

      {/* Experience Section */}
      <section className="mb-16">
        <Experience />
      </section>

      {/* Achievements and Leadership Section */}
      <section className="bg-gray-50">
        <Achievements />
      </section>
    </div>
  );
};


export default Home;