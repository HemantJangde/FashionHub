import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setOrders(data);
      console.log(orders);
      
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>All Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          {/* 👤 USER INFO */}
          <h3>User: {order.user?.name}</h3>
          <p>Email: {order.user?.email}</p>

          {/* 📦 ORDER ITEMS */}
          <h4>Items:</h4>
          {order.orderItems.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>Qty: {item.qty}</p>
            </div>
          ))}

          {/* 💰 TOTAL */}
          <h4>Total: ₹{order.totalPrice}</h4>

          {/* 📅 DATE */}
          <p>
            Ordered on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;