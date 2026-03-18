import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) fetchOrders();
  }, [userInfo]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading orders...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!orders.length)
    return <p className="text-center py-10 text-gray-500">No orders found.</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">All Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            {/* USER INFO */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">{order.user?.name || "Unknown User"}</h2>
                <p className="text-gray-600">{order.user?.email || "No email"}</p>
              </div>
              <p className="text-gray-500 text-sm">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* ORDER ITEMS */}
            <div className="border-t pt-4 space-y-3">
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b pb-2 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-600">Qty: {item.qty}</span>
                      <span className="font-medium">
                        {/* ₹{item.qty * (item.product?.price || 0)} */}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No items in this order</p>
              )}
            </div>

            {/* TOTAL & STATUS */}
            <div className="mt-4 flex justify-between items-center">
              <p className="font-semibold text-gray-800">
                Total: ₹{order.totalPrice || 0}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.isDelivered
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {/* {order.isDelivered ? "Delivered" : "Pending"} */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;