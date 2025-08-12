import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import React from "react";

const getUser = () => {
  try { return JSON.parse(localStorage.getItem("user") || "null"); }
  catch { return null; }
};

export default function Navbar() {
  const nav = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState("");
  const [user, setUser] = useState(getUser());
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const refreshUser = () => setUser(getUser());

  useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); };
    window.addEventListener("click", close);
    window.addEventListener("storage", refreshUser);
    window.addEventListener("auth-changed", refreshUser); // 🔑 listens for login/logout
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("storage", refreshUser);
      window.removeEventListener("auth-changed", refreshUser);
    };
  }, []);

  // also refresh whenever route changes
  useEffect(() => { refreshUser(); }, [location.key]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed")); // 🔑 tell app state changed
    nav("/");
  };

  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-white border-b">
      <div className="container flex items-center gap-4 py-3">
        <Link to="/" className="font-bold text-xl">News CMS</Link>

        <div className="flex-1" />
        <form onSubmit={(e)=>{e.preventDefault(); nav(`/search?q=${encodeURIComponent(q)}`);}} className="flex gap-2">
          <input className="input" placeholder="Search articles..." value={q} onChange={(e)=>setQ(e.target.value)} />
          <button className="btn">Search</button>
        </form>

        {/* Right side */}
        {!user ? (
          <div className="ml-4 flex items-center gap-4">
            <Link to="/signup" className="text-sm underline">Sign Up</Link>
            <Link to="/admin/login" className="text-sm underline">Login</Link>
          </div>
        ) : (
          <div className="ml-4 flex items-center gap-3" ref={menuRef}>
            {isAdmin && <Link to="/admin" className="text-sm underline">Admin</Link>}
            <button className="text-sm underline" onClick={()=>setOpen(!open)}>
              {user.name} <span className="text-gray-500">({user.role})</span>
            </button>
            {open && (
              <div className="absolute right-4 top-14 w-56 bg-white border rounded shadow">
                {isAdmin && (
                  <>
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin/articles" onClick={()=>setOpen(false)}>Articles</Link>
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin/categories" onClick={()=>setOpen(false)}>Categories</Link>
                    <Link className="block px-3 py-2 hover:bg-gray-100" to="/admin/reset" onClick={()=>setOpen(false)}>Reset Passwords</Link>
                  </>
                )}
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
