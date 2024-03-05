import MenuDishCard from "./MenuDishCard";
import { CDN_URL } from "../utils/constants";
import { json, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MENU__API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import SubItems from "./SubItems";

const RestaurantMenu = () => {
   const resIdObj = useParams();
   const { resId } = resIdObj;

   const [menuList, setMenuList] = useState([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const data = await fetch(MENU__API + resId);
      const json = await data.json();
   
      setMenuList(json);
   }

   console.log(menuList);

   const name = menuList?.data?.cards[0]?.card?.card?.text;
   const avgRating = menuList?.data?.cards[2]?.card?.card?.info?.avgRating;
   const cuisines = menuList?.data?.cards[2]?.card?.card?.info?.cuisines.join(',');
   const areaname = menuList?.data?.cards[2]?.card?.card?.info?.areaName;
   const totalRating = menuList?.data?.cards[2]?.card?.card?.info?.totalRatings;
   const deliveryTime =  menuList?.data?.cards[2]?.card?.card?.info?.sla?.deliveryTime;
   const lastMileTravelString =  menuList?.data?.cards[2]?.card?.card?.info?.sla?.lastMileTravelString;
   const deliveryCharge =  menuList?.data?.cards[2]?.card?.card?.info?.expectationNotifiers[0]?.enrichedText;
   
   

   
   return (
      <div className="menu">
         <h1>{name}</h1>
         <div>{avgRating}</div>
         <div>
            <p>{cuisines}</p>
            <p>{areaname}</p>
         </div>
         <div>{totalRating/1000}k+</div>
         <div>{deliveryTime}</div>
         <div>{lastMileTravelString}</div>
         <div>{deliveryCharge}</div>
         
      </div>
   );
}

export default RestaurantMenu;