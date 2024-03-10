import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Training, TrainingsListItem } from '@models/trainings';

type CalendarState = {
    isDrawer: boolean;
    trainings: Training[];
    trainingsList: TrainingsListItem[];
};

const initialState: CalendarState = {
    isDrawer: false,
    trainings: [],
    trainingsList: [],
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
        setTrainingsList: (state, action: PayloadAction<TrainingsListItem[]>) => {
            state.trainingsList = action.payload;
        },
    },
});

export const { showDrawer, hideDrawer, setTrainings, setTrainingsList } = calendarSlice.actions;
export default calendarSlice.reducer;
