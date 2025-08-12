import { useEffect, useState } from "react";
import { api, setAuthToken } from "../api";
import { Link } from "react-router-dom";
import React from "react";  
const getUser = () => { try { return JSON.parse(localStorage.getItem("user")||"null"); } catch { return null; } };

export default function AdminArticles() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("pending"); // default to Pending
  const user = getUser();
  const isAdmin = user?.role === "admin";

  const load = async () => {
    setAuthToken(localStorage.getItem("token"));
    const r = await api.get(`/articles?q=${encodeURIComponent(q)}&status=${status}`);
    setItems(Array.isArray(r.data) ? r.data : []);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { load(); }, [status]);

  const approve = async (id) => { await api.put(`/articles/${id}/approve`); load(); };
  const reject = async (id) => { const reason = prompt("Reject reason (optional):",""); await api.put(`/articles/${id}/reject`, { reason }); load(); };
  const publish = async (id) => { await api.put(`/articles/${id}/publish`); load(); };
  const unpublish = async (id) => { await api.put(`/articles/${id}/unpublish`); load(); };

  const badge = (s) => (
    <span className={`px-2 py-0.5 text-xs rounded ${s==="published"?"bg-green-100 text-green-800":s==="pending"?"bg-amber-100 text-amber-800":"bg-gray-100 text-gray-700"}`}>
      {s}
    </span>
  );

  return (
    <div className="flex">
      <div className="w-60 border-r p-4">
        <div className="font-semibold">Filters</div>
        <input className="input mt-2" placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
        <select className="input mt-2" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="">All</option>
        </select>
        <button className="btn w-full mt-2" onClick={load}>Apply</button>
        <Link to="/admin/articles/new" className="btn w-full mt-2">+ New</Link>
      </div>

      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-3">Articles</h1>
        <div className="space-y-3">
          {items.map(a => (
            <div className="card flex items-center justify-between" key={a._id}>
              <div>
                <div className="font-semibold">{a.title} {badge(a.status)}</div>
                <div className="text-xs text-gray-500">
                  {a.category?.name || "No category"} • by {a.author?.name || "—"}
                  {a.rejectedReason ? ` • rejected: ${a.rejectedReason}` : ""}
                </div>
              </div>
              <div className="flex gap-2">
                <Link className="btn" to={`/admin/articles/${a._id}`}>Edit</Link>

                {isAdmin && a.status === "draft" && (
                  <button className="btn" onClick={() => publish(a._id)}>Publish</button>
                )}
                {isAdmin && a.status === "pending" && (
                  <>
                    <button className="btn" onClick={() => approve(a._id)}>Allow → Publish</button>
                    <button className="btn bg-red-600 hover:bg-red-700" onClick={() => reject(a._id)}>Reject</button>
                  </>
                )}
                {isAdmin && a.status === "published" && (
                  <button className="btn bg-gray-700 hover:bg-gray-800" onClick={() => unpublish(a._id)}>
                    Unpublish → Draft
                  </button>
                )}

                <button className="btn bg-red-600 hover:bg-red-700" onClick={async()=>{
                  if (!confirm("Delete article?")) return;
                  await api.delete(`/articles/${a._id}`);
                  load();
                }}>Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-sm text-gray-600">No articles found.</div>}
        </div>
      </main>
    </div>
  );
}
