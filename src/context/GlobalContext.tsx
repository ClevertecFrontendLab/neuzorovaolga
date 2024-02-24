import React, { createContext, useLayoutEffect, useState } from 'react';

export interface GlobalStateInterface {
    collapsed: boolean;
    isAuthorized: boolean;
    showMenu: () => void;
    hideMenu: () => void;
    logIn: () => void;
    logOut: () => void;
}
interface Props {
    children: React.ReactNode;
}

export const GlobalContext = createContext<GlobalStateInterface>({
    collapsed: false,
    isAuthorized: false,
    showMenu: () => {
        return;
    },
    hideMenu: () => {
        return;
    },
    logIn: () => {
        return;
    },
    logOut: () => {
        return;
    },
});

export const GlobalProvider: React.FC<Props> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const token = localStorage.getItem('token');
    const [isAuthorized, setIsAuthorized] = useState(token ? true : false);

    const showMenu = () => {
        setCollapsed(false);
    };
    const hideMenu = () => {
        setCollapsed(true);
    };

    const logIn = () => {
        setIsAuthorized(true);
    };
    const logOut = () => {
        setIsAuthorized(false);
    };

    return (
        <GlobalContext.Provider
            value={{ collapsed, showMenu, hideMenu, logIn, logOut, isAuthorized }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
