import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { ToastProvider } from "./components/ToastProvider";
import { useToast } from "./hooks/useToast";
import AdminLayout from "./components/layout/AdminLayout";

// Code-split page components — only loaded when navigated to
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("admin_token");
  });
  const [isValidating, setIsValidating] = useState(true);

  // Auto-validate token on mount (from RoleGateway or direct link)
  useEffect(() => {
    const validateTokenOnLoad = async () => {
      const token = sessionStorage.getItem("admin_token") || localStorage.getItem("admin_token");
      
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/me`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("admin_token");
            sessionStorage.removeItem("admin_token");
            setIsAuthenticated(false);
          }
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setIsValidating(false);
    };
    
    validateTokenOnLoad();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = (reason?: string) => {
    localStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_token");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("roleNotifShown");
    setIsAuthenticated(false);
    
    if (reason === "token_expired") {
      showToast("Your session expired. Please login again.", "error");
    }
  };

  // INTERCEPTOR: Listen for auth:logout events (401 responses)
  useEffect(() => {
    const handleAuthLogout = (event: CustomEvent) => {
      handleLogout(event.detail?.reason);
    };

    window.addEventListener("auth:logout", handleAuthLogout as EventListener);
    return () => window.removeEventListener("auth:logout", handleAuthLogout as EventListener);
  }, []);

  if (isValidating) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4 text-2xl">🔐</div>
          <p className="text-slate-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<AdminLayout onLogout={handleLogout} />}>
            <Route index element={<DashboardPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
