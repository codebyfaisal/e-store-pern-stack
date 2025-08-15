import axios from "axios";
import { useAuthStore } from "@/store/index.js";

const backendApiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: backendApiUrl,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, tokenSuccess = false) => {
  failedQueue.forEach(({ resolve, reject, originalRequest }) => {
    if (tokenSuccess) {
      resolve(api(originalRequest));
    } else {
      reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    const originalRequest = config;
    const isRetry = originalRequest._retry;

    if (response?.status === 401) {
      if (isRetry) {
        useAuthStore.getState()._clearAuth();
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          await api.get("/api/users/reset-token");
          useAuthStore.getState().login();

          processQueue(null, true);
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, false);
          useAuthStore.getState()._clearAuth();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, originalRequest });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
