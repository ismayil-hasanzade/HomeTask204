import ClientLayout from "../pages/Clients";
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
        path: "/product",
        element: <Product />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
];
