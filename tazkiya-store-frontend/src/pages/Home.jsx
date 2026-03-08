import { useEffect, useState, Fragment } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts.jsx";
import { useFavs } from "../hooks/useFavs.jsx";

import API from "../api/axios";

const Home = () => {
  const { products, categories } = useProducts();
  const { cartItems,addToCart } = useCart();
  const { favItems, setFavItems } = useFavs();
  const [sortProductsCol, setSortProductsCol] = useState(true);
  
  return (
    <Fragment>
     <div className="flex gap-1 backdrop-blur-md rounded p-2 rounded">
     <input
     placeholder="অনুসন্ধান করুনঃ"
     onClick={(e)=>{
     e.stopPropagation();
     }}
     className=" w-[60%] p-2 clr-text-dark border-2 border-sky-300 rounded focus:outline-sky-400" type="text"
     />
     <button
     onClick={(e)=>{
     e.stopPropagation();
     }}
     className="px-3 w-[15%] bg-sky-400 rounded p-1"><img
      className="w-30 p-1"
      src="/SVGs/search.svg"/></button>
     
     <div className="flex border rounded">
     <img
     onClick={() => {
     setSortProductsCol(true);
     }}
     className={`w-10 p-2 ${sortProductsCol ? "bg-sky-200" : ""}`} src="/SVGs/bars.svg"/>
     
     <img
     onClick={() => {
     setSortProductsCol(false);
     }}
     className={`w-10 p-2 ${sortProductsCol ? "" : "bg-sky-200"}`} src="/SVGs/grip.svg"/>
     </div>
      
     </div>
      <div className={`p-5 grid ${sortProductsCol ? "grid-cols-1" : "grid-cols-2"} md:grid-cols-3 gap-5`}>   
        {products.map((p) => {
          return (
            <div
              key={p._id}
              className={`shadow-md border-sky-100 border-2 rounded shadow relative ${sortProductsCol ? "h-[130px]" : "h-[230px]"} overflow-hidden`}
            >
              <img
                src={p.image}
                alt={p.name}
                className={`scale-[.9] z-[-1] rounded absolute ${sortProductsCol ? "right-0 top-0 w-[50%]" :"left-0 w-full"}`}
              />
              {/* Product info wrapper */}
              <div className={`bg-sky-200 rounded absolute bottom-0 left-0 p-2 ${sortProductsCol ? "h-[100%] w-[150px]" : "h-[110px] w-full"}`}>
              <h2 className="font-bold text-sm clr-text-dark whitespace-nowrap overflow-x-auto text-ellipsis">{p.name}</h2>
              <p className="text-gray-600 text-[10px] clr-text-darkSub whitespace-nowrap overflow-x-auto">{p.description}</p>
              <p className="mt-1 font-semibold text-sky-400">৳{p.price}</p>

              <div className="flex absolute bottom-1 gap-2 items-center">
                <button
                  className="shadow bg-sky-400 text-white px-3 py-1 rounded"
                  onClick={() => {
                    addToCart(p);
                  }}
                >
                  <img className="w-5 p-[1px]" src="/SVGs/cartPlus.svg" alt="cart"/>
                </button>

                <button
                  onClick={() => {
                   
                    setFavItems((prev) =>
                      prev.includes(p.name) ? prev.filter(item => item !== p.name) : [...prev, p.name]
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






