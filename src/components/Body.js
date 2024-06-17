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
         <div className="overflow-y-hidden flex flex-col overflow-x-hidden justify-between">
            <BodyFirstSection/>
            
            {window.innerWidth/2 < 550 ? <div className = " text-lg text-gray-500 text-center">
               swipe left and right
            </div> : null}
            
            <ResSlider resData={listofRestaurants}/>
            
            {window.innerWidth/2 < 550 ? <div className = " text-lg text-gray-500 text-center">
               swipe left and right
            </div> : null}
            
            {listofRestaurants?.length > 0 ? 
            <div className="lg:flex lg:flex-col justify-between items-center lg:mx-24">
               <div className='flex lg:flex-row md:flex-col justify-center md:ml-8 align-middle md:w-[100%] rounded-lg mt-10 lg:ml-40'>
                  <div className="mt-2 md:ml-3 lg:w-[40%]">
                     <input type="text" className = " lg:p-1 md:py-4 md:px-2 md:text-4xl lg:text-sm rounded-lg border bg-transparent border-black shadow-2xl focus:outline-none w-[70%]" placeholder="Search Food" onChange={(event) => {
                        setSearchText(event.target.value);
                     }}/>  
      
                     {/* Search */}
                     <button  className="bg-white m-1 text-black rounded-3xl ml-1 md:text-4xl lg:text-sm lg:py-1 lg:px-2 border border-black md:p-4 hover:bg-black hover:text-white" onClick={() => {
                        let filterteredRestaurant = undefined;
                        filterteredRestaurant = listofRestaurants?.filter(
                           (restaurant)=> restaurant.info.name.toLocaleLowerCase()?.includes(searchText.toLocaleLowerCase())
                        )
                        setfileterdRestaurantList(filterteredRestaurant);

                        let filterteredRestaurant2 = undefined;
                        filterteredRestaurant2 = listofRestaurants?.filter(
                           (restaurant)=> {
                              return restaurant.info.cuisines.indexOf(searchText) !== -1 ? restaurant.info.cuisines[restaurant.info.cuisines.indexOf(searchText)] : undefined;
                           }
                        )
                        filterteredRestaurant.length !== 0 ? setfileterdRestaurantList(filterteredRestaurant)
                        : setfileterdRestaurantList(filterteredRestaurant2);
                     }}>Search</button>
                  </div>
      
                  <div className = "md:m-2 lg:w-[60%]">
                     <button id ="allres" className="bg-white m-1 text-black rounded-3xl ml-1 md:text-4xl lg:text-sm lg:py-1 lg:px-2 border border-black md:p-4 hover:bg-black hover:text-white"
                        onClick={() => {
                           for(let fl of filters) {
                              document.getElementById(fl).classList.remove("bg-black", "text-white");
                              document.getElementById(fl).classList.add("bg-white", "text-black");
                           }
                           setfileterdRestaurantList(listofRestaurants);
                           setfilters([]);
                        }}
                     >All Restaurant</button>
         
                     <button id="fast"  className="bg-white m-1 text-black rounded-3xl ml-1 md:text-4xl lg:text-sm lg:py-1 lg:px-2 border border-black md:p-4 hover:bg-black hover:text-white"
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
         
                     <button id="avgRating"  className="bg-white m-1 text-black rounded-3xl ml-1 md:text-4xl lg:text-sm lg:py-1 lg:px-2 border border-black md:p-4 hover:bg-black hover:text-white"
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
         
                     <button id="costForTwo"  className="bg-white m-1 text-black rounded-3xl ml-1 md:text-4xl lg:text-sm lg:py-1 lg:px-2 border border-black md:p-4 hover:bg-black hover:text-white"
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
               
               <div id = "body" className= ' flex flex-wrap justify-center items-center md:ml-4 align-middle  md:w-[100%] rounded-lg mt-10'>
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
            </div> : <h1 className="absolute top-[140%] h-[200px] left-[35%] mb-20">FOR KNOW , API DATA IS NOT PRESENT FOR THIS SECTION</h1>}
         </div>
      ) 
   }
}

export default Body;