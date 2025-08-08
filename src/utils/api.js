import axios from "axios";

const API = axios.create({
  baseURL: "https://blogbackend-uuyn.onrender.com/api", // Your local backend server
  withCredentials: true, // Keep this if using cookies/auth
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
