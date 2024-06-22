import React from "react";
import CategoryItem from "./CategoryItem";
import { useState } from "react";
import ItemCards from "./ItemCards";

const Categories = (category) => {
   const data = category.data.card.card;

   const [showItems, setshowItems] = useState(true);

   const setVsisble = () => {
      setshowItems(!showItems);
   };

   return (
         <div className= "p-5 lg:bg-white my-4 shadow-md">
            <div className="flex justify-between" onClick={setVsisble}>
               <div className="lg:font-extrabold md:font-medium lg:text-sm md:text-[40px] bg-gray-200 border border-white shadow-xl lg:px-2 md:px-4 py-2 rounded-3xl">
                  {data.title}
               </div>
               {showItems ? (
                  <button className="lg:p-2 md:px-4 rounded-2xl border border-white shadow-lg lg:text-xl md:text-[40px] bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                     ▴
                  </button>
               ) : (
                  <button className="lg:p-2 md:px-4 rounded-2xl border border-white shadow-lg lg:text-xl md:text-[40px] bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                     ▾
                  </button>
               )}
            </div>
            <div>
               {showItems && data.itemCards && <ItemCards data={data.itemCards} />}
               {showItems && data.categories && <CategoryItem data={data} />}
            </div>
         </div>
         
   );
};

export default Categories;
