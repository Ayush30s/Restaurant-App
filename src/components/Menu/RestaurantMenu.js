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
   const [isloading, setIsLoading]= useState(false);

   //for veg non-veg filter button
   const [foodtype, setfoodtype] = useState(true);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const data = await fetch(MENU__API + resId);
      const json = await data.json();
      setIsLoading(true);

      let newmenudata = json.data.cards;
      setMenuList(newmenudata); 
   }

   let aboutrestaurant = menuList[2]?.card?.card?.info;
   let offerdata = menuList[3]?.card?.card?.gridElements?.infoWithStyle?.offers;
   let accordianitem = menuList[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

   // In this module i am counting the number of dishes according to veg non veg filter if i donts found a single dish 
   // having the food type as the veg nonveg filter we just render any message else render the dishes 
   let totalOnetypeItem = 0;
   {accordianitem?.map((ele) => {
      if (ele.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
         totalOnetypeItem += countNonvegitem({ele, foodtype});
      } else if(ele.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") {
         totalOnetypeItem += countNonvegcategory({ele, foodtype});
      }
   })}

   if(!isloading) {
      <h1 className="m-64">Loading...</h1>
   } else {
      return (
         //this line provide me data about food type (veg or nonveg) in all its child component
         <FoodContext.Provider value={{vegornot : foodtype}}>
            <div id="resDetail" className="w-[80%] py-4 my-2 mt-20">
               <AboutRestaurant data={aboutrestaurant} />
   
               <Offer data={offerdata} />
   
               {/* veg or not - Button */
                  aboutrestaurant?.veg ? 
                     <span className="text-green-600 text-sm border-green-600 border p-1 bg-green-100 font-semibold rounded-2xl">🌱 Veg only</span>
                  :
                  <button id="vegbtn" className="static top-10 text-xs px-1 py-1 w-[8%] rounded-2xl m-2 text-white bg-green-700 border shadow-lg" 
                     onClick={() => {
                        changeCSS("vegbtn" ,foodtype);
                        setfoodtype(!foodtype);
                     }}
                  >{foodtype ? "VEG" : "NONVEG"}</button> 
               }
               
               {  
                  totalOnetypeItem > 0 ?
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
                  </div> : <div className=" text-center m-5">We don't serve {foodtype ? "VEG" : "NONVEG"} items</div>
               }
            </div>
         </FoodContext.Provider>
      );
   }
}

export default RestaurantMenu;