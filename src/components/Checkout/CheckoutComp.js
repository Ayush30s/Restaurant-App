import React from "react";
import { useState } from "react";

const CheckoutComp = () => {

   let [selected, setSelected] = useState(false);

   const handleSelect = () => {
      setSelected(!selected);
   }

   return (
      <div className="flex flex-row justify-center mt-10">
         <div className="w-1/2">
            <h1 className="font-semibold mx-1 my-5 text-2xl">Delivery Information</h1>
            <div className="flex flex-row">
               <input className=" border border-black rounded-sm p-2 w-full m-1 hover:bg-black hover:text-white    placeholder:text-sm" placeholder="First name"></input>
               <input className=" border border-black rounded-sm p-2 w-full m-1 hover:bg-black hover:text-white    placeholder:text-sm" placeholder="Last name"></input>
            </div>
            <div className="flex flex-row">
               <input className=" border border-black rounded-sm p-2 m-1 w-full hover:bg-black hover:text-white   placeholder:text-sm" placeholder="Email address"></input>
               <input className=" border border-black rounded-sm p-2 m-1 w-full hover:bg-black hover:text-white   placeholder:text-sm" placeholder="Pin code"></input>
            </div>
            <div className="flex flex-row">
               <input className=" border border-black rounded-sm p-2 w-full m-1 hover:bg-black hover:text-white    placeholder:text-sm" placeholder="City"></input>
               <input className=" border border-black rounded-sm p-2 w-full m-1 hover:bg-black hover:text-white    placeholder:text-sm" placeholder="State"></input>
            </div>
            <div className="flex flex-row">
               <input className=" border border-black rounded-sm p-2 w-full m-1 hover:bg-black hover:text-white    placeholder:text-sm" placeholder="Street"></input>
            </div>
         </div>
         <div className="flex flex-col w-[20%] mt-32 ml-20">
            <div className="flex flex-row justify-between  text-black m-1 text-sm rounded-sm hover:bg-black border border-black hover:text-white p-2">
               <div><input type="radio" checked={selected} onClick={handleSelect}/></div>
               <button>COD (Cash on Delivery)</button>
            </div>
            <div className="flex flex-row justify-between  text-black m-1 text-sm rounded-sm hover:bg-black border border-black hover:text-white p-2">
               <div><input type="radio" checked={!selected} onClick={handleSelect}/></div>
               <button>Online Payment</button>
            </div>            
            <button className=" bg-orange-500 m-1 mt-1 text-sm rounded-sm hover:bg-black hover:text-white px-10 text-white py-3">Place Order</button>
         </div>         
      </div>
   );
}

export default CheckoutComp;