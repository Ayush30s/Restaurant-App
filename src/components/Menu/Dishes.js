import React from "react";
import { CDN_URL } from "../../utils/constants";
import Variant from "./Variant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/cartslice";

const Dishes = (data) => { 
   const details = data.data.card.info;
   const addons = data.data.card.info?.addons;
   const variant = details.variantsV2.variantGroups;

   let [clicked, setclicked] = useState(false);
   const toggel = () => {
      setclicked(!clicked);
   }

   const dispatch = useDispatch();

   const HandleAddItem = (data) => {
      // on clicking the button i dispatch an item
      dispatch(addItem(data));
   }

   return (
      <div id="alldish" className="flex flex-col justify-center">
         <div className = "border border-gray-300 shadow-lg rounded-bl-3xl rounded-br-3xl rounded-tr-3xl m-3 flex flex-row justify-between p-2">
            <div className="w-[60%]">
               {details.isVeg ? 
                  <h1 className="mx-3 my-3 font-extrabold text-xs text-green-600">VEG</h1>
                     :
                  <h1 className="mx-3 my-3 font-extrabold text-xs text-red-600">NON-VEG</h1> 
               }

               <h1 className="mx-3 my-3 font-bold  text-gray-900">{details.name}</h1>
               <p className="mx-3 text-xs font-bold text-gray-400">{details.description}</p>
            </div>
            
            <button className="relative m-10 font-bold bg-gray-50 border border-gray-300 shadow-lg rounded-lg px-4 w-[14%] text-green-400 hover:bg-orange-200 hover:text-black"
               onClick={() => {
                  toggel();
                  HandleAddItem(data);
               }}
            >
               Add+
            </button>

            <div className="w-[20%]">
               {details.imageId ? <img className="w-[150px] border border-gray-300 shadow-lg  m-2 h-[100px] rounded-xl" src = {CDN_URL + details.imageId}/> : <img className="w-[50px] mx-2 my-8  h-[50px] rounded-xl" src = {"https://static.thenounproject.com/png/340719-200.png"}/>}
            </div>
         </div>

         <div>
            {clicked && (Object.keys(details.variantsV2).length > 0) && <Variant data={variant} addons = {addons} dishname = {details.name} chnagestate = {clicked => setclicked(clicked)}/>}
         </div>
      </div>
   );
}

export default Dishes;