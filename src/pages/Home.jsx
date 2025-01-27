import React, { useState } from "react";
import logo from "../assets/image/logo.png";
import nuts from "../assets/items/nuts.png";
import Product_view_p from "../components/Product_view_p";
import Product_category_card from "../components/Product_category_card";
import Menu from "../components/Menu";
import { productData } from "../data/product";

const Home = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className=" bg-white flex w-full flex-col">
        <div className=" w-full bg-green-500">
          {/* <div className=" text-white my-2 ml-2">pondy food world</div> */}
          <hr className=" text-white" />
          <div className="">
            <div onClick={()=>setIsMenuOpen(!isMenuOpen)} className=" ml-2 my-2 w-6 hover:cursor-pointer ">
              <img
                className=" w-6"
                src="https://img.icons8.com/?size=100&id=36389&format=png&color=ffffff"
                alt=""
              />
            </div>
          </div>
          <div>
            <Menu isOpen={isMenuOpen}/>
          </div>
          <div onClick={()=>setIsMenuOpen(!isMenuOpen)} className={isMenuOpen ? " w-full h-full fixed z-20 bg-black opacity-85 top-0 left-0 transition-all" : "hidden"}>
          </div>
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

        {/* product card view */}

        <div className=" mx-[2%] mt-10">
          <div className=" font-bold text-xl">Fast Moving Items</div>

          <div className=" flex gap-1 w-full overflow-x-scroll">

            {
              productData.map((item)=>(
                <div>
                  <Product_view_p title={item.title} op={item.Orginalprice} cp={item.CurrentPrice} />
                </div>
              ))
            }

          </div>
        </div>

        <div className=" mx-[2%] mt-10">
          <div className=" text-xl font-semibold">Shop By Category</div>

          <div className=" flex flex-col gap-4 mt-5">
            <Product_category_card />
            <Product_category_card />
            <Product_category_card />
            <Product_category_card />
          </div>
        </div>

        <div className=" w-full mt-10 flex-col items-center bg-green-100">
          <div className=" font-bold text-center mt-10">Contact US</div>
          <div className=" text-center">Phone : 7200162525</div>
          <div className=" text-center">Email : pondyfoodworld@gmail.com</div>
          <div className=" text-center">
            Address : No. 2A, Ohangara Street, Thirumoolar Nagar, Mudaliarpet,
            Puducherry - 605004
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
