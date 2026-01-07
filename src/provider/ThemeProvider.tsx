"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { initializeTheme } from "../redux/slices/Slice";
import { initializeFavorites } from "../redux/slices/FavoriteSlice";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(initializeFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.background = "#000000";
      document.body.style.color = "#ffffff";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.background = "#ffffff";
      document.body.style.color = "#000000";
    }
  }, [darkMode]);

  return <>{children}</>;
}
