import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import useInternetStatus from './utils/OnlineStatus';


const AppLayput = () =>{
   let onlinestat = useInternetStatus();
   if(!onlinestat) {
      return (
         <div className="flex flex-row justify-center align-middle">
            <h1>Bad Internet connection!!!</h1>
         </div>
      );
   }

   return (
      <div className='flex justify-center'>
         {/* <Header /> */}
         <Outlet />
      </div>
   )
}

export {AppLayput}
