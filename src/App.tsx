import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios'; // Added axios
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import RequestCV from './pages/RequestCV';
import AboutMe from './pages/aboutme';
import AdminDashboardPage from './pages/AdminDashboard';
import { useLenis } from './hooks/useLenis';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
import RoleGateway from './components/RoleGateway';

// --- ADDED: API BASE URL ---
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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

  // --- ADDED: RENDER WAKE-UP TRICK ---
  useEffect(() => {
    const wakeServer = async () => {
      try {
        // Hitting your /hello endpoint to trigger Render spin-up
        await axios.get(`${API_BASE_URL}/hello`);
        console.log("⚡ Backend Connectivity: Active");
      } catch (err) {
        // If it fails, it's usually just the server still booting up
        console.log("⏳ System: Waiting for backend spin-up...");
      }
    };
    wakeServer();
  }, []);

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
                  <Route path="/admin" element={<AdminDashboardPage />} />
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