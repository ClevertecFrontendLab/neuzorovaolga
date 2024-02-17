import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru',
});

const onFulfilled = (response: AxiosResponse) => {
    return response?.data;
};

const onRejected = (reject: any): Promise<any> => {
    return Promise.reject(reject?.response?.data);
};

instance.interceptors.response.use(onFulfilled, onRejected);
