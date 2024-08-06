import { Tabs } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../FavoritesProvaider";
import { BasketContext } from "../BasketProvaider";

const NewArrival = () => {
  const [data, setData] = useState<any[]>([]);
  const URL: string = "http://localhost:3000/products";
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { basket, toggleBasket } = useContext(BasketContext);
  const getData = async () => {
    try {
      const res = await axios.get(URL);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const removeDuplicates = (arr: string[]) => {
    return [...new Set(arr)];
  };

  let categories = removeDuplicates(data.map((item: any) => item.category));
  categories = ["all", ...categories];

  const isFavorite = (item: DataType): boolean => {
    return favorites.some((favorite) => favorite.id === item.id);
  };
  return (
    <div id="NewArrivals" className="NewArrivals">
      <div className="container">
        <h2>New Arrivals</h2>
        <div className="line"></div>

        <Tabs
          defaultActiveKey="1"
          centered
          items={categories.map((category, index) => {
            return {
              label: category,
              key: index.toString(),
              children: (
                <div className="tab-content">
                  {data
                    .filter(
                      (item) => category === "all" || item.category === category
                    )
                    .map((item: any) => (
                      <div id="box" key={item.id}>
                        <div className="imgcontainer">
                          <div className="buttonbox">
                            <i
                              className={
                                isFavorite(item)
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
                              }
                              onClick={() => {
                                toggleFavorite(item);
                              }}
                            ></i>
                            <i
                              className="fa-solid fa-basket-shopping"
                              onClick={() => {
                                toggleBasket(item);
                              }}
                            ></i>
                          </div>

                          <img src={item.image} alt="image" />
                        </div>

                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span>${item.price}</span>

                        <a href={`/product/${item.id}`}>
                          <button className="addtocard">Add to cart</button>
                        </a>
                      </div>
                    ))}
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default NewArrival;
