import React from "react";
import CardShimmer from "./Cardshimmer";

const BodyShimmer = () => {
   const shimmerCards = [];
   for (let i = 0; i < 40; i++) {
      shimmerCards.push(<CardShimmer key={i} />);
   }

   return (
      <div className="text-black ml-[10%] flex flex-wrap p-5 w-[85%] h-full">
         {shimmerCards}
      </div>
   );
}

export default BodyShimmer;
