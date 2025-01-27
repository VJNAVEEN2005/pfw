import React from 'react'
import nuts from '../assets/items/nuts.png'
import { useNavigate } from 'react-router-dom'

const Product_category_card = (props) => {

  const navigate = new useNavigate();

  return (
  

    <>
        <div onClick={()=>navigate(`/category/${props.title}`)} className=" flex border rounded items-center border-gray-400 shadow-gray-400 shadow-lg">
              <div className="px-4 py-2">
                <img src={props.image} className=" w-22 rounded" alt="" />
              </div>
              <div className=" flex-col flex ml-4 ">
                <div className=" text-lg font-semibold">{props.title}</div>
                <div className=" text-gray-400">{props.details}</div>
              </div>
            </div>
    </>
  )
}

export default Product_category_card