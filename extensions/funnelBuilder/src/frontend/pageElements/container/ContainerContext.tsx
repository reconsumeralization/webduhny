import React, { useContext } from "react";

const ContainerContext = React.createContext<any>({ DEFAULT: "‼️‼️‼️INVALID‼️‼️‼️" });

export const ContainerProvider = ({children}: any) => {
    return (
        <ContainerContext.Provider value={{}}>
            {children}
        </ContainerContext.Provider>
    );
};

ContainerProvider.displayName = "ContainerProvider";

export const useContainer = () => {
    const context = useContext(ContainerContext);
    if (!context) {
        throw new Error("Missing Container component in the component hierarchy!");
    }
    return context;
};
