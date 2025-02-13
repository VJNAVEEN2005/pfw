import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";
import CartDisplay from "../components/Cart_display";

const Cart = () => {
  const navigate = useNavigate();
  const API_BASE = "https://mini-ecom-api.vercel.app/api/v1";
  const USER_ID = "67a82f5efa6af9dc70558efe";

  // State management
  const [cartItems, setCartItems] = useState([]);
  const [updateCartItems, setUpdateCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryAddress: ""
  });
  const [uiState, setUiState] = useState({
    showPayment: false,
    isMenuOpen: false
  });

  // Memoized calculations
  const { totalAmount, totalSavings } = useMemo(() => {
    const initial = { totalAmount: 0, totalSavings: 0 };
    
    return updateCartItems.reduce((acc, item) => ({
      totalAmount: acc.totalAmount + (item.totalPrice || 0),
      totalSavings: acc.totalSavings + ((item.orginaltotalPrice || 0) - (item.totalPrice || 0))
    }), initial);
  }, [updateCartItems]);

  // Data fetching
  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        const { data } = await axios.post(`${API_BASE}/getcart`, { userId: USER_ID });
        setCartItems(data.cart);
      } catch (error) {
        console.error("Initial cart fetch error:", error);
      }
    };

    const fetchUpdateCart = async () => {
      try {
        const { data } = await axios.post(`${API_BASE}/cartdata`, { userId: USER_ID });
        setUpdateCartItems(data.result[0]?.cart || []);
      } catch (error) {
        console.error("Update cart fetch error:", error);
      }
    };

    const orders = JSON.parse(localStorage.getItem("order_id") || "[]");
    setOrderHistory(orders);
    fetchInitialCart();
    fetchUpdateCart();
  }, []);

  // Cart operations
  const updateServerCart = async (cartData) => {
    try {
      await axios.post(`${API_BASE}/updatecart`, {
        userId: USER_ID,
        cart: cartData
      });
    } catch (error) {
      console.error("Cart update error:", error);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = updateCartItems.map(item => 
      item.productId === itemId ? { ...item, quantity: newQuantity } : item
    );
    setUpdateCartItems(updatedCart);
    updateServerCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = updateCartItems.filter(item => item.productId !== itemId);
    setUpdateCartItems(updatedCart);
    updateServerCart(updatedCart);
  };

  // Payment handling
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const options = {
      key: "rzp_test_4ZqLDryFSv9wuU",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Pondy Food World",
      description: "Order Payment",
      handler: (response) => {
        const newOrder = [...orderHistory, {
          paymentId: response.razorpay_payment_id,
          items: updateCartItems,
          address
        }];
        localStorage.setItem("order_id", JSON.stringify(newOrder));
        setOrderHistory(newOrder);
        navigate('/orders');
      },
      prefill: address,
      theme: { color: "green" }
    };

    new window.Razorpay(options).open();
  };

  // Address validation
  const validateAddress = () => {
    const { name, phone, deliveryAddress } = address;
    if (name && phone && deliveryAddress) {
      setUiState(s => ({ ...s, showPayment: true }));
    } else {
      alert("Please fill all required address fields");
    }
  };

  // Geolocation
  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setAddress(a => ({ ...a, deliveryAddress: `Lat: ${latitude}, Long: ${longitude}` }));
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-green-500">
        <div className="ml-2 my-2 w-6 cursor-pointer" 
             onClick={() => setUiState(s => ({ ...s, isMenuOpen: !s.isMenuOpen }))}>
          <img src="https://img.icons8.com/?size=100&id=36389&format=png&color=ffffff" 
               alt="menu" className="w-6" />
        </div>
        <Menu isOpen={uiState.isMenuOpen} />
        <div className={`fixed inset-0 z-20 transition-all ${uiState.isMenuOpen ? 
                       "bg-black opacity-85" : "hidden"}`} 
             onClick={() => setUiState(s => ({ ...s, isMenuOpen: false }))} />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-4 space-y-6">
        {/* Address Section */}
        <section className="space-y-4">
          <h2 className="font-medium">Delivery Address</h2>
          {Object.entries(address).map(([key, val]) => (
            <input key={key}
                   type="text"
                   value={val}
                   onChange={(e) => setAddress(a => ({ ...a, [key]: e.target.value }))}
                   placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                   className="w-full p-2 border rounded" />
          ))}
          <button onClick={handleGeoLocation} 
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Use GPS Location
          </button>
          <button onClick={validateAddress} 
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            Continue
          </button>
        </section>

        {/* Cart Items Section */}
        {updateCartItems.length > 0 ? (
          <section className="space-y-4">
            {updateCartItems.map(item => (
              <div key={item.productId} className="bg-white rounded-lg shadow-sm p-4">
                <CartDisplay id={item.productId} quantity={item.quantity} />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-green-600 border border-green-600 rounded">
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-green-600 border border-green-600 rounded">
                      +
                    </button>
                  </div>
                  <button onClick={() => handleRemoveItem(item.productId)}
                          className="text-red-500 text-sm">
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items</span>
                  <span>{updateCartItems.length}</span>
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
              <button onClick={validateAddress}
                      className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </section>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
            <button onClick={() => navigate("/")} 
                    className="mt-4 text-green-600 font-medium">
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {uiState.showPayment && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h2 className="font-medium mb-4">Payment</h2>
            <p className="mb-4">Your order total is ₹{totalAmount}</p>
            <button onClick={handlePaymentSubmit}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;