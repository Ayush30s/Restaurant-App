import { React , lazy ,Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';
import Error from './components/Error';
import { AppLayput } from './App';
import { createBrowserRouter , RouterProvider } from "react-router-dom"
import RestaurantMenu from './components/Menu/RestaurantMenu';
import CartBody from './components/Checkout/CartBody';
import FoodTypeRestaurant from './components/ResCollection';

// this will load grocry code on demand on clickking the grocry link React is very fast, so it tries  
// to render the code of grocery as fast as possible, but using lazy loading the code react get the code to render. 
// in 12 milliseconds. So it shows error that the code yje code not found because of the delay in getting it by
// react. But after 12 milliseconds when I again click the grocery link it fetch the. Code and render it and we can 
// see our. webpage of grocery.So to avoid the error that gets produced because of the 12 millisecond 
// late in fetching the code of the grocery element and rendering it, we use Suspense in a React.
// Which is given by react to us to handle that delay time state. You just wrap your component which is 
// not available at the moment. See. Your grocery is not available at the moment, so you put 
// this suspense and wrap your component around it. And.Give it a placeholder, right?

const Grocery = lazy(() => import('./components/Grocery'));

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
            path: "/grocery",
            element: <Suspense fallback ={<h1>Loading....</h1>}><Grocery/></Suspense>,
            errorElement: <Error/>
         },
         {
            /* after (:)data is dynamic in this case its resId so with different resid for 
            different restaurant it geneartes differenet route that takes us two that restuarant*/
            path: "/restaurants/:resId",
            element: <RestaurantMenu/>
         },
         {
            path: "/cart",
            element: <CartBody/>
         },
         {
            path:"/food/collection/id=/:foodId/restaurants",
            element: <FoodTypeRestaurant/>
         }
      ],
      errorElement: <Error/>
   }, 
]);

root.render(
   /* if we render a component using root.render(Applayout) this command has limitation that
   it can render only a particular component on the website that is written inside it.
   So, to render a desired page, we create an 'appRouter' using "react-router-dom" that renders,
   the 'appRouter' which renders the page according to the paths defined inside the children.*/
   <RouterProvider router={appRouter}/>
);
