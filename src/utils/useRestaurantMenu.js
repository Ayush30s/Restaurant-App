// we don't want two things to get handled by resturant menu component 
// 1. Fetch the data from API 
// 2. display the data on web

// so we create out custom hook that will fetch the data

import { MENU__API } from "./constants";
import { useEffect, useState } from "react";

const useRestaurantMenu = async (resID) => {

   const [resInfo , setresInfo] = useState(null);

   useEffect(() => {
      fetchMenu();
   },[]);

   const fetchMenu = async() => {
      const apidata = await fetch(MENU__API + resID);
      const json = await apidata.json();
      setresInfo(json);
   }

   return resInfo;
}

export default useRestaurantMenu;