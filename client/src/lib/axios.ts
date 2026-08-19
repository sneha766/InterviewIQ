import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let tokenGetter: (() => Promise<string | null>) | null = null;

export const setAuthTokenGetter = (
  getter: () => Promise<string | null>
): void => {
  tokenGetter = getter;
};

api.interceptors.request.use(
  async (config) => {
    if (tokenGetter) {
      const token = await tokenGetter();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: unknown) => Promise.reject(error)
);

export default api;