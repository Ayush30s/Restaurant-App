/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./src/**/*.{html,js}",// its means in which type of files we can use tailwind
   ],
   theme: {
     extend: {
         fontFamily:{
            appFont: ["Rubik", 'sans-serif']
         }
     },
   },
   plugins: [
      function({ addUtilities }) {
         const newUtilities = {
            '.custom-scrollbar::-webkit-scrollbar':{
               display: 'none',
            },
         };

         addUtilities(newUtilities, ['responsive', 'hover']);
      },
   ],
 }