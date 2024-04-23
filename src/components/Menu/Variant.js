import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateFreez } from "../../Redux/FreezState";
import { addItem } from "../../Redux/cartslice";
import Addons from "./Addons";
import AddonsContext from "../../utils/AddonsContext";

const Variant = (props) => {
   let restaurantid = props.data.itemDetails.restaurantid;
   const {addons} = props;
  
   const [usedata,setdata] = useState(0); 
   const [variantSelected, setVariantSelected] = useState(null);
   const [newDetails, setnewdetails] = useState({}); 

   const [showAddons, setshowAddons] = useState(false);
   const [showsizeVariant, setShowsizeVariant] = useState(true);
   const [addonsSelected, setAddonsSelected] = useState(null);
   
   let {dishname} = props;
   let addonArray = [];
   if(!(addonsSelected === null)) {
      addonArray.push(addonsSelected);
      setAddonsSelected(null);
   }

   const handleVariantClick = (ele) => {
      toggeldata(ele.price);
      setVariantSelected(ele);
      
      // Update variantSelected in a new immutable way
      const updatedDetails = {
         ...props.data.details, // Spread the existing details
         variantSelected: ele, // Update variantSelected
         restaurantid: restaurantid,
         name: dishname
      };
      
      setnewdetails(updatedDetails);
   };
   
   const toggeldata = (rupee) => {
      setdata(rupee);
   }

   const cart = useSelector((store) => store.cart.items);
   const dispatch = useDispatch(); 

   const handleClickBtn = () => {
      dispatch(updateFreez(false));
   }

   const handleAddItem = () => {
      dispatch(addItem(newDetails));
   }

   const handleShowAddon = (flag) => {
      setshowAddons(flag);
   }

   const handelshowsizeVariant = (flag) => {
      setShowsizeVariant(flag);
   }

   return (
      <div className="flex flex-col rounded-2xl pointer-events-auto fixed max-h-[60%] top-[20%] left-[25%] w-[50%] z-10 bg-white border border-gray-300 bg-white-300">
         <div className="flex justify-between mx-7 my-2 border-b-2 py-3 ">

            {showAddons ? 
               <button className="text-lg active:text-sm w-5" onClick={() => {
                  handelshowsizeVariant(true);
                  handleShowAddon(false);
               }}> ⬅️ </button> 
               : null
            }

            <h1 className=" from-neutral-900 text-lg ">Customize "{dishname}"</h1>

            <button className="font-semibold ml-4 text-white bg-red-400 rounded-full px-2 hover:bg-red-500 hover:font-bold" onClick={() => {
               props.chnagestate(false);
               handleClickBtn();
            }}>X</button>

         </div>

         <div className="mx-7 mt-1">
            <h1 className="from-neutral-900 text-lg mr-4">* {props.data.variant[0].name} <h1 className="text-gray-600 text-pretty inline my-2 text-sm font-thick ">(required)</h1></h1>
         </div>

         {showsizeVariant && <div className="mx-5 overflow-y-auto">
            {props.data.variant[0].variations.map((ele) => {
               return (
                  <div key={ele.id} className="variants cursor-pointer rounded-xl p-2 bg-gray-50 text-lg list-none m-2 font-semibold  text-gray-600 hover:text-black" onClick={() => handleVariantClick(ele)}>
                     <span>🌱</span>
                     <span className="mx-2 text-sm">{ele.name} :</span>
                     {ele.price && <span className="mx-2 text-sm">₹{ele.price}</span>}
                  </div>
               )
            })}
         </div>}

         {
            showAddons
               &&
            <AddonsContext.Provider value={{ addonsSelected, setAddonsSelected}}>
               <Addons data={{ addons, variantSelected, dishname}} />
            </AddonsContext.Provider>
         }
         
         <div className="ml-7 rounded-xl mr-5 my-2 flex justify-between text-sm text-white bg-green-500 font-bold p-2">
            <h1 className="py-1 px-2 rounded-xl bg-green-600">Total Amount : ${usedata}</h1>
            {
               addons?.length === 0 || showAddons == true 
               ? 
                  <button className="py-1 px-2 rounded-xl hover:bg-green-600" onClick={() => {
                     if(variantSelected !== null) {
                        handleAddItem();
                     }

                     props.chnagestate(false);
                  }}>Add Item</button> 
               :
                  <button className="py-1 px-2 rounded-xl hover:bg-green-600" onClick={() => {
                     if(variantSelected !== null) {
                        handelshowsizeVariant(false);
                        handleShowAddon(true);
                     }
                  }}>Conitnue</button> 
            }
         </div>
      </div>
   );
}

export default Variant;