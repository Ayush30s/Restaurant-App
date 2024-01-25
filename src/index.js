import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import { AppLayput } from './App';
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import RestaurantMenu from './components/RestaurantMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
const appRouter = createBrowserRouter([
   {
      path: "/",
      element: <AppLayput />,
      /*children conatins all the paths and pages associated with them and when we encounter a particular path defined in that childern
      it replace the outlet component in the AppLayout with that path associated component and hence shows that page we want to see*/
      children: [
         {
            path: "/",
            element: <Body/>
         },
         {
            path: "/about",
            element: <About/>,
            errorElement: <Error/>
         },
         {
            path: "/contact",
            element: <Contact/>,
            errorElement: <Error/>
         },
         {
            /* after :data is dynamic in this case its resId so with different resid for 
            different restaurant it genearted differenet route that takes us two that restuarant*/
            path: "/restaurants/:resId",
            element: <RestaurantMenu/>
         }
      ],
      errorElement: <Error/>
   }, 
]);

root.render(
   /* if we use render a component using root.render(Applayout) this command has limitation that
   it can render only a particular component on the website that is written inide it.
   So, to render a desired page we create an 'appRouter' using "react-router-dom" that renders,
   the 'appRouter' which renders the page according to the paths defined inside the children.*/
   <RouterProvider router={appRouter}/>
);
