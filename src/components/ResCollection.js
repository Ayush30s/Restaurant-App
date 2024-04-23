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
      const ResCollection = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.7586175&lng=80.9141368&collection=" + `${foodId.foodId}` + "&tags=layout_CCS_NorthIndian&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
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
         <div className="w-full h-full p-5">
            <div className=" mx-10">
   
               <div className="m-5">
                  <h1 className="font-semibold text-4xl">{title}</h1>
                  <i className="text-gray-700">{description}</i>
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