import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/orders/my",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Total: ₹{order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;