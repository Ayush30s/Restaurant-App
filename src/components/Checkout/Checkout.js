import React from "react";
import Address from "./Address";
import Policy from "./Policy";
import CartBody from "./CartBody";
import Payment from "./Payment";


const Checkout = () => {
   return (
      <div className=" bg-slate-400 w-[100%] flex  m-20">
         <div className="w-[65%]">
            <Address/>
            <Payment/>
         </div>
         <div className ="w-[35%]">
            <CartBody/>
            <Policy/>
         </div>
      </div>
   )
}

export default Checkout; 