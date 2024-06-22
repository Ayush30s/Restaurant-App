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
         <div className="flex flex-col z-50 rounded-[40px] pointer-events-auto fixed max-h-[60%] lg:top-[20%] lg:left-[20%] lg:w-[60%] md:w-[95%] md:top-[20%] bg-white border border-gray-300 bg-white-300">
            <div className ="flex flex-row justify-between items-center mx-7 my-2 border-b-2 lg:py-3 md:py-5">
               {showAddons ? 
                  <button className="lg:text-lg md:text-[50px] active:text-sm w-5" onClick={() => {
                     handleSizeVariant(true);
                     handleShowAddon(false); 
                     setBackButton(true);
                     setBackButton(false);
                  }}> ⬅️ </button>  
                  : null
               }
               <span className="lg:text-xl md:text-4xl font-bold">{dishname}</span>
               <button className="font-semibold ml-4 md:text-[30px] md:px-4 lg:text-xl  text-white bg-red-400 rounded-full px-2 hover:bg-red-500 hover:font-bold" onClick={() => {
                  blurData.setdishclicked(false); 
                  props.chnagestate(false);
                  handleClickBtn();
               }}>X</button>
            </div>
            
            <div className="mx-7 mt-1 lg:py-0 md:py-5">
               <h1 className="from-neutral-900 lg:text-lg md:text-4xl mr-4 font-medium"> {props.data.variant[0].name} </h1>
            </div>

            {showSizeVariant && (
               <div className="mx-5 overflow-y-auto">
                  {props.data.variant.map((ele1) => (
                     (
                        ele1.variations.map((ele) => (
                           <div key={ele.id} className="flex flex-row bg-white justify-between items-center variants cursor-pointer rounded-xl lg:p-2 md:py-3  text-lg list-none lg:m-2 md:m-3 lg:font-semibold md:font-medium text-gray-600 hover:text-black hover:bg-gray-100" onClick={() => handleVariantClick(ele)}>
                              {ele.isVeg ?<img className="text-xs md:w-[7%] lg:w-[3%]" src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg"/> : <img className="text-xs md:w-[7%] lg:w-[3%]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png"/>}
                              <span className="mx-2 lg:text-sm text-center md:text-[40px]">{ele.name}</span>
                              {ele.price && <span className="mx-2 lg:text-sm md:text-[40px]">₹{ele.price ? ele.price : 0}</span>}
                           </div>
                        ))
                     )
                  ))}
               </div>
            )}

            {showAddons && <Addons data={{ addons, variantSelected, dishname}}/>}
            <div className="ml-7 rounded-xl mr-5 my-2 flex lg:flex-row md:flex-col justify-between text-white bg-green-500 font-bold p-2">
               {newDetails.totalPrice > 0 && <h1 className="py-1 px-2 md:m-1 text-center rounded-xl md:text-3xl lg:text-sm text-white bg-green-600 md:bg-transparent">Total Amount : ₹{backButton == false ? (newDetails.totalPrice || 0) : 0}</h1>}               
               <h1 className="lg:py-1 md:py-2 md:m-1 px-2 rounded-xl text-white text-center lg:text-sm md:text-3xl  md:bg-transparent">Variant : {newDetails.variantSelected?.name == undefined ? "Select any variant" : newDetails.variantSelected?.name}</h1>
               {addons?.length === 0 || showAddons == true ? 
                  <button className="lg:py-1 md:py-2 px-2 rounded-xl md:text-[40px] lg:text-sm hover:bg-green-600 md:border md:border-white md:rounded-full" onClick={() => {
                     blurData.setdishclicked(false);
                     if(variantSelected !== null) {
                        handleAddItem();
                     }
                     props.chnagestate(false);
                  }}>Add Item</button> 
                  :
                  <button className="lg:py-1 md:py-2 px-2 md:text-[40px] lg:text-sm rounded-xl hover:bg-green-600 md:bg-transparentm md:border md:border-white md:rounded-full" onClick={() => {
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
