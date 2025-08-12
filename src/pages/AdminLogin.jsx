import { useState } from "react";
import { api, setAuthToken } from "../api";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", r.data.token);
      localStorage.setItem("user", JSON.stringify(r.data.user));
      setAuthToken(r.data.token);
      window.dispatchEvent(new Event("auth-changed")); // 🔑 tell Navbar to refresh
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Admin / Editor Login</h1>
      <form onSubmit={handleLogin} className="card space-y-3">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input className="input" type="email" placeholder="Email (e.g. admin@admin.com)"
               value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password (e.g. admin123)"
               value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn w-full" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="text-sm text-gray-600 mt-3">
        No account? <Link to="/signup" className="underline">Sign up</Link>
      </div>
    </div>
  );
}
