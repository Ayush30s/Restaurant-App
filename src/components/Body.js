import React from "react"
import Shimmer from "./Shimmer";
import { RestaurantCard } from "./RestaurantCard";
import { useState, useEffect } from "react"



const Body = () => {

   //local state varaible-  whenever a state variable updates react re-render the components
   let [listofRestaurants, setListofRestaurant] = useState([]);
   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();
      const newResArray = json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setListofRestaurant(newResArray);
   }

   //conditinal rendering
   if(listofRestaurants.length === 0) {
      return (
         <Shimmer />
      )
   }
 
   return (
      <div className='body'>
         <div className='Filter'>
            <button className="filter-btn"
               onClick={() => {
                  const filteredList = listofRestaurants.filter (  
                     (res) => parseFloat(res?.info?.avgRating) > 4.3
                  )
                  setListofRestaurant(filteredList);
               }}
            >
               Top Rated Restaurant
            </button>
         </div>
         <div className='ResturantConatiner'>
            {listofRestaurants != [] && listofRestaurants?.map((restaurant) => (
               <RestaurantCard key = {restaurant?.info?.id} resData = {restaurant}/>
            ))}
         </div>
      </div>
   ) 
}

export default Body;