"use client";

import { ReactNode } from "react";
import ReduxProvider from "../provider/ReduxProvider";
import ThemeProvider from "../provider/ThemeProvider";

interface ILayoutClientProps {
  children: ReactNode;
}

const LayoutClient: React.FC<ILayoutClientProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

export default LayoutClient;
