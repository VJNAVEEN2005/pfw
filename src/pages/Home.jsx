import React, { useState, useEffect } from "react";
import logo from "../assets/image/logo.png";
import Product_view_p from "../components/Product_view_p";
import Product_category_card from "../components/Product_category_card";
import Menu from "../components/Menu";
import axios from "axios";

const Home = () => {
  const [productsApi, setProductsApi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://mini-ecom-api.vercel.app/api/v1/products");
        setProductsApi(res.data.products);
      } catch (err) {
        console.error("Axios Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const uniqueCategoriesMap = new Map();
  const filteredData = productsApi.filter(item => ["Nuts", "Fruits"].includes(item.title));

  productsApi.forEach((item) => {
    if (!uniqueCategoriesMap.has(item.category)) {
      uniqueCategoriesMap.set(item.category, {
        image: item.image,
        details: item.details,
        category: item.category,
      });
    }
  });

  const uniqueCategories = Array.from(uniqueCategoriesMap.values());

  // Simple loading skeleton components
  const ProductSkeleton = () => (
    <div className="w-48 shrink-0 bg-white rounded-lg p-4 shadow">
      <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse" />
      <div className="w-3/4 h-4 mt-4 bg-gray-200 rounded animate-pulse" />
      <div className="flex gap-2 mt-2">
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );

  const CategorySkeleton = () => (
    <div className="w-full bg-white rounded-lg p-4 shadow">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse" />
        <div className="flex-1">
          <div className="w-1/2 h-6 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-green-700 p-2 rounded-lg"
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
            <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
              <img
                className="w-6 h-6"
                src="https://img.icons8.com/?size=100&id=7695&format=png&color=ffffff"
                alt="Search"
              />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Fast Moving Items */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Fast Moving Items</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {isLoading ? (
              Array(4).fill().map((_, i) => <ProductSkeleton key={i} />)
            ) : (
              filteredData.map((item, index) => (
                <Product_view_p
                  key={index}
                  image={item.image}
                  title={item.title}
                  op={item.Orginalprice}
                  cp={item.CurrentPrice}
                  id={item._id}
                />
              ))
            )}
          </div>
        </section>

        {/* Shop By Category */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Shop By Category</h2>
          <div className="space-y-4">
            {isLoading ? (
              Array(3).fill().map((_, i) => <CategorySkeleton key={i} />)
            ) : (
              uniqueCategories.map((category, index) => (
                <Product_category_card
                  key={index}
                  title={category.category}
                  details={category.details}
                  image={category.image}
                />
              ))
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-green-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-2">
            <p>Phone: 7200162525</p>
            <p>Email: pondyfoodworld@gmail.com</p>
            <p className="max-w-lg mx-auto">
              Address: No. 2A, Ohangara Street, Thirumoolar Nagar, Mudaliarpet,
              Puducherry - 605004
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;