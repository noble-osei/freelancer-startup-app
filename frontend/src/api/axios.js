import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true,
});

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/signup",
  "/auth/refresh",
  "/auth/logout",
];

let isRefreshing = false;
let refreshFailed = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (refreshFailed) {
      return Promise.reject(error);
    }

    const isAuthRoute = AUTH_ROUTES.some(route =>
      originalRequest?.url?.includes(route)
    );

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }
      
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh");
        isRefreshing = false;
        processQueue();
        return api(originalRequest);
      } catch(err) {
        isRefreshing = false;
        refreshFailed = true;
        processQueue(err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;