import { useRouteError } from "react-router-dom";

const Error = () => {
   const err = useRouteError();
   return ( 
      <div className="flex flex-row items-center">
         <h1 className="text-4xl font-bold mt-48 ml-72">___*( ￣皿￣)/#____</h1>
         <h1 className="text-4xl font-bold mt-48 ml-5">Oops : {err.status} {err.statusText} </h1>
      </div>
   );
}

export default Error;