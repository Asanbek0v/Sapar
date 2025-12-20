"use client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { FC, ReactNode } from "react";
import { api } from "../redux/api";
import { Provider } from "react-redux";
import { store } from "../redux/store";

interface IReduxProvider {
  children: ReactNode;
}
const ReduxProvider: FC<IReduxProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
