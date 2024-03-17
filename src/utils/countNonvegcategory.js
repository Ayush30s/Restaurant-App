const countNonvegcategory = (data) => {

   const categories = data.ele.card.card.categories;
   let count = 0;

   for(let category of categories) {
      let {itemCards} = category;
      for(let cards of itemCards) {
         let vegornot;
         if(cards.card.info.itemAttribute.vegClassifier === "NONVEG") {
            vegornot = 0;
         } else {
            vegornot = 1;
         }

         if(vegornot == data.foodtype) {
            count++;
         }
      }
   }

   return count;
}

export default countNonvegcategory;