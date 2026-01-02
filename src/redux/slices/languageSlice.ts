import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Lang = "ru" | "kg" | "en";

interface LanguageState {
  currentLang: Lang;
  availableLanguages: Record<
    Lang,
    {
      name: string;
      flag: string;
    }
  >;
}

const initialState: LanguageState = {
  currentLang: "ru", // SSR-safe
  availableLanguages: {
    ru: { name: "Русский", flag: "🇷🇺" },
    kg: { name: "Кыргызча", flag: "🇰🇬" },
    en: { name: "English", flag: "🇬🇧" },
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Lang>) => {
      state.currentLang = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
