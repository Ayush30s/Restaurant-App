import React from "react";
import {CDN_URL} from "../utils/constants"

export const RestaurantCard = (props) => {
   const {resData} = props;

   // Optional chaining is a feature introduced in JavaScript that React developers often use to handle properties that may not exist at runtime.
   // It allows you to access deeply nested properties of an object without causing an error if an intermediate property is null or undefined.
   let {name, cuisines, totalRatingsString, costForTwo, cloudinaryImageId, avgRating} = resData?.info;
   let {deliveryTime} = resData?.info?.sla;
   let stringCuisines = cuisines.join(",\n");

   const compressString = (string) => {
      if(string.length > 17) {
         string = string.substring(0,22) + "...";
      }
      return string;
   }
   

   //if you loop on res data to create diffrent card for different restaurant always give key to each restrauant component
   //never use index as key for the component
   return (
   
      <div className='z-10 w-[240px] h-[230px] rounded-2xl cursor-pointer m-2 hover:border p-2'>
         <img className='rounded-2xl w-[100%] h-[60%]'
            src = {CDN_URL + cloudinaryImageId}
            alt='cardImage'
         />
         <div className="m-2">
            <h3 className="font-bold py-2"><b>{name}</b></h3>
         </div>
      </div>
   )
}


// higher Order Component => that take component as an input and returns a component as output
const CardWithLabel = (RestaurantCard) => {
   //a component which returns JSX
   return (resData) => {
      return (

         <div id="labelresCard" className="relative w-[250px] h-[280px] rounded-lg mt-2 cursor-pointer m-2"> 
            <label className="relative left-5 top-10 z-20 py-1 px-2 text-[10px] rounded-2xl text-white bg-black">Promoted</label>
            <RestaurantCard {...resData}/>
         </div>

      )
   }
}

export default CardWithLabel;
