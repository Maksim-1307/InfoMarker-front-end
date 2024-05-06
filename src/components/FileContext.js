import { createContext, useContext } from "react";
import { useState } from "react";

export const fileContext = createContext();

const FileContextProvider = props => {
    const [selectedName, setName] = useState(null);

    return <fileContext.Provider value={{ selectedName, setName }}>{props.children}</fileContext.Provider>;
};

export default FileContextProvider;