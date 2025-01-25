import React from "react";
import logo from "../assets/image/logo.png";
import phone from "../assets/gif/phone.gif";
import address from "../assets/gif/address.gif";
import mail from '../assets/gif/mail.gif'

const Virtual_card = () => {

  console.log("Hello")

  return (
    <>
      <div className=" flex mx-4 my-4 rounded-2xl flex-col bg-green-100">
        <div className=" flex justify-center mt-10 w-full">
          <img className=" w-44" src={logo} alt="" />
        </div>
        <div className=" w-full flex justify-center mt-5">
          <div>
            <div>
              <h1 className=" text-2xl font-bold mb-1">Pondy Food World</h1>
              <hr className=" bg-red-700" />
            </div>
            <div className=" mt-5 flex justify-evenly">
              <img
                className="w-10"
                src="https://img.icons8.com/?size=100&id=16733&format=png&color=73BE47"
                alt=""
              />
              <img
                className="w-10"
                src="https://img.icons8.com/?size=100&id=32309&format=png&color=73BE47"
                alt=""
              />
              <img
                className="w-10"
                src="https://img.icons8.com/?size=100&id=7880&format=png&color=73BE47"
                alt=""
              />
              <img
                className="w-10"
                src="https://img.icons8.com/?size=100&id=53435&format=png&color=73BE47"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className=" mt-9 w-full flex flex-col gap-1.5">
          <div className=" justify-center flex">
            <div className=" flex border p-3 w-[80%] justify-center rounded-2xl">
              <img src={phone} className=" w-8" alt="" />
              <div className=" text-lg font-semibold ml-3">
                Phone : 5461323098
              </div>
            </div>
          </div>

          <div className=" justify-center flex">
            <div className=" flex border p-3 w-[80%] justify-center rounded-2xl">
              <div>
                <img src={address} className=" w-9" alt="" />
                <div>
                  Address : <br />
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui
                  quas vero iusto facere dolorum consequatur eaque fugiat sunt
                  itaque accusantium!
                </div>
              </div>
            </div>
          </div>

          <div className=" justify-center flex">
            <div className=" flex flex-col border p-3 w-[80%] justify-center rounded-2xl">
              <img src={mail} className=" w-8" alt="" />
              <div className=" text-lg font-semibold ml-3">
                <div className=" flex">Mail : pondyfoodworld@gmail.com</div>
              </div>
            </div>
      </div>
    </div>

        
      </div>
    </>
  );
};

export default Virtual_card;
