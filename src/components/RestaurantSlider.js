import React from "react";
import { Link } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import CardWithLabel from "./RestaurantCard";
import { useState,useEffect } from "react";

const ResSlider = ({ resData }) => {

   let [topResArray, setTopResArray] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const LabelCard = CardWithLabel(RestaurantCard);

   const fetchData = async () => {
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.846251&lng=80.94902880&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();
      
      let newResArray = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setTopResArray(newResArray);
   }

  
   return (
      <div id="ResSlider" className=" my-8 mx-24 flex flex-col h-[40%] pt-5">
         <h1 className="text-2xl ml-2 mb-4 font-semibold">Famous Restaurants in Your City</h1>
         
         <div className="flex overflow-x-scroll touch-auto custom-scrollbar rounded-2xl snap-x">
            {topResArray?.map((restaurant) => (
               <Link key={restaurant?.info?.id} to={"/restaurants/" + restaurant?.info?.id}>
                  { 
                     restaurant?.info?.aggregatedDiscountInfoV3?.header ? (
                        <LabelCard resData = {restaurant}/>
                     ) : (
                        <RestaurantCard resData={restaurant}/>
                     )
                  }
               </Link>
            ))}
         </div>
      </div>
   );
   
};

export default ResSlider;
