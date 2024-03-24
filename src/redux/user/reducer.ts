import { Profile } from '@models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type UserProfileState = {
    profile?: Profile;
};

const initialState: UserProfileState = {};

const userProfileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload;
        },
    },
});

export const { setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
