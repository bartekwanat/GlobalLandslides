import { createSlice } from '@reduxjs/toolkit';

export const zoomLevelSlice = createSlice({
    name: 'zoomLevel',
    initialState: {
        value: 2,
    },
    reducers: {
        setZoomLevel: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setZoomLevel } = zoomLevelSlice.actions;

export default zoomLevelSlice.reducer;