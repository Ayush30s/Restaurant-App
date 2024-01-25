import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const AppLayput = () =>{
   return (
      <div className='app'>
         <Header />
         <Outlet />
      </div>
   )
}

export {AppLayput}
