import { Profile, TariffItem } from '@models/user';
import { instance } from './index';

export const getUserRequest = (): Promise<Profile> => {
    return instance.get('/user/me');
};

export const getUserCatalogsTariffRequest = (): Promise<TariffItem[]> => {
    return instance.get('/catalogs/tariff-list');
};
