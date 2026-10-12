import axios from "axios";
import ROUTES from "../constants/routes.constant";

class ApiService {
  // refreshUrl is set only for the Spring instance
  constructor(baseURL = import.meta.env.VITE_API_URL, { refreshUrl = null } = {}) {
    this.baseURL = baseURL;
    this.refreshUrl = refreshUrl;
    this.refreshPromise = null;

    this.api = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
      withCredentials: !!refreshUrl, // needed so the browser stores/sends the refresh cookie
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const original = error.config;
        const status = error.response?.status;
        const isAuthCall =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh");

        if (status === 401 && this.refreshUrl && original && !original._retry && !isAuthCall) {
          original._retry = true;
          try {
            await this.refreshAccessToken();
            return this.api(original); // request interceptor attaches the new token
          } catch (refreshError) {
            this.forceLogout();
            return Promise.reject(error);
          }
        }

        if (status === 403) console.error("Access denied (403)");
        return Promise.reject(error);
      }
    );
  }

  refreshAccessToken() {
    // one refresh at a time, even if several requests fail together
    if (!this.refreshPromise) {
      this.refreshPromise = axios
        .post(this.baseURL + this.refreshUrl, {}, { withCredentials: true })
        .then((res) => {
          const { accessToken, user } = res.data.data;
          localStorage.setItem("token", accessToken);
          localStorage.setItem("user", JSON.stringify(user));
        })
        .finally(() => {
          this.refreshPromise = null;
        });
    }
    return this.refreshPromise;
  }

  forceLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = ROUTES.LOGIN;
  }

  // ================= GET =================
  async apiget(url, config = {}) {
    try {
      return await this.api.get(url, config);
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  }

  // ================= POST =================
  async apipost(url, data = {}, config = {}) {
    try {
      return await this.api.post(url, data, config);
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  }

  // ================= PUT =================
  async apiput(url, data = {}, config = {}) {
    try {
      return await this.api.put(url, data, config);
    } catch (error) {
      console.error(`PUT ${url} failed:`, error);
      throw error;
    }
  }

  // ================= PATCH =================
  async apipatch(url, data = {}, config = {}) {
    try {
      return await this.api.patch(url, data, config);
    } catch (error) {
      console.error(`PATCH ${url} failed:`, error);
      throw error;
    }
  }

  // ================= DELETE =================
  async apidelete(url, config = {}) {
    try {
      return await this.api.delete(url, config);
    } catch (error) {
      console.error(`DELETE ${url} failed:`, error);
      throw error;
    }
  }

  // ================= FILE UPLOAD =================
  async uploadFile(url, formData, onUploadProgress = null) {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (onUploadProgress) {
        config.onUploadProgress = onUploadProgress;
      }

      return await this.api.post(url, formData, config);
    } catch (error) {
      console.error(`File upload to ${url} failed:`, error);
      throw error;
    }
  }

  // ================= FILE DOWNLOAD =================
  async downloadFile(url, filename) {
    try {
      const response = await this.api.get(url, {
        responseType: "blob",
      });

      // const blob = new Blob([response]);
      const blob = new Blob([response.data]);
      const urlBlob = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      link.remove();

      return true;
    } catch (error) {
      console.error(`File download from ${url} failed:`, error);
      throw error;
    }
  }
}

export default ApiService;