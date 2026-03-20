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
        const { data } = await axios.get(
          "https://fashionhub-bzx6.onrender.com/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          },
        );

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

 if (loading) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse space-y-6">
      
      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          className="border rounded-md p-5 space-y-4"
        >
          {/* Top Row (Order Info) */}
          <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-300 rounded w-1/3"></div>
            <div className="h-5 bg-gray-300 rounded w-20"></div>
          </div>

          {/* Product Row */}
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 bg-gray-300 rounded-md"></div>

            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>

            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-8 bg-gray-300 rounded w-28"></div>
          </div>
        </div>
      ))}

    </div>
  );
}
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!orders.length)
    return (
      <p className="text-center py-10 text-gray-500">You have no orders yet.</p>
    );

  return (
      <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6">
 

  <div className="space-y-5">
    {orders.map((order) => {
      const total = order.orderItems.reduce((acc, item) => {
        return acc + (item.product?.price || 0) * item.qty;
      }, 0);

      return (
        <div
          key={order._id}
          className="bg-white border border-gray-400 rounded-xl shadow-sm p-4 sm:p-6"
        >
          {/* USER + DATE */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold">
                <span>Order ID : </span>
                {order._id || "Unknown User"}
              </h2>
              <p className="text-gray-500 text-sm break-all">
                {/* {order.user?.email || "No email"} */}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-400">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* ITEMS */}
          <div className="border-t border-gray-200 pt-4 space-y-4">
            {order.orderItems?.length > 0 ? (
              order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-400 pb-3 last:border-none"
                >
                  {item.product ? (
                    <>
                      {/* LEFT */}
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded"
                        />
                        <p className="text-sm sm:text-base font-medium">
                          {item.product.name}
                        </p>
                      </div>

                      {/* RIGHT */}
                      <div className="flex justify-between sm:justify-end gap-4 text-sm sm:text-base">
                        <span className="text-gray-500">
                          Qty: {item.qty}
                        </span>
                        <span className="font-semibold">
                          ₹{item.qty * item.product.price}
                        </span>
                      </div>
                    </>
                  ) : (
                    <p className="text-red-500 text-sm">
                      Product not available
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">
                No items in this order
              </p>
            )}
          </div>

          {/* TOTAL */}
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="font-semibold text-gray-800 text-base sm:text-lg">
              Total: 
            </p>
             <p className="font-semibold text-gray-800 text-base sm:text-lg">
             ₹{total +500}
            </p>

          
          </div>
        </div>
      );
    })}
  </div>
</div>
  );
}

export default MyOrders;
