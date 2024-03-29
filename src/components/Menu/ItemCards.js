import React, { useEffect } from "react";
import { useState } from "react";
import Dishes from "./Dishes";
import { useContext } from "react";
import FoodContext from "../../utils/FoodContext";

const ItemCards = (data) => {
   
   const array = data.data;
   
   // food context me restaurabt menu se state variable ko yha le aya aur jab bhi wha button click 
   // hoga state var change hoga aur state va ki value ke accrding data change hoga
   const foodtype = useContext(FoodContext);

   // let Ftype;
   // if(foodtype.vegornot == 0) {
   //    Ftype = "NONVEG";
   // } else {
   //    Ftype = "VEG";
   // }

   // let totaldishes = 0;
   // let filteredDishes = 0;

   // array.map((ele) => {
   //    totaldishes++;
   //    if(ele.card.info.itemAttribute.vegClassifier === Ftype) {
   //       filteredDishes++;
   //    }
   // });

   // console.log("ItemList : " , totaldishes);
   // console.log("Itemlist : " , filteredDishes);

      return (
      
         <div className="m-2">
            {array.map((ele) => {
               //agr foodtype true hi mtlb veg aur dish type bhi true hi mtlb veg then show veg dishes only
               if(foodtype.vegornot && ele.card.info.isVeg) {
                  return (
                     <div key={ele.title}>
                        <div>
                           <h1>{ele.title}</h1>
                           <p>{ele.description}</p>
                        </div>
   
                        <Dishes data = {ele}/>
                     </div>
                  )
               }
   
               // agr foodtype false hi mtlb non-veg aur dish type bhi false hi mtlb non-veg then show non-veg dishes only
               if(!foodtype.vegornot && !ele.card.info.isVeg) {
                  return (
                     <div key={ele.title}>
                        <div>
                           <h1>{ele.title}</h1>
                           <p>{ele.description}</p>
                        </div>
   
                        <Dishes data = {ele}/>
                     </div>
                  )
               }
            })}
         </div>
      );
   
}

export default ItemCards;