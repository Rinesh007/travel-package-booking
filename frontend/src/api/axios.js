import axios from "axios";

let accessToken = null;

// 🔁 Allow AuthContext to update token
export const setAccessToken = (token) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // IMPORTANT: send HttpOnly cookies
  headers: {
    "Content-Type": "application/json"
  }
});

// 📨 Attach access token from memory
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
  !originalRequest._retry &&
  !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh-token");
        const newAccessToken = res.data.data.accessToken;

        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
