import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/Admin/Header";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default AdminLayout;
