import React from "react";
import { CDN_URL } from "../../utils/constants";
import Variant from "./Variant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/cartslice";
import { updateFreez } from "../../Redux/FreezState";
import { useContext } from "react";
import FoodContext from "../../utils/FoodContext";
import BlurContext from "../../utils/BlurContext";

const Dishes = (data) => { 

   const blurData = useContext(BlurContext);

   let Foodcontextdata = useContext(FoodContext);
   let {restaurantid} = Foodcontextdata;

   const details = data.data.card.info;

   const addons = data.data.card.info?.addons;

   const variant = details.variantsV2.variantGroups;

   let [clicked, setclicked] = useState(false);
   let [count, setCount] = useState(1);
   
   const toggel = () => {
      setclicked(true);
   }

   const dispatch = useDispatch();

   const itemDetails = {
      ...details,
      restaurantid,
      count  // Add count, restaurantid to details object
   };

   const HandleAddItem = (itemDetails) => {
      dispatch(addItem(itemDetails));
   };

   const Handlefreez = () => {
      // on clicking the button i dispatch an item
      dispatch(updateFreez(true));
   }

   let {description} = details;
     
   return (
      <div id="alldish" className= " m-2">
         <div className = "flex flex-row border border-gray-200 shadow-lg justify-between items-center rounded-bl-3xl rounded-br-3xl bg-white rounded-tr-3xl m-1  p-2">
            <div className="w-[72%]">
               {details.isVeg ? 
                  <h1 className="mx-3 my-3 font-semibold text-xs text-green-600">VEG</h1>
                     :
                  <h1 className="mx-3 my-3 font-semibold text-xs text-red-600">NON-VEG</h1>   
               }
               <h1 className="mx-3 my-3 font-semibold text-lg  text-gray-900">{details.name}</h1>
               <h1 className="mx-3 my-3 font-semibold text-xs  text-gray-500">Price : <span className="text-black">₹{(details.defaultPrice/100 || details.price/100) * count}</span></h1>
               <p className="mx-3 text-xs  text-gray-400">{description}</p>
            </div>


            <button className="w-[7%] font-semibold border border-gray-300 shadow-lg rounded-lg px-4 h-[100%] mt-[40px] text-green-500 hover:bg-orange-200 hover:text-black"
               onClick={() => {
                  (Object.keys(itemDetails.variantsV2).length > 0 && blurData.setdishclicked(true))
                  toggel();
                  if(Object.keys(itemDetails.variantsV2).length == 0) {
                     HandleAddItem(itemDetails);
                  }
                  Handlefreez();
               }}
            > 
               Add+
            </button>

            <div className="w-[15%]">
               {(Object.keys(itemDetails.variantsV2).length > 0) ? <h1 className="relative top-[8px] left-8 text-[5px]">Customizable+</h1> : null}
               {itemDetails.imageId ? <img className="border mt-1 border-gray-300 shadow-lg rounded-xl" src = {CDN_URL + itemDetails.imageId}/> : <img className="w-[50%] ml-8 my-8 h-[40%] rounded-xl" src = {"https://static.thenounproject.com/png/340719-200.png"}/>}
               <div className="w-[100%] h-[13%] mt-[10px] bg-white border border-black text-xs text-gray-700 flex flex-row shadow-2xl rounded-xl">
                  <button className="w-[30%] hover:bg-black hover:text-white rounded-xl m-1 active:bg-white active:text-black" onClick={() => {
                     if(count > 1) {
                        setCount(count - 1);
                     }
                  }}>-</button>
                  <button className="w-[40%] m-1 font-semibold">{count}</button>
                  <button className="w-[30%] hover:bg-black hover:text-white rounded-xl m-1 active:bg-white active:text-black" onClick={() => {
                     setCount(count + 1);
                  }}>+</button>
               </div>
            </div>
         </div>
         {
            clicked && (Object.keys(itemDetails.variantsV2).length > 0) && 
            <div className="z-20">
               <Variant data={{variant,itemDetails}} addons={addons} dishname={itemDetails.name} chnagestate={clicked => setclicked(clicked)} />
            </div>
         }
      </div>
   );
}

export default Dishes;