import { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts.jsx";

export const useFavs = () => {
  const [favItems, setFavItems] = useState(() => {
    const stored = localStorage.getItem("favs");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favItems));
  }, [favItems]);

  return { favItems, setFavItems };
};
