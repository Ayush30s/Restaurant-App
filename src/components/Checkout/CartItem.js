import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../Redux/cartslice";
import { CDN_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const CartItem = (data) => {
   const {variantSelected} = data?.data;
   const {name,id} = data?.data;

   const cart = useSelector((store) => store.cart.items);    

   const dispatch = useDispatch();
   const handleRemoveItem = (id) => {
      dispatch(removeItem(id));
   }

   const compressString = (string) => {
      if(string?.length > 17) {
         string = string.substring(0,40) + "...";
      }
      return string;
   }

   const resID = 747484;

   let [count, setCount] = useState(1);
   let price = (variantSelected?.price) || (data.data.price / 100);
   let description = compressString(data.data.description);

   return (
      <div id="cartitems" className=" flex bg-white h-[120px] flex-row rounded-lg justify-between mb-6 p-3 ml-3"> 
         <div className="mx-2 w-[60%] flex flex-col">
            <div className="flex flex-row text-sm">
               <Link to = {"/restaurants/" + resID}><span className="text-black mb-1 font-semibold w-90% hover:text-orange-400"><u>{name}</u></span></Link>
               {variantSelected?.isVeg === 1 || data.data.itemAttribute?.vegClassifier == 'VEG' ? <span className=" p-1 font-bold text-xs text-green-500 mx-1 ">(veg)</span> : <span  className="p-1 font-bold text-xs text-red-500 mx-1">(non-veg)</span>}
            </div>

            <div className="flex flex-col text-xs">
               {variantSelected?.name ? <span className="text-sm font-semibold ">Type : {variantSelected?.name} </span> : <span>{description}</span>}
               <div className="flex flex-row text-sm">
                  <h1>Price : </h1> 
                  <span className = "font-bold mx-2">₹{(price * count).toFixed(2)}</span> 
               </div>
               <button alt = "Remove Item" className="w-7 rounded-2xl mt-2 bg-red-500 text-white hover: active:bg-red-600" onClick={() => {
                  handleRemoveItem(id);
               }}>x</button>
            </div>
         </div>

         <div className="flex flex-row w-[20%]">
            <div className="mt-8 h-5 border border-black text-xs rounded-xl">
               <button className="w-4" onClick={() => {
                  if(count > 1) {
                     setCount(count - 1);
                  }
               }}>-</button>
               <button className=" w-8 font-semibold">{count}</button>
               <button className=" w-5" onClick={() => setCount(count + 1)}>+</button>
            </div>
         </div>

         <div className="w-[13%] m-1">
            {data.data.imageId ? <img className="h-[100%] w-[95%] rounded-xl" src= {CDN_URL + data.data.imageId}/> : <img className="w-[80px] p-3" src = {"https://static.thenounproject.com/png/340719-200.png"} />}
         </div>
      </div>  
   )
}

export default CartItem;