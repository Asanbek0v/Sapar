import axios from "axios";
import { DataProvider } from "react-admin";

const BASE_URL = "https://tourism-backend-laq8.onrender.com";

// Функция для получения текущего языка
export const getCurrentLanguage = () => {
  return localStorage.getItem("admin-language") || "ru";
};

// Функция для установки языка
export const setCurrentLanguage = (lang: "ru" | "en" | "ky") => {
  localStorage.setItem("admin-language", lang);
  window.location.reload(); // Перезагружаем для применения изменений
};

// Создаем axios instance с динамическим языком
const createApiInstance = () => {
  const lang = getCurrentLanguage();

  return axios.create({
    baseURL: `${BASE_URL}/${lang}/api/v1`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Получаем instance
const getApi = () => {
  const api = createApiInstance();

  // Interceptor для токена
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const lang = getCurrentLanguage();

    console.log(`🌍 Language: ${lang.toUpperCase()}`);
    console.log(
      "🔑 Token:",
      token ? token.substring(0, 20) + "..." : "NO TOKEN"
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Interceptor для ошибок
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(
        "❌ API Error:",
        error.response?.status,
        error.response?.data
      );
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/#/login";
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const dataProvider: DataProvider = {
  getList: async (resource) => {
    const api = getApi();
    const response = await api.get(`/${resource}`);

    console.log(`📋 Response for ${resource}:`, response.data);

    const items = Array.isArray(response.data)
      ? response.data
      : response.data.tours ||
        response.data.cars ||
        response.data.results ||
        response.data.data ||
        [];

    const total = Array.isArray(response.data)
      ? response.data.length
      : response.data.count || response.data.total || items.length;

    return {
      data: items.map((item: any) => ({ ...item, id: item.id })),
      total,
    };
  },

  getOne: async (resource, params) => {
    const api = getApi();
    const response = await api.get(`/${resource}/${params.id}`);
    const data = response.data.tour || response.data.car || response.data;

    return {
      data: { ...data, id: data.id },
    };
  },

  create: async (resource, params) => {
    const api = getApi();
    console.log("➕ Creating with data:", params.data);

    const {
      id,
      createdAt,
      updatedAt,
      reviews,
      cars,
      _count,
      avgRating,
      ...cleanData
    } = params.data;

    const response = await api.post(`/${resource}`, cleanData);
    console.log("✅ Create response:", response.data);

    const data = response.data.tour || response.data.car || response.data;

    return {
      data: { ...data, id: data.id },
    };
  },

  update: async (resource, params) => {
    const api = getApi();
    console.log("✏️ Updating with data:", params.data);

    const {
      id,
      createdAt,
      updatedAt,
      reviews,
      cars,
      _count,
      avgRating,
      ...cleanData
    } = params.data;

    console.log("📤 Clean data being sent:", cleanData);

    const response = await api.put(`/${resource}/${params.id}`, cleanData);
    console.log("✅ Update response:", response.data);

    const data = response.data.tour || response.data.car || response.data;

    return {
      data: { ...data, id: data.id },
    };
  },

  delete: async (resource, params) => {
    const api = getApi();
    const getResponse = await api.get(`/${resource}/${params.id}`);
    const previousData =
      getResponse.data.tour || getResponse.data.car || getResponse.data;

    await api.delete(`/${resource}/${params.id}`);

    return {
      data: { ...previousData, id: params.id },
    };
  },

  getMany: () => Promise.reject(),
  getManyReference: () => Promise.reject(),
  updateMany: () => Promise.reject(),
  deleteMany: () => Promise.reject(),
};
