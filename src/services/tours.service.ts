// services/tour.service.ts
import axios, { AxiosError } from "axios";
import { Tour } from "../types/tour.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async (): Promise<Tour[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/tours`);
    return Array.isArray(data) ? data : data.tours;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Ошибка при получении туров:", error.response?.data || error.message);
    } else {
      console.error("Неизвестная ошибка при получении туров");
    }
    throw error;
  }
};

export const getTourById = async (id: string | number) => {
  const { data } = await axios.get(`${API_URL}/tours/${id}`);
  return data.tours;
};
