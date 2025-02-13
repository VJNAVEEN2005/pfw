import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import Cart_display from "../components/Cart_display";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [updateCartItems, setUpdateCartItems] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Load cart items from localStorage
    axios.post(`https://mini-ecom-api.vercel.app/api/v1/getcart`,({
        "userId": "67a82f5efa6af9dc70558efe"
    })).then((res)=>{
      console.log(res.data.cart)
      setCartItems(res.data.cart)
    }).catch((err)=>{
      console.log(err)
    })

    axios.post(`http://mini-ecom-api.vercel.app/api/v1/cartdata`,({
      "userId": "67a82f5efa6af9dc70558efe"
  })).then((res)=>{
    console.log(res.data.result[0].cart)   // to update cart
    setUpdateCartItems(res.data.result[0].cart)
  }).catch((err)=>{
    console.log(err)
  })

    const orders = JSON.parse(localStorage.getItem("order_id") || "[]");
    setOrderItem(orders);
  }, []);

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (totalAmount === "") {
      alert("please enter amount");
    } else {
      var options = {
        key: "rzp_test_4ZqLDryFSv9wuU",
        key_secret: "oZrihxkwwtdw92TqE5hBXdhy",
        amount: totalAmount * 100,
        currency: "INR",
        name: "Pondy Food World",
        description: "For testing",
        handler: function (response) {
          const newOrder = [
            ...orderItem,
            { paymentId: response.razorpay_payment_id, items: cartItems },
          ];
          setOrderItem(newOrder);
          localStorage.setItem("order_id", JSON.stringify(newOrder));
          navigate('/orders')
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "green",
        },
      };

      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  const calculateTotals = (items) => {
    if (!items || items.length === 0) {
      setTotalAmount(0);
      setTotalSavings(0);
      return;
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + parseFloat(item.totalPrice),
      0
    );

    const originalAmount = items.reduce(
      (sum, item) => sum + parseFloat(item.orginaltotalPrice),
      0
    );

    const totalSavings = originalAmount - totalAmount;

    setTotalAmount(totalAmount);
    setTotalSavings(totalSavings);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    console.log(newQuantity)

    let updatedItems = updateCartItems.map((item) => {
      if (item.productId === itemId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setCartItems(updatedItems);
    calculateTotals(updatedItems);
    updateCart(updatedItems)
    console.log(cartItems)
  };

  const updateCart = async (updatedItemsNew) => {
    await axios.post(`http://mini-ecom-api.vercel.app/api/v1/updatecart`,{
        "userId": "67a82f5efa6af9dc70558efe",
        "cart": updatedItemsNew
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleRemoveItem = (itemId) => {
    let updatedItems = updateCartItems.filter((item) => item.productId !== itemId);
    updateCart(updatedItems)
    setCartItems(updatedItems)
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
        <div className=" w-full bg-green-500">
          {/* <div className=" text-white my-2 ml-2">pondy food world</div> */}
          <hr className=" text-white" />
          <div className="">
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className=" ml-2 my-2 w-6 hover:cursor-pointer "
            >
              <img
                className=" w-6"
                src="https://img.icons8.com/?size=100&id=36389&format=png&color=ffffff"
                alt=""
              />
            </div>
          </div>
          <div>
            <Menu isOpen={isMenuOpen} />
          </div>
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={
              isMenuOpen
                ? " w-full h-full fixed z-20 bg-black opacity-85 top-0 left-0 transition-all"
                : "hidden"
            }
          ></div>
        </div>
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
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
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
                  key={item.product._id}
                  className="bg-white rounded-lg shadow-sm mb-4 p-4"
                >
                  <Cart_display id={item.product._id} quantity={item.quantity}/>
                  <div className="flex justify-between items-start">

                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.product._id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-green-600 border border-green-600 rounded"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.product._id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-green-600 border border-green-600 rounded"
                      >
                        +
                      </button>
                    </div>
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
              onClick={handleSubmitPayment}
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
