import React from "react";
import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useInternetStatus from "../utils/OnlineStatus";

const Header = () => {

   let [searchPlace, setsearchPlace] = useState(false); 
   let [btnName, setBtnName] = useState("Login");
   let [about, setabout] = useState(false);
   const onlinestat = useInternetStatus();


   if(searchPlace == true) {
      const body = document.querySelector('body');
      const searchdiv = document.createElement("div");
      const closeButton = document.createElement("button");
      const inputarea = document.createElement("input");

      searchdiv.className = "searchdiv";
      searchdiv.classList.add("fixed", "w-2/3" ,"h-2/3", "top-40", "left-56", "inset-10", "bg-slate-300", "rounded-xl", "flex" , "flex-col", "justify-between", "items-center");
      closeButton.classList.add("m-4", "p-1", "border", "border-black", "rounded-2xl", "bg-white");
      inputarea.classList.add("px-4","border", "border-black", "py-2", "m-4", "w-96", "rounded-2xl" , "bg-white");
      inputarea.placeholder = "Enter The Location";
      closeButton.textContent = "Cut";
       
      searchdiv.appendChild(inputarea);
      searchdiv.appendChild(closeButton);

      closeButton.onclick = () => {
         setsearchPlace(false);
         document.querySelector(".searchdiv").remove();
      };

      body.append(searchdiv);
   }
   
   return (
      <>
         <div className="bg-white flex justify-between w-[95%] align-middle rounded-lg text-black fixed left-7 z-10 shadow-black drop-shadow-lg">
            <div>
               <img className="w-28 m-2 rounded-xl" src = {LOGO_URL} alt='ResturantLogo'/>
            </div>

            <div className="flex items-center">
               <ul className="flex p-2 m-4">
                  <li><button className="flex pl-12 py-1 border mr-10 rounded-3xl bg-black font-bold w-56 text-white" onClick={()=> {
                     if(searchPlace === false) {
                        setsearchPlace(true)
                     }
                  }}>Change Location</button></li>

                  {/* <li className="px-3 font-bold font-mono"> Inertnet Staus : {onlinestat ? "✅" : "📴"} </li> */}

                  <Link to={"/"}><li className="px-3 font-bold hover:py-1  font-mono  hover:shadow-lg rounded-lg">Home</li></Link>

                  {/* Never use anchor tag to move to another rote or page this will
                  make the whole page to reload every time you go to that page */}
                  {/* <li><a href={"/about"}>About Us</a></li> */}
                  <Link to={"/about"}><li id="about" className="px-3 font-bold hover:py-1 font-mono  hover:shadow-lg rounded-lg">About Us</li></Link>

                  <Link to={"/grocery"}><li className="px-3 font-bold hover:py-1 font-mono  hover:shadow-lg rounded-lg">Grocery Mart</li></Link>

                  {/* <Link></Link> is a component from "react-router-dom" that helps us to move to routes or pages without 
                  relodaing the whole page, alike anchor tag it just loads the part of the page to which we want to move */}
                  <Link to={"/contact"}><li className="px-3 font-bold hover:py-1 font-mono  hover:shadow-lg rounded-lg">Contact</li></Link>

                  <button className="w-20 px-3 ml-4 mb-3 font-bold font-mono rounded-3xl bg-black hover:shadow-lg py-1 text-white" onClick={() => { 
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