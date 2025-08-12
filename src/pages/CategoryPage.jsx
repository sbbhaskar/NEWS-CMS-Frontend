import { useParams } from "react-router-dom";
import Home from "./Home";
export default function CategoryPage() {
  // Keep it simple: reuse Home with category filters (handled by Home buttons)
  const { slug } = useParams();
  return <Home key={slug} />;
}
