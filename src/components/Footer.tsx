import React from 'react';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left: About/Contact */}
          <div className="mb-4 md:mb-0 max-w-xs">
            <h3 className="font-bold text-lg mb-2">Arpit Kumar</h3>
            <p className="text-gray-300 text-sm mb-2">
              Data Science &amp; ML enthusist passionate about building impactful solutions with data and AI.
            </p>
            <div className="flex items-center text-gray-400 text-xs mb-1">
              <Mail size={16} className="mr-2" />
              <a href="mailto:arpitkumar2004@gmail.com" className="hover:text-blue-400">kumararpit17773@gmail.com</a>
            </div>
            <div className="flex items-center text-gray-400 text-xs">
              <MapPin size={16} className="mr-2" />
              <span>Lucknow, Uttar Pradesh, India</span>
            </div>
          </div>
          {/* Center: Quick Links */}
          <div className="mb-4 md:mb-0">
            <h4 className="font-semibold mb-2 text-base">Quick Links</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-blue-400">Home</a>
              </li>
              <li>
                <a href="/#projects" className="hover:text-blue-400">Projects</a>
              </li>
              <li>
                <a href="/#aboutme" className="hover:text-blue-400">About Me</a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-blue-400">Contact</a>
              </li>
              <li>
                <a href="/#request-cv" className="hover:text-blue-400">Resume</a>
              </li>
            </ul>
          </div>
          {/* Right: Socials */}
          <div>
            <h4 className="font-semibold mb-2 text-base">Connect Via</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/arpitkumar2004"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/arpit-kumar-shivam/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom: Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
          &copy; 2025 Arpit Kumar. All rights reserved. | Built with React &amp; Tailwind CSS
        </div>
      </div>
    </footer>
  );
};

export default Footer;
