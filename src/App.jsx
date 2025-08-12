import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import SearchPage from "./pages/SearchPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArticles from "./pages/AdminArticles";
import AdminArticleForm from "./pages/AdminArticleForm";
import AdminCategories from "./pages/AdminCategories";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        {/* auth */}
        <Route path="/signup" element={<Signup />} /> {/* << add */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset" element={<ResetPassword />} />{" "}
        {/* << optional */}
        {/* admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <ProtectedRoute>
              <AdminArticles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles/new"
          element={
            <ProtectedRoute>
              <AdminArticleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/articles/:id"
          element={
            <ProtectedRoute>
              <AdminArticleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin/reset"
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="container py-10">
              Not found.{" "}
              <Link to="/" className="underline">
                Go Home
              </Link>
            </div>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
