const countNonvegitem = (data) => {

   const itemCards = data.ele.card.card.itemCards;
   let count = 0;

   if(itemCards != undefined) {

      for(let item of itemCards) {
         let vegornot ;
         if(item.card.info.itemAttribute.vegClassifier === "NONVEG") {
            vegornot = false;
         } else {
            vegornot = true;
         }

         if(vegornot == data.foodtype) {
            count++;
         }
      }
      return count;
   }
}
export default countNonvegitem;