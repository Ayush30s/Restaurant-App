import React from "react";
import {CDN_URL} from "../utils/constants"

export const MiniCards = (props) => {
   
   const {foodData} = props;
   const {text} = foodData.action;   

   return(
      <div className="">
         <img/>
         <h3></h3>
      </div>
   )
}

export default MiniCards;