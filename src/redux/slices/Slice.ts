import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
  language: string;
}

const initialState: ThemeState = {
  darkMode: false,
  language: "en-US",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    initializeTheme: (state) => {
      if (typeof window !== "undefined") {
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode !== null) {
          state.darkMode = JSON.parse(savedDarkMode);
        }
      }
    },
  },
});

export const { toggleDarkMode, setDarkMode, setLanguage, initializeTheme } =
  themeSlice.actions;
export default themeSlice.reducer;
