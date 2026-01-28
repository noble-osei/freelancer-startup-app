import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true
});

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/me",
  "/auth/refresh",
  "/auth/logout",
];

api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute = AUTH_ROUTES.some(route =>
      originalRequest.url.includes(route)
    );

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (error) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error)
  }
);

export default api