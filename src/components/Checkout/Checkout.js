import React from "react";

const Checkout = (data) => {
   return (
      <div className="flex flex-col w-full text-sm m-1 p-3">
         <div className="flex p-2 bg-white rounded-lg m-1 flex-row justify-between">
            <h1 className="font-semibold text-xs">Total Amount : </h1>
            <h1>$1367</h1>
         </div>
         <div className="flex p-2 bg-white rounded-lg m-1 flex-row justify-between">
            <h1 className="font-semibold text-xs">GST and taxes : </h1>
            <h1>$1</h1>
         </div>
         <div className="flex p-2 bg-white rounded-lg m-1 flex-row justify-between">
            <h1 className="font-semibold text-xs">Discount : </h1>
            <h1>$1367</h1>
         </div>
         <button className="bg-gray-500 p-2 m-1 text-white font-semibold">Pay</button>
      </div>
   )
}

export default Checkout; 