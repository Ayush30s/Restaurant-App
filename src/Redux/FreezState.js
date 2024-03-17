import { createSlice } from "@reduxjs/toolkit";

const freezslice = createSlice({
   name: "freez",
   initialState: {
      freezstate: false
   },
   reducers: {
      updateFreez: (state) => {
         state.freezstate = !state.freezstate;
      }
   }
});

export const { updateFreez } = freezslice.actions;
export const freezReducer = freezslice.reducer; // Corrected
