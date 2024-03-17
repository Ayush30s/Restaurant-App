const changeCSS = (id,type) => {

   const button = document.getElementById(id);

   if(type === true) {
      button.classList.remove("bg-green-700");
      button.classList.add("bg-red-700");
   } else {
      button.classList.remove("bg-red-700");
      button.classList.add("bg-green-700");
   }
}

export default changeCSS;