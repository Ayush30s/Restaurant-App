import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { RestaurantCard } from "./RestaurantCard";
import CardWithLabel from "./RestaurantCard";
import { useState,useEffect } from "react";

const ResSlider = ({ resData }) => {

   let [topResArray, setTopResArray] = useState([]);


   useEffect(() => {
      fetchData();
   }, []);

   const LabelCard = CardWithLabel(RestaurantCard);

   const fetchData = async () => {
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.846251&lng=80.94902880&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();
      
      let newResArray = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      setTopResArray(newResArray);
   }
   
   let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
   };

   return (

         <div id="ResSlider" className=" text-black mt-2 mx-24 flex flex-col px-10 rounded-xl h-[100%] p-10">
            <h1 className="text-2xl ml-2 mb-4"><b>Famous Restaurants in Your City</b></h1>
            <Slider {...settings}>
               {topResArray?.map((restaurant) => (

                  <Link key={restaurant?.info?.id} to={"/restaurants/" + restaurant?.info?.id}>
                     { 
                        restaurant?.info?.aggregatedDiscountInfoV3?.header ? (
                           <LabelCard resData = {restaurant}/>
                        ) : (
                           <RestaurantCard resData={restaurant}/>
                        )
                     }
                  </Link>

               ))}
            </Slider>
         </div>
   );
};

export default ResSlider;
