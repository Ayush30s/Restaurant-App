import React from "react";
import CardShimmer from "./Cardshimmer";

const BodyScrollSectionShimmer = () => {
   const shimmerCards = [];
   for (let i = 0; i < 20; i++) {
      shimmerCards.push(<CardShimmer key={i} />);
   }

   return (
      <div className="mt-8 mx-24 flex flex-roe h-[40%] pt-5 overflow-x-scroll custom-scrollbar">
         {shimmerCards}
      </div>
   );
}

export default BodyScrollSectionShimmer;