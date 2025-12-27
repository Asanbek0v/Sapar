import axios from "axios";
import { AuthProvider } from "react-admin";

const API_URL = "https://tourism-backend-laq8.onrender.com/ru/api/v1";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      console.log("🔐 Attempting login with:", username);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email: username,
        password,
      });

      console.log("📦 Login response:", response.data);

      const token =
        response.data.access ||
        response.data.token ||
        response.data.accessToken;

      if (token) {
        localStorage.setItem("token", token);
        console.log(
          "✅ Token saved successfully:",
          token.substring(0, 20) + "..."
        );
        return Promise.resolve();
      } else {
        console.error("❌ No token in response:", response.data);
        throw new Error("Токен не получен от сервера");
      }
    } catch (error: any) {
      console.error("❌ Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Ошибка авторизации");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    console.log("👋 Logged out, token removed");
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    console.log("🔍 Checking auth, token:", token ? "EXISTS" : "MISSING");

    if (token) {
      return Promise.resolve();
    }
    return Promise.reject({ message: "auth.invalid_token" });
  },

  checkError: (error) => {
    const status = error.status || error.response?.status;
    console.log("⚠️ Check error with status:", status);

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      console.log("🗑️ Token removed due to auth error");
      return Promise.reject({ message: "auth.invalid_token" });
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const token = localStorage.getItem("token");
    if (token) {
      return Promise.resolve({
        id: "admin",
        fullName: "ThreeX",
      });
    }
    return Promise.reject();
  },

  getPermissions: () => Promise.resolve(),
};
