import React from "react";

const CardShimmer = () => {
   return (
      <div className="lg:w-[250px] md:w-[900px] lg:left-10 md:left-1 rounded-2xl lg:m-2 p-2 lg:h-[200px] md:h-[400px]">
         <div className="m-1 rounded-2xl lg:w-[220px] md:w-[800px] bg-slate-100 lg:h-[120px] md:h-[300px]"></div>
         <div className="m-1 rounded-2xl lg:w-[220px] md:w-[800px] bg-slate-200 lg:h-[20px] md:h-[50px]"></div>
         <div className="flex flex-row">
            <div className="m-1 rounded-full lg:w-[30px] md:w-[600px] bg-gray-100 md:h-[30px] lg:h-[20px]"></div>
            <div className="m-1 rounded-2xl w-[190px] bg-gray-100 h-[30px]"></div>
         </div>
         <div className="m-1 rounded-2xl w-[220px] bg-slate-200 h-[20px]"></div>
      </div>
   );
}

export default CardShimmer;