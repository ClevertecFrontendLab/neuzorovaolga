import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, Training, TrainingsListItem } from '@models/trainings';

const PARAMETERS = {
    repeat: false,
    period: 7,
    jointTraining: false,
    participants: [],
};

type CalendarState = {
    isDrawer: boolean;
    trainings: Training[];
    trainingsList: TrainingsListItem[];
    selectedTraining?: Training;
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
        selectTraining: (state, action: PayloadAction<Omit<Training, 'parameters'>>) => {
            state.selectedTraining = { ...action.payload, parameters: PARAMETERS };
        },
        updateExercises: (state, action: PayloadAction<Exercise[]>) => {
            if (state.selectedTraining) {
                state.selectedTraining.exercises = action.payload;
            }
        },
    },
});

export const {
    showDrawer,
    hideDrawer,
    setTrainings,
    setTrainingsList,
    selectTraining,
    updateExercises,
} = calendarSlice.actions;
export default calendarSlice.reducer;
