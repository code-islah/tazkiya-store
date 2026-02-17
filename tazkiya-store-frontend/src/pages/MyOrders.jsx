import { useEffect, useState } from "react";
import API from "../api/axios";

const MyOrders = () => {
 const [orders, setOrders] = useState([]);
 
 useEffect(()=>{
   const fetchOrders = async () => {
   try {
   const {data} = API.get("orders/my");
   setOrders(data);
   } catch(err) {
    console.log(err);
   }
    }   
   fetchOrders();
 },[]);
 
 return (
     <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-3 mb-3 rounded">
          <p>Status: {order.status}</p>
          <p>Total: ৳{order.totalPrice}</p>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
 )
}



export default MyOrders;



