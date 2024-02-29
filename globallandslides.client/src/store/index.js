import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import boundsReducer from './boundsSlice';
import zoomLevelReducer from './zoomLevelSlice';
import resultCountReducer from './resultCountSlice.js'

export const store = configureStore({
    reducer: {
        bounds: boundsReducer,
        zoomLevel: zoomLevelReducer,
        filters: filtersReducer,
        resultCount: resultCountReducer
    },
});