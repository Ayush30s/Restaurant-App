import React from "react";
import CategoryItem from "./CategoryItem";
import { useState } from "react";
import ItemCards from "./ItemCards";
// import ItemCards from "./ItemCards";

const Categories = (category) => {
   const data = category.data.card.card;
   

   const [showItems, setshowItems] = useState(false);

   const setVsisble = () => {
      setshowItems(!showItems);
   }

   return (
      <div className=" p-5 bg-slate-50 m-2 shadow-lg">
         <div className="flex justify-between" onClick={setVsisble}>
            <div className="font-bold text-sm ">{data.title}</div>
            {showItems ? 
               <button className="px-2 rounded-3xl text-xs bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                  Close
               </button> : 
               <button className="px-2 rounded-3xl text-xs bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                  Open
            </button>}
         </div>
         <div>
            {showItems && data.itemCards && <ItemCards data = {data.itemCards}/>}
            {showItems && data.categories && <CategoryItem data = {data}/>} 
         </div>
      </div>
   )
}

export default Categories;