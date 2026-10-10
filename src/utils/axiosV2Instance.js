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

// Response Interceptor: on 401, refresh once and retry
axiosV2Instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        await springApi.refreshAccessToken();
        return axiosV2Instance(original); // request interceptor attaches the new token
      } catch (refreshError) {
        springApi.forceLogout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosV2Instance;
