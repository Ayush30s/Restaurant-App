import React from "react";
import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

   let [searchPlace, setsearchPlace] = useState(false); 
   let [btnName, setBtnName] = useState("Login");
 
   //to connect the store and the cart or to subscribe we use useSelector hook
   const cart = useSelector((store) => store.cart.items);
   const handleSerachPlace = () => {
      setsearchPlace(!searchPlace);
   }

   return (
      <>  
         {searchPlace && 
            <div id="header-id" className="fixed z-30 h-[100%] w-96 backdrop-blur-lg flex flex-col justify-between">
               <input placeholder="Enter location" className="text-sm w-[95%] p-2 m-4 bg-black text-white"/>
            
               <div className="flex justify-evenly">
                  <button className="px-2 w-[23%] py-1 rounded-2xl text-sm bg-black text-white m-1" onClick={() => {
                     handleSerachPlace();
                  }}>close</button> 
                  <button className="px-2 w-[23%] py-1 rounded-2xl  text-sm bg-black text-white m-1">Submit</button>
               </div>
            </div>
            }
   
         <div className="sticky top-0 flex justify-between bg-white w-[100%] align-middle  text-black z-10 shadow-black drop-shadow-lg">
            <div>
               <img className="w-14 m-1 mx-2 rounded-xl" src = {LOGO_URL} alt='ResturantLogo'/>
            </div>

            <div className="flex items-center">
               <ul className="flex p-2 m-2">
                  <li><button className="py-1 border border-10 border-black mr-10 rounded-3xl text-center bg-white font-bold w-[500px] text-black" onClick={()=> {
                     if(searchPlace === false) {
                        handleSerachPlace(!searchPlace);
                     }
                  }}>Change Location</button></li>

                  {/* <li className="px-3 font-bold font-mono"> Inertnet Staus : {onlinestat ? <span className="bg-green-500 text-white p-1 rounded-lg">Online</span>: <span className="bg-red-500 text-white p-1 rounded-lg">Offline</span>} </li> */}

                  <Link to={"/"}><li className="px-3 font-bold hover:py-1  font-mono  hover:shadow-lg rounded-lg">🏠</li></Link>

                  {/* Never use anchor tag to move to another rote or page this will
                  make the whole page to reload every time you go to that page */}

                  <Link to={"/grocery"}><li className="px-3 font-bold hover:py-1 font-mono  hover:shadow-lg rounded-lg">Groceryy Mart</li></Link>

                  {/* <Link></Link> is a component from "react-router-dom" that helps us to move to routes or pages without 
                  relodaing the whole page, alike anchor tag it just loads the part of the page to which we want to move */}

                  <Link to ={"/cart"}><li className="px-3 font-bold hover:py-1 font-mono  hover:shadow-lg rounded-lg">🛒({cart.length})</li></Link>

                  <button className="w-20 px-3 ml-4 mb-2 font-bold font-mono rounded-3xl bg-black hover:shadow-lg py-1 text-white" onClick={() => { 
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