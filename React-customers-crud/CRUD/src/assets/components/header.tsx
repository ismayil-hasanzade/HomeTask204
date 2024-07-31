import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div id="header">
      <span>Logo</span>
      <nav>
        <ul>
          <li>
            <NavLink to={"/form"}>Add Customer</NavLink>
          </li>
          <li>
            <NavLink to={"/list"}>Customer List</NavLink>
          </li>
          <li>
            <NavLink to={"/favorites"}>Favorites</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
