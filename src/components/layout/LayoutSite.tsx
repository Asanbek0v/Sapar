import { FC, ReactNode } from "react";
import Header from "./header/Header";
interface ILayoutSite {
  children: ReactNode;
}
const LayoutSite: FC<ILayoutSite> = ({ children }) => {
  return (
    <div id="LayoutSite">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default LayoutSite;
