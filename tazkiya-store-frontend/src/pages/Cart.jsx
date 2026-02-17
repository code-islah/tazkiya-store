import { useCart } from "../context/CartContext";
import API from "../api/axios";

const Cart = () => {
 const {cartItems, removeFromCart, clearCart} = useCart();
 
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
   try{
   const orderData = {
    orderItems: cartItems.map((item) => ({
    product: item._id,
    quantity: item.quantity
    })),
    totalPrice,
   }
   
   await API.post("/orders", orderData);
   clearCart();
   alert("Order placed successfully!");
   } catch(err){
     alert("Order failed!");
     console.error(err);
   }
  }
  
  
  return (
  <div className="p-5">
  <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
  {cartItems.length === 0 && <p>No items in cart</p>}
  
  {cartItems.map(item => {
  return <div key={item._id}
  className="border p-3 mb-3 rounded">
    <h2 className="font-semibold">{item.name}</h2>
    <p>
            {item.quantity} × ৳{item.price}
          </p>
    <button onClick={()=>{
    removeFromCart(item._id)
    }} className="bg-red-500 text-white px-2 py-1 mt-2 rounded">Remove</button>
    </div>
  })}
  
  {cartItems.length > 0 && (
  <div>
   <h2 className="text-xl mt-4">Total: ৳{totalPrice}</h2>
   <button
            onClick={placeOrder}
            className="bg-black text-white px-4 py-2 mt-3 rounded"
          >
            Place Order
          </button>
  </div>
  )} 
  </div>
  )
}


export default Cart;




