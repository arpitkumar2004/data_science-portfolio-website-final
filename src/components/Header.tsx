import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
  { href: '/request-cv', label: 'Download CV' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  
  // --- FIX START ---
  // Ref to target the header element and state to store its height
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  // --- FIX END ---

  const location = useLocation();

  // Effect to handle the sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Make sticky only after scrolling past the header's height
      setIsSticky(window.scrollY > (headerRef.current?.offsetHeight || 50));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // --- FIX START ---
  // Effect to measure the header's height and update the state
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    // Set height on mount and on window resize
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);
  // --- FIX END ---

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    // Use a Fragment to return the header and its placeholder
    <>
      <header
        ref={headerRef} // Attach the ref here
        className={clsx(
          'w-full bg-white/80 backdrop-blur-md transition-shadow duration-300 ease-in-out',
          {
            'fixed top-0 left-0 right-0 z-50 shadow-md': isSticky,
            'relative shadow-sm': !isSticky, // Use relative position when not sticky
          }
        )}
      >
        <div className="max-w-screen-lg mx-auto px-4 py-4 flex justify-between items-center">
          {/* Rest of the header content is unchanged... */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Arpit Kumar
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* <a
              href="/request-cv"
              // download
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Download CV
            </a> */}
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden z-50 p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile menu with improved UX */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-all duration-500"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        <div
          id="mobile-menu"
          className={clsx(
            'md:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-white to-gray-50 transition-all duration-500 ease-out z-50',
            {
              'translate-x-0 opacity-100': isMenuOpen,
              '-translate-x-full opacity-0': !isMenuOpen
            }
          )}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-10 px-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-3xl font-medium text-gray-800 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: isMenuOpen ? 'slideInFromLeft 0.4s ease-out forwards' : 'none'
                }}
              >
                {link.label}
              </Link>
            ))}
            {/* <a
              href="/request-cv"
              // download
              className="text-2xl bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Download CV
            </a> */}
          </nav>
        </div>
      </header>

      {/* --- THE FIX ---
        Render a placeholder div with the same height as the header.
        This div only appears when the header is sticky, preventing the content below from jumping up.
      */}
      {isSticky && <div style={{ height: `${headerHeight}px` }} />}
    </>
  );
};

export default Header;