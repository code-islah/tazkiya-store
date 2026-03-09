import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Fragment, useState, useRef } from "react";
import {useFavs} from "../hooks/useFavs.jsx";
import {useProducts} from "../hooks/useProducts.jsx";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems, addToCart, removeFromCart, setCartItems} = useCart();
  
  const {products, categories } = useProducts();  const [toggler, setToggler] = useState(true);
  const [showLocation, setShowLocation] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const {favItems, setFavItems} = useFavs();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  
  
  //For cart on Nav
  const [quantities, setQuantities] = useState({});
  const inputRef = useRef(null);
  const navigateToCart = useNavigate();
  
  function handleIncreaser(id) {
    setQuantities({
    ...quantities,
    [id]: (quantities[id] || 1) + 1,
    });
    
    updateQuantity(id, (quantities[id] || 1) +1);
  }
  
  
  
  function handleDecreaser(id) {
    if((quantities[id] || 1) > 1) {
    setQuantities({
    ...quantities,
    [id]: (quantities[id] || 1) -1,
    });
    
    updateQuantity(id, (quantities[id] || 1) -1);
    }
  }
  
  function handleQuantityChange(id, val){
    const value = Number(val);
    if(!isNaN(value) && value > -1) {
    setQuantities({
    ...quantities,
    [id]: value
    });
    
    updateQuantity(id, value);
    } 
  }
  
  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map(item => {
     return item._id === id ? {...item, quantity} : item
    });
    setCartItems(updatedItems);
  }
  
    return (
    <nav className="z-10 top-0 bg-sky-300 flex justify-between items-center text-white p-3 nav-link">
      
        <img
        onClick={()=>{
        navigateToCart("/");
        }}
        className="rounded w-[60px]"
        src="/logo.png"
        alt="logo"
        />
      
      
      <div className="flex gap-5">
      <div className="flex gap-3">
           
     {/*Location section*/}
     <div onClick={()=>{
      setShowFav(prev => !prev);
      if(showLocation) {
      setShowLocation(false);
      }
     }}><img className="w-5" src="/SVGs/fav.svg" alt="Favourite" />
     {showFav && (
     <div className="animateTopToBottom absolute right-2 mt-3 w-[90%] text-center z-10 shadow-lg"><h1 className="text-left backdrop-blur-md rounded gap-5 bg-sky-100/50">
     <span className="py-2 border rounded px-2 bg-sky-400 text-white text-sky-400">You Loved :</span>
     {favItems.map(item => {
     
     const product = products.find(p => p.name === item);
     return <div className="mt-2" key={item}>
     <div className="flex justify-between p-1 px-3 whitespace-nowrap overflow-hidden text-ellipsis"><div><span>{item}</span> - &nbsp;
       {product ? <span className="overflow-hidden text-ellipsis clr-text-dark font-bold">{product.price + "৳"}</span> : "N/A"}</div>
      <div className="flex gap-1">
      <button
      onClick={(e) => {
      e.stopPropagation();
      addToCart(product);
      }}
      className="bg-sky-400 rounded px-3 py-[3px]"><img className="w-5 p-[1px]" src="/SVGs/cartPlus.svg" alt="cart"/></button>
      <button 
      onClick={(e)=>{
      e.stopPropagation();
      setFavItems(
       favItems.filter(item => {
       return item !== product.name;
       })
      )
            }}
      className="bg-red-500 clr-text-light rounded px-3 py-[3px]"
      >&times;</button>
      </div>
     </div>
     </div>
     })}
     </h1>
     </div>
     )}
     </div> 
     
     <div onClick={()=> {
     setShowLocation(prev => !prev);
     }}><img className="w-[18px]" src="/SVGs/location.svg" alt="Location" />
     { showLocation &&  <div className="animateTopToBottom absolute right-3 mt-2 w-[80%] z-50 shadow-lg">
      <span className="inline-block py-2 border rounded px-2 bg-sky-400 clr-text-light mt-[-10px]">আমাদের ঠিকানাঃ</span>
     <h1 className="text-center backdrop-blur-md p-2 rounded bg-sky-100/50 gap-2">
     আরাম পাড়া, চুয়াডাঙ্গা। <br /> মাছের আড়তের পাশে, গোরস্থান মসজিদের সম্মুখে।</h1>
     <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3654.987436116533!2d88.85146007533255!3d23.640620978745474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDM4JzI2LjIiTiA4OMKwNTEnMTQuNSJF!5e0!3m2!1sen!2sbd!4v1772242411481!5m2!1sen!2sbd" className="w-full bg-black/50 rounded shadow-xl" height="250" style={{border:0}}allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
     </div>
     }      
     </div>
     
     
     {/*Cart section on nav*/}
     <div
     className={`${cartItems.length > 0 ? "cartOnNav" : ""}`}
     data-cartitemcount={cartItems.length}
     onClick={(e)=>{
     e.stopPropagation();
     setShowCart(prev => !prev);
     }}>
 
     <img
    className="w-6"
    src="/SVGs/cart.svg"/>
     </div>
     
     { showCart && <div className="backdrop-blur-md rounded bg-sky-100/50 animateTopToBottom absolute mt-10 w-[70%] right-3 z-50 shadow-lg">
     
     <div className="p-2">
      <h1 className="mb-4 border rounded p-2 bg-sky-400 clr-text-light inline-block absolute left-0 top-[-40px]">নির্বাচিত পণ্যঃ</h1>
      {cartItems.length === 0 && <p>এখনই পণ্য নির্বাচন করুন!</p>}
    
      {cartItems.map((item) => {  
        return (
          <div key={item._id} className="border p-3 mb-3 rounded relative overflow-hidden">
           <div className="grid gap-1">
           
            <h2 className="font-semibold">{item.name}</h2>
            <div className="flex gap-2">
            
            <p>
              {item.quantity} × ৳{item.price}
            </p> =
            <p className="font-bold">{item.quantity * item.price}</p>
            </div>
            </div>
            <div className="flex gap-1">
            <input 
            className='focus:outline-sky-400 border py-1 mt-2 w-10 rounded text-center clr-text-dark' 
            type="text" 
            placeholder="2"
            value={quantities[item._id] || item.quantity}
            onChange={(e)=>{
            handleQuantityChange(item._id,e.target.value);
            }}/>
            <button
            onClick={() => {handleIncreaser(item._id)}}
             className="text-xl text-white bg-sky-400 border w-[32px] text-white px-2 mt-2 rounded"
             >+</button>
            <button
            onClick={()=>{handleDecreaser(item._id)}}
             className="text-xl clr-bg-dark text-white border w-[32px] px-2 mt-2 rounded">-</button>
            <button
              onClick={() => {
                removeFromCart(item._id);
              }}
              className="bg-red-100 text-white px-2 py-1 mt-2 rounded"
            >
              <img
              className="w-6"
              src="/SVGs/cartMinus.svg"/>
            </button>
              
            </div>
          </div>
        );
      })}

      {cartItems.length > 0 && (
        <div className="grid">

             
          <div className="grid gap-1"> 
  
           
              <h2 className="grid gap-2 justify-self-end mr-2 text-lg mt-4">
                 
              <span>মোটঃ <span className="text-red-600 font-bold">৳{cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  ) }</span></span>
 
              </h2>
              
          <button
            onClick={() => {
            navigateToCart("/cart");
            setShowCart(false);
            }}
            className="bg-sky-400 text-white px-4 py-2 mt-3 rounded"
          >
          
            এগিয়ে যান <span
   className="text-sky-500"
   >❯</span>
          </button>
          </div>
        </div>
      )}
    
    </div>
     
     
     </div>  
     }
      </div>
    
    {/* after login user section */}  
      <div className="text-white z-[1000]"> 
        {user ? (
        <Fragment>
        
          <div className="grid md:hidden">
          
            <button
            onClick={() => {
            setToggler(prev => !prev)
            if(showLocation) setShowLocation(false);
            if(showFav) setShowFav(false);
            }
          }
            className="text-gray-700 focus:outline-none">
            {/* Icon */}
            <svg className="w-6 h-6" fill="currentColor" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          </div>
         <div className={toggler ? "hidden" : "grid absolute right-2 p-2 mt-2 w-[60%] backdrop-blur-md rounded bg-black/50 gap-2"}>
         
               <div className="p-1 border rounded  bg-sky-400 text-white">
               <span className="flex capitalize justify-center gap-3">{user.name} <img className="w-5" src="/SVGs/settings.svg" /></span>       </div>      
               
            <Link to="/cart">Cart</Link>
            <Link to="/my-orders">My Orders</Link>
            <Link to="#">Favouties</Link>
            
               {user?.role === "admin" && (
          <div className="flex text-white p-2 gap-3 justify-evenly border bottom-0 left-0 w-full">
          
          {user?.role === "admin" && <Link to="admin/orders">Admin</Link>}
          
            <Link to="/admin/orders">Orders</Link>
            <Link to="/admin/products">Products</Link>
          </div>
        )}        
            
            <button onClick={logout} className="bg-sky-400 px-3 py-1 rounded">
              Logout
            </button>
          </div>
          </Fragment>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;








