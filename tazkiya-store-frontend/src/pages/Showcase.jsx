import { useState, useContext } from "react";
import { useProducts } from "../hooks/useProducts.jsx";
import { useAuth } from "../context/AuthContext";
import { CategoryContext } from "../context/CategoryContext.jsx";


export default function Showcase() {
  const { categories } = useProducts();
  const { user } = useAuth();
  const {selectedCategory, setSelectedCategory} = useContext(CategoryContext);

  const images = ["/showcase_1.png", "/showcase_2.png", "/showcase_3.png"];

  const [currentIdx, setCurrentIdx] = useState(0);

  const prevSlide = () => {
    setCurrentIdx(currentIdx === 0 ? images.length - 1 : currentIdx - 1);
  };

  const nextSlide = () => {
    setCurrentIdx(currentIdx === images.length - 1 ? 0 : currentIdx + 1);
  };

  if (!user) return null;

  return (
  <div>
    <div className="relative h-[370px]">
      <img
        className="[mask-image:linear-gradient(black_50%,transparent)]"
        src={images[currentIdx]}
        alt="Showcase"
      />

      <p className="absolute top-0 w-full backdrop-blur-sm text-center clr-text-dark font-medium text-shadow-lg font-bsh text-lg text-shadow-white">
        ভালো খাবার, সুস্থ জীবন।
      </p>

      <div className="absolute max-w-full overflow-x-scroll p-1 px-3 pt-4 bottom-[10px] flex gap-[3px] backdrop-blur-sm">
      
      <span
              className={`clr-text-dark bg-sky-100/50 border border-sky-400/50 rounded p-2
  px-2 py-1 backdrop-blur-sm flex-1 whitespace-nowrap font-medium ${selectedCategory === "all" ? "activeCat" : ""}`}
            onClick={()=>{
            setSelectedCategory("all");
            }}
            >
              All
            </span>
        {categories.map((cat) => {
          return (
            <span
              onClick={()=>{
              setSelectedCategory(cat);
              }}
              key={cat}
              className={`clr-text-dark bg-sky-100/50 border border-sky-400/50 rounded p-2
  px-2 py-1 backdrop-blur-sm flex-1 whitespace-nowrap font-medium ${selectedCategory === cat ? "activeCat" : ""}`}
            >
              {cat}
            </span>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-r-lg hover:bg-black/75"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-l-lg hover:bg-black/75"
      >
        ❯
      </button>
    </div>
      <h1 className="shadow font-BenSenHand bg-green-100 p-2 text-center clr-text-dark whitespace-nowrap overflow-x-hidden">
      <span className="inline-block animate-marquee">
        এখনই অর্ডার করুন, অতঃপর চলে আসুন আরাম পাড়া, চুয়াডাঙ্গা সদর - মাছের আড়তের পাশে। মোবাঃ ০১৭১৪-৯৯৪১৫৭।
      </span>
      </h1>
    </div>

  );
}
