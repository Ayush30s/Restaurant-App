import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import Cartslice, { clearCart } from "../../Redux/cartslice";

const CartBody = () => {

   const items = useSelector((store) => store.cart.items);

   const dispatch = useDispatch();
   
   const handleClearCart = () => {
      dispatch(clearCart());
   }

   return items.length === 0 ? 
      <h1>Cart is Empty</h1> 
   : 
      <div className="w-[100%] h-[300px] bg-green-300">
         <button onClick={handleClearCart}>Clear Cart</button>
         {items.map((ele) => {
            return <CartItem data = {ele}/>
         })}
      </div>
}

export default CartBody; 