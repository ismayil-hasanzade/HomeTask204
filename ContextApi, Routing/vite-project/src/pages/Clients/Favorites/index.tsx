import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";

const Favorites: React.FC = () => {
  const [favoritesdata, setFavoritesData] = useState<any[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const setRemoveItem = (item: any) => {
    const updatedFavorites = favoritesdata.filter(
      (favorite) => favorite.id !== item.id
    );
    setFavoritesData(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div id="boxcontainer">
      {favoritesdata.map((item) => (
        <Card
          key={item.id}
          hoverable
          style={{ width: 240 }}
          cover={<img alt={item.title} src={item.image} />}
        >
          <i
            onClick={() => {
              setRemoveItem(item);
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
