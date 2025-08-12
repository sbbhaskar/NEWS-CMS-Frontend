import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams, Link } from "react-router-dom";
import React from "react";

export default function ArticlePage() {
  const { slug } = useParams();
  const [a, setA] = useState(null);
  useEffect(() => {
    api.get(`/public/articles/${slug}`).then(r => setA(r.data)).catch(()=>setA(null));
  }, [slug]);
  if (!a) return <div className="container py-6">Article not found.</div>;
  return (
    <div className="container py-6">
      <div className="text-sm text-gray-500">
        <Link to="/">Home</Link> / <Link to={`/category/${a.category?.slug}`}>{a.category?.name}</Link>
      </div>
      <h1 className="text-3xl font-bold mt-2">{a.title}</h1>
      <div className="text-xs text-gray-500 mt-1">
        {a.author?.name} • {a.publishedAt ? new Date(a.publishedAt).toLocaleString() : ""}
      </div>
      {a.coverImage ? <img src={a.coverImage} alt="" className="w-full max-h-[420px] object-cover rounded my-4" /> : null}
      <p className="text-lg leading-7 whitespace-pre-wrap">{a.content}</p>
    </div>
  );
}
