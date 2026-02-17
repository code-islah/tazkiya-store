import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

import API from "../api/axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

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

  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      {products.map((p) => {
        return (
          <div key={p._id} className="border p-3 rounded shadow">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover"
            />
            <h2 className="font-bold text-lg mt-2">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
            <p className="mt-1 font-semibold">Price: ৳{p.price}</p>
            <button
              onClick={() => {
                addToCart(p);
              }}
              className="bg-black text-white px-3 py-1 mt-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
