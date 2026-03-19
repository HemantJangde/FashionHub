import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/orders/my", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        
        
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) fetchOrders();
  }, [userInfo]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading your orders...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!orders.length)
    return <p className="text-center py-10 text-gray-500">You have no orders yet.</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      <div className="grid gap-8">
        {orders.map((order) => {
          // Safe total calculation
          const totalPrice = order.orderItems
            .filter(item => item.product)
            .reduce((acc, item) => acc + item.qty * item.product.price, 0);

          return (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h2>
                <p className="text-gray-600 font-medium">Total: ₹{totalPrice}</p>
              </div>

              <div className="mb-4 text-gray-700 space-y-1">
                {/* <p><span className="font-medium">Delivery Address:</span> {order.address}</p> */}
                {/* <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p> */}
              </div>

              <div className="border-t pt-4 space-y-3">
                {order.orderItems.map((item, idx) =>
                  item.product && (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="text-gray-800">{item.product.name} x {item.qty}</span>
                      </div>
                      <span className="font-medium text-gray-800">₹{item.product.price * item.qty}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;