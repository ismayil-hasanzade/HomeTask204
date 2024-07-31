import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes";
import { FavoritesProvider } from "./assets/components/FavoritesProvider";

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
