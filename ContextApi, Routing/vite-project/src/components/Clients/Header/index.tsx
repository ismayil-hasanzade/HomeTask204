import { NavLink } from "react-router-dom";
import { FavoritesContext } from "../../../pages/Clients/FavoritesProvaider";
import { useContext } from "react";

const Header = () => {
  const { count } = useContext(FavoritesContext);

  return (
    <>
      <nav id="Header">
        <ul>
          
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/contact'}>Contact</NavLink>
          </li>
          <li>
            <NavLink to={"/product"}>Product</NavLink>
          </li>
          <li>
            <NavLink to={"/favorites"}>
              Favorites <sup>{count}</sup>{" "}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
