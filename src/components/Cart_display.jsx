import React, { useEffect, useState } from "react";
import axios from "axios";

const CartDisplay = ({ id, quantity }) => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://mini-ecom-api.vercel.app/api/v1/product/${id}`);
        setItem(res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-4 flex-1">
            <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="flex gap-2 items-center">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!item) return null;

  const discount = Number(
    ((item.Orginalprice - item.CurrentPrice) / item.Orginalprice) * 100
  ).toFixed();

  const totalPrice = (item.CurrentPrice * quantity).toFixed(2);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4">
          <div className="relative group">
            <img 
              src={item.image} 
              className="w-16 h-16 object-contain rounded bg-gray-50" 
              alt={item.title}
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded transition-opacity" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-gray-900">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.weight}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-900">₹{item.CurrentPrice}</span>
              <span className="text-gray-500 line-through text-sm">
                ₹{item.Orginalprice}
              </span>
              <span className="text-red-600 text-sm font-medium bg-red-50 px-2 py-0.5 rounded">
                {discount}% OFF
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="font-medium text-gray-900">₹{totalPrice}</div>
          <div className="text-sm text-gray-500">Qty: {quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;