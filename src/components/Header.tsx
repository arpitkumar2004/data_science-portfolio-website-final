import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X, Download, ShieldCheck } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = () => {
      const userRole = localStorage.getItem('userRole');
      const adminToken = sessionStorage.getItem('adminToken');
      setIsAdmin(userRole?.toLowerCase() === 'admin' && !!adminToken);
    };

    checkAdminStatus();

    // Listen for role updates
    const handleRoleUpdate = () => checkAdminStatus();
    window.addEventListener('role:updated', handleRoleUpdate);

    return () => window.removeEventListener('role:updated', handleRoleUpdate);
  }, []);

  // Close menu on navigation
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const brandBlue = "rgb(37 99 235)";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled 
            ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-100' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div 
              className="p-1.5 rounded-lg text-blue-600 transition-transform group-hover:rotate-12"
              // style={{ backgroundColor: brandBlue }}
            >
              <Terminal size={30} strokeWidth={3.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-blue-600 leading-none">
                ARPIT KUMAR
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-900 tracking-widest uppercase mt-0.5">
                IIT Kharagpur // AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-bold transition-colors ${
                    isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            {/* Admin Link - Only show if user is admin */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`relative px-4 py-2 text-sm font-bold transition-colors ${
                  location.pathname === '/admin' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck size={16} className="inline mr-1" />
                Admin
                {location.pathname === '/admin' && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                  />
                )}
              </Link>
            )}

            <div className="h-4 w-[1px] bg-slate-200 mx-4" />

            <Link
              to="/request-cv"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
              style={{ backgroundColor: brandBlue }}
            >
              <Download size={16} />
              <span>Resume</span>
            </Link>

          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Navigation Menu</span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-4xl font-black tracking-tighter ${
                    location.pathname === link.href ? 'text-blue-600' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Admin Link - Mobile */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`text-4xl font-black tracking-tighter flex items-center gap-3 ${
                    location.pathname === '/admin' ? 'text-blue-600' : 'text-slate-300'
                  }`}
                >
                  <ShieldCheck size={32} />
                  Admin
                </Link>
              )}

              <div className="h-[1px] w-full bg-slate-100 my-4" />
              
              <Link
                to="/request-cv"
                className="flex items-center justify-between p-6 rounded-2xl bg-slate-900 text-white"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Download CV</span>
                  <span className="text-xs text-slate-400">Latest Research PDF</span>
                </div>
                <Download size={24} className="text-blue-500" />
              </Link>

              <div className="mt-auto pb-12">
                <p className="text-[10px] font-mono text-slate-400">© 2026 ARPIT KUMAR. RESEARCH_VER_4.0</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> 

      {/* Spacing for fixed header */}
      <div className="h-24" />
    </>
  );
};

export default Header;