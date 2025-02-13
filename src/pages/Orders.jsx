import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orderItem, setOrderItem] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      const orders = JSON.parse(localStorage.getItem("order_id") || "[]");
      setOrderItem(orders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>

      {orderItem.length === 0 ? (
        <p className="text-xl text-gray-500">No Orders Found</p>
      ) : (
        orderItem.map((order, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Payment ID: {order.paymentId}</h2>

            <h3 className="text-lg mt-2">Cart Items:</h3>
            <ul className="list-disc pl-5">
              {order.items.map((item, idx) => (
                <li key={idx} className="border-b py-2">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.title} ({item.weight}kg)</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.totalPrice}</p>
                      <p className="text-sm text-gray-500">Original: ₹{item.originalPrice} | Discount: {item.discount}%</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
