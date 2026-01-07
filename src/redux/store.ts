import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import themeReducer from "./slices/Slice";
import favoriteReducer from "./slices/FavoriteSlice";
import languageReducer from "./slices/languageSlice";
import { movieApi } from "./api/todo/movieApi";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    language: languageReducer,
    theme: themeReducer,
    favorite: favoriteReducer,
  },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(api.middleware).concat(movieApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
