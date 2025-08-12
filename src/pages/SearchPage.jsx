import { useEffect, useState } from "react";
import { api } from "../api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get(`/public/articles?q=${encodeURIComponent(q)}`).then(r=>setItems(r.data.items));
  }, [q]);
  return (
    <div className="container py-6">
      <h2 className="text-xl font-semibold mb-3">Search: “{q}”</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map(a => <ArticleCard key={a.slug} a={a} />)}
      </div>
    </div>
  );
}
