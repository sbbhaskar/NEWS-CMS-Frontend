import { useEffect, useState } from "react";
import { api } from "../api";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";
import React from "react";


export default function Home() {
  const [feed, setFeed] = useState({ items: [], page: 1, pages: 1 });
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("");

  const load = async (page = 1, category = "") => {
    const res = await api.get(`/public/articles?page=${page}&category=${category}`);
    setFeed(res.data);
  };

  useEffect(() => {
    api.get("/public/categories").then((r) => setCats(r.data));
    load(1, "");
  }, []);

  return (
    <div className="container py-6">
      <div className="flex gap-2 overflow-x-auto pb-3">
        <button className={`btn ${!cat && "bg-gray-800"}`} onClick={() => { setCat(""); load(1, ""); }}>All</button>
        {cats.map(c => (
          <button key={c.slug}
            className={`btn ${cat===c.slug && "bg-gray-800"}`}
            onClick={() => { setCat(c.slug); load(1, c.slug); }}>
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {feed.items.map(a => <ArticleCard key={a.slug} a={a} />)}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button className="btn" disabled={feed.page<=1} onClick={()=>load(feed.page-1, cat)}>Prev</button>
        <div>Page {feed.page} of {feed.pages}</div>
        <button className="btn" disabled={feed.page>=feed.pages} onClick={()=>load(feed.page+1, cat)}>Next</button>
      </div>

      <div className="mt-10">
        <Link to="/admin" className="text-sm underline">Go to Admin →</Link>
      </div>
    </div>
  );
}
