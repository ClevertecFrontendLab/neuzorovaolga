import { createSelector } from 'reselect';
import { RootState } from '../configure-store.ts';

const selectUserProfileSlice = (state: RootState) => state.userProfile;

export const selectUserProfile = createSelector([selectUserProfileSlice], (user) => user.profile);

export const selectUserImageSrc = createSelector(
    [selectUserProfileSlice],
    (user) => user.profile?.imgSrc,
);

export const selectUserEmail = createSelector(
    [selectUserProfileSlice],
    (user) => user.profile?.email,
);

export const selectUserActiveTariff = createSelector(
    [selectUserProfileSlice],
    (user) => user.profile?.tariff,
);

export const selectUserTariffList = createSelector(
    [selectUserProfileSlice],
    (user) => user.tariffList,
);
