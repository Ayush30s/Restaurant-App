import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFreez } from "../../Redux/FreezState";
import { addItem } from "../../Redux/cartslice";
import Addons from "./Addons";
import AddonsContext from "../../utils/AddonsContext";
import BlurContext from "../../utils/BlurContext";

const Variant = (props) => {
  
   const [usedata,setdata] = useState(0); 
   const [variantSelected, setVariantSelected] = useState(null);
   const [newDetails, setNewDetails] = useState({}); 
   const [showAddons, setshowAddons] = useState(false);
   const [showSizeVariant, setShowSizeVariant] = useState(true);
   const [addonsSelected, setAddonsSelected] = useState([]);
   const [backButton, setBackButton] = useState(false);

   let blurData = useContext(BlurContext);
   let restaurantid = props.data.itemDetails.restaurantid;
   const {addons} = props;
   let {dishname} = props;

   const dispatch = useDispatch(); 

   // Update total amount when variantSelected or addonsSelected change
   useEffect(() => {
      if (variantSelected !== null) {
         const totalAddonAmount = addonsSelected.reduce((acc, ele) => acc + ele.price / 100, 0);
         const totalPrice = usedata + totalAddonAmount;
         const updatedDetails = {
            ...props.data.details,
            variantSelected: variantSelected,
            restaurantid: restaurantid,
            name: dishname,
            totalPrice: totalPrice
         };
         setNewDetails(updatedDetails);
      }
   }, [variantSelected, addonsSelected, usedata, dishname, props.data.details, restaurantid]);

   const toggeldata = (rupee) => {
      setdata(rupee);
   }

   const handleClickBtn = () => {
      dispatch(updateFreez(false));
   }

   const handleAddItem = () => {
      dispatch(addItem(newDetails));
   }

   const handleShowAddon = (flag) => {
      setshowAddons(flag);
   }

   const handleSizeVariant = (flag) => {
      setShowSizeVariant(flag);
   }

   const handleVariantClick = (ele) => {
      toggeldata(ele.price != undefined ? ele.price : 0); 
      setVariantSelected(ele);
   };

   return (
      <AddonsContext.Provider value={{addonsSelected,setAddonsSelected}}>
         <div className="flex flex-col z-50 rounded-2xl pointer-events-auto fixed max-h-[60%] lg:top-[20%] lg:left-[25%] lg:w-[50%] md:w-[95%] md:top-96 bg-white border border-gray-300 bg-white-300">
            <div className="flex justify-between mx-7 my-2 border-b-2 py-3 ">
               {showAddons ? 
                  <button className="lg:text-lg md:text-[50px] active:text-sm w-5" onClick={() => {
                     handleSizeVariant(true);
                     handleShowAddon(false);
                     setBackButton(true);
                     setBackButton(false);
                  }}> ⬅️ </button>  
                  : null
               }
               <h1 className=" from-neutral-900 lg:text-xl md:text-4xl ">Customize "{dishname}"</h1>
               <button className="font-semibold ml-4 md:text-[30px] md:px-4 lg:text-xl  text-white bg-red-400 rounded-full px-2 hover:bg-red-500 hover:font-bold" onClick={() => {
                  blurData.setdishclicked(false); 
                  props.chnagestate(false);
                  handleClickBtn();
               }}>X</button>
            </div>
            
            <div className="mx-7 mt-1">
               <h1 className="from-neutral-900 lg:text-lg md:text-4xl mr-4">* {props.data.variant[0].name} </h1>
            </div>

            {showSizeVariant && (
               <div className="mx-5 overflow-y-auto">
                  {props.data.variant.map((ele1) => (
                     (
                        ele1.variations.map((ele) => (
                           <div key={ele.id} className="flex flex-row bg-slate-50 justify-between variants cursor-pointer rounded-xl p-2  text-lg list-none m-2 lg:font-semibold md:font-medium text-gray-600 hover:text-black hover:bg-gray-100" onClick={() => handleVariantClick(ele)}>
                              {ele.isVeg ? <span className="px-1 rounded-xl bg-green-500 text-xl text-white">veg</span> : <span className="px-1 rounded-xl bg-red-500 text-xl text-white">n-veg</span>}
                              <span className="mx-2 lg:text-xl md:text-3xl">{ele.name}</span>
                              {ele.price && <span className="mx-2 lg:text-xl md:text-3xl">₹{ele.price ? ele.price : 0}</span>}
                           </div>
                        ))
                     )
                  ))}
               </div>
            )}

            {showAddons && <Addons data={{ addons, variantSelected, dishname}}/>}
            <div className="ml-7 rounded-xl mr-5 my-2 flex justify-between text-white bg-green-500 font-bold p-2">
               {newDetails.totalPrice > 0 && <h1 className="py-1 px-2 rounded-xl md:text-3xl lg:text-lg text-white bg-green-600">Total Amount : ₹{backButton == false ? (newDetails.totalPrice || 0) : 0}</h1>}               
               <h1 className="py-1 px-2 rounded-xl text-white lg:text-lg md:text-3xl bg-green-600">{newDetails.variantSelected?.name == undefined ? "Select any variant" : newDetails.variantSelected?.name}</h1>
               {addons?.length === 0 || showAddons == true ? 
                  <button className="py-1 px-2 rounded-xl md:text-3xl lg:text-lg hover:bg-green-600" onClick={() => {
                     blurData.setdishclicked(false);
                     if(variantSelected !== null) {
                        handleAddItem();
                     }
                     props.chnagestate(false);
                  }}>Add Item</button> 
                  :
                  <button className="py-1 px-2 md:text-3xl lg:text-lg rounded-xl hover:bg-green-600" onClick={() => {
                     if(variantSelected !== null) {
                        handleSizeVariant(false);
                        handleShowAddon(true);
                     }
                  }}>Continue</button> 
               }
            </div>
         </div>
      </AddonsContext.Provider>
   );
}

export default Variant;
