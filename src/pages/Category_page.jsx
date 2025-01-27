import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import logo from "../assets/image/logo.png";
import { Plus } from "lucide-react";
import { productData } from "../data/product";

const ProductCard = (props) => (
  <div
    onClick={() => {
      console.log(props);
    }}
    className="flex items-center justify-between p-4 border-b border-gray-200"
  >
    <div className="flex items-center gap-4">
      {/* Product Image */}
      <div className="relative">
        {/* {discount && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded-sm">
            {discount} OFF
          </div>
        )} */}
        <div className="w-16 h-16 bg-amber-100 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={props.image}
            alt={props.title}
            className="w-12 h-12 object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">{props.title}</h3>
        <span className="text-xs text-gray-500">₹{props.Orginalprice}</span>
        <span className="text-sm font-semibold">₹{props.CurrentPrice}</span>
      </div>
    </div>

    {/* Add Button */}
    <button className="flex items-center justify-center bg-white border border-purple-600 text-purple-600 px-4 py-1 rounded">
      Add
      <Plus className="ml-1 w-4 h-4" />
    </button>
  </div>
);

const Category_page = () => {
  const { detail, id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isData, setIsData] = useState([{}]);

  useEffect(() => {
    if (id) {
      const filteredData = productData.filter((item) => item.category === id);
      setIsData(filteredData);
      console.log(filteredData);
    }
  }, [id]);

  const products = [
    {
      name: "Kandaki Paruppu Bulk",
      price: "12.9",
      weight: "150 gm",
      discount: "17%",
      imageUrl: "/spices/kandaki.jpg",
    },
    {
      name: "Paitham Parupu Bulk",
      price: "10.8",
      weight: "100 gm",
      discount: "17%",
      imageUrl: "/spices/paitham.jpg",
    },
    {
      name: "Whole Urad Dhal Bulk",
      price: "11.6",
      weight: "100 gm",
      discount: "17%",
      imageUrl: "/spices/urad.jpg",
    },
  ];

  return (
    <div className=" w-full h-full flex flex-col bg-white">
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

      <div className=" text-lg font-bold mt-2 ml-2 uppercase">{detail}</div>
      <div className=" font-semibold mt-2 ml-2">{id}</div>

      <div>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow">
          {isData.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              title={product.title}
              image={product.image}
              Orginalprice={product.Orginalprice}
              CurrentPrice={product.CurrentPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category_page;
