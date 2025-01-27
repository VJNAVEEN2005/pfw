import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
    calculateTotals(items);
  }, []);

  const calculateTotals = (items) => {
    const amount = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const savings = items.reduce(
      (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
      0
    );

    setTotalAmount(amount);
    setTotalSavings(savings);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.price * newQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    calculateTotals(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    calculateTotals(updatedItems);
  };

  const handleConfirmAddress = () => {
    if (deliveryAddress && name && phone) {
      setShowPaymentPopup(true);
    } else {
      alert("Please fill in all address fields.");
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <img
                  className="w-5"
                  src="https://img.icons8.com/?size=100&id=40217&format=png&color=000000"
                  alt="back"
                />
                <span className="font-bold text-lg">back</span>
              </button>
              <h1 className="text-xl font-bold">Cart</h1>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="font-medium mb-4">Delivery Address</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
            />
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Delivery Address"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setDeliveryAddress(`Lat: ${latitude}, Long: ${longitude}`);
                  });
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
              }}
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700"
            >
              Use GPS Location
            </button>
          </div>
          <button
            onClick={handleConfirmAddress}
            className="w-full bg-green-600 text-white rounded-lg py-3 mt-4 font-medium hover:bg-green-700"
          >
            Continue
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-w-3xl mx-auto px-4 py-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 text-green-600 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm mb-4 p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.weight}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">₹{item.price}</span>
                          <span className="text-gray-500 line-through text-sm">
                            ₹{item.originalPrice}
                          </span>
                          <span className="text-red-500 text-sm">
                            {item.discount}% OFF
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-green-600 border border-green-600 rounded"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-green-600 border border-green-600 rounded"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-medium">₹{item.totalPrice}</div>
                  </div>
                </div>
              ))}

              {/* Cart Summary */}
              <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
                <h3 className="font-medium mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Savings</span>
                    <span className="text-green-600">₹{totalSavings}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total Amount</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
                <button
                  onClick={handleConfirmAddress}
                  className="w-full bg-green-600 text-white rounded-lg py-3 mt-4 font-medium hover:bg-green-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="font-medium mb-4">Payment</h2>
            <p className="mb-4">Your order total is ₹{totalAmount}</p>
            <button
              onClick={() => setShowPaymentPopup(false)}
              className="w-full bg-green-600 text-white rounded-lg py-3 mt-4 font-medium hover:bg-green-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
