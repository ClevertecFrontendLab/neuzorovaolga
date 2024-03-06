import React, { createContext, useState } from 'react';

export type GlobalStateType = {
    collapsed: boolean;
    isAuthorized: boolean;
    showMenu: () => void;
    hideMenu: () => void;
    logIn: () => void;
    logOut: () => void;
};
type Props = {
    children: React.ReactNode;
};

export const GlobalContext = createContext<GlobalStateType>({
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

export const GlobalProvider = ({ children }: Props) => {
    const [collapsed, setCollapsed] = useState(true);
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
