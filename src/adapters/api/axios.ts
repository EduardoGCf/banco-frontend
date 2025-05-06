// src/adapters/api/axios.ts
import axios from "axios";
import { getAccessToken } from "../../infrastructure/authStorage";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
