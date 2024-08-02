import NotFoundPage from "../components/Clients/Notfound";
import AdminLayout from "../pages/Admin";
import Dashboard from "../pages/Admin/Dashboard";
import AdminProduct from "../pages/Admin/Products";
import ClientLayout from "../pages/Clients";
import Contact from "../pages/Clients/Conctact";
import Favorites from "../pages/Clients/Favorites";
import Product from "../pages/Clients/Product";


export const ROUTES = [
  //Client Layout
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true, //default route
        element: <h1>Home</h1>,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "favorites",
        element: <Favorites />,
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
