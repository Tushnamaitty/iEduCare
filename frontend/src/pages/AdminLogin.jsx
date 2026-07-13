import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../config";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUsername", data.username);
        navigate("/admin/dashboard");
      } else {
        setError(data.non_field_errors?.[0] || "Invalid username or password");
      }
    } catch (err) {
      setError("Unable to connect to the backend server. Please make sure Django is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF4E9] flex items-center justify-center relative overflow-hidden px-4">
      {/* Decorative background blobs */}
      <span className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#F3B70E]/20 blur-3xl -z-10" />
      <span className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#D6242A]/10 blur-3xl -z-10" />
      
      {/* Login Card */}
      <div className="w-full max-w-md bg-white/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-[#D6242A] rounded-full items-center justify-center text-white font-bold text-2xl shadow-md mb-4">
            i
          </div>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            iEduCare Admin Portal
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Access database dashboard controls
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start gap-2.5 mb-6">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                <User size={16} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-white/80 border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-[#D6242A] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white/80 border border-neutral-200 rounded-xl py-3 pl-10 pr-4 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-[#D6242A] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#D6242A] hover:bg-[#B81E23] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-neutral-100">
          <Link to="/" className="text-xs font-bold text-[#D6242A] hover:underline flex items-center justify-center gap-1">
            ← Back to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
}
