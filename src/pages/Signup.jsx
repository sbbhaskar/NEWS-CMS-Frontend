import { useState } from "react";
import React from "react";
import { api } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/register", form); // creates editor by default
      alert("Account created! Please log in.");
      nav("/admin/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={submit} className="card space-y-3">
        <input className="input" placeholder="Full name"
          value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="input" placeholder="Email"
          value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input type="password" className="input" placeholder="Password"
          value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button className="btn w-full" disabled={loading}>{loading ? "Please wait..." : "Create account"}</button>
      </form>
      <div className="text-sm mt-3">
        Already have an account? <Link to="/admin/login" className="underline">Login</Link>
      </div>
    </div>
  );
}
