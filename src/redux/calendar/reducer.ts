import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Training = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: {
        _id: string;
        name: string;
        replays: number;
        weight: number;
        approaches: number;
        isImplementation: boolean;
    }[];
};

type CalendarState = {
    isDrawer: boolean;
    trainings: Training[];
};

const initialState: CalendarState = {
    isDrawer: false,
    trainings: [],
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        showDrawer: (state) => {
            state.isDrawer = true;
        },
        hideDrawer: (state) => {
            state.isDrawer = false;
        },
        setTrainings: (state, action: PayloadAction<Training[]>) => {
            state.trainings = action.payload;
        },
    },
});

export const { showDrawer, hideDrawer, setTrainings } = calendarSlice.actions;
export default calendarSlice.reducer;
