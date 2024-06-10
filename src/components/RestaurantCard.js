import React from "react"; 
import {CDN_URL} from "../utils/constants"
import Astricks from "./Astrick";

export const RestaurantCard = (props) => {
   const {resData} = props;

   // Optional chaining is a feature introduced in JavaScript that React developers often use to handle properties that may not exist at runtime.
   // It allows you to access deeply nested properties of an object without causing an error if an intermediate property is null or undefined.
   let {name, cuisines, cloudinaryImageId, avgRating} = resData?.info;
   let {deliveryTime} = resData?.info?.sla;

   const compressString = (string,n) => {
      if(string.length > 17) {
         string = string.substring(0,n) + "...";
      }
      return string;
   }

   let stringCuisines = cuisines.join(",\n");
   let cuisinelen = window.innerWidth / 2 < 500 ? 100 : 20;
   let compCuisine = compressString(stringCuisines,cuisinelen);

   let maxTime = Math.ceil(deliveryTime / 5) * 5;
   let minTime = Math.floor(deliveryTime / 5) * 5;
   if(minTime == maxTime) {
      maxTime += 5;
   }
   
   let namelen = window.innerWidth/2 < 500 ? 17 : 10;
   console.log(window.innerWidth);
   let newname = compressString(name,namelen);

   //if you loop on res data to create diffrent card for different restaurant always give key to each restrauant component
   //never use index as key for the component
   return (
      <div className='md:bg-green-100 lg:bg-purple-300 md:w-[700px] md:h-[250px] md:p-2 flex md:flex-row lg:flex-col lg:justify-center z-10 lg:w-[260px] lg:h-[260px] shadow-xl rounded-lg text-black cursor-pointer lg:m-[10px] hover:bg-gray-100 lg:p-[5px] snap-end'>
         <img className='rounded-xl md:m-2 md:w-[50%] md:h-[100%] lg:w-[100%] lg:h-[70%] ' 
            src = {CDN_URL + cloudinaryImageId}
            alt='cardImage'
         />
         <div className="lg:m-2 md:m-2 md:w-[50%] lg:py-1 rounded-lg lg:w-[100%] lg:h-[30%]  md:flex flex-col md:justify-between lg:justify-between ">
            <div className="flex lg:flex-row md:flex-col">
               <h3 className="lg:font-semibold md:ml-2 md:text-[30px] lg:w-[70%] lg:text-[16px] md:font-bold">{newname}</h3>
               <div className="lg:mt-2 md:ml-2 lg:text-[10px] md:text-[16px] lg:w-[35%]">
                  <Astricks data = {avgRating}/>
               </div>
            </div>
            <h3 className="lg:text-xs md:ml-2 md:text-xl my-1">{compCuisine}</h3>
         </div>
      </div>
   )
}


// higher Order Component => that take component as an input and returns a component as output
const CardWithLabel = (RestaurantCard) => {
   //a component which returns JSX
   return (resData) => {
      return (
         <div className="relative"> 
            <label className="absolute lg:left-5 md:left-3 md:top-3 lg:top-2 py-1 px-2 m-1 text-[10px] rounded-2xl text-black bg-white">Promoted</label>
            <RestaurantCard {...resData}/>
         </div>
      )
   }
}

export default CardWithLabel;
