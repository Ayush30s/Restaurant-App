import React from "react"
import { useSelector } from "react-redux";

const CartItem = (data) => {

   const {name} = data.data.data.card.info;

   return (
      <div id="cartitems" className="flex justify-evenly bg-white rounded-sm m-2"> 
         <h1 className="text-black w-90%">{name}</h1>
         <button className="w-10%">🗑️</button>
      </div>     
   )
}

export default CartItem;