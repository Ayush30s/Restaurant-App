import React from "react";
import Offer from "./Offers";

const AboutRestaurant = (resdata) => {
   let resname = resdata?.data?.name;
   let cuisines = resdata?.data?.cuisines;
   let lastMileTravelString = resdata?.data?.sla?.lastMileTravelString;
   let avgRating = resdata?.data?.avgRating;
   let totalRatings = resdata?.data?.totalRatings;
   let areaName = resdata?.data?.areaName; 
   let id = resdata?.data?.id;
 
   let cusinestring = "";
   resdata?.data?.cuisines.map((el) => {
      cusinestring += el;
      cusinestring += " ";
   });
   
   return (
      <div>
         <div className="flex flex-row justify-between items-baseline mx-5 my-10 border border-gray-300 px-5 py-10 rounded-[40px]">
            <div className="lg:border lg:border-gray lg:rounded-[20px] lg:p-3">
               <h1 className="font-bold py-2 lg:text-lg md:text-[60px]">{resname}</h1>
               <h3 className="lg:text-[12px] md:text-[40px] ">{cusinestring}</h3>
               <span className="lg:text-[12px] md:text-[40px]  font-bold">Outlet : </span><span className="lg:text-[12px] md:text-[40px] ">{areaName} , {lastMileTravelString}</span>
            </div>

            <div className="border border-gray rounded-[20px] lg:flex flex-col justify-start p-3 ">
               <h3 className="lg:text-[14px] md:text-[40px] font-bold text-green-600">⭐{avgRating?.toPrecision(2)}</h3>
               <hr className="my-3 lg:text-[12px] md:text-[20px]"></hr>
               <h3 className="lg:text-[12px] md:text-[40px]">{totalRatings/1000 < 1 ? totalRatings : (totalRatings / 1000 +"k+")} ratings</h3>
            </div>
         </div>
      </div>
   );
}

export default AboutRestaurant;