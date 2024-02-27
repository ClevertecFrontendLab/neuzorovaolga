import { instance } from './index';

interface ILoginResponse {
    accessToken: string;
}

export const loginRequest = (email: string, password: string): Promise<ILoginResponse> => {
    return instance.post('/auth/login', {
        email: email,
        password: password,
    });
};

export const registrationRequest = (email: string, password: string) => {
    return instance.post('/auth/registration', {
        email: email,
        password: password,
    });
};

export const checkEmailRequest = (email: string) => {
    return instance.post('/auth/check-email', {
        email: email,
    });
};

export const confirmEmailRequest = (email: string, code: string) => {
    return instance.post(
        '/auth/confirm-email',
        {
            email: email,
            code: code,
        },
        { withCredentials: true },
    );
};

export const changePasswordRequest = (password: string, confirmPassword: string) => {
    return instance.post(
        '/auth/change-password',
        {
            password: password,
            confirmPassword: confirmPassword,
        },
        { withCredentials: true },
    );
};
