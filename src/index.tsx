import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages';

import 'normalize.css';
import './index.css';
import { GlobalStateProvider } from './context/GlobalStateProvider';
import { ErrorLoginPage } from '@pages/error-login-page/error-login-page';
import { SuccessPage } from '@pages/success-page/success-page';
import { ErrorUserExistPage } from '@pages/error-user-exist-page/error-user-exist-page';
import { ServerErrorPage } from '@pages/server-error-page/server-error-page';
import { ErrorCheckEmailNoExistPage } from '@pages/error-check-email-no-exist-page/error-check-email-no-exist-page';
import { ErrorChangePasswordPage } from '@pages/error-change-password-page/error-change-password-page';
import { SuccessChangePasswordPage } from '@pages/success-change-password-page/success-change-password-page';
import { LoginPage } from '@pages/login-page/login-page';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalStateProvider>
                <Routes>
                    <Route path='/result/error-login' element={<ErrorLoginPage />} />
                    <Route path='/result/success' element={<SuccessPage />} />
                    <Route path='/result/error-user-exist' element={<ErrorUserExistPage />} />
                    <Route path='/result/error' element={<ServerErrorPage />} />
                    <Route
                        path='/result/error-check-email-no-exist'
                        element={<ErrorCheckEmailNoExistPage />}
                    />
                    <Route
                        path='/result/error-change-password'
                        element={<ErrorChangePasswordPage />}
                    />

                    {/* <Route path='/result/error-check-email' element={<ErrorCheckEmailPage />} /> */}
                    <Route
                        path='/result/success-change-password'
                        element={<SuccessChangePasswordPage />}
                    />
                    <Route path='/auth' element={<LoginPage />} />
                    <Route path='/' element={<MainPage />} />
                </Routes>
            </GlobalStateProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
