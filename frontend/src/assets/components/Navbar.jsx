
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHeart, FaShoppingCart, FaUserCircle, FaBoxOpen } from "react-icons/fa";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-dark" to="/">
          <img
            src="https://aartisto.com/wp-content/uploads/2020/11/myntra.png"
            alt="Myntra"
            height="40"
            className="me-2"
          />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Main Links */}
          <ul className="navbar-nav fw-semibold me-4 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/men">Men</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/women">Women</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kids">Kids</Link>
            </li>
          </ul>

          {/* Search */}
          <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <input
              className="form-control rounded-pill px-4 border"
              type="search"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Icons and Auth */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center fw-semibold text-center">

  {/* Wishlist */}
  <li className="nav-item me-3">
    <Link to="/wishlist" className="nav-link d-flex flex-column align-items-center text-danger">
      <FaHeart size={20} />
      <span className="small fw-bold text-dark mt-1">Wishlist</span>
    </Link>
  </li>

  {/* Cart */}
  <li className="nav-item me-3">
    <Link to="/cart" className="nav-link d-flex flex-column align-items-center">
      <FaShoppingCart size={20} />
      <span className="small fw-bold text-dark mt-1">Cart</span>
    </Link>
  </li>

  {/* Orders */}
  <li className="nav-item me-3">
    <Link to="/orders" className="nav-link d-flex flex-column align-items-center">
      <FaBoxOpen size={20} />
      <span className="small fw-bold text-dark mt-1">Orders</span>
    </Link>
  </li>

  {/* Profile */}
  {auth.user ? (
    <>
      <li className="nav-item me-3">
        <div className="nav-link d-flex flex-column align-items-center">
          <FaUserCircle size={20} className="text-secondary" />
          <span className="small fw-bold text-dark mt-1">{auth.user.name}</span>
        </div>
      </li>
      <li className="nav-item me-2">
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-outline-danger"
        >
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item me-2">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
      <li className="nav-item me-3">
        <Link to="/register" className="nav-link">Register</Link>
      </li>
    </>
  )}
</ul>

        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
