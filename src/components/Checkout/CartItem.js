import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../Redux/cartslice";
import { CDN_URL } from "../../utils/constants";
import { Link } from "react-router-dom";

const CartItem = (data) => { 
   let [count, setCount] = useState(1);
   const {name,id} = data?.data;

   const resID = data.data.restaurantid;
   let price = (data.data.totalPrice == undefined ?  data.data.price / 100 : data.data.totalPrice);

   const dispatch = useDispatch();
   const handleRemoveItem = (name) => {
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
            <h1>₹{(price * count).toFixed(2)}</h1>  
         </div>

         <button alt = "Remove Item" className="w-[3%] text-center rounded-2xl mt-2  border hover:bg-gray-100" onClick={() => {
            handleRemoveItem(name);
            data.setAmount(prevTotal => (prevTotal - (price * count)));
         }}>x</button>
         
         <div className="w-[10%] bg-white border border-black text-xs text-gray-700 flex flex-row shadow-2xl rounded-xl">
            <button className="w-[30%] hover:bg-black hover:text-white rounded-xl m-1 active:bg-white active:text-black" onClick={() => {
               if(count > 1) {
                  setCount(count - 1);
                  data.setAmount(prevTotal => (prevTotal - price));
               }
            }}>-</button>
            <button className="w-[40%] m-1 font-semibold">{count}</button>
            <button className="w-[30%] hover:bg-black hover:text-white rounded-xl m-1 active:bg-white active:text-black" onClick={() => {
               setCount(count + 1);
               data.setAmount(prevTotal => (prevTotal + price));
            }}>+</button>
         </div>
      </div>   
   )
}

export default CartItem;