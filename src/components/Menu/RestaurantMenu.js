import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MENU__API } from "../../utils/constants";
import AboutRestaurant from "./AboutRestaurant";
import Offer from "./Offers";
import Categories from "./Categories";
import FoodContext from "../../utils/FoodContext";
import changeCSS from "../../utils/VegNonveg";
import countNonvegitem from "../../utils/countVegNonvegitem";
import countNonvegcategory from "../../utils/countNonvegcategory";


const RestaurantMenu = () => {
   const resIdObj = useParams();
   const { resId } = resIdObj;

   const [menuList, setMenuList] = useState([]);

   //for veg non-veg filter button
   const [foodtype, setfoodtype] = useState(true);

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
      //this line provide me data about food type (veg or nonveg) in all its child component
      <FoodContext.Provider value={{vegornot : foodtype}}>
         <div id="resDetail" className="w-[80%] py-4 my-2 mt-20">
            <AboutRestaurant data={aboutrestaurant} />

            <Offer data={offerdata} />

            {/* veg or not - Button */}
            <button id="vegbtn" className="static top-10 text-xs px-1 py-1 w-[8%] rounded-2xl m-2 text-white bg-green-700 border shadow-lg" 
               onClick={() => {
                  changeCSS("vegbtn" ,foodtype);
                  setfoodtype(!foodtype);
               }}
            >{foodtype ? "VEG" : "NONVEG"}</button> 

            <div>
               {accordianitem?.map((ele) => {
                  if (ele.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
                     let count = countNonvegitem({ele, foodtype});
                     return count > 0 ? <Categories data={ele} /> : null;
                  } else if(ele.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") {
                     let count = countNonvegcategory({ele, foodtype});
                     return count > 0 ? <Categories data={ele} /> : null;
                  } else {
                     return null;
                  }
               })}
            </div>
         </div>
     </FoodContext.Provider>
   );
}

export default RestaurantMenu;