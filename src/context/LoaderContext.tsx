import { Loader } from '@components/loader/loader';
import React, { createContext, useState } from 'react';

export interface GlobalStateInterface {
    showLoader: () => void;
    hideLoader: () => void;
}
interface Props {
    children: React.ReactNode;
}

export const LoaderContext = createContext<GlobalStateInterface>({
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
