// 2. Favorite Slice (redux/slices/favoriteSlice.ts)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  [key: string]: any;
}

interface FavoriteState {
  items: Movie[];
}

const initialState: FavoriteState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        if (typeof window !== "undefined") {
          localStorage.setItem("favorites", JSON.stringify(state.items));
        }
      }
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    loadFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.items = action.payload;
    },
    initializeFavorites: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("favorites");
        if (saved) {
          state.items = JSON.parse(saved);
        }
      }
    },
  },
});

export const {
  addToFavorite,
  removeFromFavorite,
  loadFavorites,
  initializeFavorites,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
