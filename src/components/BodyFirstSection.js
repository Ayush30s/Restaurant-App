import React from "react";
import { useEffect, useState } from "react";
import MiniCards from "./MiniCards"
import { Link } from "react-router-dom";
import BodyFirstSectionShimmer from "../Shimmer/BodyFirstSecShimmer"; 

const BodyFirstSection = () => {

   const [myMindFood, setmyMindFood] = useState([]);
   let [isloading, setIsLoading] = useState(false);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const data = await fetch(`https://backendfood-app.onrender.com/api/restaurants/bodyfirstpart?lat=26.7586175&lng=80.9141368`);
      const json = await data.json();
      let newarray = json?.data?.cards[0]?.card?.card?.imageGridCards?.info;
      
      setmyMindFood(newarray);
      setIsLoading(true);
   }

   const foodId = 0;

   if(!isloading) {
      return <BodyFirstSectionShimmer/> 
   } else { 
      return (
         <div className=" mx-24 my-5 h-full flex flex-row touch-auto snap-x overflow-x-scroll custom-scrollbar">
            {myMindFood?.map((food,index) => (
               <Link key={index} to={"/food/collection/id=/" + food.action.link.match(/\d+/g).map(Number)[0] + "/restaurants"}><MiniCards foodData = {food}/></Link>
            ))}
         </div>
      )
   }
}

export default BodyFirstSection;