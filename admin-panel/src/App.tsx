import { useState, useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import LoginPage from "./components/LoginPage";
import { ToastProvider } from "./components/ToastProvider";
import { useToast } from "./hooks/useToast";

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
        console.log("Found token, validating...");
        try {
          // Verify token with backend
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/me`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          
          if (response.ok) {
            console.log("Token valid - auto-login from RoleGateway");
            setIsAuthenticated(true);
          } else {
            console.log(" Token invalid, show login");
            localStorage.removeItem("admin_token");
            sessionStorage.removeItem("admin_token");
            setIsAuthenticated(false);
          }
        } catch (err) {
          console.error("Token validation failed:", err);
          setIsAuthenticated(false);
        }
      } else {
        console.log(" No token found - show login");
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

  return (
    <>
      {isValidating ? (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin mb-4">🔐</div>
            <p className="text-slate-400">Verifying access...</p>
          </div>
        </div>
      ) : isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
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
