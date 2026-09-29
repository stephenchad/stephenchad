import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request (if present)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("sc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired / invalid → clear and let UI react
    if (error.response?.status === 401) {
      localStorage.removeItem("sc_token");
      localStorage.removeItem("sc_user");
    }
    return Promise.reject(error);
  }
);

export default api;