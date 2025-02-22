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
  const [isLoading, setIsLoading] = useState(true);
  const [updateCartItems, setUpdateCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryAddress: "",
  });
  const [uiState, setUiState] = useState({
    showPayment: false,
    isMenuOpen: false,
  });

  const fetchProductCurrentPrice = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://mini-ecom-api.vercel.app/api/v1/product/${id}`
      );
      setCartItems(res.data.product);
      return res.data.product.CurrentPrice;
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProductOrginalPrice = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://mini-ecom-api.vercel.app/api/v1/product/${id}`
      );
      setCartItems(res.data.product);
      return res.data.product.Orginalprice;
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Corrected price calculations
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    console.log(totalAmount, totalSavings);
  }, [totalAmount, totalSavings]);

  useEffect(() => {
    const calculateTotals = async () => {
      if (!updateCartItems?.length) {
        setTotalAmount(0);
        setTotalSavings(0);
        return;
      }

      let totalAmountTemp = 0;
      let totalSavingsTemp = 0;

      // Fetch prices asynchronously
      await Promise.all(
        updateCartItems.map(async (item) => {
          try {
            const [currentPrice, originalPrice] = await Promise.all([
              fetchProductCurrentPrice(item.productId),
              fetchProductOrginalPrice(item.productId),
            ]);

            const quantity = Number(item.quantity || 0);
            totalAmountTemp += Number(currentPrice) * quantity;
            totalSavingsTemp +=
              (Number(originalPrice) - Number(currentPrice)) * quantity;
          } catch (error) {
            console.error("Error fetching product price:", error);
          }
        })
      );

      // Update state
      setTotalAmount(totalAmountTemp);
      setTotalSavings(totalSavingsTemp);
    };

    calculateTotals();
  }, [updateCartItems]); // Runs whenever `updateCartItems` changes

  // Sequential data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch initial cart items
        const initialResponse = await axios.post(`${API_BASE}/getcart`, {
          userId: USER_ID,
        });
        const initialCart = initialResponse.data.cart;
        setCartItems(initialCart);

        // Then fetch updated cart data
        const updatedResponse = await axios.post(`${API_BASE}/cartdata`, {
          userId: USER_ID,
        });
        const cartData = updatedResponse.data.result[0]?.cart || [];

        // Merge data with proper price fields
        const processedCart = cartData.map((item) => {
          const matchingItem = initialCart.find(
            (ci) => ci.productId === item.productId
          );
          return {
            ...item,
            CurrentPrice: item.CurrentPrice || matchingItem?.CurrentPrice || 0,
            OriginalPrice:
              item.OriginalPrice || matchingItem?.OriginalPrice || 0,
          };
        });

        setUpdateCartItems(processedCart);
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };

    const orders = JSON.parse(localStorage.getItem("order_id") || "[]");
    setOrderHistory(orders);
    fetchData();
  }, []);

  // Cart operations
  const updateServerCart = async (cartData) => {
    try {
      await axios.post(`${API_BASE}/updatecart`, {
        userId: USER_ID,
        cart: cartData,
      });
    } catch (error) {
      console.error("Cart update error:", error);
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = updateCartItems.map((item) =>
      item.productId === itemId
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    setUpdateCartItems(updatedCart);
    updateServerCart(updatedCart);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = updateCartItems.filter(
      (item) => item.productId !== itemId
    );
    setUpdateCartItems(updatedCart);
    updateServerCart(updatedCart);
  };

  // Payment handling
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const options = {
      key: "rzp_test_4ZqLDryFSv9wuU",
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      name: "Pondy Food World",
      description: "Order Payment",
      handler: (response) => {
        const newOrder = [
          ...orderHistory,
          {
            paymentId: response.razorpay_payment_id,
            items: updateCartItems,
            address,
            totalAmount,
          },
        ];
        localStorage.setItem("order_id", JSON.stringify(newOrder));
        setOrderHistory(newOrder);
        navigate("/orders");
      },
      prefill: address,
      theme: { color: "green" },
    };

    new window.Razorpay(options).open();
  };

  // Address validation
  const validateAddress = () => {
    const { name, phone, deliveryAddress } = address;
    if (name && phone && deliveryAddress) {
      setUiState((s) => ({ ...s, showPayment: true }));
    } else {
      alert("Please fill all required address fields");
    }
  };

  // Geolocation handler
  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress((a) => ({
            ...a,
            deliveryAddress: `Lat: ${latitude.toFixed(
              4
            )}, Long: ${longitude.toFixed(4)}`,
          }));
        },
        () => alert("Unable to retrieve location")
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-green-500">
        <div
          className="ml-2 my-2 w-6 cursor-pointer"
          onClick={() =>
            setUiState((s) => ({ ...s, isMenuOpen: !s.isMenuOpen }))
          }
        >
          <img
            src="https://img.icons8.com/?size=100&id=36389&format=png&color=ffffff"
            alt="menu"
            className="w-6"
          />
        </div>
        <Menu isOpen={uiState.isMenuOpen} />
        <div
          className={`fixed inset-0 z-20 transition-all ${
            uiState.isMenuOpen ? "bg-black opacity-85" : "hidden"
          }`}
          onClick={() => setUiState((s) => ({ ...s, isMenuOpen: false }))}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-4 space-y-6">
        {/* Address Section */}
        <section className="space-y-4">
          <h2 className="font-medium text-lg">Delivery Address</h2>
          {Object.entries(address).map(([key, val]) => (
            <input
              key={key}
              type={key === "email" ? "email" : "text"}
              value={val}
              onChange={(e) =>
                setAddress((a) => ({ ...a, [key]: e.target.value }))
              }
              placeholder={key.replace(/([A-Z])/g, " $1").trim()}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ))}
          <div className="flex gap-2">
            <button
              onClick={handleGeoLocation}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Use GPS
            </button>
            <button
              onClick={validateAddress}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </section>

        {/* Cart Items */}
        {updateCartItems.length > 0 ? (
          <>
            {updateCartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-lg shadow-sm p-4"
              >
                <CartDisplay id={item.productId} quantity={item.quantity} />
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-green-600 border border-green-600 rounded hover:bg-green-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-green-600 border border-green-600 rounded hover:bg-green-50"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span>{updateCartItems.length}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Total Savings:</span>
                  <span>₹{totalSavings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-3 border-t">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={validateAddress}
                className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Proceed to Checkout (₹{totalAmount.toFixed(2)})
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-green-600 font-medium hover:text-green-700"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* Payment Modal */}
        {uiState.showPayment && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h2 className="font-medium text-xl mb-4">Payment Confirmation</h2>
              <p className="mb-4 text-lg">
                Total Amount:{" "}
                <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
              </p>
              <button
                onClick={handlePaymentSubmit}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
