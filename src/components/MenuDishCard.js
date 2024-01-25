import React from "react";

const MenuDishCard = (MenuDish) => {
   const {name, price} = MenuDish.MenuDish.card.info || {};
   return (
      <div className="card">
         <h6>{name} , - Rs. {price / 100}</h6>
      </div>
   )
}

export default MenuDishCard;