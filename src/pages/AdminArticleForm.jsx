// frontend/src/pages/AdminArticleForm.jsx
import { useEffect, useState } from "react";
import { api, setAuthToken } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
export default function AdminArticleForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", coverImage: "", category: "", status: "draft"
  });
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isEditor = user?.role === "editor";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    api.get("/categories").then(r=>setCats(r.data));
    if (id) {
      api.get(`/articles/${id}`).then(r=>setForm(r.data));
    } else if (isEditor) {
      setForm(f => ({ ...f, status: "pending" }));
    }
  }, [id]);

  const save = async (e) => {
    e.preventDefault();
    if (isEditor) {
      // editor cannot set status directly
      const { title, excerpt, content, coverImage, category } = form;
      if (id) await api.put(`/articles/${id}`, { title, excerpt, content, coverImage, category });
      else await api.post("/articles", { title, excerpt, content, coverImage, category });
    } else {
      if (id) await api.put(`/articles/${id}`, form);
      else await api.post("/articles", form);
    }
    nav("/admin/articles");
  };

  return (
    <div className="flex">
      <div className="w-60 border-r p-4">Article</div>
      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-3">{id ? "Edit" : "New"} Article</h1>
        <form onSubmit={save} className="space-y-3 max-w-3xl">
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
          <input className="input" placeholder="Cover Image URL" value={form.coverImage} onChange={e=>setForm({...form, coverImage:e.target.value})}/>
          <textarea className="input h-24" placeholder="Excerpt" value={form.excerpt} onChange={e=>setForm({...form, excerpt:e.target.value})}/>
          <textarea className="input h-64" placeholder="Content" value={form.content} onChange={e=>setForm({...form, content:e.target.value})}/>
          <div className="grid md:grid-cols-3 gap-3">
            <select className="input" value={form.category || ""} onChange={e=>setForm({...form, category:e.target.value})}>
              <option value="">No category</option>
              {cats.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>

            {!isEditor ? (
              <select className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="published">Published</option>
              </select>
            ) : (
              <div className="text-sm text-gray-600 self-center">
                Status: <span className="font-semibold">pending</span> (admin approval required)
              </div>
            )}

            <button className="btn">Save</button>
          </div>
        </form>
      </main>
    </div>
  );
}
