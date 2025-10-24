import React from 'react';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          {/* Left: About/Contact */}
          <motion.div variants={itemVariants} className="mb-4 md:mb-0 max-w-xs">
            <h3 className="font-bold text-lg mb-2">Arpit Kumar</h3>
            <p className="text-gray-300 text-sm mb-2">
              Data Science &amp; ML enthusiast passionate about building impactful solutions with data and AI.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center text-gray-400 text-xs mb-1"
            >
              <Mail size={16} className="mr-2" />
              <a href="mailto:kumararpit17773@gmail.com" className="hover:text-blue-400 transition-colors duration-300">kumararpit17773@gmail.com</a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center text-gray-400 text-xs"
            >
              <MapPin size={16} className="mr-2" />
              <span>Lucknow, Uttar Pradesh, India</span>
            </motion.div>
          </motion.div>
          {/* Center: Quick Links */}
          <motion.div variants={itemVariants} className="mb-4 md:mb-0">
            <h4 className="font-semibold mb-2 text-base">Quick Links</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              {[
                { href: "/", text: "Home", isHash: false },
                { href: "#projects", text: "Projects", isHash: true },
                { href: "#aboutme", text: "About Me", isHash: true },
                { href: "#contact", text: "Contact", isHash: true },
                { href: "#request-cv", text: "Resume", isHash: true },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5, color: "#60a5fa" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link.isHash ? (
                    <a href={`${import.meta.env.BASE_URL}${link.href}`} className="hover:text-blue-400 transition-colors duration-300">{link.text}</a>
                  ) : (
                    <Link to={link.href} className="hover:text-blue-400 transition-colors duration-300">{link.text}</Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          {/* Right: Socials */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-2 text-base">Follow me on</h4>
            <div className="flex space-x-4">
              {[
                { href: "https://github.com/arpitkumar2004", Icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/arpit-kumar-shivam/", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://twitter.com/yourusername", Icon: Twitter, label: "Twitter" },
              ].map(({ href, Icon, label }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300"
                  aria-label={label}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        {/* Bottom: Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400"
        >
          &copy; 2025 Arpit Kumar | All rights reserved | Made with ❤️ by Arpit Kumar with React &amp; Tailwind CSS
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
