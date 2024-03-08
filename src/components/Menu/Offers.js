import React from "react";

const Offer = (OfferData) => {

   const array = OfferData.data;
  
   return (
      <div className="border-b border-b-gray py-4 w-full flex flex-row justify-evenly"> 
         {array?.map((ele, index) => (
            <div key={index} className="flex flex-col border border-gray-300 p-4 rounded-lg">
               <div className="flex flex-row font-bold">
                  <img className="w-[20px] h-[20px]" src="https://pngimg.com/d/percent_PNG10.png"/>
                  <p className="text-xs">{ele.info.header}</p>
               </div>
               <div>
                  <p className="text-xs">{ele.info.couponCode} , {ele.info.description}</p>
               </div>
            </div>
         ))}
      </div> 
   );
}

export default Offer;