import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import ResSlider from "./RestaurantSlider";
import BodyFirstSection from "./BodyFirstSection";
import CardWithLabel from "./RestaurantCard";
import useInternetStatus from "../utils/OnlineStatus";
import BodyShimmer from "../Shimmer/bodyshimmer";

const Body = () => {
   
   //local state varaible- whenever a state variable updates react re-render the components (react triggers a reconciliation cycle)
   let [listofRestaurants, setListofRestaurant] = useState([]);
   let [fileterdRestaurantList, setfileterdRestaurantList] = useState([]);
   let [searchText, setSearchText] = useState("");
   let [filters, setfilters] = useState([]);
   let [isloading, setIsLoading] = useState(false);

   useEffect(() => {
      fetchData(); 
   }, []);

   const fetchData = async () => {     
      const data = await fetch('https://backendfood-app.onrender.com/api/restaurants?lat=26.7586175&lng=80.9141368');
      const json = await data.json();
      let newResArray = json.data?.cards[2]?.card?.card?.gridElements ? json.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants : json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      
      setListofRestaurant(newResArray);
      setfileterdRestaurantList(newResArray);
      setIsLoading(true);
   }

   
   const LabelCard = CardWithLabel(RestaurantCard);

   useEffect(() => {
      ApplyFilterOnList(filters);
   }, [filters]);

   const ApplyFilterOnList = (filters) => {
      let filteredList = listofRestaurants;

      for (let filterKey of filters) {
         if (filterKey === "costForTwo") {
            filteredList = filteredList.filter(
               (res) => parseInt(res.info.costForTwo.substring(1, 4)) <= 300
            );
         } else if (filterKey === "avgRating") {
            filteredList = filteredList.filter(
               (res) => Math.ceil(res.info.avgRating) >= 4.5
            );
         } else if(filterKey === "fast") {
            filteredList = filteredList.filter(
               (res) => parseFloat(res?.info?.sla?.deliveryTime) <= 20
            );
         }
      }
      setfileterdRestaurantList(filteredList);
   };

   const onlinestat = useInternetStatus();
   
   if(onlinestat === false) {
      return (
         <h1>Check your internet conection!<br/> You are Offline!</h1>
      );
   }
   
   if(!isloading) {
      return <BodyShimmer/>
   } else {
      return (
         <div className=" overflow-y-hidden overflow-x-hidden flex flex-col justify-center">
            <BodyFirstSection/>
            
            <ResSlider resData={listofRestaurants}/>
            {listofRestaurants.length > 0 ? <>
               <div className='flex justify-center ml-[102px] align-middle w-[85%] rounded-lg mt-10'>
                  <div className="mt-1">
                     <input type="text" className = "px-3 rounded-3xl border bg-transparent border-black w-80 shadow-2xl focus:outline-none " placeholder="Search Food" onChange={(event) => {
                        setSearchText(event.target.value);
                     }}/>
      
                     {/* Search */}
                     <button className="mx-2 mt-2 border shadow-lg border-black px-2 m-3 bg-black rounded-3xl cursor-pointer text-white" onClick={() => {
                        let filterteredRestaurant = listofRestaurants?.filter(
                           (restaurant)=> restaurant.info.name.toLocaleLowerCase()?.includes(searchText.toLocaleLowerCase())
                        )
                        setfileterdRestaurantList(filterteredRestaurant);
                     }}>Search</button>
                  </div>
      
                  <button id ="allres" className="border  border-black px-2 m-3 rounded-3xl active:bg-black active:text-white shadow-2xl"
                     onClick={() => {
                        for(let fl of filters) {
                           document.getElementById(fl).classList.remove("bg-black", "text-white");
                           document.getElementById(fl).classList.add("bg-white", "text-black");
                        }
                        setfileterdRestaurantList(listofRestaurants);
                        setfilters([]);
                     }}
                  >All Restaurant</button>
      
                  <button id="fast" className="border border-black m-3 px-2 rounded-3xl shadow-2xl"
                     onClick={() => {
                        if(document.getElementById("fast").classList.contains("bg-black", "text-white")) {
                           document.getElementById("fast").classList.remove("bg-black", "text-white");
                           document.getElementById("fast").classList.add("bg-white", "text-black");
                        } else {
                           document.getElementById("fast").classList.remove("bg-white" , "text-black");
                           document.getElementById("fast").classList.add("bg-black" , "text-white");
                        }
      
                        if (filters.includes("fast")) {
                           setfilters(filters.filter(filter => filter !== "fast"));
                        } else {
                           setfilters([...filters, "fast"]);
                        }
                     }}
                  >Fast Delivery</button>
      
                  <button id="avgRating" className="border border-black m-3 px-2 rounded-3xl shadow-2xl"
                     onClick={() => {
                        if(document.getElementById("avgRating").classList.contains("bg-black", "text-white")) {
                           document.getElementById("avgRating").classList.remove("bg-black", "text-white");
                           document.getElementById("avgRating").classList.add("bg-white", "text-black");
                        } else {
                           document.getElementById("avgRating").classList.remove("bg-white" , "text-black");
                           document.getElementById("avgRating").classList.add("bg-black" , "text-white");
                        }
      
                        if (filters.includes("avgRating")) {
                           setfilters(filters.filter(filter => filter !== "avgRating"));
                        } else {
                           setfilters([...filters, "avgRating"]);
                        }
                     }}
                  >4+ rated</button>
      
                  <button id="costForTwo" className="border shadow-2xl border-black m-3 px-2 rounded-3xl hover:shadow-2xl"
                     onClick={() => {
                        if(document.getElementById("costForTwo").classList.contains("bg-black", "text-white")) {
                           document.getElementById("costForTwo").classList.remove("bg-black", "text-white");
                           document.getElementById("costForTwo").classList.add("bg-white", "text-black");
                        } else {
                           document.getElementById("costForTwo").classList.remove("bg-white", "text-black");
                           document.getElementById("costForTwo").classList.add("bg-black", "text-white");
                        }
      
      
                        if (filters.includes("costForTwo")) {
                           setfilters(filters.filter(filter => filter !== "costForTwo"));
                        } else {
                           setfilters([...filters, "costForTwo"]);
                        }
                     }}
                  >Less than 300</button>
               </div>
               
               <div id = "body" className= ' text-black my-10 ml-[8%] flex flex-wrap  w-[85%] h-full'>
                  {fileterdRestaurantList?.length == 0 ? <h1 className="my-10 mx-72 font-bold text-2xl">No Restaurant Found ¯\(°_o)/¯</h1>  
                     : 
                     fileterdRestaurantList?.map((restaurant) => (
                        <Link key = {restaurant?.info?.id} to = {"/restaurants/" + restaurant?.info?.id}>
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
            </> : <h1 className="absolute top-[140%] h-[200px] left-[35%] mb-20">FOR KNOW , API DATA IS NOT PRESENT FOR THIS SECTION</h1>}
         </div>
      ) 
   }
}

export default Body;