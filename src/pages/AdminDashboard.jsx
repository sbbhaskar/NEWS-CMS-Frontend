// frontend/src/pages/AdminDashboard.jsx
import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { api, setAuthToken, getStoredUser } from "../api";
import { Link } from "react-router-dom";
import React from "react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ draft: 0, pending: 0, published: 0 });
  const user = getStoredUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    const fetchCount = async (status) => {
      const r = await api.get(`/articles?status=${status}`);
      return r.data.length;
    };
    Promise.all(["draft","pending","published"].map(fetchCount))
      .then(([draft, pending, published]) => setCounts({ draft, pending, published }))
      .catch(()=>{});
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <Link to="/admin/articles" className="card">
            <div className="text-sm text-gray-500">Pending Review</div>
            <div className="text-3xl font-bold">{counts.pending}</div>
          </Link>
          <Link to="/admin/articles" className="card">
            <div className="text-sm text-gray-500">Drafts</div>
            <div className="text-3xl font-bold">{counts.draft}</div>
          </Link>
          <Link to="/" className="card">
            <div className="text-sm text-gray-500">Published</div>
            <div className="text-3xl font-bold">{counts.published}</div>
          </Link>
        </div>

        <div className="card mt-6">
          <div className="font-semibold">Welcome, {user?.name} ({user?.role})</div>
          <p className="text-sm text-gray-600 mt-1">
            {user?.role === "admin"
              ? "Go to Articles → filter Pending → Approve or Reject."
              : "Create articles — your submissions go to Pending for admin approval."}
          </p>
          <div className="flex gap-3 mt-3">
            <Link to="/admin/articles" className="btn">Open Articles</Link>
            <Link to="/admin/articles/new" className="btn">New Article</Link>
            {user?.role === "admin" && <Link to="/admin/reset" className="btn">Reset Passwords</Link>}
          </div>
        </div>
      </main>
    </div>
  );
}
