import axios, { AxiosError } from "axios";
import { Tour } from "../types/tour.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async (): Promise<Tour[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/tours`);
    console.log("getTours API жооп:", data);
    
    // Ар кандай форматтарды текшерүү
    if (data.tours) return data.tours;
    if (data.data?.tours) return data.data.tours;
    if (data.data) return data.data;
    if (Array.isArray(data)) return data;
    
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

export const getTourById = async (id: string | number): Promise<Tour> => {
  try {
    console.log("=== getTourById чакырылды ===");
    console.log("API_URL:", API_URL);
    console.log("Тур ID:", id);
    console.log("Толук URL:", `${API_URL}/tours/${id}`);

    const { data } = await axios.get(`${API_URL}/tours/${id}`);
    
    console.log("Backend толук жооп:", JSON.stringify(data, null, 2));
    
    // Ар кандай форматтарды текшерүү
    let tour = null;
    
    if (data.tour) {
      console.log("✅ data.tour табылды");
      tour = data.tour;
    } else if (data.data?.tour) {
      console.log("✅ data.data.tour табылды");
      tour = data.data.tour;
    } else if (data.data) {
      console.log("✅ data.data табылды");
      tour = data.data;
    } else if (data.id) {
      console.log("✅ data өзү тур");
      tour = data;
    } else {
      console.error("❌ Тур маалыматы табылган жок!");
      console.log("Келген data структурасы:", Object.keys(data));
    }
    
    if (!tour) {
      throw new Error("Тур маалыматы табылган жок");
    }
    
    console.log("Кайтарылган тур:", tour);
    return tour;
    
  } catch (error: any) {
    console.error("=== getTourById КАТА ===");
    console.error("Ката типи:", error.name);
    console.error("Ката билдирүүсү:", error.message);
    
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("Request жөнөтүлдү, бирок жооп жок");
    } else {
      console.error("Request түзүүдө ката");
    }
    
    throw error;
  }
};