import axios, { AxiosError } from "axios";
import { Tour } from "../types/tour.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async (): Promise<Tour[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/tours`);
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.tours)) {
      return data.tours;
    }

    return [];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Ошибка при получении туров:",
        error.response?.data || error.message
      );
    } else {
      console.error("Неизвестная ошибка при получении туров");
    }

    throw error;
  }
};

export const getTourById = async (
  id: string | number
): Promise<Tour> => {
  try {
    const { data } = await axios.get(`${API_URL}/tours/${id}`);
    return data.tour || data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Ошибка при получении тура:",
        error.response?.data || error.message
      );
    } else {
      console.error("Неизвестная ошибка при получении тура");
    }

    throw error;
  }
};

export const getTopTours = async (): Promise<Tour[]> => {
  const tours = await getTours();
  if (!tours.length) return [];
  return tours.slice(-10).reverse();
};