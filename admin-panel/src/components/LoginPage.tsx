import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, AlertCircle } from "lucide-react";
import { useToast } from "../hooks/useToast";
import adminAPI from "../services/adminAPI";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const { showToast } = useToast();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) {
      showToast("⏳ Too many failed attempts\nPlease wait 3 hours before trying again", "error");
      return;
    }

    if (!password.trim()) {
      showToast("⚠️ Please enter your admin password", "error");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Attempting login with password:", password);
      console.log("API Base URL:", import.meta.env.VITE_API_URL);
      
      const response = await adminAPI.login(password);
      console.log("Login response:", response);
      
      if (response.access_token) {
        showToast("✓ Login successful! Welcome back.", "success");
        setFailedAttempts(0);
        onLoginSuccess();
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Error details:", errorMessage);
      
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setPassword("");

      if (newAttempts >= 10) {
        setIsBlocked(true);
        showToast(`🚫 Account locked for 3 hours\nToo many failed login attempts (${newAttempts}/10)`, "error");
      } else {
        const attemptsLeft = 10 - newAttempts;
        showToast(
          `✗ Invalid credentials\n${attemptsLeft} attempt${attemptsLeft !== 1 ? "s" : ""} remaining before lockout`,
          "error"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Admin Panel</h1>
          <p className="text-slate-500 text-sm">Lead Management Pro</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isBlocked}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your secure password"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Attempts Warning */}
          {failedAttempts > 0 && !isBlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-start gap-3 p-4 rounded-lg ${
                failedAttempts >= 7
                  ? "bg-red-50 border border-red-200"
                  : "bg-amber-50 border border-amber-200"
              }`}
            >
              <AlertCircle size={20} className={failedAttempts >= 7 ? "text-red-600 mt-0.5" : "text-amber-600 mt-0.5"} />
              <div className="flex-1">
                <p className={`text-sm font-semibold ${failedAttempts >= 7 ? "text-red-900" : "text-amber-900"}`}>
                  {10 - failedAttempts} attempts remaining
                </p>
                <p className={`text-xs mt-1 ${failedAttempts >= 7 ? "text-red-700" : "text-amber-700"}`}>
                  Account will be locked for 3 hours after 10 failed attempts
                </p>
              </div>
            </motion.div>
          )}

          {/* Blocked Warning */}
          {isBlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200"
            >
              <AlertCircle size={20} className="text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-900">Account Locked</p>
                <p className="text-xs mt-1 text-red-700">
                  Too many failed attempts. Please wait 3 hours before trying again.
                </p>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isBlocked}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
          >
            {isLoading ? "Authenticating..." : "Access Admin Panel"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            Secured with JWT • Rate Limited • IP Tracked
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
