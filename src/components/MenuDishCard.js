import React from "react";

const MenuDishCard = (MenuDish) => {
   console.log(MenuDish);
   const {name, price} = MenuDish || {};
   return (
      <div className="card">
         <h6>{name} , - Rs. {price / 100}</h6>
      </div>
   )
}

export default MenuDishCard;