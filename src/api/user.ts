import { Profile } from '@models/user';
import { instance } from './index';

export const getUserRequest = (): Promise<Profile> => {
    return instance.get('/user/me');
};
