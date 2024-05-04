import React from "react"; 
import {CDN_URL} from "../utils/constants"
import rating from "./ratinig.png"
import Astricks from "./Astrick";

export const RestaurantCard = (props) => {
   const {resData} = props;

   // Optional chaining is a feature introduced in JavaScript that React developers often use to handle properties that may not exist at runtime.
   // It allows you to access deeply nested properties of an object without causing an error if an intermediate property is null or undefined.
   let {name, cuisines, cloudinaryImageId, avgRating, isVeg} = resData?.info;
   let {deliveryTime} = resData?.info?.sla;

   const compressString = (string,n) => {
      if(string.length > 17) {
         string = string.substring(0,n) + "...";
      }
      return string;
   }

   let stringCuisines = cuisines.join(",\n");
   let compCuisine = compressString(stringCuisines,30);

   let maxTime = Math.ceil(deliveryTime / 5) * 5;
   let minTime = Math.floor(deliveryTime / 5) * 5;
   if(minTime == maxTime) {
      maxTime += 5;
   }
   
   let newname = compressString(name,10);

   //if you loop on res data to create diffrent card for different restaurant always give key to each restrauant component
   //never use index as key for the component
   return (
      <div className='z-10 w-[260px] h-[260px] shadow-xl rounded-lg text-black cursor-pointer m-4 hover:bg-yellow-100 hover:border hover:border-yellow-100 p-1 snap-end'>
         <img className='rounded-xl w-[100%] h-[70%]' 
            src = {CDN_URL + cloudinaryImageId}
            alt='cardImage'
         />
         <div className="m-2 py-1 rounded-lg h-[25%]">
            <div className="flex flex-row justify-between">
               <h3 className=" font-semibold">{newname}</h3>
               <div className="flex mt-1 text-[8px]">
                  <Astricks data = {avgRating}/>
               </div>
            </div>
            <h3 className="text-xs my-1">{compCuisine}</h3>
         </div>
      </div>
   )
}


// higher Order Component => that take component as an input and returns a component as output
const CardWithLabel = (RestaurantCard) => {
   //a component which returns JSX
   return (resData) => {
      return (

         <div id="labelresCard" className="relative w-[260px] h-[260px] rounded-lg cursor-pointer snap-start"> 
            <label className="absolute left-6 top-2 py-1 px-2 m-1 text-[10px] rounded-2xl text-white bg-black">Promoted</label>
            <RestaurantCard {...resData}/>
         </div>

      )
   }
}

export default CardWithLabel;
