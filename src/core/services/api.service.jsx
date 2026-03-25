import axios from "axios";

class ApiService {
  constructor() {
    // Base URL
    this.baseURL = import.meta.env.VITE_API_URL;

    // Axios instance
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      // ❌ Removed withCredentials (we are using JWT headers, not cookies)
    });

    // ================= REQUEST INTERCEPTOR =================
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // ================= RESPONSE INTERCEPTOR =================
    this.api.interceptors.response.use(
      (response) => {
        return response.data; // Always return clean data
      },
      (error) => {
        // 🔥 Handle Unauthorized (Token expired / invalid)
        if (error.response?.status === 401) {
          console.warn("Unauthorized! Logging out...");

          localStorage.removeItem("user");
          localStorage.removeItem("token");

          // Redirect to login
          window.location.href = "/login";
        }

        // 🔥 Handle Forbidden
        if (error.response?.status === 403) {
          console.error("Access denied (403)");
        }

        return Promise.reject(error);
      }
    );
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

      const blob = new Blob([response]);
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