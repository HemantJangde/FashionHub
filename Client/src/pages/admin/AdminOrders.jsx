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

        const { data } = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        console.log("orders", data); // ✅ correct place
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
   <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
    All Orders
  </h1>

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
                {order.user?.name || "Unknown User"}
              </h2>
              <p className="text-gray-500 text-sm break-all">
                {order.user?.email || "No email"}
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
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3 last:border-none"
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
              Total: ₹{total}
            </p>

            <span className="w-fit px-3 py-1 text-xs sm:text-sm rounded-full bg-yellow-100 text-yellow-800">
              Pending
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>
  );
}

export default AdminOrders;