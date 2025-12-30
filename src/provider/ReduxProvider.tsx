"use client";

import { FC, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { setLanguage, Lang } from "../redux/slices/languageSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface IReduxProvider {
  children: ReactNode;
}

const LanguageInitializer: FC = () => {
  const dispatch = useAppDispatch();
  const { currentLang } = useAppSelector((s) => s.language);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLang") as Lang | null;
    if (saved) {
      dispatch(setLanguage(saved));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("preferredLang", currentLang);
  }, [currentLang]);

  return null;
};

const ReduxProviderWithInit: FC<IReduxProvider> = ({ children }) => {
  return (
    <Provider store={store}>
      <LanguageInitializer />
      {children}
    </Provider>
  );
};

export default ReduxProviderWithInit;
