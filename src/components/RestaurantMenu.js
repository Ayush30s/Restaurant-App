import { useEffect ,useState} from "react";
import MenuDishCard from "./MenuDishCard";
import {CDN_URL , MENU__API} from "../utils/constants"
import {useParams} from "react-router-dom"


const RestaurantMenu = () => {
   const resIdObj = useParams();

   const [resInfo , setresInfo] = useState(null);

   useEffect(() => {
      fetchMenu();
   },[]);

   const fetchMenu = async() => {
      const apidata = await fetch(MENU__API + resIdObj.resId);
      const json = await apidata.json();
      setresInfo(json.data);
   }

   const itemCards = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;
   const { name , cloudinaryImageId , locality, city, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info || {};

   return (
      <div className="menu">
         <h1>Name : {name}</h1>
         <img alt = "resImage" src= {CDN_URL + cloudinaryImageId}></img>
         <h3>At {locality} , {city}</h3>
         <h3>{costForTwoMessage}</h3>
         <h2>Menu</h2>    
         <div className="Menu-Container">
            {itemCards && itemCards.map((item) => (
               <MenuDishCard key={item.id} MenuDish={item} />
            ))} 
         </div>                
      </div>
   );
}

export default RestaurantMenu;