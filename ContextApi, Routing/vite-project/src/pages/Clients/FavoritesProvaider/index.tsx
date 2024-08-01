import React, { createContext, useContext, useState, ReactNode } from "react";

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

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<DataType[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = (item: DataType) => {
    setFavorites((prevFavorites) => {
      let newFavorites;
      if (prevFavorites.some((favorite) => favorite.id === item.id)) {
        newFavorites = prevFavorites.filter((favorite) => favorite.id !== item.id);
      } else {
        newFavorites = [...prevFavorites, item];
      }
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
