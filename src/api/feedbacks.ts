import { instance } from './index';

interface IFeedbackResponse {
    accessToken: string;
}

export const feedbacksRequest = () => {
    return instance.get('/feedback');
};

export const feedbacksUserRequest = (
    message: string,
    rating: number,
): Promise<IFeedbackResponse> => {
    return instance.post('/feedback', {
        message: message,
        rating: rating,
    });
};
