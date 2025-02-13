import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart_display = (props) => {

   const [item , setItem] = useState({})

   useEffect(() => {
    console.log(props.id)
    console.log(props.quantity)
    axios.get(`https://mini-ecom-api.vercel.app/api/v1/product/${props.id}`)
      .then((res) => {
        setItem(res.data.product)
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [props.id]); // Runs only when `props.id` changes
  

  return (
    <div>
      <div className="flex justify-between items-start">
        <div className=" flex ">
        <div className="mr-4">
            <img src={item.image} className=" w-12" alt="" />
        </div>
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-gray-500 text-sm">{item.weight}</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold">₹{item.CurrentPrice}</span>
              <span className="text-gray-500 line-through text-sm">
                ₹{item.Orginalprice}
              </span>
              <span className="text-red-500 text-sm">{Number((item.Orginalprice - item.CurrentPrice) / item.Orginalprice * 100).toFixed()}% OFF</span>
            </div>
          </div>
        </div>
        </div>
        <div className="font-medium">₹{(item.CurrentPrice) * (props.quantity)}</div>
      </div>
    </div>
  );
};

export default Cart_display;
