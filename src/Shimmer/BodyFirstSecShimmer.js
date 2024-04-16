import React from "react";
import MiniCardshimmer from "./MiniCardshimmer";

const BodyFirstSectionShimmer = () => {
   const shimmerCards = [];
   for (let i = 0; i < 20; i++) {
      shimmerCards.push(<MiniCardshimmer key={i} />);
   }

   return (
      <div className="mx-24 my-5 h-full flex flex-row touch-auto snap-x overflow-x-scroll custom-scrollbar">
         {shimmerCards}
      </div>
   );
}

export default BodyFirstSectionShimmer;