import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import logo from "../assets/image/logo.png";
import { Plus, Minus } from "lucide-react";
import axios from "axios";

// Product Card Component with skeleton
const ProductCard = ({ product, addToCart, isLoading }) => {
  const [selectedWeight, setSelectedWeight] = useState(500);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const calculatePrice = () => {
    const basePrice = parseFloat(product?.CurrentPrice || 0);
    return ((basePrice / 500) * selectedWeight * quantity).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4 w-full">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex flex-col flex-1 gap-2">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div 
        onClick={() => navigate(`/product/${product._id}`)}
        className="flex items-center gap-4 cursor-pointer w-full"
      >
        <div className="relative">
          <div className="w-16 h-16 bg-amber-100 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-12 h-12 object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 items-center">
            <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
            <h2 className="text-gray-700 text-xs">{product.measurement}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 line-through">
              ₹{(product.Orginalprice * (selectedWeight/500) * quantity).toFixed(2)}
            </span>
            <span className="text-sm font-semibold">₹{calculatePrice()}</span>
            <span className="text-xs text-red-500">
              {(((product.Orginalprice - product.CurrentPrice) / product.Orginalprice) * 100).toFixed(0)}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Category_page = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://mini-ecom-api.vercel.app/api/v1/products");
        const filteredData = res.data.products.filter((item) => item.category === id);
        setIsData(filteredData);
      } catch (err) {
        console.error("Axios Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    getData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-green-700 p-2 rounded-lg transition-colors"
            >
              <img
                className="w-6 h-6"
                src="https://img.icons8.com/?size=100&id=36389&format=png&color=ffffff"
                alt="Menu"
              />
            </button>
            <img src={logo} className="w-28" alt="Logo" />
          </div>
        </div>
      </header>

      <Menu isOpen={isMenuOpen} />
      
      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Search Bar */}
      <div className="sticky top-0 bg-white shadow-md z-10 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
              <img
                className="w-6 h-6"
                src="https://img.icons8.com/?size=100&id=7695&format=png&color=ffffff"
                alt="Search"
              />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-xl font-bold mb-4 uppercase">{id}</h1>

        <div className="bg-white rounded-lg shadow">
          {isLoading ? (
            // Show 6 skeleton items while loading
            Array(6).fill().map((_, index) => (
              <ProductCard key={index} isLoading={true} />
            ))
          ) : (
            isData.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                isLoading={false}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Category_page;