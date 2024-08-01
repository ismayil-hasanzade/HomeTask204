import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { ROUTES } from "./routes";
import { FavoritesProvider } from "./pages/Clients/FavoritesProvaider";


const router = createBrowserRouter(ROUTES);
function App() {
  return (
    <>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </>
  );
}

export default App;
