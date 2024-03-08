import React from "react";
import { useState } from "react";
import { CDN_URL } from "../../utils/constants";

const Dishes = (data) => {
   const details = data.data.card.info;
  
   return (
      <div className = "bg-yellow-100 rounded-xl m-3 flex flex-row justify-between">
         <div className="my-10">
            <h1 className="mx-3 my-2 font-bold text-sm text-gray-600">{details.name}</h1>
            <p className="mx-3 text-sm font-bold text-gray-400">{details.description}</p>
         </div>
         
         <button className="absolute ml-[45%] bg-green-400 m-10 rounded-lg px-4 h-[6%] text-white">
            Add+
         </button>
         {details.imageId ? <img className="w-[100px]  m-2 h-[100px] rounded-xl" src = {CDN_URL + details.imageId}/> : <img className="w-[50px] mx-2 my-8  h-[50px] rounded-xl" src = {"https://static.thenounproject.com/png/340719-200.png"}/>}
      </div>
   );
}

export default Dishes;