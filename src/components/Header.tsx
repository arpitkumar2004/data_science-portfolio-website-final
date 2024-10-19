import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white shadow-md transition-all duration-300 ${
        isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Arpit Kumar
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/projects"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/request-cv"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Request CV
          </Link>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 px-4 py-2 bg-white">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              to="/request-cv"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Request CV
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
