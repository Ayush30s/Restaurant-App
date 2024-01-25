import React from "react";
import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {

   let [btnName, setBtnName] = useState("Login");

   return (
      <div className='header'>
         <div className='logoContainer'>
            <img className='logo' src = {LOGO_URL} alt='ResturantLogo'/>
         </div>
         <div className='nav-items'>
            <ul>
               <li><Link to={"/"}>Home</Link></li>

               {/* Never use anchor tag to move to another rote or page this will
                make the whole page to reload every time you go to that page */}
               {/* <li><a href={"/about"}>About Us</a></li> */}
               <li><Link to={"/about"}>About Us</Link></li>

               {/* <Link></Link> is a component from "react-router-dom" that helps us to move to routes or pages without 
               relodaing the whole page, alike anchor tag it just loads the part of the page to which we want to move */}
               <li><Link to={"/contact"}>Contact</Link></li>

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