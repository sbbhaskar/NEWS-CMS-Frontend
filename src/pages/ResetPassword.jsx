// frontend/src/pages/ResetPassword.jsx
import { useState } from "react";
import { api, setAuthToken } from "../api";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAuthToken(localStorage.getItem("token")); // must be admin
      await api.post("/auth/reset-password", { email, newPassword });
      alert("Password reset successful.");
      setEmail(""); setNewPassword("");
    } catch (err) {
      alert(err?.response?.data?.message || "Reset failed");
    } finally { setLoading(false); }
  };
  return (
    <div className="container py-10 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Reset Password (Admin)</h1>
      <form onSubmit={submit} className="card space-y-3">
        <input className="input" placeholder="User email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="New password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
        <button className="btn w-full" disabled={loading}>{loading ? "Please wait..." : "Reset"}</button>
      </form>
    </div>
  );
}
