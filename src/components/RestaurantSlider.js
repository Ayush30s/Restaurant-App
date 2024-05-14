import React from "react";
import { Link } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import CardWithLabel from "./RestaurantCard";
import { useState,useEffect } from "react";
import BodyScrollSectionShimmer from "../Shimmer/BodyScrollSectionshimmer";

const ResSlider = ({ resData }) => {

   let [topResArray, setTopResArray] = useState([]);
   let [isloading, setIsLoading] = useState(false);

   useEffect(() => {
      fetchData();
   }, []);

   const LabelCard = CardWithLabel(RestaurantCard);

   const fetchData = async () => {
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.846251&lng=80.94902880&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();
      let newResArray = json.data.cards[2]?.card?.card?.gridElements ? json.data.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants : json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      
      setTopResArray(newResArray);
      setIsLoading(true);
   }

   if(topResArray == undefined) {
      return <h1 className="text-lg absolute top-[80%] left-[40%]">API DATA IS NOT PRESENT AT THIS TIME</h1>
   }

   if(!isloading) {
      return <BodyScrollSectionShimmer/>
   } else {
      return ( 
         <div id="ResSlider" className=" mt-8 mx-24 flex flex-col h-[400px] pt-5">
            <h1 className="text-2xl mb-4 font-semibold">Famous Restaurants in Your City</h1>
            
            <div className="flex overflow-x-scroll touch-auto custom-scrollbar p-2 rounded-2xl snap-x">
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
   }
};

export default ResSlider;
