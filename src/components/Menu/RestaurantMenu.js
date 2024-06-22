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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlurContext from "../../utils/BlurContext";

const RestaurantMenu = () => {
   const resIdObj = useParams();
   const { resId } = resIdObj;

   const [menuList, setMenuList] = useState([]);
   const [isloading, setIsLoading]= useState(false);

   //for veg non-veg filter button
   const [foodtype, setfoodtype] = useState(true);
   const cart = useSelector((store) => store.cart.items);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const data = await fetch(`https://backendfood-app.onrender.com/api/restaurants/Menu?lat=26.7586175&lng=80.9141368&resId=${resId}`);
      const json = await data.json();
      setIsLoading(true);

      let newmenudata = json.data.cards;
      setMenuList(newmenudata); 
   }

   const [dishclicked, setdishclicked] = useState(false);

   let aboutrestaurant = menuList[2]?.card?.card?.info;
   let offerdata = menuList[3]?.card?.card?.gridElements?.infoWithStyle?.offers;
   let accordianitem = menuList[4]?.groupedCard ? menuList[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards : menuList[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
   let id = aboutrestaurant?.id;

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
         <FoodContext.Provider value={{vegornot : foodtype , restaurantid: id}}>
            <BlurContext.Provider value={{ dishclicked, setdishclicked }}>

               <div id="resDetail" className="lg:w-[80%] md:w-[100%] py-4 lg:ml-32 md:ml-1 flex flex-col">
                  <AboutRestaurant data={aboutrestaurant} />
      
                  <div>
                  <Offer data={offerdata} />     
                  </div>       
      
                  {/* veg or not - Button */
                     aboutrestaurant?.veg ? 
                        <span className="text-green-600 lg:text-sm mx-5 md:text-2xl border-green-600 border lg:p-1 md:p-2 bg-green-100 font-semibold rounded-2xl md:ml-4">🌱 Veg only</span>
                     :
                     <button id="vegbtn" className="static md:ml-4 top-10 lg:text-sm md:text-2xl lg:p-1 md:p-3 w-[15%] rounded-full m-2 text-white bg-green-700 border shadow-2xl border-white" 
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

                  {
                     cart.length > 0 && <div className=" text-sm fixed bottom-0 lg:left-[15%] md:left-0  rounded-md font-semibold bg-green-500 text-white p-4 lg:w-[70%] md:w-[100%] flex flex-row justify-between z-10">
                        <h1 className="lg:py-1 lg:px-2 md:p-6 rounded-2xl lg:text-[14px] md:text-[30px] bg-green-600">({cart.length}) Items Added</h1>
                        <Link to = "/cart"><h1 className="text-green-600 bg-white lg:text-[14px] md:text-[30px] lg:py-1 lg:px-2 md:p-6 rounded-2xl">VIEW CART🛒</h1></Link>
                     </div>
                  }
               </div>

               {//when a dish is clicked to get added in cart blur the div in the back 
                  dishclicked && <div className="newdiv absolute top-0 w-[100%] h-[130000px] z-20 backdrop-blur-md"></div>
               }
            </BlurContext.Provider>
         </FoodContext.Provider>
      );
   }
}

export default RestaurantMenu;