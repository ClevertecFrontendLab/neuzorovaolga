export const saveTokenHelper = (token: string, remember: boolean) => {
    if (remember) {
        sessionStorage.setItem('token', token);
        localStorage.setItem('token', token);
    } else {
        sessionStorage.setItem('token', token);
    }
};

export const removeTokenHelper = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
};
