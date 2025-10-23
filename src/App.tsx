import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { HashRouter as  Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import RequestCV from './pages/RequestCV';
import AboutMe from './pages/aboutme';
import { useLenis } from './hooks/useLenis';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
};

function App() {
  useLenis(); // Initialize Lenis for smooth scrolling

  // Disable browser's automatic scroll restoration to prevent preserving scroll position on navigation
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-cv" element={<RequestCV />} />
            <Route path="/aboutme" element={<AboutMe />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;