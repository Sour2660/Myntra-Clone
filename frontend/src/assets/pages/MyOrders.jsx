// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// const MyOrders = () => {
//   const { auth } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/orders/${auth.user._id}`);
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Failed to load orders", err);
//       }
//     };

//     if (auth?.user?._id) fetchOrders();
//   }, [auth.user]);

//   return (
//     <div className="container py-4">
//       <h2 className="text-center mb-4">📦 My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-center text-muted">You have no orders yet.</p>
//       ) : (
//         <div className="row">
//           {orders.map((order) => (
//             <div className="col-md-6 mb-4" key={order._id}>
//               <div className="card shadow-sm p-3">
//                 <h5>Order ID: {order._id}</h5>
//                 <p>Payment: {order.paymentMethod}</p>
//                 <p>Total: ₹{order.totalAmount}</p>
//                 <ul className="list-group mt-2">
//                   {order.products.map((p, idx) => (
//                     <li className="list-group-item" key={idx}>
//                       Product ID: {p.productId} | Qty: {p.quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;
// //===================================================

// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import "./MyOrders.css"; // Import the CSS

// const MyOrders = () => {
//   const { auth } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/orders/${auth.user._id}`);
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Failed to load orders", err);
//       }
//     };

//     if (auth?.user?._id) fetchOrders();
//   }, [auth.user]);

//   return (
//     <div className="my-orders-container">
//       <h2 className="text-center my-orders-title">📦 My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-center text-muted">You have no orders yet.</p>
//       ) : (
//         <div className="row">
//           {orders.map((order) => (
//             <div className="col-md-6 mb-4" key={order._id}>
//               <div className="order-card p-3">
//                 <h5 className="order-header">Order ID: {order._id}</h5>
//                 <p className="order-detail">Payment: {order.paymentMethod}</p>
//                 <p className="order-detail">Total: ₹{order.totalAmount}</p>
//                 <ul className="list-group mt-2">
//                   {order.products.map((p, idx) => (
//                     <li className="list-group-item" key={idx}>
//                       Product ID: {p.productId} | Qty: {p.quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;
//=========================================================

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./MyOrders.css"; // Make sure this file exists

const MyOrders = () => {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${auth.user._id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    if (auth?.user?._id) fetchOrders();
  }, [auth.user]);

  return (
    <div className="my-orders-container">
      <h2 className="text-center my-orders-title">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">You have no orders yet.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-6 mb-4" key={order._id}>
              <div className="order-card p-3">
                <h5 className="order-header">Order ID: {order._id}</h5>
                <p className="order-detail">Payment: {order.paymentMethod}</p>
                <p className="order-detail">Total: ₹{order.totalAmount}</p>
                <ul className="list-group mt-3">
                  {order.products.map((p, idx) => (
                    <li className="list-group-item d-flex align-items-center" key={idx}>
                      <img
                        src={p.image}
                        alt={p.name}
                        width="60"
                        height="60"
                        className="me-3 rounded shadow-sm"
                        style={{ objectFit: "cover" }}
                      />
                      <div>
                        <div><strong>{p.name}</strong></div>
                        <div className="text-muted">Qty: {p.quantity}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
