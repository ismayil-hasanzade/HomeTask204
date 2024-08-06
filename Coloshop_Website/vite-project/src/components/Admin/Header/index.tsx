import { NavLink } from "react-router-dom";
import { FavoritesContext } from "../../../pages/Clients/FavoritesProvaider";
import { useContext } from "react";

const Header = () => {
  const { count } = useContext(FavoritesContext);

  return (
    <>
      <nav id="AdminHeader">
        <ul>
          <li>
            <NavLink to={"/admin"}>Dashboard</NavLink>
          </li>

          <li>
            <NavLink to={"product"}>Product</NavLink>
          </li>
          <li>
            <NavLink to={"add-product"}>Add Product</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
