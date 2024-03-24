import { createSelector } from 'reselect';
import { RootState } from '../configure-store.ts';

const selectUserProfileSlice = (state: RootState) => state.userProfile;

export const selectUserProfile = createSelector([selectUserProfileSlice], (user) => user.profile);

export const selectUserImageSrc = createSelector(
    [selectUserProfileSlice],
    (user) => user.profile?.imgSrc,
);
