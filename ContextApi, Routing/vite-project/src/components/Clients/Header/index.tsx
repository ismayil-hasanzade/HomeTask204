import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav id="Header">
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/product"}>Product</NavLink>
          </li>
          <li>
            <NavLink to={"/favorites"}>Favorites</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
