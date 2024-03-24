import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import calendarReducer from './calendar/reducer.ts';
import userProfileReducer from './user/reducer.ts'; // Import  user reducer

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        calendar: calendarReducer,
        userProfile: userProfileReducer, // Add user reducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

// Describe RootState
export type RootState = ReturnType<typeof store.getState>;
