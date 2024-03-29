import React from "react";
import { useState } from "react";
import ItemCards from "./ItemCards";
import FreezState from "../../Redux/FreezState";
import { Provider } from "react-redux";
import AppStore from "../../Redux/AppStore";
import countVegNonvegDishes from "../../utils/countVegNonvegDishes";
import FoodContext from "../../utils/FoodContext";
import { useContext } from "react";

const CategoryItem = (category) => {
   const data = category.data.categories;
   const [visibleIndex, setVisibleIndex] = useState(null);

   const setVisible = (index) => {
      setVisibleIndex(index === visibleIndex ? null : index);
   }

   const {vegornot} = useContext(FoodContext);

   return (
      
      <Provider store={AppStore}>
         <div className="m-1 p-2 text-sm">
            {data?.map((ele, index) => {

               let count = countVegNonvegDishes({ele,vegornot});

               if(count > 0) {
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
               }
            })}
         </div>
      </Provider>
   )
}

export default CategoryItem;
