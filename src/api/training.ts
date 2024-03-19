import { Training, TrainingsListItem } from '@models/trainings';
import { instance } from './index';

export const getTrainingsRequest = (): Promise<Training[]> => {
    return instance.get('/training');
};

export const createTrainingRequest = (
    trainingData: Omit<Training, 'id' | 'isImplementation' | 'userId'>,
): Promise<Training> => {
    return instance.post('/training', trainingData);
};

export const updateTrainingRequest = (
    trainingId: string,
    trainingData: Omit<Training, 'id' | 'userId'>,
): Promise<Training> => {
    return instance.put(`/training/${trainingId}`, trainingData);
};

export const deleteTrainingRequest = (trainingId: string): Promise<void> => {
    return instance.delete(`/training/${trainingId}`);
};

export const getTrainingsListRequest = (): Promise<TrainingsListItem[]> => {
    return instance.get('/catalogs/training-list');
};
