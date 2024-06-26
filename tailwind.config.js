/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
     "./src/**/*.{html,js}", // It means in which type of files we can use Tailwind CSS
   ],
   theme: {
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      extend: {
         fontFamily: {
            appFont: ["Rubik", 'sans-serif']   
         },
         lineHeight: {
            'extra-loose': '2.5',
            '12': '3rem',
         }
      },  
   },
   plugins: [
      function({ addUtilities }) { 
         const newUtilities = { 
            '.custom-scrollbar::-webkit-scrollbar': {
               display: 'none',
            },
         };

         addUtilities(newUtilities, ['responsive'], ['hover']);
      },
   ],
};
