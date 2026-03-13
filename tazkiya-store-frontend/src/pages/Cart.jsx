import { useCart } from "../context/CartContext";
import API from "../api/axios";
import { useState, useRef, Fragment } from "react";
import { Toast } from "./Toast.jsx";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const [quantities, setQuantities] = useState({});
  const couponCode = "TZ2026";
  const couponVal = 50;
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const inputRef = useRef(null);

  const totalPrice =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) -
    Number(isCouponApplied ? couponVal : 0);

  const placeOrder = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
        })),
        totalPrice,
      };

      await API.post("/orders", orderData);

      await fetch(
        "https://formsubmit.co/ajax/643f3890ee05a12b9551a6d56bcf6163",
        {
          method: "POST",
          body: formData,
        },
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error placing order");
        });

      clearCart();
      alert("Order placed successfully!");
    } catch (err) {
      alert("Order failed!");
      console.error(err);
    }
  };

  function handleIncreaser(id) {
    setQuantities({
      ...quantities,
      [id]: (quantities[id] || 1) + 1,
    });

    updateQuantity(id, (quantities[id] || 1) + 1);
  }

  function handleDecreaser(id) {
    if ((quantities[id] || 1) > 1) {
      setQuantities({
        ...quantities,
        [id]: (quantities[id] || 1) - 1,
      });

      updateQuantity(id, (quantities[id] || 1) - 1);
    }
  }

  function handleQuantityChange(id, val) {
    const value = Number(val);
    if (!isNaN(value) && value > -1) {
      setQuantities({
        ...quantities,
        [id]: value,
      });

      updateQuantity(id, value);
    }
  }

  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) => {
      return item._id === id ? { ...item, quantity } : item;
    });
    setCartItems(updatedItems);
  };

  function handleApplyCoupon() {
    const value = inputRef.current.value;
    if (value === couponCode) {
      setIsCouponApplied(true);
    }
  }

  return (
    <div className="p-2">
      <h1 className="text-2xl pt-3 font-bold mb-4">আপনার নির্বাচিত পণ্য</h1>
      {cartItems.length === 0 && (
        <p className="text-center">এখনই পণ্য নির্বাচন করুন!</p>
      )}

      {cartItems.map((item) => {
        return (
          <div
            key={item._id}
            className="border p-3 mb-3 rounded relative overflow-hidden"
          >
            <div className="grid gap-1">
              <h2 className="font-semibold">{item.name}</h2>
              <div className="flex gap-2">
                <p>
                  {item.quantity} × ৳{item.price}
                </p>{" "}
                =<p className="font-bold">{item.quantity * item.price}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <input
                className="focus:outline-sky-400 border py-1 mt-2 w-10 rounded text-center"
                type="text"
                placeholder="Eg. 5"
                value={quantities[item._id] || item.quantity}
                onChange={(e) => {
                  handleQuantityChange(item._id, e.target.value);
                }}
              />
              <button
                onClick={() => {
                  handleIncreaser(item._id);
                }}
                className="text-xl text-white bg-sky-400 border w-[32px] text-white px-2 mt-2 rounded"
              >
                +
              </button>
              <button
                onClick={() => {
                  handleDecreaser(item._id);
                }}
                className="text-xl clr-bg-dark text-white border w-[32px] px-2 mt-2 rounded"
              >
                -
              </button>
              <button
                onClick={() => {
                  removeFromCart(item._id);
                }}
                className="bg-red-100 text-white px-2 py-1 mt-2 rounded"
              >
                <img className="w-6" src="/SVGs/cartMinus.svg" />
              </button>
            </div>
            <img
              className="absolute w-20 right-2 top-[50%] -translate-y-1/2 rounded overflow-hidden"
              src={item.image}
            />
          </div>
        );
      })}

      {cartItems.length > 0 && (
        <div className="grid">
          <h2 className="font-bold my-2">Apply Coupon:</h2>
          <div className="grid gap-1">
            <div className="flex gap-1">
              <input
                ref={inputRef}
                placeholder="Eg. TazkiyaFirst"
                className="border flex-1 focus:outline-sky-400 rounded p-2 font-bold text-sky-600"
                type="text"
              />
              <button
                onClick={() => {
                  handleApplyCoupon();
                }}
                className="rounded flex-1 bg-sky-400 p-1 text-white px-3"
              >
                Apply
              </button>
            </div>

            <h2 className="grid gap-2 justify-self-end mr-2 text-lg mt-4">
              <span>
                কুপন:{" "}
                <span className="text-red-600 font-bold">
                  -{isCouponApplied && couponVal}
                </span>
              </span>
              <span>
                মোটঃ{" "}
                <span className="text-red-600 font-bold">
                  ৳
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  )}
                </span>
              </span>
              <span>
                সর্বমোটঃ{" "}
                <span className="text-red-600 font-bold">
                  ৳{isCouponApplied && totalPrice}
                </span>
              </span>
            </h2>

            <form onSubmit={placeOrder}>
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <input
                type="hidden"
                name="Order Items"
                value={cartItems
                  .map(
                    (item) =>
                      `${item.name} (x${item.quantity}) - ${item.price} BDT`,
                  )
                  .join("\n")}
              />
              <input type="hidden" name="Total_Price" value={totalPrice} />
              <input type="hidden" name="Name" value={user.name} />
              <input type="hidden" name="Email" value={user.email} />
              <button className="bg-sky-400 text-white px-4 py-2 mt-3 rounded w-full">
                অর্ডার করুন - ৳{totalPrice}
              </button>
            </form>
          </div>
        </div>
      )}
      {isCouponApplied && <Toast message="Coupon Applied" type="success" />}
    </div>
  );
};

export default Cart;
