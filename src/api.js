// frontend/src/api.js
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({ baseURL: `${API_BASE}/api` });

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

// initialize from localStorage on load
const saved = localStorage.getItem("token");
if (saved) setAuthToken(saved);

export const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem("user") || "null"); }
  catch { return null; }
};
