import { NavLink } from "react-router-dom";
import React from "react";

export default function AdminSidebar() {
  const link = "block px-3 py-2 rounded hover:bg-gray-100";
  const active = ({ isActive }) => (isActive ? "bg-gray-200 " + link : link);
  return (
    <aside className="w-60 border-r p-4 space-y-2">
      <NavLink to="/admin" className={active}>Dashboard</NavLink>
      <NavLink to="/admin/articles" className={active}>Articles</NavLink>
      <NavLink to="/admin/articles/new" className={active}>New Article</NavLink>
      <NavLink to="/admin/categories" className={active}>Categories</NavLink>
    </aside>
  );
}
