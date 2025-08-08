import axios from "axios";

const API = axios.create({
  baseURL: "https://blogbackend-1-micv.onrender.com/api", // 🔗 Updated to your new backend URL
  withCredentials: true, // ✅ Required for sending cookies if using auth
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
