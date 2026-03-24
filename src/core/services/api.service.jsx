import axios from "axios";

class ApiService {
  constructor() {
    // Base URL from environment variable or default
    this.baseURL = import.meta.env.VITE_API_URL;
    
    // Create axios instance
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // IMPORTANT: Send cookies with requests
    });

    // Track if we're currently refreshing to avoid multiple refresh calls
    this.isRefreshing = false;
    this.failedQueue = [];

    // Process queued requests after token refresh
    this.processQueue = (error, token = null) => {
      this.failedQueue.forEach(prom => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });
      
      this.failedQueue = [];
    };

    // Response interceptor - Handle token refresh
    this.api.interceptors.response.use(
      (response) => {
        return response.data; // Return just the data
      },
      async (error) => {
        const originalRequest = error.config;

        // If 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          
          // If already refreshing, queue this request
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
            .then(() => {
              return this.api(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Try to refresh the token
            await this.api.post('/users/refresh-token');
            
            this.isRefreshing = false;
            this.processQueue(null);
            
            // Retry the original request
            return this.api(originalRequest);
            
          } catch (refreshError) {
            this.isRefreshing = false;
            this.processQueue(refreshError, null);
            
            // Refresh failed, redirect to login
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        // Handle 403 Forbidden
        if (error.response?.status === 403) {
          console.error('Access denied');
        }
        
        return Promise.reject(error);
      }
    );
  }

  // GET request
  async apiget(url, config = {}) {
    try {
      const response = await this.api.get(url, config);
      return response;
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw error;
    }
  }

  // POST request
  async apipost(url, data = {}, config = {}) {
    try {
      const response = await this.api.post(url, data, config);
      return response;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw error;
    }
  }

  // PUT request
  async apiput(url, data = {}, config = {}) {
    try {
      const response = await this.api.put(url, data, config);
      return response;
    } catch (error) {
      console.error(`PUT ${url} failed:`, error);
      throw error;
    }
  }

  // PATCH request
  async apipatch(url, data = {}, config = {}) {
    try {
      const response = await this.api.patch(url, data, config);
      return response;
    } catch (error) {
      console.error(`PATCH ${url} failed:`, error);
      throw error;
    }
  }

  // DELETE request
  async apidelete(url, config = {}) {
    try {
      const response = await this.api.delete(url, config);
      return response;
    } catch (error) {
      console.error(`DELETE ${url} failed:`, error);
      throw error;
    }
  }

  // File upload (multipart/form-data)
  async uploadFile(url, formData, onUploadProgress = null) {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      
      if (onUploadProgress) {
        config.onUploadProgress = onUploadProgress;
      }
      
      const response = await this.api.post(url, formData, config);
      return response;
    } catch (error) {
      console.error(`File upload to ${url} failed:`, error);
      throw error;
    }
  }

  // Download file
  async downloadFile(url, filename) {
    try {
      const response = await this.api.get(url, {
        responseType: 'blob',
      });
      
      // Create download link
      const urlBlob = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', filename);
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