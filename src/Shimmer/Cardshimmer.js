import React from "react";

const CardShimmer = () => {
   return (
      <div className="w-[250px] left-10 rounded-2xl m-2 p-2 h-[200px]">
         <div className="m-1 rounded-2xl w-[220px] bg-slate-100 h-[120px]"></div>
         <div className="m-1 rounded-2xl w-[220px] bg-slate-200 h-[20px]"></div>
         <div className="flex flex-row">
            <div className="m-1 rounded-full w-[30px] bg-gray-100 h-[20px]"></div>
            <div className="m-1 rounded-2xl w-[180px] bg-gray-100 h-[20px]"></div>
         </div>
         <div className="m-1 rounded-2xl w-[220px] bg-slate-200 h-[10px]"></div>
      </div>
   );
}

export default CardShimmer;