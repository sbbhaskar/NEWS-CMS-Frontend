import { useEffect, useState } from "react";
import { api, setAuthToken } from "../api";
import React from "react";

export default function AdminCategories() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    const r = await api.get("/categories");
    setItems(r.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="flex">
      <div className="w-60 border-r p-4">Categories</div>
      <main className="flex-1 p-6">
        <h1 className="text-xl font-semibold mb-3">Categories</h1>

        <form className="flex gap-2" onSubmit={async(e)=>{e.preventDefault(); if(!name) return; await api.post("/categories",{name}); setName(""); load();}}>
          <input className="input" placeholder="Category name" value={name} onChange={e=>setName(e.target.value)} />
          <button className="btn">Add</button>
        </form>

        <div className="space-y-2 mt-4">
          {items.map(c => (
            <div className="card flex items-center justify-between" key={c._id}>
              <div>{c.name} <span className="text-xs text-gray-500">/ {c.slug}</span></div>
              <div className="flex gap-2">
                <button className="btn" onClick={async()=>{
                  const newName = prompt("Rename category:", c.name);
                  if (!newName) return;
                  await api.put(`/categories/${c._id}`, { name: newName });
                  load();
                }}>Rename</button>
                <button className="btn bg-red-600 hover:bg-red-700" onClick={async()=>{
                  if (!confirm("Delete category?")) return;
                  await api.delete(`/categories/${c._id}`);
                  load();
                }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
