import { Link } from "react-router-dom";
import React from "react";

export default function ArticleCard({ a }) {
  return (
    <Link to={`/article/${a.slug}`} className="card block hover:shadow-md transition">
      {a.coverImage ? (
        <img src={a.coverImage} alt={a.title} className="w-full h-48 object-cover rounded mb-3" />
      ) : null}
      <div className="text-xs text-gray-500 mb-1">
        {a.category?.name} • {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : ""}
      </div>
      <h3 className="font-semibold text-lg">{a.title}</h3>
      {a.excerpt ? <p className="text-gray-600 mt-1">{a.excerpt}</p> : null}
    </Link>
  );
}
