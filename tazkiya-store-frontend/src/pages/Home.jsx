import { useEffect, useState, Fragment } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts.jsx";
import { useFavs } from "../hooks/useFavs.jsx";

import API from "../api/axios";

const Home = () => {
  const { products, categories } = useProducts();
  const { addToCart } = useCart();
  const { favItems, setFavItems } = useFavs();
  
  console.log(useCart())
  
  return (
    <Fragment>
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((p) => {
          return (
            <div
              key={p._id}
              className=" border-sky-100 border-2 p-2 rounded shadow"
            >
              <img
                src={p.image}
                alt={p.name}
                className="rounded object-cover"
              />
              <h2 className="font-bold text-lg mt-2">{p.name}</h2>
              <p className="text-gray-600">{p.description}</p>
              <p className="mt-1 font-semibold">Price: ৳{p.price}</p>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    addToCart(p);
                  }}
                  className="bg-sky-400 text-white px-3 py-1 mt-2 rounded"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    setFavItems((prev) =>
                      prev.includes(p.name) ? prev.filter(item => item !== p.name) : [...prev, p.name],
                    );
                  }}
                >
                  <img
                    className="w-5 mt-2"
                    src={
                      favItems.includes(p.name)
                        ? "/SVGs/fav.svg"
                        : "/SVGs/unFav.svg"
                    }
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Home;
