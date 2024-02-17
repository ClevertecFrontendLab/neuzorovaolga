import React, { createContext, useState } from 'react';

export interface GlobalStateInterface {
    collapsed: boolean;
    loginEmail: string;
    showMenu: () => void;
    hideMenu: () => void;
    changeLoginEmail: (email: string) => void;
}
interface Props {
    children: React.ReactNode;
}

export const GlobalStateContext = createContext<GlobalStateInterface>({
    collapsed: false,
    loginEmail: '',
    showMenu: () => {
        return;
    },
    hideMenu: () => {
        return;
    },
    changeLoginEmail: (): void => {
        return;
    },
});

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const showMenu = () => {
        setCollapsed(false);
    };
    const hideMenu = () => {
        setCollapsed(true);
    };
    const changeLoginEmail = (email: string) => {
        setLoginEmail(email);
    };
    return (
        <GlobalStateContext.Provider
            value={{ collapsed, showMenu, hideMenu, loginEmail, changeLoginEmail }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};
