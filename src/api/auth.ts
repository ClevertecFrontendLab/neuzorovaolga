import { instance } from './index';

export const loginRequest = (email: string, password: string) => {
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
