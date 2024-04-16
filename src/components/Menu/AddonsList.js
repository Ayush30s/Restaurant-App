import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { useContext } from "react";
import AddonsContext from "../../utils/AddonsContext";

const AddonsList = (props) => {

   const Data = useContext(AddonsContext);

   const [selectedCheckboxName, setSelectedCheckboxName] = useState(null);
   
   const handleCheckBox = (ele) => {
      Data.setAddonsSelected(ele);
      setSelectedCheckboxName(ele.name);
   };

   return (
      <div>
         {props.data.choices.map((ele,index) => {
            return <div key ={index} className="py-2 px-1 rounded-lg bg-gray-100 my-1 flex justify-between">
               <span className="w-[10%]">{ele.isVeg ? <span className="text-white text-xs bg-green-600 rounded-lg p-1 m-1">veg</span> : <span className="w-[10%] text-white text-xs bg-red-600 rounded-lg p-1 m-1">Nveg</span>}</span>
               <span className="w-[60%]">{ele.name}</span>
               <span className="w-[20%]">₹{ele?.price/100}</span>
               <input
                  className="w-[3%]"
                  type="checkbox"
                  checked={selectedCheckboxName === ele.name}
                  onClick={() => {
                     handleCheckBox(ele);
                  }}
               />
            </div>
         })}
      </div>
   );
};

export default AddonsList;