import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../Redux/cartslice";

const CartItem = (data) => {

   const {name,id} = data.data.data.card.info;
   const items = useSelector((store) => store.cart.items);
   
   const dispatch = useDispatch();

   return (
      <div id="cartitems" className="flex justify-between bg-white rounded-sm m-2"> 
         <h1 className="text-black w-90%">{name}</h1>
         <button className="w-10%" onClick={() => {
            dispatch(removeItem(id));
         }}>🗑️</button>
      </div>     
   )
}

export default CartItem;