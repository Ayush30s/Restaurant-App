import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../Redux/cartslice";
import { CDN_URL } from "../../utils/constants";
import { Link } from "react-router-dom";


const CartItem = (data) => { 

   const {variantSelected} = data?.data;
   const {name,id} = data?.data;

   const dispatch = useDispatch();
   const handleRemoveItem = (id) => {
      dispatch(removeItem(id));
   }

   const compressString = (string) => {
      if(string?.length > 17) {
         string = string.substring(0,40) + "...";
      }
      return string;
   } 

   const resID = data.data.restaurantid;
   let dishprice = 0;

   let [count, setCount] = useState(1);
   let price = (variantSelected?.price) || (data.data.price / 100);

   return (
      <div id="cartitems" className= "w-[90%] h-16 ml-[5%] border-b border-b-gray-200 flex flex-row items-center justify-between my-4 px-1"> 
         {data.setAmount((count * price))}     

         <div className="w-[18%]">
            <span className=" text-black mb-1 text-sm font-semibold ">{name}</span><Link to = {"/restaurants/" + resID}><h1 className=" text-black mb-1 text-[8px] hover:text-orange-400"> restaurant</h1></Link>
         </div>

         <div className="w-[10%] p-1 font-bold text-white text-xs mx-1">
            {variantSelected?.isVeg === 1 || data.data.itemAttribute?.vegClassifier == 'VEG' ? <h1 className="text-center bg-green-500 p-1 rounded-md">(veg)</h1> : <h1 className="text-center bg-red-500 p-1 rounded-md">(n-veg)</h1>}
         </div>

         <div className = "w-[10%] font-semibold text-sm mx-2">
            <h1>₹{(price * count).toFixed(2)}</h1> 
         </div>

         <button alt = "Remove Item" className="w-[3%] text-center rounded-2xl mt-2 bg-red-500 text-white hover:bg-red-600" onClick={() => {
            handleRemoveItem(id);
         }}>x</button>
         
         <div className="w-[10%] bg-white border border-black text-xs flex flex-row shadow-2xl rounded-xl">
            <button className="w-[30%] hover:bg-black hover:text-white rounded-xl m-1" onClick={() => {
               if(count > 1) {
                  setCount(count - 1);
                  data.setAmount(dishprice + price * count)
               }
            }}>-</button>
            <button className="w-[40%] m-1 font-semibold">{count}</button>
            <button className="w-[30%] hover:bg-black hover:text-white rounded-xl m-1" onClick={() => {
               setCount(count + 1); 
               data.setAmount(price * count)
            }}>+</button>
         </div>

         <div className="w-[5%] yellow-red-300 m-1">
            {data.data.imageId ? <img className=" hover:w-[100%] w-[90%] rounded-lg" src= {CDN_URL + data.data.imageId}/> : <img src = {"https://static.thenounproject.com/png/340719-200.png"} />}
         </div>
      </div>  
   )
}

export default CartItem;