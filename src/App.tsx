import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigationType } from 'react-router-dom';
import axios from 'axios';
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
import { buildApiUrl, API_ENDPOINTS } from './config/api';
import DocsLayout from './layouts/DocsLayout';
import DocsViewer from './components/DocsViewer';
import ThemeToggle from './components/ThemeToggle';

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const lenis = useLenis();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const stored = sessionStorage.getItem(`scroll:${pathname}`);
    const targetY = stored ? Number(stored) : 0;

    if (navigationType === 'POP' && lastPathRef.current !== pathname) {
      if (lenis) {
        lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }

    lastPathRef.current = pathname;
  }, [pathname, navigationType, lenis]);

  return null;
};

const MainApp = () => {
  useLenis();

  // --- ADDED: RENDER WAKE-UP TRICK ---
  useEffect(() => {
    const wakeServer = async () => {
      try {
        // Hitting your /hello endpoint to trigger Render spin-up
        await axios.get(buildApiUrl(API_ENDPOINTS.HEALTH));
        console.log("⚡ Backend Connectivity: Active");
      } catch {
        // If it fails, it's usually just the server still booting up
        console.log("⏳ System: Waiting for backend spin-up...");
      }
    };
    wakeServer();
  }, []);

  return (
    <ToastProvider>
      {/* WRAP EVERYTHING INSIDE THE GATEWAY */}
      <RoleGateway>
        <div className="flex flex-col min-h-screen bg-gray-50 text-slate-900 dark:bg-[#020617] dark:text-slate-100">
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
          <ThemeToggle />
          {/* <SpeedInsights /> */}
        </div>
      </RoleGateway>
    </ToastProvider>
  );
};

function App() {
  return (
    <Router>
      <ScrollRestoration />
      <Routes>
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="/docs/general/overview.md" replace />} />
          <Route path="*" element={<DocsViewer />} />
        </Route>
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;