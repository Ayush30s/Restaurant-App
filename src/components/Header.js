import React from "react";
import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
   let [btnName, setBtnName] = useState("Login");
 
   //to connect the store and the cart or to subscribe we use useSelector hook
   const cart = useSelector((store) => store.cart.items);

    
   return (
      <> 
         <div className="sticky top-0 flex justify-between bg-white w-[100%] align-middle  text-black z-10 shadow-black drop-shadow-lg">
            <div>
               <img className="w-14 m-1 mx-2 rounded-xl" src = {LOGO_URL} alt='ResturantLogo'/>
            </div>

            <div className="flex flex-row justify-between items-center">
               <ul className="flex p-2 m-2">

                  {/* <li className="px-3 font-bold font-mono"> Inertnet Staus : {onlinestat ? <span className="bg-green-500 text-white p-1 rounded-lg">Online</span>: <span className="bg-red-500 text-white p-1 rounded-lg">Offline</span>} </li> */}

                  <Link to={"/"}><li className="px-3 py-1 font-bold hover:text-orange-500   font-mono  hover:shadow-lg rounded-lg">Home</li></Link>

                  {/* Never use anchor tag to move to another rote or page this will
                  make the whole page to reload every time you go to that page */}

                  <Link to={"/grocery"}><li className="px-3 py-1 font-bold hover:text-orange-500   font-mono  hover:shadow-lg rounded-lg">Groceryy Mart</li></Link>

                  {/* <Link></Link> is a component from "react-router-dom" that helps us to move to routes or pages without 
                  relodaing the whole page, alike anchor tag it just loads the part of the page to which we want to move */}

                  <Link to ={"/cart"}><li className="px-3 py-1 font-bold hover:text-orange-500   font-mono  hover:shadow-lg rounded-lg">🛒({cart.length})</li></Link>

                  <button className="w-20 p-2 py-1 ml-4 mb-2 font-bold font-mono rounded-3xl border border-black bg-white hover:shadow-lg text-black" onClick={() => { 
                     if(btnName === "Login") {
                        setBtnName("Logout");
                     } else {
                        setBtnName("Login");
                     }
                  }}>{btnName}</button>
               </ul>
            </div>
         </div>
      </>
      
   )
}

export default Header;