import axios from "axios";

/* -----------------------------
   Axios Instance
------------------------------ */

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -----------------------------
   Request Interceptor
   Attach JWT Token
------------------------------ */

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* -----------------------------
   Response Interceptor
   Handle API Errors
------------------------------ */

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong";

    console.error("API Error:", message);

    // Example: auto logout if token expired
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default API;