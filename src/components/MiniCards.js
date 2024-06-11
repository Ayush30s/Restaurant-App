import React from "react";
import {CDN_URL} from "../utils/constants"

export const MiniCards = (props) => {
   
   const {foodData} = props;
   const {text} = foodData.action;  
   const {imageId} = foodData;  
 
   
   return(
      <div className="z-10 snap-start lg:w-[170px] lg:h-[200px] md:w-[250px] md:h-[300px] p-1 hover:p-3">
         <img clas src={CDN_URL+imageId}/>
      </div>
   )
}

export default MiniCards;