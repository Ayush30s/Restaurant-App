import React from "react";
import { useEffect, useState } from "react";
import { FIRST_PAGE } from "../utils/constants";
import MiniCards from "./MiniCards"

const BodyFirstSection = () => {

   const [myMindFood, setmyMindFood] = useState([]);

   useEffect(() => {
      fetchData({FIRST_PAGE});
   }, []);

   const fetchData = async () => {
      const data = await fetch(FIRST_PAGE);
      const json = await data.json();
      let newarray = json?.data?.cards[0]?.card?.card?.imageGridCards?.info;
      setmyMindFood(newarray);
   }

   let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
   };

   return (
      <div className="w-full h-full bg-slate-500">
         {myMindFood?.map((food) => (
            <MiniCards foodData = {food}/>
         ))}
      </div>
   )
}

export default BodyFirstSection;