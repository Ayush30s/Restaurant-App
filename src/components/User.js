import { useEffect, useState } from "react";

const User = ({name}) => {
   const [count, setcount] = useState(0);
   const [count2, setcount2] = useState(2);
   
   return (
      <div className="user-card">
         {console.log("iside return")}
         <h1>Count1: {count}</h1>
         <h1>Count2: {count2}</h1>
         <h1>Name: {name}</h1>
         <h2>Location: Janupur</h2>
         <h3>Contact: @_ayu_sh_srivastav_</h3>
      </div>
   )
}

export default User;