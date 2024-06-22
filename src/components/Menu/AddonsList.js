import React, { useContext } from "react";
import AddonsContext from "../../utils/AddonsContext";

const AddonsList = (props) => {
   const { addonsSelected, setAddonsSelected } = useContext(AddonsContext);

   const handleCheckBox = (ele) => {
      if (addonsSelected.some((addon) => addon.name === ele.name)) {
         // If addon is already selected, remove it
         setAddonsSelected((prevAddons) =>
         prevAddons.filter((addon) => addon.name !== ele.name)
         );
      } else {
         // If addon is not selected, add it
         setAddonsSelected((prevAddons) => [...prevAddons, ele]);
      }
   };

   return (
      <div> 
         {props.data.choices.map((ele, index) => (
            ele.price !== undefined && <div key={index} className="lg:py-1 px-1 rounded-lg bg-gray-100 lg:my-1 md:my-3 md:py-5 flex flex-row items-center justify-between ">
               <span className="w-[10%]">{ele.isVeg ? <span className="text-white lg:text-xs md:text-2xl bg-green-600 rounded-lg px-2 py-1 m-1">veg</span> : <span className="w-[10%] text-white lg:text-xs md:text-2xl bg-red-600 rounded-lg md:p-1 lg:py-2 m-1">Nveg</span>}</span>
               <span className="w-[60%] lg:text-[16px] md:text-4xl">{ele.name}</span>
               <span className="w-[15%] lg:text-[16px] md:text-4xl">₹{ele.price == undefined ? 0 : ele.price / 100}</span>
               <input
                  className="w-[10%] bg-red-500"
                  type="checkbox"
                  onChange={() => handleCheckBox(ele)}
                  checked={addonsSelected.some((addon) => addon.name === ele.name)}
               />
            </div>
         ))}
      </div>
   );
};

export default AddonsList;
