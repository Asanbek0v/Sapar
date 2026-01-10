// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export interface Tour {
//   id: string;
//   _id?: string;
//   name: string;
//   description: string;
//   city: string;
//   price: number;
//   duration: number;
//   maxPeople: number;
//   images: string[];
// }

// export const toursApi = createApi({
//   reducerPath: "toursApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://tourism-backend-laq8.onrender.com/ru/api/v1",
//   }),
//   endpoints: (builder) => ({
//     getTourById: builder.query<Tour, string>({
//       query: (id) => `/tours/${id}`,
//       transformResponse: (response: any) => {
//         // API { success: true, data: { name: "..." } } түрүндө келсе:
//         return response?.data || response;
//       },
//     }),
//     getTourProgram: builder.query<string[], string>({
//       query: (id) => `/tours/${id}/program`,
//       transformResponse: (response: any) => {
//         // Программа массив же data.days ичинде болушу мүмкүн
//         if (response?.data?.days) return response.data.days;
//         if (response?.days) return response.days;
//         return Array.isArray(response) ? response : [];
//       },
//     }),
//   }),
// });

// export const { useGetTourByIdQuery, useGetTourProgramQuery } = toursApi;
