import { createSelector } from 'reselect';
import { RootState } from '../configure-store.ts';

const selectCalendarSlice = (state: RootState) => state.calendar;

export const selectIsDrawer = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.isDrawer,
);

export const selectIsEditTraining = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.isEditTraining,
);

export const selectTrainings = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.trainings,
);

export const selectTrainingsList = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.trainingsList,
);

export const selectSelectedTraining = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.selectedTraining,
);

export const selectSelectedExercises = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.selectedTraining?.exercises || [],
);
