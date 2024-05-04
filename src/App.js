import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import useInternetStatus from './utils/OnlineStatus';
import { useEffect, useState } from 'react';
import AddonsContext from './utils/AddonsContext';
import { Provider } from 'react-redux';
import AppStore from './Redux/AppStore';



const AppLayput = () =>{
   let onlinestat = useInternetStatus();

   const [addonsSelected, setAddonsSelected] = useState([]);

   if(!onlinestat) {
      return (
         <div className="flex flex-row justify-center align-middle">
            <h1>Bad Internet connection!!!</h1>
         </div>
      );
   }

   return (
      <div className='font-appFont'>
         {/* we have provided this app store to the provider and all the components inside it can use the conetent of app store so make it golbal so that any component cna use it we used it n the root level just as usecontext */}
         <Provider store={AppStore}>
            <AddonsContext.Provider value={{ addonsSelected, setAddonsSelected }}>  
               <Header />
               <Outlet />
            </AddonsContext.Provider>
         </Provider>
      </div>
   )
}

export {AppLayput}
