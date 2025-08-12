import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="container py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} News CMS • Built with MERN
      </div>
    </footer>
  );
}
