import React from "react";
import { CDN_URL } from "../../utils/constants";
import Variant from "./Variant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/cartslice";
import { updateFreez } from "../../Redux/FreezState";
import { useContext } from "react";
import FoodContext from "../../utils/FoodContext";

const Dishes = (data) => { 

   let Foodcontextdata = useContext(FoodContext);
   let {restaurantid} = Foodcontextdata;

   const details = data.data.card.info;
   // console.log(details.defaulPrice);

   const addons = data.data.card.info?.addons;
   console.log(addons);

   const variant = details.variantsV2.variantGroups;

   let [clicked, setclicked] = useState(false);
   
   const toggel = () => {
      setclicked(true);
   }

   const dispatch = useDispatch();

   const itemDetails = {
      ...details,
      restaurantid,  // Add restaurantid to details object
   };

   const HandleAddItem = (itemDetails) => {
      // console.log(itemDetails);
      dispatch(addItem(itemDetails));
   };


   const Handlefreez = () => {
      // on clicking the button i dispatch an item
      dispatch(updateFreez(true));
   }

   let {description} = details;
     
   return (
      <div id="alldish" className= " m-2">
         <div className = "flex flex-row border border-gray-200 shadow-lg justify-between rounded-bl-3xl rounded-br-3xl bg-white rounded-tr-3xl m-1  p-2">
            <div className="w-[72%]">
               {details.isVeg ? 
                  <h1 className="mx-3 my-3 font-extrabold text-xs text-green-600">VEG</h1>
                     :
                  <h1 className="mx-3 my-3 font-extrabold text-xs text-red-600">NON-VEG</h1> 
               }
               <h1 className="mx-3 my-3 font-semibold text-lg  text-gray-900">{details.name}</h1>
               <h1 className="mx-3 my-3 font-bold text-xs  text-gray-600">Price : ₹{details.defaultPrice/100 || details.price/100}</h1>
               <p className="mx-3 text-xs  text-gray-400">{description}</p>
            </div>

            <button className="w-[7%] font-bold border border-gray-300 shadow-lg rounded-lg px-4 h-[100%] mt-[60px] text-green-500 hover:bg-orange-200 hover:text-black"
               onClick={() => {
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
               {itemDetails.imageId ? <img className="border mt-1 border-gray-300 shadow-lg rounded-xl" src = {CDN_URL + itemDetails.imageId}/> : <img className="w-[50%] ml-8 my-8 h-[50%] rounded-xl" src = {"https://static.thenounproject.com/png/340719-200.png"}/>}
            </div>
         </div>
         
         {
            clicked && (Object.keys(itemDetails.variantsV2).length > 0) && 
            <div>
               <Variant data={{variant,itemDetails}} addons = {addons} dishname = {itemDetails.name} chnagestate = {clicked => setclicked(clicked)}/>
            </div>
         }
      </div>
   );
}

export default Dishes;