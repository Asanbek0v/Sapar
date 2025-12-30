import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/tours`);
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
    console.log("Backend жооп:", data); // эмне келгенин көрөлү

    // Backend кандай форматта жөнөтөт:
    // Вариант 1: { tour: {...} }
    // Вариант 2: { tours: {...} }
    // Вариант 3: {...} (түздөн-түз объект)

    return data.tour || data.tours || data;
  } catch (error: any) {
    console.error(
      "Ошибка при получении тура:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCars = async () => {
  const { data } = await axios.get(`${API_URL}/cars`);
  return data;
};
