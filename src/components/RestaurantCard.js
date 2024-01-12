import React from "react";
import {CDN_URL} from "../utils/constants"

export const RestaurantCard = (props) => {
   const {resData} = props;

   // Optional chaining is a feature introduced in JavaScript that React developers often use to handle properties that may not exist at runtime.
   // It allows you to access deeply nested properties of an object without causing an error if an intermediate property is null or undefined.
   const {name, cuisines, totalRatingsString, costForTwoString, deliveryTime, cloudinaryImageId, avgRating} = resData?.info;

   //if you loop on res data to create diffrent card for different restaurant always give key to each restrauant component
   //never use index as key for the component
   return (
      <div className='res-card'>
         <img className='res-logo' 
            src = {CDN_URL + cloudinaryImageId} 
            alt='cardImage'
         />
         <h3>{name}</h3>
         <h4 id='cuisine'>{cuisines.join(",\n")}</h4>      
         <h4>{totalRatingsString}</h4>
         <h4>{avgRating}</h4>
         <h4>{costForTwoString}</h4>
         <h4>{deliveryTime} minutes</h4>
      </div>
   )
}
