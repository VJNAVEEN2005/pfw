import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import logo from "../assets/image/logo.png";
import { Plus, Minus } from "lucide-react";
import { productData } from "../data/product";

const ProductCard = ({ product, addToCart }) => {
  
  const [selectedWeight, setSelectedWeight] = useState(500);
  const [quantity, setQuantity] = useState(1);

  const navigate = new useNavigate()
  
  const calculatePrice = () => {
    const basePrice = parseFloat(product.CurrentPrice);
    return ((basePrice / 500) * selectedWeight * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedWeight,
      quantity,
      price: calculatePrice()
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div onClick={()=>{
        navigate(`/product/${product.title}`)
      }} className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 bg-amber-100 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-12 h-12 object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className=" flex gap-3 items-center">
          <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
          <h2 className=" text-gray-700 text-xs">{product.measurement}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 line-through">
              ₹{(product.Orginalprice * (selectedWeight/500) * quantity).toFixed(2)}
            </span>
            <span className="text-sm font-semibold">₹{calculatePrice()}</span>
            <span className="text-xs text-red-500">
              {(
                ((product.Orginalprice - product.CurrentPrice) / 
                product.Orginalprice) * 100
              ).toFixed(0)}% OFF
            </span>
          </div>
        </div>
      </div>

      {/* <button 
        onClick={handleAddToCart}
        className="flex items-center justify-center bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded hover:bg-purple-50"
      >
        Add
        <Plus className="ml-1 w-4 h-4" />
      </button> */}
    </div>
  );
};

const Category_page = () => {
  const { detail, id } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isData, setIsData] = useState([]);

  useEffect(() => {
    if (id) {
      const filteredData = productData.filter((item) => item.category === id);
      setIsData(filteredData);
    }
  }, [id]);

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem = {
      ...item,
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

    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert(`${item.quantity} x ${item.title} added to cart!`);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header Section (same as before) */}
      <div className="w-full bg-green-500">
        <hr className="text-white" />
        <div className="">
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-2 my-2 w-6 hover:cursor-pointer "
          >
            <img
              className="w-6"
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
              ? "w-full h-full fixed z-20 bg-black opacity-85 top-0 left-0 transition-all"
              : "hidden"
          }
        ></div>
      </div>

      <div className="mx-4 my-3">
        <img src={logo} className="w-28" alt="" />
      </div>

      {/* Search Section (same as before) */}
      <div className="sticky top-0 py-4 bg-white z-10 border-b shadow-gray-200">
        <div className="mx-[5%] bg-white flex">
          <input
            type="text"
            placeholder="Search the product"
            className="px-2 py-1 text-lg rounded-l-xl border-gray-400 border w-[90%]"
          />
          <div className="rounded-r-xl border-gray-400 border p-2">
            <img
              className="w-7"
              src="https://img.icons8.com/?size=100&id=7695&format=png&color=000000"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="text-lg font-bold mt-2 ml-4 uppercase">{id}</div>

      <div className="flex-1 overflow-y-auto pb-24">
        {isData.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Category_page;