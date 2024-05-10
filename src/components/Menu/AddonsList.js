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
            <div key={index} className="py-2 px-1 rounded-lg bg-gray-100 my-1 flex justify-between">
               <span className="w-[10%]">{ele.isVeg ? <span className="text-white text-xs bg-green-600 rounded-lg p-1 m-1">veg</span> : <span className="w-[10%] text-white text-xs bg-red-600 rounded-lg p-1 m-1">Nveg</span>}</span>
               <span className="w-[60%]">{ele.name}</span>
               <span className="w-[15%]">₹{ele.price == NaN || 0 ? 0 : ele.price / 100}</span>
               <input
                  className="w-[3%]"
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
