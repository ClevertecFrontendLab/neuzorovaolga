import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages';

import { ErrorLoginPage } from '@pages/error-login-page/error-login-page';
import { SuccessPage } from '@pages/success-page/success-page';
import { ErrorUserExistPage } from '@pages/error-user-exist-page/error-user-exist-page';
import { ServerErrorPage } from '@pages/server-error-page/server-error-page';
import { ErrorCheckEmailNoExistPage } from '@pages/error-check-email-no-exist-page/error-check-email-no-exist-page';
import { ErrorChangePasswordPage } from '@pages/error-change-password-page/error-change-password-page';
import { SuccessChangePasswordPage } from '@pages/success-change-password-page/success-change-password-page';
import { LoginPage } from '@pages/login-page/login-page';
import { RegistrationPage } from '@pages/registration-page/registration-page';
import { ErrorCheckEmailPage } from '@pages/error-check-email/error-check-email';
import { ConfirmEmailPage } from '@pages/confirm-email-page/confirm-email-page';
import { ChangePasswordPage } from '@pages/change-password-page/change-password-page';
import { PrivateHistoryRoute } from '@components/private-history-route/private-history-route';

export const PATH = {
    ERROR_LOGIN: '/result/error-login',
    SUCCESS: '/result/success',
    ERROR_USER_EXIST: '/result/error-user-exist',
    ERROR: '/result/error',
    ERROR_CHECK_EMAIL_NO_EXIST: '/result/error-check-email-no-exist',
    ERROR_CHANGE_PASSWORD: '/result/error-change-password',
    ERROR_CHECK_EMAIL: '/result/error-check-email',
    SUCCESS_CHANGE_PASSWORD: '/result/success-change-password',
    CONFIRM_EMAIL: '/auth/confirm-email',
    CHANGE_PASSWORD: '/auth/change-password',
    AUTH: '/auth',
    REGISTRATION: '/auth/registration',
    MAIN: '/main',
    DEFAULT: '*',
};

export const Router: React.FC = () => (
    <Routes>
        <Route
            path={PATH.ERROR_LOGIN}
            element={<PrivateHistoryRoute component={<ErrorLoginPage />} />}
        />
        <Route path={PATH.SUCCESS} element={<PrivateHistoryRoute component={<SuccessPage />} />} />
        <Route
            path={PATH.ERROR_USER_EXIST}
            element={<PrivateHistoryRoute component={<ErrorUserExistPage />} />}
        />
        <Route
            path={PATH.ERROR}
            element={<PrivateHistoryRoute component={<ServerErrorPage />} />}
        />
        <Route
            path={PATH.ERROR_CHECK_EMAIL_NO_EXIST}
            element={<PrivateHistoryRoute component={<ErrorCheckEmailNoExistPage />} />}
        />
        <Route
            path={PATH.ERROR_CHANGE_PASSWORD}
            element={<PrivateHistoryRoute component={<ErrorChangePasswordPage />} />}
        />
        <Route
            path={PATH.ERROR_CHECK_EMAIL}
            element={<PrivateHistoryRoute component={<ErrorCheckEmailPage />} />}
        />
        <Route
            path={PATH.SUCCESS_CHANGE_PASSWORD}
            element={<PrivateHistoryRoute component={<SuccessChangePasswordPage />} />}
        />
        <Route
            path={PATH.CONFIRM_EMAIL}
            element={<PrivateHistoryRoute component={<ConfirmEmailPage />} />}
        />
        <Route
            path={PATH.CHANGE_PASSWORD}
            element={<PrivateHistoryRoute component={<ChangePasswordPage />} />}
        />
        <Route
            path={PATH.REGISTRATION}
            element={<PrivateHistoryRoute component={<RegistrationPage />} />}
        />
        <Route path={PATH.AUTH} element={<LoginPage />} />
        <Route path={PATH.MAIN} element={<MainPage />} />
        <Route path={PATH.DEFAULT} element={<Navigate to={PATH.AUTH} replace />} />
    </Routes>
);
