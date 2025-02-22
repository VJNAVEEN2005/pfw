import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/image/logo.png";
import Menu from "../components/Menu";
import axios from "axios";

const ProductDetailsSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex justify-center mb-6">
      <div className="w-64 h-64 bg-gray-200 rounded-xl" />
    </div>
    
    <div className="mx-4 mb-48">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        <div className="h-4 bg-gray-200 rounded w-1/4 mt-6" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    </div>
  </div>
);

const Product_details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isData, setIsData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDiscount, setIsDiscount] = useState(0);
  
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://mini-ecom-api.vercel.app/api/v1/products");
        const filteredData = res.data.products.filter((item) => item._id === id);
        
        if (filteredData.length > 0) {
          setIsData(filteredData);
          const discount = ((filteredData[0].Orginalprice - filteredData[0].CurrentPrice) / 
            filteredData[0].Orginalprice) * 100;
          setIsDiscount(discount.toFixed(2));
        }
      } catch (err) {
        console.error("Axios Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    getData();
  }, [id]);

  const handleAddToCart = () => {
    axios.post(`https://mini-ecom-api.vercel.app/api/v1/cart`, [{
      "userId": "67a82f5efa6af9dc70558efe",
      "cart": [{
        "productId": String(id),
        "quantity": Number(quantity)
      }]
    }])
    .then((res) => {
      alert("Added to cart successfully!");
    })
    .catch((err) => {
      console.error("Failed to add to cart:", err);
      alert("Failed to add to cart. Please try again.");
    });
  };

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

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 my-4 hover:text-green-700 transition-colors"
        >
          <img
            className="w-5"
            src="https://img.icons8.com/?size=100&id=40217&format=png&color=000000"
            alt="Back"
          />
          <span className="font-bold text-lg">Back</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <img
                className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                src={isData[0].image}
                alt={isData[0].title}
              />
            </div>

            <div className="mx-4 mb-48">
              <h1 className="text-2xl font-bold mt-4 text-gray-900">{isData[0].title}</h1>

              <div className="mt-6">
                <h2 className="font-semibold text-lg text-gray-900">Description</h2>
                <p className="mt-2 text-gray-700 leading-relaxed">{isData[0].details}</p>
              </div>

              {/* <div className="mt-6">
                <h2 className="font-semibold text-lg text-gray-900">Disclaimer</h2>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos atque
                  delectus et, optio quae dolorem vel natus mollitia hic voluptates.
                </p>
              </div> */}
            </div>
          </>
        )}

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t z-10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-gray-500 line-through text-sm">
                  ₹{isData[0].Orginalprice}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ₹{isData[0].CurrentPrice}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-green-50 rounded-lg border border-green-200">
                  <button
                    onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                    className="px-3 py-1 text-green-600 text-xl font-medium hover:bg-green-100 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-gray-700">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1 text-green-600 text-xl font-medium hover:bg-green-100 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product_details;