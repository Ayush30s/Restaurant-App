import React from "react";

const Address = () => {
   return (
      <div className="flex flex-col w-full text-sm m-1 p-4">
         <h1 className="m-1 font-bold">Add Address : </h1>
         <div className="m-1">
            <div className="flex flex-row p-2">
               <h1 className="font-semibold p-1 w-full text-xs" >Door / Flat No.</h1>
               <input className="w-[400%] p-1 rounded-md"></input>
            </div>
            <div className="flex flex-row p-2">
               <h1 className="font-semibold p-1 w-full text-xs" >Area : </h1>
               <input className="w-[400%] p-1 rounded-md"></input>
            </div>
            <div className="flex flex-row p-2">
               <h1 className="font-semibold p-1 w-full text-xs" >Landmark : </h1>
               <input className="w-[400%] p-1 rounded-md"></input>
            </div>
         </div>
         <button className="bg-gray-500 p-2 m-1 active text-white font-semibold">Confirm address</button>
      </div>
   );
}

export default Address;