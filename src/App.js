import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import useInternetStatus from './utils/OnlineStatus';
import { useEffect, useState } from 'react';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import AppStore from './Redux/AppStore';



const AppLayput = () =>{
   let onlinestat = useInternetStatus();

   //AUTH CODE :Make an API call and get the data of user
   const data = {
      name : "Ayush Lala",
      city : "Lucknow"
   }

   const [userInfo, setUserInfo] = useState(data.name);

   if(!onlinestat) {
      return (
         <div className="flex flex-row justify-center align-middle">
            <h1>Bad Internet connection!!!</h1>
         </div>
      );
   }

   return (
      <div className='flex justify-center font-appFont'>
         {/* we have provided this app store to the provider and all the components inside it can use the conetent of app store so make it golbal so that any component cna use it we used it n the root level just as usecontext */}
         <Provider store={AppStore}>
            <UserContext.Provider value={{userName : userInfo, setUserInfo}}>
               <Header />
               <Outlet />
            </UserContext.Provider>
         </Provider>

      </div>
   )
}

export {AppLayput}
