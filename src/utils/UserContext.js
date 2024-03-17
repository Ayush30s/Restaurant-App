//create context is a utility function

import { createContext } from "react";

const UserContext = createContext({
   username: "Default User"
})

export default UserContext;