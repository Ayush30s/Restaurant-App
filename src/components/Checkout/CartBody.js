import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../../Redux/cartslice";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import CartTemplate from "./CartItemTemplate";

const CartBody = () => {
   const items = useSelector((store) => store.cart.items);
   
   const [totalAmount, setTotalamount] = useState(0);
   const [GrandTotal, setGrandTotal] = useState(totalAmount);

   const dispatch = useDispatch();

   const handleClearCart = () => {
      dispatch(clearCart());
   }; 

   const cart = useSelector((store) => store.cart.items);    

   useEffect(() => {
      setGrandTotal(GrandTotal + totalAmount);
   },[totalAmount]);

    return ( 
        <div>
            {items.length === 0 ? (
               <div className=" overflow-hidden relative top-[100px] left-[35%] w-[50%]">
                  <div className="mx-12">
                     <i className="text-gray-800  font-semibold text-4xl">Cart is Empty !</i><span className="text-5xl">🛒</span>
                  </div>
                  <div className="mx-8 my-3">
                     <i>Ghrelin, the "hunger hormone," signals hunger.</i>
                  </div>
                  <div className="pb-10 pt-5 mx-20"> 
                     <Link to="/">
                        <button className="rounded-3xl m-2 px-3 py-1 bg-sky-300 text-gray-800 font-semibold text-lg shadow-xl border border-orange-500 hover:bg-orange-200 active:bg-white active:text-orange-500">Browse Restaurants</button>
                     </Link>
                  </div>
               </div>
            ) : (
               <div className="w-full h-full relative top-[100px] rounded-xl flex flex-row">
                  <div className="p-3 top-[90%] bg-white z-50 w-[100%] fixed flex flex-row justify-between">
                     <button className=" w-[10%] bg-red-400 p-2 ml-10 text-black font-semibold text-sm rounded-lg" onClick={handleClearCart}>
                        Clear Cart
                     </button>
                     <h1 className=" g-red-500 w-[15%] p-2 text-black font-semibold text-sm rounded-lg">Total Amount : {GrandTotal}</h1>
                     <button className=" w-[10%] border border-black mr-10 p-2 text-black font-semibold text-sm rounded-lg">
                        Checkout
                     </button>
                  </div>

                  <div className="w-[100%] h-full pb-10">
                     <div className=" bg-white py-5 fixed w-[100%] top-16">
                        <CartTemplate/>
                     </div>
                     <div>
                        {items.map((ele, index) => (
                           <CartItem key={index} data={ele} setAmount = {totalAmount => setTotalamount(totalAmount)} />
                        ))}
                     </div>
                  </div>
               </div>
            )}
        </div>
    );
};

export default CartBody;
