import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#eee',
        },
    },
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#eee',
                    '&.Mui-checked': {
                        color: '#eee',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: '#eee',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#eee',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#eee',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#eee',
                    },
                    '& .MuiInputBase-input': {
                        color: '#eee',
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:before': {
                        borderBottomColor: '#eee',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottomColor: '#eee',
                    },
                    '&:after': {
                        borderBottomColor: '#eee',
                    },
                },
                input: {
                    color: '#eee',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#333',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    color: '#eee',
                    '& .MuiChip-deleteIcon': {
                        color: '#eee',
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    color: '#eee',
                    '&.Mui-selected': {
                        backgroundColor: '#555',
                    },
                    '&:hover': {
                        backgroundColor: '#444',
                    },
                },
            },
        },
    },
    typography: {
        allVariants: {
            color: '#eee',
        },
    },
});

