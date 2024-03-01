import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru',
});

const onFulfilled = (response: AxiosResponse) => {
    return response?.data;
};

const onRejected = (reject: any): Promise<any> => {
    return Promise.reject(reject?.response);
};

instance.interceptors.response.use(onFulfilled, onRejected);
instance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');
    return {
        ...config,
        headers: { ...config.headers, Authorization: token ? `Bearer ${token}` : undefined },
    };
});
