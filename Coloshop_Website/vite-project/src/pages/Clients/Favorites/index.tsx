// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { Card, Spin } from "antd";
// import { FavoritesContext } from "../FavoritesProvaider";

// const { Meta } = Card;

// // DataType
// interface DataType {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// }

// const Product = () => {
//   const URL: string = "http://localhost:3000/products";
//   const [data, setData] = useState<DataType[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await axios.get(URL);
//         setData(response.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, []);

//   const { favorites, toggleFavorite } = useContext(FavoritesContext);

//   const isFavorite = (item: DataType): boolean => {
//     return favorites.some((favorite) => favorite.id === item.id);
//   };

//   return (
//     <div id="boxcontainer">
//       {loading ? (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//             padding: "80px 0 0 0 ",
//           }}
//         >
//           <Spin size="large" />
//         </div>
//       ) : (
//         data.map((item) => (
//           <Card
//             key={item.id}
//             hoverable
//             style={{ width: 240 }}
//             cover={<img alt={item.title} src={item.image} />}
//           >
//             <i
//               className={
//                 isFavorite(item) ? "fa-solid fa-heart" : "fa-regular fa-heart"
//               }
//               onClick={() => toggleFavorite(item)}
//               style={{ cursor: "pointer" }}
//             ></i>
//             <Meta title={item.title} />
//             <p>$ {item.price}</p>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };

// export default Product;

// ________________________________________________________//

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
            style={{ cursor: "pointer", color: "red" }}
          ></i>
          <Meta title={item.title} />
          <p>$ {item.price}</p>
        </Card>
      ))}
    </div>
  );
};

export default Favorites;
