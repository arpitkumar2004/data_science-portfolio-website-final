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

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = (reason?: string) => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("roleNotifShown");
    setIsAuthenticated(false);
    
    if (reason === "token_expired") {
      showToast("🔐 Your session expired. Please login again.", "error");
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
      {isAuthenticated ? (
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
