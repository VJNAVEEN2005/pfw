import React from 'react'
import nuts from "../assets/items/nuts.png";

const Product_card = (props) => {
  return (
    <>
        <div className=" flex flex-col rounded-2xl shadow-2xl bg-green-50 p-5 m-2 max-w-60 items-center">
            <div>
              <img src={props.image} className=" max-w-40 rounded shadow-2xl" alt="" />
            </div>
            <div className=" text-xl font-semibold my-2">{props.title}</div>
            <div>
              <p className=" text-sm text-justify">
                {props.detail}
              </p>
            </div>
          </div>
    </>
  )
}

export default Product_card