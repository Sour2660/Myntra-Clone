// App.jsx - Main Entry Point
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './assets/pages/Home'
import Men from "./assets/pages/Men";
import Women from "./assets/pages/Women";
import Kids from "./assets/pages/Kids";
import Cart from "./assets/pages/Cart";
import Wishlist from "./assets/pages/Wishlist";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import Payment from "./assets/pages/Payment";
import ProductDetail from "./assets/pages/ProductDetail";
import Navbar from "./assets/components/Navbar";
import PrivateRoute from "./assets/components/PrivateRoute";
import SearchResults from "./assets/pages/SearchResults";
import MyOrders from "./assets/pages/MyOrders"; 
import AdminDashboard from "./assets/components/AdminDashboard";

import OrderSuccess from "./assets/pages/OrderSuccess";






function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />      
        <Route path="/search" element={<SearchResults />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
<Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;