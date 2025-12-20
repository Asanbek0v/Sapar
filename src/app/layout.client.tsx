import { ReactNode } from "react";
import ReduxProvider from "../provider/ReduxProvider";

interface ILoyautClientProps {
  children: ReactNode;
}

const LoyautClient: React.FC<ILoyautClientProps> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default LoyautClient;

