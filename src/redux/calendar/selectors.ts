import { createSelector } from 'reselect';
import { RootState } from '../configure-store.ts';

const selectCalendarSlice = (state: RootState) => state.calendar;

export const selectIsDrawer = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.isDrawer,
);

export const selectTrainings = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.trainings,
);

export const selectTrainingsList = createSelector(
    [selectCalendarSlice],
    (calendar) => calendar.trainingsList,
);
