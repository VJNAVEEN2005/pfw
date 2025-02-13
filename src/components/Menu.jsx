import React from "react";
import logo from "../assets/image/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const Menu = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={
          props.isOpen
            ? " w-[75%] h-full z-30 fixed top-0 left-0 transition-all"
            : "w-[75%] h-full z-30 fixed top-0 -left-[100%] transition-all"
        }
      >
        <div className=" h-full bg-white">
          <div className=" flex w-full justify-center shadow-xl pb-5">
            <img className=" w-40 mt-8" src={logo} alt="logo" />
          </div>
          <div className=" mx-4 mt-8">
            <ul className=" flex flex-col gap-5 text-2xl">
              <li onClick={()=> navigate("/")}>Home</li>
              <hr />
              <li onClick={()=> navigate("/cart")}>Cart</li>
              <hr />
              <li onClick={()=> navigate("/orders")}>Orders</li>
              <hr />
              <li>About</li>
              <hr />
              <li
                onClick={() => {
                  navigate("/test");
                }}
              >
                Virtual Card
              </li>
              <hr />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
