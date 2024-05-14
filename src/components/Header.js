import React from "react";
import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

   let [searchPlace, setsearchPlace] = useState(false); 
   let [btnName, setBtnName] = useState("Login");
   let [placeObj, setPlaceObj] = useState([]);
 
   //to connect the store and the cart or to subscribe we use useSelector hook
   const cart = useSelector((store) => store.cart.items);
   const handleSerachPlace = () => {
      setsearchPlace(!searchPlace);
   }

   const fetchData = async () => {
      const url = 'https://atlas.mapmyindia.com/api/places/geocode?address=jaun&itemCount=10';
      const token = '3f501027-aae8-4e2c-b899-f49c26e049ea';
    
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
    
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(responseData); // Log the response data
        // Handle the response data as needed in your app
      } catch (error) {
        console.error('Error:', error);
      }
   };
    
   return (
      <>  
         {searchPlace && 
            <div id="header-id" className="lg:bg-red-500 border border-black fixed z-20 h-[100%] w-[30%]  flex flex-col justify-between">
               <input placeholder="Enter location" className="w-[100%] p-3 bg-black text-white" onChange={() => {
                  fetchData(); 
               }}/>
            
               <div className="flex justify-between">
                  <button className="px-2 w-[23%] py-1 rounded-2xl text-sm bg-black text-white m-2" onClick={() => {
                     handleSerachPlace();
                  }}>close</button> 
                  <button className="px-2 w-[23%] py-1 rounded-2xl  text-sm bg-black text-white m-2">Submit</button>
               </div>
            </div>
         }
   
         <div className="sticky top-0 flex justify-between bg-white w-[100%] align-middle  text-black z-10 shadow-black drop-shadow-lg">
            <div>
               <img className="w-14 m-1 mx-2 rounded-xl" src = {LOGO_URL} alt='ResturantLogo'/>
            </div>

            <div className="flex flex-row justify-between items-center">
               <ul className="flex p-2 m-2">
                  <li><button className="py-1 border border-10 border-black mr-10 rounded-3xl text-center bg-white font-bold w-[500px] text-black" onClick={()=> {
                     if(searchPlace === false) {
                        handleSerachPlace(!searchPlace);
                     }
                  }}>Change Location</button></li>

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