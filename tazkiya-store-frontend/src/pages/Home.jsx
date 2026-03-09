import { useEffect, useState, useContext, Fragment } from "react";
import { useCart } from "../context/CartContext";
import { CategoryContext } from "../context/CategoryContext.jsx";
import { useProducts } from "../hooks/useProducts.jsx";
import { useFavs } from "../hooks/useFavs.jsx";

import API from "../api/axios";

const Home = () => {
  const { products, categories } = useProducts();
  const { cartItems,addToCart } = useCart();
  const { favItems, setFavItems } = useFavs();
  const [sortProductsCol, setSortProductsCol] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const {selectedCategory, setSelectedCategory} = useContext(CategoryContext);
  const [searchVal, setSearchVal] = useState("");
  const [visibleSortingWindow, setVisibleSortingWindow] = useState(false);
  const [sortType, setSortType] = useState("");
  
  const categorizedProducts = products.filter(product => {
  return (selectedCategory === "all" ||product.category === selectedCategory) && product.name.toLowerCase().includes(searchVal.toLowerCase());
  }).sort((a, b) => {
    if(sortType === "AtoZ") return a.name.localeCompare(b.name);
    if(sortType === "ZtoA") return b.name.localeCompare(a.name);
    if(sortType === "LowToHigh") return a.price -b.price;
    if(sortType === "HighToLow") return b.price - a.price;
    return 0;
  });
  
  
  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 8);
  }
  
  const sortOptions = [
  { label: 'A to Z', value: 'AtoZ' },
  { label: 'Z to A', value: 'ZtoA' },
  { label: 'Price ⇑', value: 'LowToHigh' },
  { label: 'Price ⇓', value: 'HighToLow' },
];
  
  
  return (
    <Fragment>
     <div className="flex gap-1 backdrop-blur-md rounded p-2 rounded">
     <input
     placeholder="অনুসন্ধান করুনঃ"
     onChange={(e)=>{
     e.stopPropagation();
     setSearchVal(e.currentTarget.value);
     }}
     className="w-[70%] p-2 clr-text-dark border-2 border-sky-300 rounded focus:outline-sky-400" type="text"
     />
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
     
       <div
       className="flex items-center relative"
       onClick={()=>{
        setVisibleSortingWindow(prev => !prev);
       }}>
       <img
       className="w-10" 
       src="/SVGs/sort.svg"
       alt="sort" />
       </div>
       
        {visibleSortingWindow &&
        <div
        className="animateTopToBottom absolute right-11 top-[-100%] grid gap-2
        clr-text-dark font-bold bg-sky-100/80 border rounded z-50 backdrop-blur-lg"
        >
        {sortOptions.map(opt => 
          (<span
         className="z-50 px-4"
         key={opt.value}
         style={{ cursor: 'pointer', borderBottom: "1px solid rgba(0,0,0,0.1)"}}
         onClick={()=>{
         setSortType(opt.value);
         setVisibleSortingWindow(prev => !prev);
         }}>
         {opt.label}
         </span>))
         }
        </div>
        }
     </div>
      
     </div>
      <div className={`p-5 grid ${sortProductsCol ? "grid-cols-1" : "grid-cols-2"} md:grid-cols-3 gap-5`}>   
        {categorizedProducts.slice(0, visibleProducts).map((p) => {
          return (
            <div
              key={p._id}
              className={`shadow-md rounded relative ${sortProductsCol ? "h-[130px]" : "h-[230px]"} overflow-hidden`}
            >
              <img
                src={p.image}
                alt={p.name}
                className={`scale-[.9] z-[-1] rounded absolute ${sortProductsCol ? "right-0 top-0 w-[50%]" :"left-0 w-full"}`}
              />
              {/* Product info wrapper */}
              <div className={`bg-sky-200 rounded absolute bottom-0 left-0 p-2 border-2 border-sky-100 ${sortProductsCol ? "h-[100%] w-[150px]" : "h-[110px] w-full"}`}>
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
      {visibleProducts < products.length && 
      <div
      onClick={loadMoreProducts}
      className='flex justify-center mb-3'><button className="border clr-text-light bg-sky-400 px-3 p-2 rounded shadow">More Products</button></div>}
    </Fragment>
  );
};

export default Home;






