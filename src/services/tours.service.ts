import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/tours`);
    return data.tours;
  } catch (error: any) {
    console.error("Ошибка при получении туров:", error.response?.data || error.message);
    throw error;
  }
};


export const getTourById = async (id: string | number) => {
  const { data } = await axios.get(`${API_URL}/tours/${id}`);
  return data.tours;
};

export const getCars = async () => {
  const { data } = await axios.get(`${API_URL}/cars`);
  return data;
};
