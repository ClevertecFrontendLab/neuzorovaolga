import { Profile, TariffItem } from '@models/user';
import { instance } from './index';

export const getUserRequest = (): Promise<Profile> => {
    return instance.get('/user/me');
};

export const getUserCatalogsTariffRequest = (): Promise<TariffItem[]> => {
    return instance.get('/catalogs/tariff-list');
};

export const getUserActiveTariffRequest = (): Promise<TariffItem[]> => {
    return instance.get('/catalogs/tariff-list');
};

export const connectionProTariffRequest = (tariffId: string | undefined, days: number) => {
    return instance.post(
        '/tariff',
        {
            tariffId: tariffId,
            days: days,
        },
        { withCredentials: true },
    );
};
