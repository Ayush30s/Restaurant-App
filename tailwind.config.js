/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./src/**/*.{html,js}",// its means in which type of files we can yse tailwind
   ],
   theme: {
     extend: {
         fontFamily:{
            appFont: ["Rubik", 'sans-serif']
         }
     },
   },
   plugins: [],
 }