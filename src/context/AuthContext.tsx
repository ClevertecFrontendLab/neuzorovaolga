import React, { createContext, useState } from 'react';

export type AuthContext = {
    email: string;
    changeEmail: (email: string) => void;
    password: string;
    changePassword: (email: string) => void;
    repeatedRequest: boolean;
    changeRepeatedRequest: (status: boolean) => void;
};
type Props = {
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContext>({
    email: '',
    changeEmail: () => {
        return;
    },
    password: '',
    changePassword: () => {
        return;
    },
    repeatedRequest: false,
    changeRepeatedRequest: () => {
        return;
    },
});

export const AuthProvider = ({ children }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedRequest, setRepeatedRequest] = useState(false);

    const changeEmail = (email: string) => {
        setEmail(email);
    };

    const changePassword = (password: string) => {
        setPassword(password);
    };

    const changeRepeatedRequest = (status: boolean) => {
        setRepeatedRequest(status);
    };

    return (
        <AuthContext.Provider
            value={{
                email,
                changeEmail,
                password,
                changePassword,
                repeatedRequest,
                changeRepeatedRequest,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
