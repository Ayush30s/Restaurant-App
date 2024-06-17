import React from "react";
import { useState } from "react";
import ItemCards from "./ItemCards";
import countVegNonvegDishes from "../../utils/countVegNonvegDishes";
import FoodContext from "../../utils/FoodContext";
import { useContext } from "react";

const CategoryItem = (category) => {
   
   const data = category.data.categories;
   const [visibleIndex, setVisibleIndex] = useState(0);

   const setVisible = (index) => {
      setVisibleIndex(index === visibleIndex ? null : index);
   }
   
   const {vegornot} = useContext(FoodContext);

   return (
         <div className="p-2 text-sm">
            {data?.map((ele, index) => {
               let count = countVegNonvegDishes({ele,vegornot});

               if(count > 0) {
                  return (
                     <div key={index}>
                        <div onClick={() => setVisible(index)} className=" flex justify-between m-2 p-3 border-b-2">
                           <h1 className="lg:font-bold md:font-medium md:text-2xl lg:text-sm lg:px-2 md:px-4 lg:py-1 md:py-2 rounded-3xl border border-white shadow-xl cursor-pointer bg-gray-200">{ele.title}</h1>
                           {visibleIndex === index ? 
                              <button id="freez" className= "md:text-3xl px-2 rounded-xl lg:text-xl border border-white shadow-lg bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                                 ▴
                              </button> :
                              <button id="freez" className= "md:text-3xl px-2 rounded-xl border border-white shadow-lg lg:text-xl bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                                 ▾
                              </button>} 
                        </div>
   
                        {/* ItemCard is a controlled component as it is controlled by the state variable of category ITems */}
                        {visibleIndex === index && <ItemCards data={ele.itemCards}/>}
                     </div>
                  )
               }
            })}
         </div>
      )
}

export default CategoryItem;
