import React, { createContext, useState } from 'react';

export interface GlobalStateInterface {
    collapsed: boolean;

    showMenu: () => void;
    hideMenu: () => void;
}
interface Props {
    children: React.ReactNode;
}

export const GlobalStateContext = createContext<GlobalStateInterface>({
    collapsed: false,

    showMenu: () => {
        return;
    },
    hideMenu: () => {
        return;
    },
});

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const showMenu = () => {
        setCollapsed(false);
    };
    const hideMenu = () => {
        setCollapsed(true);
    };

    return (
        <GlobalStateContext.Provider value={{ collapsed, showMenu, hideMenu }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
