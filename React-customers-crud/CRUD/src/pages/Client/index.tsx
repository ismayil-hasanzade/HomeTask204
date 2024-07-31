import { Outlet } from "react-router-dom";
import Header from "../../assets/components/header";

const ClientLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
