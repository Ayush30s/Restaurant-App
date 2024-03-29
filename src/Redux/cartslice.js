import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: "cart",
   initialState: {
      items: []
   },
   reducers: {
      //mutating the state here
      addItem : (state, action) => {
         state.items.push(action.payload);
      },
      removeItem: (state, action) => {
         const itemIdToRemove = action.payload; // Assuming payload is the item ID to remove
         state.items = state.items.filter(item => item.id !== itemIdToRemove); 
      },
      clearCart: (state) => {
         //RTK - either mutate the state or return a new state
         // state.items.length = 0;

         return {items: []}; //-> what you return as a new state will replace the original state by the returned value
      }
   }
});

export const {addItem , removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;