import React from "react";
import { useEffect, useState } from "react";
import { FIRST_PAGE } from "../utils/constants"; 
import MiniCards from "./MiniCards"
import { Link } from "react-router-dom";
import BodyFirstSectionShimmer from "../Shimmer/BodyFirstSecShimmer"; 

const BodyFirstSection = () => {

   const [myMindFood, setmyMindFood] = useState([]);
   let [isloading, setIsLoading] = useState(false);

   useEffect(() => {
      fetchData({FIRST_PAGE});
   }, []);

   const fetchData = async () => {
      const data = await fetch(FIRST_PAGE);
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