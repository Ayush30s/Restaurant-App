import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateFreez } from "../../Redux/FreezState";

const Variant = (props) => {
   const [usedata,setdata] = useState(0);

   const toggeldata = (rupee) => {
      setdata(rupee);
   }

   const dispatch = useDispatch();

   const handleClickBtn = () => {
      dispatch(updateFreez(false));
   }

   return (
      <div className="flex flex-col  fixed top-[20%] left-[25%] w-[50%] h-[60%] z-10 bg-white border border-gray-300 bg-white-300">
         
         <div className="flex justify-between mx-7 my-2 border-b-2 py-3 ">
            <h1 className=" from-neutral-900 text-lg">Customize "{props.dishname}"</h1>
            <button className="font-semibold ml-4 text-white bg-red-400 rounded-full px-2 hover:bg-red-500 hover:font-bold" onClick={() => {
               props.chnagestate(false);
               handleClickBtn();
            }}>X</button>
         </div>

         <div className="mx-7 mt-3 py-2">
            <h1 className="from-neutral-900 text-lg mr-4">* {props.data[0].name} <h1 className="text-gray-600 text-pretty inline my-2 text-sm font-thick ">(required)</h1></h1>
         </div>

         <div className="mx-5 overflow-y-auto">
            {props.data[0].variations.map((ele) => {
               return (
                  <div className="cursor-pointer p-2 bg-gray-50 text-lg list-none m-2 font-semibold  text-gray-600 hover:text-black" onClick={() => toggeldata(ele.price)}
                  >
                     <span>🌱</span>
                     <span className="mx-2 text-sm">{ele.name} : ₹{ele.price}</span>
                  </div>
               )
            })}
         </div>

         <div className="ml-7 mr-5 my-2 flex justify-between text-sm text-white bg-green-500 font-bold p-2">
            <h1>Total Amount : {usedata}</h1>
            <button>Add Item</button>
         </div>
      </div>
   );
}

export default Variant;