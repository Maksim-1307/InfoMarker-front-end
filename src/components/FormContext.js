import { createContext, useContext } from "react";
import { useState } from "react";

export const formContext = createContext();

const FormContextProvider = props => {
    const [contextData, setContextData] = useState({});

    return <formContext.Provider value>{props.children}</formContext.Provider>;
};

export default FormContextProvider;