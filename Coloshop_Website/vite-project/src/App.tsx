import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { ROUTES } from "./routes";
import { FavoritesProvider } from "./pages/Clients/FavoritesProvaider";
import { BasketProvider } from "./pages/Clients/BasketProvaider";

const router = createBrowserRouter(ROUTES);
function App() {
  return (
    <>
      <FavoritesProvider>
        <BasketProvider>
          <RouterProvider router={router} />
        </BasketProvider>
      </FavoritesProvider>
    </>
  );
}

export default App;
