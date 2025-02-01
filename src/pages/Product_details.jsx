import React, { useEffect, useState } from "react";
import logo from "../assets/image/logo.png";
import Menu from "../components/Menu";
import nuts from "../assets/items/nuts.png";
import { useNavigate, useParams } from "react-router-dom";
import { productData } from "../data/product";

const Product_details = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isData, setIsData] = useState([{}]);
  const [isDiscount, setIsDiscount] = useState();
  const grams = [250, 500, 1000, 1500];
  const grams1 = new Map([
    [250, 0.5],
    [500, 1],
    [1000, 2],
    [1500, 3],
  ]);

  const { id } = useParams();

  useEffect(async () => {
    if (id) {
      const filteredData = await productData.filter(
        (item) => item.title === id
      );
      setIsData(filteredData);
      const dis =
        (filteredData[0].CurrentPrice / filteredData[0].Orginalprice) * 100;
      setIsDiscount(dis.toFixed(2));
    }
  }, [id]);

  const options = [
    { id: 0, weight: "250 gm", price: 24, originalPrice: 30, discount: 20 },
    { id: 1, weight: "500 gm", price: 48, originalPrice: 60, discount: 20 },
    { id: 2, weight: "1 kg", price: 95, originalPrice: 120, discount: 21 },
    { id: 3, weight: "1.5 kg", price: 140, originalPrice: 180, discount: 22 },
  ];

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const selectedItem = options[selectedOption];

    const newItem = {
      id: `${isData[0].title}-${Date.now()}`,
      weight: Number(selectedOption),
      price: Number(Number(isData[0].CurrentPrice)*selectedOption).toFixed(2),
      originalPrice: Number(Number(isData[0].Orginalprice)*selectedOption).toFixed(2),
      quantity: quantity,
      totalPrice: (Number(isData[0].CurrentPrice*selectedOption) * quantity).toFixed(2),
      orginaltotalPrice:(Number(isData[0].Orginalprice*selectedOption) * quantity).toFixed(2),
      discount: isDiscount,
      image: isData[0].image,
      title: isData[0].title,
    };

    const existingItemIndex = existingCart.findIndex(
      (item) => item.weight === selectedItem.weight
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
      existingCart[existingItemIndex].totalPrice =
        existingCart[existingItemIndex].price *
        existingCart[existingItemIndex].quantity;
    } else {
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setQuantity(1);
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

        <div className=" w-full flex  items-center">
          <div
            onClick={() => navigate(-1)}
            className=" flex items-center  gap-2 ml-4 my-4"
          >
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

        <div className=" justify-center flex">
          <img
            className=" border border-gray-300 rounded-xl p-6 "
            src={isData[0].image}
            alt=""
          />
        </div>

        <div className=" mx-4 mb-48">
          <div className=" text-xl font-bold mt-4">{isData[0].title}</div>

          <div>
            <div className=" p-4">
              {Array.from(grams1).map(([option, value]) => (
                <div
                  key={option}
                  className={`mb-2 p-3 rounded-lg cursor-pointer border ${
                    selectedOption === value
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200"
                  }`}
                  onClick={() => setSelectedOption(value)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{value}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">₹{(isData[0].CurrentPrice * value).toFixed(2)}</span>
                      <span className="text-gray-500 line-through text-sm">
                        ₹{(isData[0].Orginalprice * value).toFixed(2)}
                      </span>
                      <span className="text-red-500 text-sm">
                        {isDiscount}% OFF
                      </span>
                      {selectedOption === option && (
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

          <div className="font-semibold">Description</div>
          <div className=" mt-4">{isData[0].details}</div>

          <div className=" mt-4 font-semibold">Disclaimer</div>
          <div className=" mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos atque
            delectus et, optio quae dolorem vel natus mollitia hic voluptates.
          </div>
        </div>

        <div className="bg-white w-full fixed z-10 shadow-2xl bottom-0 border-t">
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-gray-500 line-through text-sm">
                  ₹{(isData[0].Orginalprice*selectedOption)}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ₹{(isData[0].CurrentPrice*selectedOption)}
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
