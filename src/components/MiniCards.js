import React from "react";
import {CDN_URL} from "../utils/constants"

export const MiniCards = (props) => {
   
   const {foodData} = props;
   const {text} = foodData.action;  
   const {imageId} = foodData;  
 
   
   return(
      <div className="z-10 snap-start w-[170px] h-[200px] p-1 hover:p-3">
         <img src={CDN_URL+imageId}/>
      </div>
   )
}

export default MiniCards;