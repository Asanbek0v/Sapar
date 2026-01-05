import axios, { AxiosError } from "axios";
import { Car } from "../types/cars.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCars = async (): Promise<Car[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/cars`);

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.cars)) return data.cars;

    return [];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Ошибка при получении машин:", error.response?.data || error.message);
    } else {
      console.error("Неизвестная ошибка при получении машин");
    }
    throw error;
  }
};

export const getCarById = async (id: string | number): Promise<Car> => {
  try {
    const { data } = await axios.get(`${API_URL}/cars/${id}`);
    return data.car || data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Ошибка при получении машины:", error.response?.data || error.message);
    } else {
      console.error("Неизвестная ошибка при получении машины");
    }
    throw error;
  }
};
