import React from "react";
import { useState } from "react";
import Dishes from "./Dishes";

const ItemCards = (data) => {
   
   const array = data.data;
 
   
   return (
      <div className="m-2">
         {array.map((ele) => {
            return (
               <div>
                  <div>
                     <h1>{ele.title}</h1>
                     <p>{ele.description}</p>
                  </div>

                  <Dishes data = {ele}/>
               </div>
            )
         })}
      </div>
   );
}

export default ItemCards;