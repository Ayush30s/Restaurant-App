import React from "react";
import { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import { Link } from "react-router-dom";
import CardWithLabel from "./RestaurantCard";
import BodyShimmer from "../Shimmer/bodyshimmer";

const FoodTypeRestaurant = () => {
   const foodId = useParams();

   const [RestaurantCollection, setRestaurantCollection] = useState([]);
   let [isloading, setIsLoading] = useState(false);

   const fetchData = async() => {
      //correct
      const ResCollection = await fetch(`https://backendfood-app.onrender.com/api/restaurants/Foodtype/resCollcetion?lat=26.7586175&lng=80.9141368&foodId=${foodId.foodId}`);
      const json = await ResCollection.json();
      setRestaurantCollection(json);
      setIsLoading(true);
   }  

   const LabelCard = CardWithLabel(RestaurantCard);

   useEffect(() => {
      fetchData();
   },[])

   const title = RestaurantCollection?.data?.cards[0]?.card?.card?.title;
   const description = RestaurantCollection?.data?.cards[0]?.card?.card?.description;
   const resArray = RestaurantCollection?.data?.cards;
   
   if(!isloading) {
      return <BodyShimmer/>
   } else {
      return (
         <div className="w-full h-full">    
            <div className = "lg:mx-20 md:mx-4 my-4">
               <div className="lg:mx-3 md:mx-1 my-5">
                  <h1 className="font-semibold lg:text-4xl md:text-[80px]">{title}</h1>
                  <h1 className="text-gray-700 lg:text-lg md:text-[40px]">{description}</h1>
               </div>

               <div className="flex flex-wrap"> 
                  {resArray?.map((ele) => {
                     if(ele.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant") {
                        return <Link to = {"/restaurants/" + ele?.card?.card?.info?.id}>
                           { 
                              ele.card.card?.info?.aggregatedDiscountInfoV3?.header ? (
                                 <LabelCard resData = {ele.card.card}/>
                              ) : (
                                 <RestaurantCard resData={ele.card.card}/>
                              )
                           }
                        </Link>
                     }
                  })}
               </div>
            </div>
         </div>
      )
   }
}

export default FoodTypeRestaurant;