import React from "react";
import {CDN_URL} from "../utils/constants"
import rating from "./ratinig.png"

export const RestaurantCard = (props) => {
   const {resData} = props;

   // Optional chaining is a feature introduced in JavaScript that React developers often use to handle properties that may not exist at runtime.
   // It allows you to access deeply nested properties of an object without causing an error if an intermediate property is null or undefined.
   let {name, cuisines, totalRatingsString, costForTwo, cloudinaryImageId, avgRating} = resData?.info;
   let {deliveryTime} = resData?.info?.sla;

   const compressString = (string) => {
      if(string.length > 17) {
         string = string.substring(0,20) + "...";
      }
      return string;
   }

   let stringCuisines = cuisines.join(",\n");
   let compCuisine = compressString(stringCuisines);

   let maxTime = Math.ceil(deliveryTime / 5) * 5;
   let minTime = Math.floor(deliveryTime / 5) * 5;
   if(minTime == maxTime) {
      maxTime += 5;
   }
   
   let newname = compressString(name);

   //if you loop on res data to create diffrent card for different restaurant always give key to each restrauant component
   //never use index as key for the component
   return (

   <div className='z-10 font-semibold w-[240px] h-[260px] pb-2 rounded-2xl text-gray-600 cursor-pointer my-4 hover:border p-2'>
         <img className='rounded-2xl w-[100%] h-[68%]'
            src = {CDN_URL + cloudinaryImageId}
            alt='cardImage'
         />
         <div className="m-1 pb-2">
            <h3 className="py-1 from-neutral-50">{newname}</h3>
            <div className="flex text-sm">
               <img className="absolute top-38 w-5 rounded-full" src={rating}/>
               <h3 className="ml-6">{avgRating}</h3>
               <h3 className="ml-3">• {minTime} - {maxTime} mins</h3>
            </div>
            <h3 className="text-sm font-normal mt-1 text-gray-500">{compCuisine}</h3>
         </div>
      </div>
   )
}


// higher Order Component => that take component as an input and returns a component as output
const CardWithLabel = (RestaurantCard) => {
   //a component which returns JSX
   return (resData) => {
      return (

         <div id="labelresCard" className="relative w-[260px] h-[260px] rounded-lg cursor-pointer"> 
            <label className="absolute left-3 top-3 py-1 px-2 text-[10px] rounded-2xl text-black bg-white">Promoted</label>
            <RestaurantCard {...resData}/>
         </div>

      )
   }
}

export default CardWithLabel;
