import React, { useState } from "react";
import logo from "../assets/image/logo.png";
import Menu from "../components/Menu";
import nuts from "../assets/items/nuts.png";
import { useNavigate } from "react-router-dom";

const Product_details = () => {
 
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [quantity, setQuantity] = useState(1);
  
    const options = [
      { id: 0, weight: "250 gm", price: 24, originalPrice: 29, discount: 17 },
      { id: 1, weight: "500 gm", price: 48, originalPrice: 58, discount: 17 },
      { id: 2, weight: "100 gm", price: 10, originalPrice: 12, discount: 17 },
      { id: 3, weight: "1 Kg", price: 95, originalPrice: 114, discount: 18 },
    ];
  
    const handleAddToCart = () => {
      // Get existing cart or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      const selectedItem = options[selectedOption];
      
      // Create new cart item
      const newItem = {
        id: `${selectedItem.weight}-${Date.now()}`, // Unique ID
        weight: selectedItem.weight,
        price: selectedItem.price,
        originalPrice: selectedItem.originalPrice,
        quantity: quantity,
        totalPrice: selectedItem.price * quantity,
        discount: selectedItem.discount,
        image: nuts, // Add image reference if needed
        title: "Title" // Add actual title of product
      };
  
      // Check if similar item exists (same weight)
      const existingItemIndex = existingCart.findIndex(
        item => item.weight === selectedItem.weight
      );
  
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += quantity;
        existingCart[existingItemIndex].totalPrice = 
          existingCart[existingItemIndex].price * existingCart[existingItemIndex].quantity;
      } else {
        // Add new item if it doesn't exist
        existingCart.push(newItem);
      }
  
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));
  
      // Optional: Reset quantity after adding to cart
      setQuantity(1);
  
      // Optional: Show success message or notification
      alert("Added to cart successfully!");
    };
  
    const handleIncrement = () => {
      setQuantity((prev) => prev + 1);
    };
  
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    };

  return (
    <>
      <div className=" bg-white flex w-full flex-col ">
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

        <div className=" mx-4 my-3">
          <img src={logo} className=" w-28" alt="" />
        </div>

        {/* search */}
        <div className="sticky top-0 py-4 bg-white z-10 border-b shadow-gray-200">
          <div className="mx-[5%] bg-white  flex">
            <input
              type="text"
              placeholder="Search the product"
              className=" px-2 py-1 text-lg rounded-l-xl border-gray-400 border w-[90%]"
            />
            <div className=" rounded-r-xl border-gray-400  border p-2">
              <img
                className=" w-7"
                src="https://img.icons8.com/?size=100&id=7695&format=png&color=000000"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* back */}

        <div className=" w-full flex  items-center">
          <div onClick={()=>navigate("/")} className=" flex items-center  gap-2 ml-4 my-4">
          <div>
            <img
              className=" w-5"
              src="https://img.icons8.com/?size=100&id=40217&format=png&color=000000"
              alt=""
            />
          </div>
          <div className=" font-bold text-lg">back</div>
          </div>
        </div>

        {/* image */}
        <div className=" justify-center flex">
          <img
            className=" border border-gray-300 rounded-xl p-6 "
            src={nuts}
            alt=""
          />
        </div>

        <div className=" mx-4 mb-48">
          <div className=" text-xl font-bold mt-4">Title</div>

          <div>
            <div className=" p-4">
              {options.map((option) => (
                <div
                  key={option.id}
                  className={`mb-2 p-3 rounded-lg cursor-pointer border ${
                    selectedOption === option.id
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200"
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{option.weight}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">₹{option.price}</span>
                      <span className="text-gray-500 line-through text-sm">
                        ₹{option.originalPrice}
                      </span>
                      <span className="text-red-500 text-sm">
                        {option.discount}% OFF
                      </span>
                      {selectedOption === option.id && (
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          strokeWidth="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="font-semibol">Discription</div>
          <div className=" mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at
            veritatis tempore corporis doloremque? Voluptatem, aperiam.
            Similique voluptas minima eaque!
          </div>

          <div className=" mt-4 font-semibold">Disclaimer</div>
          <div className=" mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos atque
            delectus et, optio quae dolorem vel natus mollitia hic voluptates.
          </div>
        </div>

        {/* bottom */}

        <div className="bg-white w-full fixed z-10 shadow-2xl bottom-0 border-t">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-gray-500 line-through text-sm">
                ₹{options[selectedOption].originalPrice}
              </div>
              <div className="text-lg font-bold text-gray-900">
                ₹{options[selectedOption].price}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-green-50 rounded-lg border border-green-200">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-1 text-green-600 text-xl font-medium hover:bg-green-100 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 py-1 text-gray-700">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 text-green-600 text-xl font-medium hover:bg-green-100 rounded-r-lg"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700"
              >
                Add
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_details;
