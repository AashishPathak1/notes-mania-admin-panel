import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://bookmainabackend.onrender.com/api/M2";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

// Attach auth token if present (app can store token in localStorage or other secure place)
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.log("error", e);
      // ignore localStorage errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default api;
