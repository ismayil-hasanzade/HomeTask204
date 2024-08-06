import React, { createContext, useState, ReactNode, useEffect } from "react";

interface DataType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface BasketContextType {
  favorites: DataType[];
  toggleBasket: (item: DataType) => void;
}

export const BasketContext = createContext<BasketContextType | undefined>(
  undefined
);

export const BasketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<DataType[]>(() => {
    const savedBasket = localStorage.getItem("basket");
    return savedBasket ? JSON.parse(savedBasket) : [];
  });
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(() => {
      return basket.length;
    });
  });

  const toggleBasket = (item: DataType) => {
    setBasket((prevBasket) => {
      let newBasket;
      if (prevBasket.some((basket) => basket.id === item.id)) {
        newBasket = prevBasket.filter((basket) => basket.id !== item.id);
      } else {
        newBasket = [...prevBasket, item];
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));

      return newBasket;
    });
  };

  return (
    <BasketContext.Provider value={{ basket, toggleBasket, count, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
