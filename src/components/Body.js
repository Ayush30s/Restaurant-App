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

   const slideleftstring = "<----";
   const slideRightstring = "---->";
   
   if(!isloading) {
      return <BodyShimmer/>
   } else {
      return (
         <div className="overflow-y-hidden flex flex-col overflow-x-hidden justify-between">
            <BodyFirstSection/>
            <div className = "flex flex-row justify-evenly items-center">
               <h1 className = "text-3xl font-bold">{slideleftstring}</h1>
               <h1 className = "text-3xl font-bold">{slideRightstring}</h1>
            </div>
            
            <ResSlider resData={listofRestaurants}/>
            <div className = "flex flex-row justify-evenly items-center">
               <h1 className = "text-3xl font-bold">{slideleftstring}</h1>
               <h1 className = "text-3xl font-bold">{slideRightstring}</h1>
            </div>
            
            {listofRestaurants.length > 0 ? 
            <>
               <div className='flex lg:glex-row md:flex-col  justify-center lg:ml-[102px] md:ml-16 align-middle w-[85%] rounded-lg mt-10'>
                  <div className="mt-1 md:ml-3">
                     <input type="text" className = "px-3 lg:py-1 md:py-4 md:text-4xl lg:text-lg rounded-3xl border bg-transparent border-black w-80 shadow-2xl focus:outline-none md:w-[77%]" placeholder="Search Food" onChange={(event) => {
                        setSearchText(event.target.value);
                     }}/>
      
                     {/* Search */}
                     <button className="mx-2 mt-2 lg:text-lg lg:p-1 md:text-4xl md:py-4 md:px-4 border shadow-lg border-black m-3 bg-black rounded-3xl cursor-pointer md:ml-6 lg:ml-5 md:w-[20%] text-white" onClick={() => {
                        let filterteredRestaurant = listofRestaurants?.filter(
                           (restaurant)=> restaurant.info.name.toLocaleLowerCase()?.includes(searchText.toLocaleLowerCase())
                        )
                        setfileterdRestaurantList(filterteredRestaurant);
                     }}>Search</button>
                  </div>
      
                  <div className = "flex flex-row md:flex-wrap justify-between">
                     <button id ="allres" className="border lg:text-sm lg:p-1 md:p-4 border-black m-3 md:text-4xl lg:px-2 rounded-3xl shadow-2xl hover:bg-black hover:text-white"
                        onClick={() => {
                           for(let fl of filters) {
                              document.getElementById(fl).classList.remove("bg-black", "text-white");
                              document.getElementById(fl).classList.add("bg-white", "text-black");
                           }
                           setfileterdRestaurantList(listofRestaurants);
                           setfilters([]);
                        }}
                     >All Restaurant</button>
         
                     <button id="fast" className="border lg:text-sm lg:p-1 md:p-4 border-black m-3 md:text-4xl lg:px-2 rounded-3xl shadow-2xl hover:bg-black hover:text-white"
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
         
                     <button id="avgRating" className="border lg:text-sm lg:p-1 md:p-4 border-black m-3 md:text-4xl lg:px-2 rounded-3xl shadow-2xl hover:bg-black hover:text-white"
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
         
                     <button id="costForTwo" className="border lg:text-sm lg:p-1 md:p-4 border-black m-3 md:text-4xl lg:px-2 rounded-3xl shadow-2xl hover:bg-black hover:text-white"
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
               </div>
               
               <div id = "body" className= ' flex flex-wrap justify-center md:ml-4 lg:ml-[104px] align-middle lg:w-[85%] md:w-[100%] rounded-lg mt-10'>
                  {fileterdRestaurantList?.length == 0 ? <div className="my-10 text-center font-bold md:text-4xl lg:text-2xl">No Restaurant Found ¯\(°_o)/¯</div>  
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