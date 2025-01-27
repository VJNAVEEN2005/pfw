import React from 'react'
import nuts from '../assets/items/nuts.png'
import { useNavigate } from 'react-router-dom'

const Product_view_p = () => {

  const navigate = new useNavigate();
  return (
    <>
        <div onClick={()=>navigate('/product')} className=" border border-gray-400 rounded-xl scale-[90%] min-w-52 shadow-2xl p-4">
            <img className=" w-44 rounded-2xl" src={nuts} alt="" />
            <div className=" font-semibold mt-3 text-4xl">Title</div>
            <div className=" w-full flex justify-center">
            <select className=" bg-green-600 w-[90%] px-3 focus:border focus:border-black py-1 text-lg font-bold mt-3 rounded text-white" name="" id="">
              <option value="">1 Kg</option>
              <option value="">2 Kg</option>
              <option value="">3 Kg</option>
            </select>
            </div>
            <div className=" text-gray-400 mt-3">Orginal Price</div>
            <div>Current Price</div>
            <div className=" right-0 relative mt-3 flex w-full justify-end">
              <div className=" bg-green-600 text-white rounded-l-xl px-3 py-1">Add</div>
              <div className="bg-green-500 text-white rounded-r-xl px-3 py-1">+</div>
            </div>
          </div>
    </>
  )
}

export default Product_view_p