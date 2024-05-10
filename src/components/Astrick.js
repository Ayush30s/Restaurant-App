import React from "react";

const Astricks = (data) => {
   // Create an array of stars based on the rating
   const stars = [];
   let star = Math.ceil(data.data);
   for (let i = 0; i < star; i++) {
      stars.push(<span key={i}>⭐</span>); // Use the star emoji only or mix as needed
   }
   
   return <div>{stars}</div>;
}

export default Astricks;
