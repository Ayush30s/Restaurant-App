import React from "react"; 
import {CDN_URL} from "../utils/constants"
import Astricks from "./Astrick";

export const RestaurantCard = (props) => {
   const {resData} = props;

   // Optional chaining is a feature introduced in JavaScript that React developers often use to handle properties that may not exist at runtime.
   // It allows you to access deeply nested properties of an object without causing an error if an intermediate property is null or undefined.
   let {name, cuisines, cloudinaryImageId, avgRating} = resData?.info;
   let {deliveryTime} = resData?.info?.sla;

   const compressString = (string) => {
      if(string.length > 17) {
         string = string.substring(0,15) + "...";
      }
      return string;
   }

   let stringCuisines = cuisines.join(",\n");
   let compCuisine = window.innerWidth/2 > 550 ? compressString(stringCuisines) : stringCuisines;

   let maxTime = Math.ceil(deliveryTime / 5) * 5;
   let minTime = Math.floor(deliveryTime / 5) * 5;
   if(minTime == maxTime) {
      maxTime += 5;
   }
   
   let newname = window.innerWidth/2 > 600 ? compressString(name) : name;

   //if you loop on res data to create diffrent card for different restaurant always give key to each restrauant component
   //never use index as key for the component
   return (
      <div className='md:mb-[30px] md:w-[90vw] md:mr-10 md:mt-5 md:h-[500px] md:p-2 flex md:flex-row lg:flex-col lg:justify-center lg:items-center z-10 lg:w-[260px] lg:h-[260px] shadow-xl rounded-lg text-black cursor-pointer lg:m-[10px] hover:bg-gray-100 lg:snap-end md:snap-start'>
         <img className='lg:rounded-xl md:m-2 md:p-1 md:rounded-3xl md:w-[50%] md:h-[90%] lg:w-[100%] lg:h-[70%] ' 
            src = {CDN_URL + cloudinaryImageId}
            alt='cardImage'
         />
         <div className="lg:m-2 md:m-1 md:w-[50%] lg:py-1 rounded-lg lg:w-[100%] lg:h-[30%] md:flex flex-col md:justify-between lg:justify-between ">
            <div className="flex lg:flex-row md:flex-col">
               <h3 className="lg:font-semibold md:ml-2 md:text-[50px] lg:w-[70%] lg:text-[16px] md:font-bold">{newname}</h3>
               <div className="lg:mt-2  lg:text-[10px] md:text-[30px] lg:w-[35%]">
                  <Astricks data = {avgRating}/>
               </div>
            </div>  
            <h3 className="lg:text-xs md:ml-2 md:mb-10 md:text-4xl my-1">{compCuisine}</h3>
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
            <label className="absolute lg:left-7 md:left-8 md:top-8 lg:top-2 py-1 px-2 m-1 lg:text-[10px] rounded-2xl text-black md:text-[20px] bg-white">Promoted</label>
            <RestaurantCard {...resData}/>
         </div>
      )
   }
}

export default CardWithLabel;
