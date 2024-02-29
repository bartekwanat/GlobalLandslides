import { createSlice } from '@reduxjs/toolkit';

export const boundsSlice = createSlice({
    name: 'bounds',
    initialState: {
        north: 0,
        south: 0,
        east: 0,
        west: 0,
    },
    reducers: {
        setBounds: (state, action) => {
            const { north, south, east, west } = action.payload;
            state.north = north;
            state.south = south;
            state.east = east;
            state.west = west;
        },
    },
});

export const { setBounds } = boundsSlice.actions;

export default boundsSlice.reducer;
