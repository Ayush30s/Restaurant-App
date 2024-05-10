import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { clearCart } from "../../Redux/cartslice";
import { Link } from "react-router-dom";

const CartBody = () => {
   const items = useSelector((store) => store.cart.items);
   
   const [totalAmount, setTotalamount] = useState(0);
   
   useEffect(() => {
      let val = 0;
      for(let ele of items) {
         val += (ele.totalPrice !== undefined ? Math.round(ele.totalPrice) :  Math.round(ele.price / 100));
      }
      setTotalamount(val);
   }, [items]);

   const dispatch = useDispatch();

   const handleClearCart = () => {
      dispatch(clearCart());
   };

   return ( 
        <div className="h-full font-appFont">
            {items.length === 0 ? (
               <div className="w-[40%] relative top-[100px] left-[35%]">
                  <div className="mx-12">
                     <i className="text-gray-800 text-4xl">Cart is Empty !</i><span className="text-5xl">🛒</span>
                  </div>
                  <div className="mx-8 my-3">
                     <i>Ghrelin, the "hunger hormone," signals hunger.</i>
                  </div>
                  <div className="pb-10 pt-5 mx-20"> 
                     <Link to="/">
                        <button className="rounded-3xl m-2 px-3 py-1 bg-sky-300 text-gray-800 text-lg shadow-xl border border-orange-500 hover:bg-orange-200 active:bg-white active:text-orange-500">Browse Restaurants</button>
                     </Link>
                  </div>
               </div>
            ) : (
               
               <div className="w-[100%] mt-[10px] overflow-hidden pb-10">
                  {items.map((ele, index) => (
                     <CartItem key={index} data={ele} setAmount = {(totalAmount) => setTotalamount(totalAmount)} />
                  ))}
                  <div className="flex flex-row ml-16 overflow-hidden">
                     <div className="flex flex-col w-[40%]">
                        <div>
                           <h1 className="font-bold text-xl my-5">CART AMOUNT</h1>
                           <div className="flex flex-row justify-between my-2">
                              <h1 className="text-sm">SubTotal</h1>
                              <h1 className="text-sm">₹{totalAmount.toFixed(2)}</h1>
                           </div>
                           <hr/>
                           <div className="flex flex-row justify-between my-2">
                              <h1 className="text-sm">Delivery Charge</h1>
                              <h1 className="text-sm">₹50.00</h1>
                           </div>
                           <hr/>
                           <div className="flex flex-row justify-between my-2">
                              <h1 className="text-sm">Grand Total</h1>
                              <h1 className="text-sm">₹{(Number(totalAmount.toFixed(2)) + Number(50)).toFixed(2)}</h1> 
                           </div>
                           <hr/>
                        </div>
                     </div>
                     <div className="ml-28 w-[50%] flex flex-col justify-between">
                        <div className="flex flex-col justify-between w-[80%] mt-10">
                           <h1 className="ml-20 text-sm">
                              Enter the Coupon code :
                           </h1>
                           <div className="ml-20 w-[100%] flex flex-row">
                              <input className="p-2 w-[100%] bg-gray-100"/>
                              <button className="py-3 px-8 rounded-sm text-white font-thin text-xs bg-black">Submit</button>
                           </div>
                        </div>
                        <div className="flex ml-20 flex-row justify-between items-center mt-5 w-[80%]">
                           <button className=" bg-orange-600 rounded-sm py-3 px-10 text-white font-thin text-xs hover:bg-black hover:text-white"><Link to={"/cart/checkout"}>PROCEED TO CHECKOUT</Link></button>
                           <button className= "bg-orange-600 text-white text-xs py-3 px-5 rounded-sm hover:bg-black hover:text-white" onClick={handleClearCart}>
                              CLEAR CART
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )}
        </div>
    );
};

export default CartBody;
