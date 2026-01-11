import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import RequestCV from './pages/RequestCV';
import AboutMe from './pages/aboutme';
import { useLenis } from './hooks/useLenis';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
import RoleGateway from './components/RoleGateway'; // Import the new component

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
  useLenis();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ToastProvider>
        {/* WRAP EVERYTHING INSIDE THE GATEWAY */}
        <RoleGateway>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/request-cv" element={<RequestCV />} />
                  <Route path="/aboutme" element={<AboutMe />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </RoleGateway>
      </ToastProvider>
    </Router>
  );
}

export default App;