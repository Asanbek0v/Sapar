import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (language = "en-US") =>
        `/movie/popular?api_key=${API_KEY}&language=${language}&page=1`,
    }),
    getTopRatedMovies: builder.query({
      query: (language = "en-US") =>
        `/movie/top_rated?api_key=${API_KEY}&language=${language}&page=1`,
    }),
    searchMovies: builder.query({
      query: ({ searchText, language = "en-US" }) =>
        `/search/movie?api_key=${API_KEY}&query=${searchText}&language=${language}`,
    }),
    getMovieDetails: builder.query({
      query: ({ movieId, language = "en-US" }) =>
        `/movie/${movieId}?api_key=${API_KEY}&language=${language}&append_to_response=credits`,
    }),
    getActorDetails: builder.query({
      query: ({ actorId, language = "en-US" }) =>
        `/person/${actorId}?api_key=${API_KEY}&language=${language}&append_to_response=movie_credits`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetActorDetailsQuery,
} = movieApi;
