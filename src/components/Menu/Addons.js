import React from "react";
import { useState } from "react";
import AddonsList from "./AddonsList";

const Addons = (data) => {    
   const {variantSelected} = data.data;
   let type = variantSelected.name?.split(' ')[0];

   type = '(' + type + ')';
   let type2 = type[1].toLowerCase() + type.slice(2);
   type2 = '(' + type2;

   let {dishname} = data.data;
   let flag = false;

   return (
      <div className="overflow-y-auto text-sm">
         {data.data.addons?.map((ele,index) => {

            let choices = ele?.choices;
            const {groupName} = ele;
            let array = ele.groupName.split(' ');
         
            if(array.includes(type) || array.includes(type2)) {
               flag = true;
               return (
                  <div key={index} className="lg:my-1 md:my-4 ml-8 mr-4 p-2 rounded-lg">
                     <div>
                        <h1 className="font-semibold md:text-4xl lg:text-[16px] py-2">{ele.groupName}</h1>
                        <AddonsList data = {{choices,dishname,groupName}}/>
                     </div>
                  </div>
               );
            }  
         })}

         {!flag && data.data.addons?.map((ele,index) => {

         let choices = ele?.choices;
         let array = ele.groupName.split(' ');
   
         return (
               <div key={index} className="my-2 ml-8 mr-4 p-2 rounded-lg">
                  <div>
                     <h1 className="font-semibold">{ele.groupName}</h1>
                     <AddonsList data = {{choices,type,dishname}}/>
                  </div>
               </div>
            );
         })}
      </div>
   );
}

export default Addons;