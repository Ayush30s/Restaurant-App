import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../../Redux/cartslice";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import Address from "./Address";

const CartBody = () => {
    const items = useSelector((store) => store.cart.items);
    const [data, setData] = useState({}); 
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }; 

    return ( 
        <div className="h-screen bg-orange-300">
            {items.length === 0 ? (
                <div className="fixed top-[40%] left-[35%] overflow-hidden">
                    <div className="mx-12">
                        <i className="text-gray-800  font-semibold text-4xl">Cart is Empty !</i><span className="text-5xl">🛒</span>
                    </div>
                    <div className="my-4">
                        <i className="text-lg text-gray-800  font-semibold">Feeling Hungry... Let's explore some food for you</i>
                    </div>
                    <div className="pb-10 pt-5 mx-20"> 
                        <Link to="/">
                            <button className="rounded-3xl m-2 px-3 py-1 bg-sky-300 text-gray-800 font-semibold text-lg shadow-xl border border-orange-500 hover:bg-orange-200 active:bg-white active:text-orange-500">Browse Restaurants</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="fixed top-20 w-full h-full p-2 flex flex-row bg-orange-300 overflow-y-hidden">
                    <button className="bg-red-500 top-[74%] left-[3%] absolute p-2 text-white font-semibold text-sm" onClick={handleClearCart}>
                        Clear Cart
                    </button>
                    <div className="w-[50%] overflow-y-scroll h-[440px] p-2">
                        {items.map((ele, index) => (
                            <CartItem key={index} data={ele} changeData={setData} />
                        ))}
                    </div>
                    <div className="w-[50%]">
                        <Address />
                        <Checkout />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartBody;
