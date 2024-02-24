import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { store, history } from './redux/configure-store';

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
                    <Provider store={store}>
                        <HistoryRouter history={history}>
                            <Router />
                        </HistoryRouter>
                    </Provider>
                </AuthProvider>
            </GlobalStateProvider>
        </LoaderProvider>
    </React.StrictMode>,
);
