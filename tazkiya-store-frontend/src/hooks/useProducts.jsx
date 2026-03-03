import { useEffect, useState } from "react";
import API from "../api/axios";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((item) => item.category))];

  return { products, categories };
};
