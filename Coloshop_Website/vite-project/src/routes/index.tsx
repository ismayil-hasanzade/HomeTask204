import NotFoundPage from "../components/Clients/Notfound";
import AdminLayout from "../pages/Admin";
import Dashboard from "../pages/Admin/Dashboard";
import AdminProduct from "../pages/Admin/Products";
import ClientLayout from "../pages/Clients";
import Basket from "../pages/Clients/Basket";
import DetailPage from "../pages/Clients/Detail-Page";
import Home from "../pages/Clients/Home";
import Product from "../pages/Clients/Favorites";

export const ROUTES = [
  //Client Layout
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true, //default route
        element: <Home />,
      },

      {
        path: "product",
        element: <Product />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "product/:id",
        element: <DetailPage />,
      },
    ],
  },
  //Admin Layout
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "product",
        element: <AdminProduct />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
