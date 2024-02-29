import { createSlice } from '@reduxjs/toolkit';

export const resultCountSlice = createSlice({
    name: 'resultcount',
    initialState: {
        value: 0,
    },
    reducers: {
        setResultCount: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setResultCount } = resultCountSlice.actions;

export default resultCountSlice.reducer;