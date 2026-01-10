import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import themeReducer from "./slices/Slice";
import favoriteReducer from "./slices/FavoriteSlice";
import languageReducer from "./slices/languageSlice";
import { movieApi } from "./api/todo/movieApi";
// import { toursApi } from "./api/tours/toursApi"; // Жолду текшериңиз

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    // [toursApi.reducerPath]: toursApi.reducer,
    language: languageReducer,
    theme: themeReducer,
    favorite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(movieApi.middleware),
  // .concat(toursApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
