import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

{
  /* Pages*/
}
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import Showcase from "./pages/Showcase.jsx";
import Register from "./pages/Register.jsx";
import Footer from "./pages/Footer.jsx";

import Navbar from "./components/Navbar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

{
  /*For Admin only*/
}
import AdminOrders from "./pages/AdminOrders";
import AdminRoute from "./components/AdminRoute";
import AdminProducts from "./pages/AdminProducts";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <CategoryProvider>
        <BrowserRouter>
          <Navbar />
          <Showcase />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route path="/register" element={<Register />} />

            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
        </CategoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}









