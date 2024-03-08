import React from "react";
import { useState } from "react";
import ItemCards from "./ItemCards";

const CategoryItem = (category) => {
   const data = category.data.categories;
   const [visibleIndex, setVisibleIndex] = useState(null);

   const setVisible = (index) => {
      setVisibleIndex(index === visibleIndex ? null : index);
   }

   return (
      <div className="m-1 p-2 bg-gray-50 text-sm">
         {data?.map((ele, index) => {
            return (
               <div key={index}>
                  <div onClick={() => setVisible(index)} className="flex justify-between m-2 p-3 border-b-2">
                     <h1 className="font-bold">{ele.title}</h1>
                     {visibleIndex === index ? 
                        <button className="px-2 rounded-3xl text-xs bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                           Close
                        </button> : 
                        <button className="px-2 rounded-3xl text-xs bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                           Open
                     </button>}
                  </div>
                  {visibleIndex === index && <ItemCards data={ele.itemCards}/>}
               </div>
            )
         })}
      </div>
   )
}

export default CategoryItem;
