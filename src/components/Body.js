import React from "react"
// import Shimmer from "./Shimmer";
import { RestaurantCard } from "./RestaurantCard";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const Body = () => {

   //local state varaible-  whenever a state variable updates react re-render the components (react triggers a reconciliation cycle)
   let [listofRestaurants, setListofRestaurant] = useState([]);
   let [fileterdRestaurantList, setfileterdRestaurantList] = useState([]);
   let [searchText, setSearchText] = useState("");

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8466937&lng=80.94616599999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();
      const newResArray = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setListofRestaurant(newResArray);
      setfileterdRestaurantList(newResArray);
   }


   // //conditinal rendering
   // if(listofRestaurants.length === 0) {
   //    return (
   //       <Shimmer />
   //    )
   // }
 
   return (
      <div className='body'>
         <div className='Filter'>

            <div>
               <input type="text" className="serachBox" value = {searchText} onChange={(event) => {
                  setSearchText(event.target.value);
               }}/>

               <button onClick={() => {
                  let filterteredRestaurant = listofRestaurants.filter(
                     (restaurant)=> restaurant.info.name.toLocaleLowerCase()?.includes(searchText.toLocaleLowerCase())
                  )
                  setfileterdRestaurantList(filterteredRestaurant);
               }}>Search</button>

            </div>

            <button className="filter-btn"
               onClick={() => {
                  const filteredList = listofRestaurants.filter (  
                     (res) => parseFloat(res?.info?.avgRating) >= 4.5
                  )
                  setfileterdRestaurantList(filteredList);
               }}
            >
               Top Rated Restaurant
            </button>

         </div>
         <div className='ResturantConatiner'>
            {fileterdRestaurantList?.map((restaurant) => (
               <Link key = {restaurant?.info?.id} to = {"/restaurants/" + restaurant?.info?.id}><RestaurantCard resData = {restaurant}/></Link>
            ))}
         </div>
      </div>
   ) 
}

export default Body;