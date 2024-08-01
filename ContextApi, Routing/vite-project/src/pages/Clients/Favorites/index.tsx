import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useContext } from "react";
import { FavoritesContext } from "../FavoritesProvaider";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div id="boxcontainer">
      {favorites.map((item) => (
        <Card
          key={item.id}
          hoverable
          style={{ width: 240 }}
          cover={<img alt={item.title} src={item.image} />}
        >
          <i
            onClick={() => {
              toggleFavorite(item);
            }}
            className={"fa-solid fa-heart"}
            style={{ cursor: "pointer" }}
          ></i>
          <Meta title={item.title} />
          <p>$ {item.price}</p>
        </Card>
      ))}
    </div>
  );
};

export default Favorites;
