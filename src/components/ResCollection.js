import React from "react";
import { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import { Link } from "react-router-dom";
import CardWithLabel from "./RestaurantCard";

const FoodTypeRestaurant = () => {

   const foodId = useParams();

   const [RestaurantCollection, setRestaurantCollection] = useState([]);

   const fetchData = async() => {
      const ResCollection = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.7586175&lng=80.9141368&collection=" + `${foodId.foodId}` + "&tags=layout_CCS_NorthIndian&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
      const json = await ResCollection.json();
      setRestaurantCollection(json);
   }  

   const LabelCard = CardWithLabel(RestaurantCard);

   useEffect(() => {
      fetchData();
   },[])

   const title = RestaurantCollection?.data?.cards[0]?.card?.card?.title;
   const description = RestaurantCollection?.data?.cards[0]?.card?.card?.description;

   
   const resArray = RestaurantCollection?.data?.cards;

   return (
      <div className=" w-full h-full">
         <div className="my-32 mx-10">

            <h1 className="font-bold text-4xl my-2">{title}</h1>
            <h1 className="text-gray-500">{description}</h1>

            <div className="flex flex-wrap">
               {resArray?.map((ele) => {
                  if(ele.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant") {
                     return <Link to = {"/restaurants/" + ele?.card?.card?.info?.id}>
                        <RestaurantCard resData={ele.card.card}/>
                     </Link>
                  }
               })}
            </div>

         </div>
      </div>
   )
}

export default FoodTypeRestaurant;