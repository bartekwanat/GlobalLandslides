import { createSlice } from '@reduxjs/toolkit';
export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        categories: [],
        triggers: [],
        fatalityComparisonType: "equal",
        fatalityValue: {
            minOrSingleValue: '',
            max: ''
        },
        injuryComparisonType: "equal",
        injuryValue: {
            minOrSingleValue: '',
            max: ''
        },
        hasPhoto: false,
    },
    reducers: {
        setFilters: (state, action) => {
            Object.assign(state, action.payload);
        }
    },
});

export const { setFilters} = filtersSlice.actions;

export default filtersSlice.reducer;
