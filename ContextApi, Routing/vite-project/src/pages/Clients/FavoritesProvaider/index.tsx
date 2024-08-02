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

interface FavoritesContextType {
  favorites: DataType[];
  toggleFavorite: (item: DataType) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<DataType[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [count, setCount] = useState(0);
  useEffect(()=>{
    setCount(()=>{
        return favorites.length;
    })

  })
  
  
  const toggleFavorite = (item: DataType) => {
    setFavorites((prevFavorites) => {
      let newFavorites;
      if (prevFavorites.some((favorite) => favorite.id === item.id)) {
        newFavorites = prevFavorites.filter(
          (favorite) => favorite.id !== item.id
        );
      } else {
        newFavorites = [...prevFavorites, item];
      }
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite ,count}}>
      {children}
    </FavoritesContext.Provider>
  );
};
