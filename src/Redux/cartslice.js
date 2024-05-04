import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: "cart",
   initialState: {
      items: []
   },
   
   reducers: {
      addItem: (state, action) => {
         let flag = false;
         let type = false;
         let reach = false;

         for (let i = 0; i < state.items.length; i++) {
            const food = state.items[i];
            if (food.id === action.payload.id) {
               flag = true;

               if (food.variantSelected && action.payload.variantSelected) {
                  reach = true;
                  const newVariants = action.payload.variantSelected;
                  const existingVariantsObj = food.variantSelected;

                  if(newVariants.id == existingVariantsObj.id) {
                     type = true;
                  }
               }
            }
            if(type == true) {
               alert("Aleady added to cart");
               break;
            }
         }
         
         if(!reach && flag) {
            alert("Already added to cart");
         } else {
            if (flag == false || type == false) {
               state.items.push(action.payload);
            }
         }
      },
      removeItem: (state, action) => {
         const itemIdToRemove = action.payload; // payload is the item ID to remove
       
         // Return a new state object with the updated items array
         return {
           ...state,
           items: state.items.filter(item => (item.name) !== itemIdToRemove)
         };
      },
      clearCart: (state) => {
         //RTK - either mutate the state or return a new state
         // state.items.length = 0;

         return {items: []}; //-> what you return as a new state will replace the original state by the returned value
      },
      updateCart: (action) => {
         return {items: action.payload}; 
      },
   }
});

export const { addItem, removeItem, clearCart, updateCart, updateProperty } = cartSlice.actions;
export default cartSlice.reducer;
