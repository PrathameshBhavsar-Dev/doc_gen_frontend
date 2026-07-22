import axios from "axios";

const axiosV2Instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://docgen-backend-7mwl.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosV2Instance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosV2Instance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      console.log("Unauthorized V2 API");
    }

    return Promise.reject(error);
  }
);

export default axiosV2Instance;