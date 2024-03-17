const countVegNonvegDishes = (data) => {
   console.log(data)
  
   let count = 0;
   let typedish;

   if(data.vegornot == false) {
      typedish = "NONVEG";
   } else {
      typedish = "VEG";
   }

   const itemCards = data.ele.itemCards;
   for(let dishes of itemCards) {
      if(dishes.card.info.itemAttribute.vegClassifier == typedish) {
         count++;
      }
   }

   return count;
}

export default countVegNonvegDishes;