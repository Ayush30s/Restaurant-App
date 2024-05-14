import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../Redux/cartslice";
import { CDN_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const CartItem = (data) => { 
   console.log(data);
   const {name, count} = data?.data;

   const resID = data.data.restaurantid;
   let price = Math.round(data.data.totalPrice == undefined ?  data.data.price / 100 : data.data.totalPrice);

   const dispatch = useDispatch();
   const handleRemoveItem = (name) => {
      data.setAmount(0);
      dispatch(removeItem(name));
   }

   return (
      <div id="cartitems" className= "w-[90%] h-16 ml-[5%] border-b border-b-gray-300 flex flex-row items-center justify-between my-5">    
         <div className="w-[5%] yellow-red-300 m-1">
            {data.data.imageId ? <img className=" hover:w-[100%] w-[90%] rounded-lg" src= {CDN_URL + data.data.imageId}/> : <img src = {"https://static.thenounproject.com/png/340719-200.png"} />}
         </div>

         <div className="w-[20%]">
            <span className=" text-gray-700 mb-1 text-xs font-semibold ">{name}</span><Link to = {"/restaurants/" + resID}><h1 className=" text-black mb-1 text-[8px] hover:text-orange-400"> restaurant</h1></Link>
         </div>
 
         <div className = "w-[10%] font-semibold text-gray-700 text-sm mx-2">   
            <h1>₹{(price).toFixed(2) * count}</h1>  
         </div>

         <div className = "w-[10%] font-semibold text-gray-700 text-sm mx-2">    
            <h1>{count}</h1>  
         </div>

         <button alt = "Remove Item" className="w-[3%] text-center rounded-2xl mt-2  border hover:bg-gray-100" onClick={() => {
            handleRemoveItem(name);
         }}>x</button>
      </div>   
   )
}

export default CartItem;