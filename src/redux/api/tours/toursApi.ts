import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TourProgram = {
  day: string;
  description: string;
};

export type Tour = {
  _id: string; // MongoDB үчүн _id кошулду
  id: string;
  name: string;
  description: string;
  city: string;
  category: string;
  date: string;
  price: number;
  duration: number;
  maxPeople: number;
  images: string[];
  program?: TourProgram[];
};

export const toursApi = createApi({
  reducerPath: "toursApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getTourById: builder.query<Tour, string>({
      query: (id) => `/tours/${id}`,
      // Backend'ден келген маалыматты текшерип, тазалап алуу
      transformResponse: (response: any) => {
        // Эгер жооп { data: { tour } } болсо же түз эле келсе, ошону кайтарат
        return response.data || response;
      },
    }),
  }),
});

export const { useGetTourByIdQuery } = toursApi;
