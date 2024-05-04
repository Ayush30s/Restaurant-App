import React, { useState } from "react";
import Dishes from "./Dishes";
import { useContext } from "react";
import FoodContext from "../../utils/FoodContext";
import { useSelector, useDispatch } from "react-redux";
import BlurContext from "../../utils/BlurContext";

const ItemCards = (data) => {
   const array = data.data;
   
   // food context me restaurabt menu se state variable ko yha le aya aur jab bhi wha button click 
   // hoga state var change hoga aur state va ki value ke accrding data change hoga
   const foodtype = useContext(FoodContext);

   

   return (
      
      <div className= "m-2">
         {array.map((ele) => {
            //agr foodtype true hi mtlb veg aur dish type bhi true hi mtlb veg then show veg dishes only
            if(foodtype.vegornot && ele.card.info.isVeg) {
               return (
                  <div key={ele.title}>
                     <div>
                        <h1>{ele.title}</h1>
                        <p>{ele.description}</p>
                     </div>

                     <Dishes data = {ele} />
                  </div>
               )
            }

            // agr foodtype false hi mtlb non-veg aur dish type bhi false hi mtlb non-veg then show non-veg dishes only
            if(!foodtype.vegornot && !ele.card.info.isVeg) {
               return (
                  <div key={ele.title} >
                     <div>
                        <h1>{ele.title}</h1>
                        <p>{ele.description}</p>
                     </div>

                     <Dishes data = {ele} />
                  </div>
               )
            }
         })}
      </div>
   );
}

export default ItemCards;