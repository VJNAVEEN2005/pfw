import React, { useState } from "react";

const Payment_test = () => {
  const [amount, setAmount] = useState("");

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if(amount === ""){
        alert("please enter amount");
    } else {
        var options = {
            key:"rzp_test_4ZqLDryFSv9wuU",
            key_secret:"oZrihxkwwtdw92TqE5hBXdhy",
            amount: amount * 100,
            currency:"INR",
            name:"Pondy Food World",
            description:"For testing",
            handler: function(response){
                alert(response.razorpay_payment_id);
            },
            prefill: {
                name:"Naveen",
                email:"vjnaveen2005@gmail.com",
                contact:"8148941041"
            },
            notes: {
                address:"Razorpay Corporate office"
            },
            theme : {
                color:"green"
            }
        };

        var pay = new window.Razorpay(options);
        pay.open();
    }

  }

  return (
    <>
      <div className=" mt-10 w-full flex-col items-center flex">
        <div className=" text-xl font-semibold">(Testing) Enter the amount to pay</div>
        <div>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className=" mt-2 bg-white border rounded-2xl px-2 py-1 text-lg"
            type="text"
          />
        </div>
        <div onClick={handleSubmitPayment} className=" mt-2 bg-green-600 text-white px-7 py-1 rounded-xl text-lg">
          Pay
        </div>
      </div>
    </>
  );
};

export default Payment_test;
