import React from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';
import './index.css';
import { GlobalStateProvider } from './context/GlobalStateProvider';
import { Router } from './router';
import { AuthProvider } from './context/AuthContext';
import { LoaderProvider } from './context/LoaderContext';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <LoaderProvider>
            <GlobalStateProvider>
                <AuthProvider>
                    <Router />
                </AuthProvider>
            </GlobalStateProvider>
        </LoaderProvider>
    </React.StrictMode>,
);
