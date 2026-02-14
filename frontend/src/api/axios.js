import axios from "axios";

const api = axios.create({
  baseURL: "https://freelancer-startup-app.onrender.com/api",
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
    };

    const isAuthRoute = AUTH_ROUTES.some(route =>
      originalRequest?.url?.includes(route)
    );

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
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
        
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        };
        
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;