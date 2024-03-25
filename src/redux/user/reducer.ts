import { Profile, TariffItem } from '@models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const FREE_TARIFF: TariffItem = {
    _id: '1',
    name: 'Free',
    isActive: true,
};

type UserProfileState = {
    profile?: Profile;
    tariffList?: TariffItem[];
};

const initialState: UserProfileState = {};

const userProfileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload;
        },
        setUserTariffList: (state, action: PayloadAction<TariffItem[]>) => {
            state.tariffList = [FREE_TARIFF, ...action.payload];
        },
    },
});

export const { setUserProfile, setUserTariffList } = userProfileSlice.actions;
export default userProfileSlice.reducer;
