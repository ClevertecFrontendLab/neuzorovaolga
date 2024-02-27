import { createSelector } from '@reduxjs/toolkit';

export const getRouterSelector = createSelector([(state) => state.router], (router) => router);
