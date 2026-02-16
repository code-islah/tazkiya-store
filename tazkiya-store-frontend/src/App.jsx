import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";



export default function App(){
 return (
 <AuthProvider>
 <BrowserRouter>
 <Navbar />
 <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  </AuthProvider>
 )
}