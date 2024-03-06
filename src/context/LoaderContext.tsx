import { Loader } from '@components/loader/loader';
import React, { createContext, useState } from 'react';

export type GlobalStateType = {
    showLoader: () => void;
    hideLoader: () => void;
};
type Props = {
    children: React.ReactNode;
};

export const LoaderContext = createContext<GlobalStateType>({
    showLoader: () => {
        return;
    },
    hideLoader: () => {
        return;
    },
});

export const LoaderProvider = ({ children }: Props) => {
    const [loaderStatus, setLoaderStatus] = useState(false);

    const showLoader = () => {
        setLoaderStatus(true);
    };
    const hideLoader = () => {
        setLoaderStatus(false);
    };

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            <Loader loaderStatus={loaderStatus} />
            {children}
        </LoaderContext.Provider>
    );
};
