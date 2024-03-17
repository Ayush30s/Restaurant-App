import React from "react";
import { useState } from "react";
import ItemCards from "./ItemCards";
import { useContext } from "react";
import FoodContext from "../../utils/FoodContext";

const CategoryItem = (category) => {
   const data = category.data.categories;
   const [visibleIndex, setVisibleIndex] = useState(null);

   const setVisible = (index) => {
      setVisibleIndex(index === visibleIndex ? null : index);
   }

   const foodtype = useContext(FoodContext);

   let Ftype;
   if(foodtype.vegornot == 0) {
      Ftype = "NONVEG";
   } else {
      Ftype = "VEG";
   }

   //check kro ki agr ji itemcard ko hm render krne wale hi usme apne veg non-veg wale filter ke according data hai ya ni agr filter ke according data usme 0 hi to us item card ke andar dishes ko render mt krna
   for(let i = 0; i < data.length; i++) {
      let filteredDishes = 0;

      let subData = data[i].itemCards;
      for(let j = 0; j < subData.length; j++) {

         if(subData[j].card.info.itemAttribute.vegClassifier === Ftype) {
            filteredDishes++;
         }
      }

      if(filteredDishes > 0) {

         return (
            <div className="m-1 p-2 text-sm">
               {data?.map((ele, index) => {
                  return (
                     <div key={index}>
                        <div onClick={() => setVisible(index)} className="flex justify-between m-2 p-3 border-b-2">
                           <h1 className="font-bold px-2 py-1 rounded-3xl border border-white shadow-xl bg-gray-200">{ele.title}</h1>
                           {visibleIndex === index ? 
                              <button className="px-2 rounded-3xl border border-white shadow-lg text-xs bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                                 Close
                              </button> :
                              <button className="px-2 rounded-3xl border border-white shadow-lg text-xs bg-slate-300 hover:bg-slate-400 active:bg-slate-950 active:text-white">
                                 Open
                           </button>}
                        </div>
                        {/* ItemCard is a controlled component as it is controlled by the state variable of category ITems */}
                        {visibleIndex === index && <ItemCards data={ele.itemCards}/>}
                     </div>
                  )
               })}
            </div>
         )
      } 
   }
}

export default CategoryItem;
