import { useEffect, useState, Fragment } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts.jsx";
import { useFavs } from "../hooks/useFavs.jsx";

import API from "../api/axios";

const Home = () => {
  const { products, categories } = useProducts();
  const { addToCart } = useCart();
  const { favItems, setFavItems } = useFavs();
  
  
  return (
    <Fragment>
      <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((p) => {
          return (
            <div
              key={p._id}
              className="border-sky-100 border-2 p-2 rounded shadow relative h-[270px] overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.name}
                className="z-[-1] rounded absolute left-0 w-full"
              />
              <div className="bg-sky-200 rounded absolute bottom-0 left-0 h-[120px] p-1 w-full">
              <h2 className="font-bold text-sm mt-2 clr-text-dark">{p.name}</h2>
              <p className="text-gray-600 text-[10px] clr-text-darkSub">{p.description}</p>
              <p className="mt-1 font-semibold text-sky-400">৳{p.price}</p>

              <div className="flex absolute bottom-1 gap-2 items-center">
                <button
                  className="bg-sky-400 text-white px-3 py-1 mt-2 rounded"
                  onClick={() => {
                    addToCart(p);
                  }}
                >
                  <img className="w-5 p-[1px]" src="/SVGs/cartPlus.svg" alt="cart"/>
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
              
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Home;
