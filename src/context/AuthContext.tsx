import React, { createContext, useState } from 'react';

export interface IAuthContext {
    loginEmail: string;
    changeLoginEmail: (email: string) => void;
    password: string;
    changePassword: (email: string) => void;
    recheckEmail: boolean;
    changeRecheckEmail: (status: boolean) => void;
    rechangePassword: boolean;
    changeRechangePassword: (status: boolean) => void;
}
interface Props {
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    loginEmail: '',
    changeLoginEmail: () => {
        return;
    },
    password: '',
    changePassword: () => {
        return;
    },
    recheckEmail: false,
    changeRecheckEmail: () => {
        return;
    },
    rechangePassword: false,
    changeRechangePassword: () => {
        return;
    },
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recheckEmail, setRecheckEmail] = useState(false);
    const [rechangePassword, setRechangePassword] = useState(false);

    const changeLoginEmail = (email: string) => {
        setLoginEmail(email);
    };

    const changePassword = (password: string) => {
        setPassword(password);
    };

    const changeRecheckEmail = (status: boolean) => {
        setRecheckEmail(status);
    };

    const changeRechangePassword = (status: boolean) => {
        setRechangePassword(status);
    };

    return (
        <AuthContext.Provider
            value={{
                loginEmail,
                changeLoginEmail,
                password,
                changePassword,
                recheckEmail,
                changeRecheckEmail,
                rechangePassword,
                changeRechangePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
