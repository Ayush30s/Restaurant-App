const CartTemplate = () => {
   return (
      <div id="cartitems" className="w-[90%] bg-transparent font-semibold ml-[5%] border-b border-b-black">      
         <div className="w-[85%] py-2 flex flex-row justify-between  m-1 px-1 ">
            <div className="m-1 text-lg w-[25%]">
               <h1>Name</h1>
            </div>

            <div className="m-1 text-lg w-[15%]">
               <h1>Type</h1>
            </div>

            <div className="m-1 text-lg w-[12%]">
               <h1>Price</h1>
            </div>

            <div className="m-1 text-lg w-[10%]">
               <h1>Remove</h1>
            </div>

            <div className="m-1 text-lg">
               <h1>Quantity</h1>
            </div>
         </div>

      </div>  
   );
}

export default CartTemplate;