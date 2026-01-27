import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true
});

const refreshApi = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh") {
      originalRequest._retry = true;

      try {
        await refreshApi.post("/auth/refresh");
        return api(originalRequest);
      } catch (error) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error)
  }
);

export default api