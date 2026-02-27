import axios from "axios";

// 1️⃣ Create axios instance
// In the browser, use the /proxy route (same-domain) so that cookies set by
// the backend are stored on the frontend domain and the middleware can read them.
// On the server (SSR/middleware), call the backend directly.
const baseURL =
  typeof window !== "undefined"
    ? "/proxy" // browser → same-domain proxy → cookies work in middleware
    : process.env.NEXT_PUBLIC_API_URL; // server-side → direct call

const api = axios.create({
  baseURL,
  withCredentials: true, // Important: send cookies automatically
});

let isRefreshing = false; // To prevent multiple refresh calls at once
let failedQueue = [];

// 2️⃣ Helper to process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 3️⃣ Response interceptor
api.interceptors.response.use(
  (response) => response, // normal responses pass through
  async (error) => {
    const originalRequest = error.config;

    // 🔐 Only handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite loop

      if (isRefreshing) {
        // 🔄 If a refresh is already in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // 4️⃣ Call your refresh token endpoint (use relative path so the proxy is used)
        await api.post("/user/refresh"); // your backend sets new access token in cookie
        isRefreshing = false;

        processQueue(null); // retry all queued requests

        return api(originalRequest); // retry original request
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        // ❌ If refresh fails → logout user
        // window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;