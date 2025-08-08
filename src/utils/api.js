import axios from "axios";

const API = axios.create({
  baseURL: "https://blogbackend-gn6w.onrender.com/api", // 🔗 Your live backend URL
  withCredentials: true, // ✅ Keep this if you're using cookies/sessions
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("🔐 Token being sent:", user?.token);
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
