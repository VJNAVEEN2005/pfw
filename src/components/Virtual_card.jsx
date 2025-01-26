import React from "react";
import logo from "../assets/image/logo.png";
import phone from "../assets/gif/phone.gif";
import address from "../assets/gif/address.gif";
import mail from "../assets/gif/mail.gif";
import Product_card from "./Product_card";
import productCard from "../data/product";
import qr from "../assets/image/qr.jpeg";
import copy from "../assets/gif/copy.gif";
import websiteqr from "../assets/image/websiteqr.png";

const Virtual_card = () => {
  const specialities = [
    `lorem dsfd gdkfns knfs `,
    `ljfshf shfsl  fsf `,
    `k ljf  fsfs;fs `,
    `w hlf nfl m ojlksf jfsf`,
  ];

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
                Phone : 7200162525
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

        <div className=" w-full flex justify-center mt-6">
          <button className=" p-2 bg-green-500 border-2 hover:scale-110 transition-all border-green-800 rounded-2xl text-white flex items-center gap-1.5">
            <img
              src="https://img.icons8.com/?size=100&id=83159&format=png&color=ffffff"
              className=" w-4"
              alt=""
            />
            Add To Phone Book
          </button>
        </div>

        <div className=" flex w-full justify-center flex-col items-center mt-10 border-t">
          <div className=" mt-8">
            <h1 className=" text-2xl font-bold">About Us</h1>
            <hr />
          </div>
          <div className=" mt-6 mx-6 flex justify-center border rounded-2xl bg-white">
            <table className=" w-[90%] ">
              <tr className=" border-b">
                <th className=" p-0.5">Company Name</th>
                <td className=" p-0.5">: Pondy Food World</td>
              </tr>
              <tr className=" border-b ">
                <th className=" p-0.5">Category</th>
                <td className=" p-0.5">: Other</td>
              </tr>
              <tr className="">
                <th className=" p-0.5">Nature of Business</th>
                <td className=" p-0.5">Organic And Traditional Product</td>
              </tr>
            </table>
          </div>
        </div>

        {/* Specification */}

        <div className=" mt-5 ml-6">
          <div className=" font-semibold text-xl">Our Specification :</div>
          <div>
            <ul className=" text-lg">
              {specialities.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr className=" mt-10" />

        {/* product/service */}

        <div className="w-full flex mb-10  justify-center">
          <div>
            <div className=" mt-10 text-2xl font-bold">Product</div>
            <hr />
          </div>
        </div>

        {/* card */}

        <div className=" flex w-full flex-col items-center justify-center">
          {productCard.map((data) => (
            <Product_card
              image={data.image}
              title={data.title}
              detail={data.details}
            />
          ))}
        </div>

        {/* payment */}

        <hr className=" mt-10" />

        <div className="w-full flex mb-10  justify-center">
          <div>
            <div className=" mt-10 text-2xl font-bold">Payment</div>
            <hr />
          </div>
        </div>

        <div>
          <div className=" mx-6 flex justify-center rounded">
            <table className=" w-[90%] ">
              <tr className="">
                <th className=" p-0.5">Payment Number</th>
                <td className=" p-0.5">: 7200162525</td>
              </tr>
              <tr className="">
                <th className=" p-0.5">G-Pay</th>
                <td className=" p-0.5">: 7200162525</td>
              </tr>
              <tr className="">
                <th className=" p-0.5">Paytm</th>
                <td className=" p-0.5">: 7200162525</td>
              </tr>
            </table>
          </div>

          <div className=" mx-6 font-bold text-xl mt-4">Account Details</div>

          <div className=" mx-6 flex justify-center">
            <table className=" w-[90%] ">
              <tr className="">
                <th className=" p-0.5">Bank Name</th>
                <td className=" p-0.5">: Yes Bank</td>
              </tr>
              <tr className="">
                <th className=" p-0.5">IFSC code</th>
                <td className=" p-0.5">: 7200162525</td>
              </tr>
              <tr className="">
                <th className=" p-0.5">Account Name</th>
                <td className=" p-0.5">: 7200162525</td>
              </tr>
              <tr className="">
                <th className=" p-0.5">Account Number</th>
                <td className=" p-0.5">: 7200162525</td>
              </tr>
              <tr className="">
                <th className=" p-0.5">Account Type</th>
                <td className=" p-0.5">: CURRENT ACCOUNT</td>
              </tr>
            </table>
          </div>

          <div className=" mx-6">
            <div>
              <h1 className=" font-semibold text-lg mt-3">QR Codes:</h1>
              <div className=" flex justify-center mt-3">
                <img className="w-[60%] rounded-3xl" src={qr} alt="" />
              </div>
            </div>
          </div>
        </div>

        <hr className=" mt-10" />

        {/* share */}

        <div className=" mt-10 w-full flex justify-center">
          <div>
            <div className="text-2xl w-full flex justify-center font-bold">
              <div>
                Share
                <hr />
              </div>
            </div>

            <div className=" flex gap-10 shadow-2xl mt-10 py-2 px-4 bg-white rounded-2xl">
              <div>https://pondyfoodworld.in/</div>
              <div>
                <img className=" w-8" src={copy} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col mt-10 items-center w-full">
          <div className=" text-xl mt-5">Scan To Open The Profile</div>
          <div className=" mt-5 bg-white p-3 rounded-2xl">
            <img className=" w-48" src={websiteqr} alt="" />
          </div>
          <div className=" flex mt-10 gap-8 flex-row">
            <div className=" bg-green-500 border border-green-950 hover:scale-110 transition-all flex gap-4 text-white px-4 py-1 text-xl rounded-lg">
              <img
                className="w-6"
                src="https://img.icons8.com/?size=100&id=98959&format=png&color=ffffff"
                alt=""
              />
              <div>Share</div>
            </div>
            <div className="bg-green-500 flex gap-4 border border-green-950 text-white px-4 py-1 hover:scale-110 transition-all text-xl rounded-lg">
              <img
                className="w-6"
                src="https://img.icons8.com/?size=100&id=83988&format=png&color=ffffff"
                alt=""
              />
              <div>Save QR</div>
            </div>
          </div>

          <div className=" mt-10">Share profile to any whatsapp number:</div>
          <div className=" mb-52 mt-3 flex">
            <input
              type="number"
              id="visitors"
              className=" border border-green-900 bg-white w-44 rounded-l-2xl p-2 text-lg "
              placeholder=""
              required
            />
            <div className=" flex px-3 items-center rounded-r-2xl gap-2 border border-green-900 bg-green-500">
              <div>SEND</div>
              <div>
                <img
                  className=" w-6"
                  src="https://img.icons8.com/?size=100&id=16712&format=png&color=ffffff"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" text-white pt-3 fixed justify-evenly rounded-t w-full flex -bottom-2 p-2 bg-green-600 border-t-2 border-green-950  shadow-2xl">
        <div className=" flex flex-col items-center">
          <img
            className=" w-8"
            src="https://img.icons8.com/?size=100&id=2797&format=png&color=ffffff"
            alt=""
          />
          <div>Home</div>
        </div>

        <div className=" flex flex-col items-center">
          <img
            className=" w-8"
            src="https://img.icons8.com/?size=100&id=7694&format=png&color=ffffff"
            alt=""
          />
          <div>About Us</div>
        </div>

        <div className=" flex flex-col items-center">
          <img
            className=" w-8"
            src="https://img.icons8.com/?size=100&id=59867&format=png&color=ffffff"
            alt=""
          />
          <div>Products</div>
        </div>

        <div className=" flex flex-col items-center">
          <img
            className=" w-8"
            src="https://img.icons8.com/?size=100&id=7994&format=png&color=ffffff"
            alt=""
          />
          <div>Payment</div>
        </div>

        <div className=" flex flex-col items-center">
          <img
            className=" w-8"
            src="https://img.icons8.com/?size=100&id=98959&format=png&color=ffffff"
            alt=""
          />
          <div>Share</div>
        </div>
      </div>
    </>
  );
};

export default Virtual_card;
