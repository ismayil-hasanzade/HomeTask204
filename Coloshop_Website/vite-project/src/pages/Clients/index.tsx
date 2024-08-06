import { Outlet } from "react-router-dom";
import Header from "../../components/Clients/Header";
import Footer from "../../components/Clients/Footer";


const ClientLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
};

export default ClientLayout;
