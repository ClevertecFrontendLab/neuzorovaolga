import React from 'react';
import { createRoot } from 'react-dom/client';

import 'normalize.css';
import './index.css';
import { GlobalStateProvider } from './context/GlobalStateProvider';
import { Router } from './router';
import { AuthProvider } from './context/AuthContext';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <GlobalStateProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </GlobalStateProvider>
    </React.StrictMode>,
);
