import axios, { AxiosError } from "axios";
import { Tour } from "../types/tour.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async (): Promise<Tour[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/tours`);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Ошибка при получении туров:", error.response?.data || error.message);
    } else {
      console.error("Неизвестная ошибка при получении туров");
    }
    return data.tours;
  } catch (error: any) {
    console.error(
      "Ошибка при получении туров:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getTourById = async (id: string | number) => {
  try {
    const { data } = await axios.get(`${API_URL}/tours/${id}`);
    console.log("Backend жооп:", data);
    return data.tour || data.tours || data;
  } catch (error: any) {
    console.error(
      "Ошибка при получении тура:",
      error.response?.data || error.message
    );
    throw error;
  }
};
