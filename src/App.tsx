import { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigationType } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import { useLenis } from './hooks/useLenis';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
import RoleGateway from './components/RoleGateway';
import ProtectedRoute from './components/ProtectedRoute';
import { ProjectsProvider } from './context/ProjectsContext';
import { RoleProvider } from './context/RoleContext';
import ThemeToggle from './components/ThemeToggle';

// ── Lazy-loaded pages (code splitting) ──
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const RequestCV = lazy(() => import('./pages/RequestCV'));
const AboutMe = lazy(() => import('./pages/aboutme'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboard'));
const OpenToWorkPage = lazy(() => import('./pages/OpenToWork'));
const DocsLayout = lazy(() => import('./layouts/DocsLayout'));
const DocsViewer = lazy(() => import('./components/DocsViewer'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));

// ── Route loading skeleton ──
const RouteFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading…</p>
    </div>
  </div>
);

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

  // Wake-up is now handled globally via src/utils/backendWakeUp.ts
  // (imported in main.tsx — starts pinging before React even renders)

  return (
    <ProjectsProvider>
    <RoleProvider>
    <ToastProvider>
      {/* WRAP EVERYTHING INSIDE THE GATEWAY */}
      <RoleGateway>
        <div className="flex flex-col min-h-screen bg-gray-50 text-slate-900 dark:bg-[#020617] dark:text-slate-100">
          <Header />
          <main className="flex-grow">
            <ErrorBoundary>
              <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/request-cv" element={<RequestCV />} />
                <Route path="/aboutme" element={<AboutMe />} />
                <Route path="/open-to-work" element={
                  <ProtectedRoute allowedRoles={['Recruiter', 'Admin']} requireAdminToken={false}>
                    <OpenToWorkPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
          <ThemeToggle />
          <StickyCTA />
          {/* <SpeedInsights /> */}
        </div>
      </RoleGateway>
    </ToastProvider>
    </RoleProvider>
    </ProjectsProvider>
  );
};

function App() {
  return (
    <Router>
      <ScrollRestoration />
      <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="/docs/general/overview.md" replace />} />
          <Route path="*" element={<DocsViewer />} />
        </Route>
        <Route path="/*" element={<MainApp />} />
      </Routes>
      </Suspense>
      {/* Global cookie consent — renders on all routes */}
      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </Router>
  );
}

export default App;