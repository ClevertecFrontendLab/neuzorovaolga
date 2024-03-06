import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import { store, history } from './redux/configure-store';

import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';
import '../src/styles/colors.css';
import '../src/styles/variables.css';
import { Router } from './router';
import { GlobalProvider } from '@context/GlobalContext';
import { AuthProvider } from '@context/AuthContext';
import { LoaderProvider } from '@context/LoaderContext';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <LoaderProvider>
            <GlobalProvider>
                <AuthProvider>
                    <Provider store={store}>
                        <HistoryRouter history={history}>
                            <Router />
                        </HistoryRouter>
                    </Provider>
                </AuthProvider>
            </GlobalProvider>
        </LoaderProvider>
    </React.StrictMode>,
);
