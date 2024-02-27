export const regexPasswordValidation = (value: string) => {
    const regexValue = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
    return regexValue.test(value);
};
