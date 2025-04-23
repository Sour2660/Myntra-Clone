



// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";

// const Navbar = () => {
//   const { auth, setAuth } = useContext(AuthContext);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setAuth({ token: null, user: null });
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
//       <div className="container-fluid">
//         {/* Logo */}
//         <Link className="navbar-brand" to="/">
//           <img
//             src="https://aartisto.com/wp-content/uploads/2020/11/myntra.png"
//             alt="Myntra"
//             height="40"
//           />
//         </Link>

//         {/* Mobile Toggle */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarContent"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Main Content */}
//         <div className="collapse navbar-collapse" id="navbarContent">
//           {/* Navigation Links */}
//           <ul className="navbar-nav me-4 mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/men">Men</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/women">Women</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/kids">Kids</Link>
//             </li>
//           </ul>

//           {/* Search Bar */}
         

// <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
//   <input
//     className="form-control rounded-pill px-4"
//     type="search"
//     placeholder="Search for products, brands and more"
//     value={searchQuery}
//     onChange={(e) => setSearchQuery(e.target.value)}
//   />
// </form>

//           {/* Right Side */}
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
           

//             <li className="nav-item me-3">
//               <Link to="/wishlist" className="nav-link">
//                 <FaHeart size={20} />
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/cart" className="nav-link">
//                 <FaShoppingCart size={20} />
//               </Link>
//             </li>
//             <li className="nav-item">
//   <Link className="nav-link" to="/orders">My Orders</Link>
// </li>
// {auth.user ? (
//               <>
//                 <li className="nav-item me-2">
//                   <span className="nav-link">Hi, {auth.user.name}</span>
//                 </li>
//                 <li className="nav-item me-2">
//                   <button
//                     onClick={handleLogout}
//                     className="btn btn-sm btn-danger"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item me-2">
//                   <Link to="/login" className="nav-link">
//                     Login
//                   </Link>
//                 </li>
//                 <li className="nav-item me-3">
//                   <Link to="/register" className="nav-link">
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


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
        <Link className="navbar-brand" to="/">
          <img
            src="https://aartisto.com/wp-content/uploads/2020/11/myntra.png"
            alt="Myntra"
            height="40"
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

        {/* Main Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navigation Links */}
          <ul className="navbar-nav me-4 mb-2 mb-lg-0">
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

          {/* Search Bar */}
          <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Right Side */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item me-3">
              <Link to="/wishlist" className="nav-link text-danger">
                <FaHeart size={20} />
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/cart" className="nav-link">
                <FaShoppingCart size={20} />
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link to="/orders" className="nav-link">
                <FaBoxOpen size={20} className="me-1" /> My Orders
              </Link>
            </li>
            {auth.user ? (
              <>
                <li className="nav-item me-2 d-flex align-items-center">
                  <FaUserCircle size={24} className="me-2 text-secondary" />
                  <span className="nav-link">{auth.user.name}</span>
                </li>
                <li className="nav-item me-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-danger"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
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