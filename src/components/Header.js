import React from "react";
import { useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {

   let [btnName, setBtnName] = useState("Login");

   return (
      <div className='header'>
         <div className='logoContainer'>
            <img className='logo' src = {LOGO_URL} alt='ResturantLogo'/>
         </div>
         <div className='nav-items'>
            <ul>
               <li>Home</li>
               <li>About Us</li>
               <li>Contact Us</li>
               <li>Cart</li>
               <button className="Login-button" onClick={() => {
                  if(btnName === "Login") {
                     setBtnName("Logout");
                  } else {
                     setBtnName("Login");
                  }
               }}>{btnName}</button>
            </ul>
         </div>
      </div>
   )
}

export default Header;