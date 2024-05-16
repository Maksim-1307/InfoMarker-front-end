import { createContext, useContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

const AppContextProvider = props => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return <AppContext.Provider value={{loggedIn, setLoggedIn, isAdmin, setIsAdmin}}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;