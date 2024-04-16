import React from "react";
import { CDN_URL } from "../../utils/constants";
import Variant from "./Variant";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../Redux/cartslice";
import { updateFreez } from "../../Redux/FreezState";

const Dishes = (data) => { 
   const details = data.data.card.info;
   const addons = data.data.card.info?.addons;
   const variant = details.variantsV2.variantGroups;

   let [clicked, setclicked] = useState(false);
   const toggel = () => {
      setclicked(true);
   }

   const dispatch = useDispatch();
   const freez = useSelector((store) => store.freez.freezstate);

   const HandleAddItem = (details) => {
      
      // on clicking the button i dispatch an item
      dispatch(addItem(details));
   }

   const Handlefreez = (data) => {
      // on clicking the button i dispatch an item
      dispatch(updateFreez(true));
   }

   let {description} = details;
     
   return (
      <div id="alldish" className= " m-2">
         <div className = "flex flex-row border border-gray-200 shadow-lg justify-between rounded-bl-3xl rounded-br-3xl bg-white rounded-tr-3xl m-1  p-2">
            <div className="w-[70%]">
               {details.isVeg ? 
                  <h1 className="mx-3 my-3 font-extrabold text-xs text-green-600">VEG</h1>
                     :
                  <h1 className="mx-3 my-3 font-extrabold text-xs text-red-600">NON-VEG</h1> 
               }

               <h1 className="mx-3 my-3 font-bold  text-gray-900">{details.name}</h1>
               <p className="mx-3 text-xs font-bold text-gray-400">{description}</p>
            </div>

            <button className="w-[10%] font-bold border border-gray-300 shadow-lg rounded-lg px-4 h-[100%] mt-[60px] text-green-500 hover:bg-orange-200 hover:text-black"
               onClick={() => {
                  toggel();
                  if(Object.keys(details.variantsV2).length == 0) {
                     HandleAddItem(details);
                  }
                  Handlefreez();
               }}
            > 
               Add+
            </button>

            <div className="w-[15%]">
               {(Object.keys(details.variantsV2).length > 0) ? <h1 className="relative top-[8px] left-8 text-[5px]">Customizable+</h1> : null}
               {details.imageId ? <img className="border mt-1 border-gray-300 shadow-lg rounded-xl" src = {CDN_URL + details.imageId}/> : <img className="w-[50%] ml-8 my-8 h-[50%] rounded-xl" src = {"https://static.thenounproject.com/png/340719-200.png"}/>}
            </div>
         </div>
         
         <div>
            {clicked && (Object.keys(details.variantsV2).length > 0) && <Variant data={{variant,details}} addons = {addons} dishname = {details.name} chnagestate = {clicked => setclicked(clicked)}/>}
         </div>
      </div>
   );
}

export default Dishes;