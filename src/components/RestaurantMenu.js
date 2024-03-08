import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MENU__API } from "../utils/constants";
import AboutRestaurant from "./Menu/AboutRestaurant";
import Offer from "./Menu/Offers";
import Categories from "./Menu/Categories";


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

      let newmenudata = json.data.cards;
      setMenuList(newmenudata);
   }

   let aboutrestaurant = menuList[0]?.card?.card?.info;
   let offerdata = menuList[1]?.card?.card?.gridElements?.infoWithStyle?.offers;
   let accordianitem = menuList[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  
   return (
      <div id="resDetail" className="w-[80%] py-4 my-2 mt-20">
        <AboutRestaurant data={aboutrestaurant} />
        <Offer data={offerdata} />
        <div>
            {accordianitem?.map((ele) => {
               if (
                  ele.card.card["@type"] ===
                     "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
                  ele.card.card["@type"] ===
                     "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
               ) {
                  return <Categories data={ele} />;
               } else {
                  return null;
               }
            })}
        </div>
      </div>
    );
}

export default RestaurantMenu;