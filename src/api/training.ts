import { instance } from './index';
import { Training } from '@redux/calendar/reducer.ts';

export const getTrainingsRequest = (): Promise<Training[]> => {
    return instance.get('/training');
};

export const createTrainingRequest = (
    trainingData: Omit<Training, '_id' | 'isImplementation' | 'userId'>,
): Promise<Training> => {
    return instance.post('/training', trainingData);
};

export const updateTrainingRequest = (
    trainingId: string,
    trainingData: Omit<Training, '_id' | 'isImplementation' | 'userId'>,
): Promise<Training> => {
    return instance.put(`/training/${trainingId}`, trainingData);
};

export const deleteTrainingRequest = (trainingId: string): Promise<void> => {
    return instance.delete(`/training/${trainingId}`);
};
