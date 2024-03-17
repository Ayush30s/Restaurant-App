import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Redux/cartslice";
import {freezReducer} from "../Redux/FreezState"; // Ensure correct path here

const AppStore = configureStore({
   reducer: {
      cart: cartReducer,
      freez: freezReducer
   }
});

export default AppStore;
