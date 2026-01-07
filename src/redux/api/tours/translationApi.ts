import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const translationApi = createApi({
  reducerPath: "translationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tourism-backend-laq8.onrender.com",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Translations"],
  endpoints: (builder) => ({
    // Бардык которууларды алуу
    getTranslations: builder.query({
      query: (lang = "ru") => `/${lang}/api/v1/translations`,
      providesTags: ["Translations"],
      keepUnusedDataFor: 3600, // 1 саат кэштөө
    }),
  }),
});

export const { useGetTranslationsQuery } = translationApi;
