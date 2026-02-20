import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await API.get("/orders");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      {orders.map((order) => {
        return (
          <div key={order._id} className="border p-3 mb-3 rounded">
            <p>User: {order.user?.name}</p>
            <p>Total: ৳{order.totalPrice}</p>
            <p>Status: {order.status}</p>
            <div className="space-x-2 mt-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  updateStatus(order._id, "completed");
                }}
              >
                Complete
              </button>

              <button
                className="bg-green-600 text-white px-2 py-1 rounded"
                onClick={() => {
                  updateStatus(order._id, "completed");
                }}
              >
                Deliver
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminOrders;
