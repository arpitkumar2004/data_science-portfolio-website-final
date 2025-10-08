import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
            className="md:hidden z-50"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu remains the same */}
        <div
          id="mobile-menu"
          className={clsx(
            'md:hidden fixed top-0 left-0 w-full bg-white transition-transform duration-300 ease-in-out',
            { 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }
          )}
        >
          <nav className="flex flex-col items-center justify-center h-screen space-y-8">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-2xl text-gray-800">
                {link.label}
              </Link>
            ))}
            {/* <a
              href="/request-cv"
              // download
              className="text-2xl bg-blue-600 text-white px-6 py-3 rounded-lg"
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