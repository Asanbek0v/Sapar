import { FC, ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
interface ILayoutSite {
  children: ReactNode;
}
const LayoutSite: FC<ILayoutSite> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutSite;
