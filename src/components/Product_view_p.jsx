import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Product_view_p = (props) => {
  const navigate = useNavigate();
  const [selectedWeight, setSelectedWeight] = useState(500); // Default 500gm
  const [quantity, setQuantity] = useState(1);

  // Convert prices to numbers
  const originalPrice = parseFloat(props.op);
  const currentPrice = parseFloat(props.cp);
  
  // Calculate discount percentage
  const discountPercentage = ((originalPrice - currentPrice) / originalPrice * 100).toFixed(0);
  
  // Weight options
  const weightOptions = [
    { label: '250gm', value: 250 },
    { label: '500gm', value: 500 },
    { label: '1kg', value: 1000 },
    { label: '1.5kg', value: 1500 },
  ];

  // Calculate price based on weight and quantity
  const calculatePrice = () => {
    const pricePerGram = currentPrice / 500; // Original price is for 500gm
    return (pricePerGram * selectedWeight * quantity).toFixed(2);
  };

  return (
    <div className="relative border border-gray-400 rounded-xl h-[25rem] w-52 shadow-2xl p-4">
      {/* Discount badge */}
      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
        {discountPercentage}% OFF
      </div>

      <img 
        onClick={() => navigate(`/product/${props.title}`)} 
        className="w-44 rounded-2xl cursor-pointer" 
        src={props.image} 
        alt={props.title} 
      />
      
      <div className="font-semibold mt-3 text-xl">{props.title}</div>

      {/* Weight selector */}
      <div className="w-full flex justify-center mt-3">
        <select 
          className="bg-green-600 w-[90%] px-3 py-1 text-lg font-bold rounded text-white"
          value={selectedWeight}
          onChange={(e) => setSelectedWeight(Number(e.target.value))}
        >
          {weightOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price display */}
      <div className="mt-3">
        <span className="text-gray-400 line-through mr-2">₹{originalPrice}</span>
        <span className="text-lg font-bold text-green-600">₹{calculatePrice()}</span>
      </div>

      {/* Quantity controls */}
      <div className="mt-3 flex items-center justify-end gap-2">
        <button 
          className="bg-green-600 text-white px-3 py-1 rounded-l-xl"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span className="px-2">{quantity}</span>
        <button 
          className="bg-green-600 text-white px-3 py-1 rounded-r-xl"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product_view_p;