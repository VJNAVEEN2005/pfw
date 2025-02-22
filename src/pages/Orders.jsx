import React, { useState, useEffect } from "react";

const OrderSkeleton = () => (
  <div className="bg-white border rounded-lg shadow-lg p-6 mb-4 animate-pulse">
    <div className="h-6 bg-gray-200 w-2/3 rounded mb-4" />
    <div className="h-5 bg-gray-200 w-1/3 rounded mb-6" />
    
    <div className="space-y-4">
      {[1, 2].map((item) => (
        <div key={item} className="flex gap-4 border-b pb-4">
          <div className="w-16 h-16 bg-gray-200 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 w-3/4 rounded" />
            <div className="h-4 bg-gray-200 w-1/4 rounded" />
            <div className="h-4 bg-gray-200 w-1/3 rounded" />
            <div className="h-3 bg-gray-200 w-2/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Orders = () => {
  const [orderItem, setOrderItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const orders = JSON.parse(localStorage.getItem("order_id") || "[]");
        setOrderItem(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="h-8 bg-gray-200 w-48 rounded mb-8 animate-pulse" />
        {[1, 2].map((skeleton) => (
          <OrderSkeleton key={skeleton} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

      {orderItem.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-500 mb-2">No Orders Found</p>
          <p className="text-gray-400">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orderItem.map((order, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order #{order.paymentId.slice(-6)}
                  </h2>
                  <span className="text-sm text-gray-500">
                    Payment ID: {order.paymentId}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>Weight: {item.weight}kg</p>
                          <p>Quantity: {item.quantity}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="font-medium text-gray-900">
                              ₹{item.totalPrice}
                            </span>
                            <span className="text-gray-500 line-through">
                              ₹{item.originalPrice}
                            </span>
                            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-sm">
                              {item.discount}% OFF
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;