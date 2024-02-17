import React, { createContext, useState } from 'react';

export interface IAuthContext {
    loginEmail: string;
    changeLoginEmail: (email: string) => void;
    recheckEmail: boolean;
    changeRecheckEmail: (status: boolean) => void;
}
interface Props {
    children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
    loginEmail: '',
    changeLoginEmail: () => {
        return;
    },
    recheckEmail: false,
    changeRecheckEmail: () => {
        return;
    },
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [recheckEmail, setRecheckEmail] = useState(false);

    const changeLoginEmail = (email: string) => {
        setLoginEmail(email);
    };

    const changeRecheckEmail = (status: boolean) => {
        setRecheckEmail(status);
    };
    return (
        <AuthContext.Provider
            value={{
                loginEmail,
                changeLoginEmail,
                recheckEmail,
                changeRecheckEmail,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
