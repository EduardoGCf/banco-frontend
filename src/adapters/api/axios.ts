// src/adapters/api/axios.ts
import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "../../infrastructure/authStorage";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Interceptor para agregar token
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores 401 y refrescar token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = getRefreshToken();
        if (!refresh) throw new Error("No hay refresh token");

        const res = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: refresh,
          }
        );

        const { access } = res.data;
        saveTokens(access, refresh);
        originalRequest.headers.Authorization = `Bearer ${access}`;

        return instance(originalRequest); // Reintenta la petición original
      } catch (err) {
        clearTokens();
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
