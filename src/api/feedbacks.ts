import { instance } from './index';

export const feedbacksRequest = () => {
    return instance.get('/feedback');
};
