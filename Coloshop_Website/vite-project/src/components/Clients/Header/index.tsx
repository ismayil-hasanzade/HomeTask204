import { NavLink } from "react-router-dom";
import { BasketContext } from "../../../pages/Clients/BasketProvaider";
import { useContext } from "react";

const Header = () => {
  const { count } = useContext(BasketContext);

  return (
    <>
      <nav id="ClientHeader">
        <div className="container">
          <div className="logo">
            <a href="/">
              <a>Colo</a>
              <span>Shop</span>
            </a>
          </div>
          <div className="navigate">
            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"product"}> Favorites</NavLink>
              </li>
              <li>
                <NavLink to={"Basket"}>
                  <i className="fa-solid fa-basket-shopping">
                    {" "}
                    <sup style={{ color: "red" }}>{count}</sup>
                  </i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
