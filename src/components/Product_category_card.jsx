import React from 'react'
import nuts from '../assets/items/nuts.png'

const Product_category_card = () => {
  return (
    <>
        <div className=" flex border rounded items-center border-gray-400 shadow-gray-400 shadow-lg">
              <div className="px-4 py-2">
                <img src={nuts} className=" w-22 rounded" alt="" />
              </div>
              <div className=" flex-col flex ml-4 ">
                <div className=" text-lg font-semibold">Title</div>
                <div className=" text-gray-400">description</div>
              </div>
            </div>
    </>
  )
}

export default Product_category_card