import MyForm from "../assets/components/form";
import ClientLayout from "../pages/Client";
import Favorites from "../pages/Client/Favorites";
import Home from "../pages/Client/Home/home";

import Products from "../pages/Client/Products";

export const ROUTES = [
  //Client layout
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "form",
        element: <MyForm />,
      },

      {
        path: "list",
        element: <Products />,
      },
      {
        path:'favorites',
        element:<Favorites/>
      }
    ],
  },
];
