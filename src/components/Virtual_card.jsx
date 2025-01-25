import React from "react";
import logo from "../assets/image/logo.png";
import phone from "../assets/gif/phone.gif";
import address from "../assets/gif/address.gif";
import mail from "../assets/gif/mail.gif";

const Virtual_card = () => {
  const Specialities = [
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
              {Specialities.map((item) => (
                <li>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr className=" mt-10" />

        {/* product/service */}

        <div className="w-full flex justify-center">
          <div>
            <div className=" mt-10 text-2xl font-bold">Product</div>
            <hr />
          </div>
        </div>

        {/* card */}

        <div className=" flex flex-col items-center">
          <div>
            <img src="" alt="" />
          </div>
          <div>Tile</div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              tempore quibusdam adipisci. Voluptatem fuga exercitationem quidem.
              Odio doloribus accusantium ducimus asperiores? Dolores perferendis
              tenetur nobis in harum odit iure distinctio.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Virtual_card;
