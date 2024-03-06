import { instance } from './index';
import { Feedback } from '@pages/feedbacks-page/feedbacks-page.tsx';

type FeedbackResponse = {
    accessToken: string;
};

export const getFeedbacksRequest = (): Promise<Feedback[]> => {
    return instance.get('/feedback');
};

export const createFeedbackRequest = (
    message: string,
    rating: number,
): Promise<FeedbackResponse> => {
    return instance.post('/feedback', {
        message: message,
        rating: rating,
    });
};
