import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const AboutRestaurant = (resdata) => {


   let resname = resdata?.data?.name;
   let cuisines = resdata?.data?.cuisines;
   let lastMileTravelString = resdata?.data?.sla?.lastMileTravelString;
   let avgRating = resdata?.data?.avgRating;
   let totalRatings = resdata?.data?.totalRatings;
   let areaName = resdata?.data?.areaName;
 
   let cusinestring = "";
   resdata?.data?.cuisines.map((el) => {
      cusinestring += el;
   });
   
   return (
      <div>
         <div className="flex justify-between border-b border-b-gray p-3 my-3">
            <div>
               <h1 className="font-bold py-2">{resname}</h1>
               <h3 className="text-[12px]">{cusinestring}</h3>
               <h3 className="text-[12px]">{areaName} , {lastMileTravelString}</h3>
            </div>

            <div className="border border-gray rounded-lg flex flex-col  justify-start p-3">
               <h3 className="text-[14px] font-bold text-green-600">⭐{avgRating}</h3>
               <hr className="my-3 text-[12px]"></hr>
               <h3 className="text-[12px]">{totalRatings/1000}K+ ratings</h3>
            </div>
         </div>
      </div>
   );
}

export default AboutRestaurant;