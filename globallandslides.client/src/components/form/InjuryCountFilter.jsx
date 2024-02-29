import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const  InjuryCountFilter = ({ injuryComparisonType, setInjuryComparisonType, injuryValue, setInjuryValue })  => {

    const handleComparisonChange = (event) => {
        setInjuryComparisonType(event.target.value);
        setInjuryValue({ minOrSingleValue: null, max: null });
    };

    const handleValueChange = (prop) => (event) => {
        setInjuryValue({ ...injuryValue, [prop]: event.target.value });
    };

    const boxStyle = {
        border: '1px solid #bbb ',
        borderRadius: '5px',
        padding: '5px 5px 5px 5px'
    }

    return (
        <Box style={boxStyle}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="injury-comparison-type-label">Injury count</InputLabel>
                <Select
                    labelId="injury-comparison-type-label"
                    value={injuryComparisonType}
                    label="Comparison Type"
                    onChange={handleComparisonChange}
                >
                    <MenuItem value="equal">Equal To</MenuItem>
                    <MenuItem value="lessThan">Less Than</MenuItem>
                    <MenuItem value="greaterThan">Greater Than</MenuItem>
                    <MenuItem value="between">Between</MenuItem>
                </Select>
            </FormControl>
            {injuryComparisonType !== 'between' ? (
                <TextField
                    fullWidth
                    label="Value"
                    margin="normal"
                    value={injuryValue.minOrSingleValue}
                    onChange={handleValueChange('minOrSingleValue')}
                    type="number"
                />
            ) : (
                <Box display="flex" gap={2}>
                    <TextField
                        fullWidth
                        label="Minimum"
                        margin="normal"
                        value={injuryValue.minOrSingleValue}
                        onChange={handleValueChange('minOrSingleValue')}
                        type="number"
                    />
                    <TextField
                        fullWidth
                        label="Maximum"
                        margin="normal"
                        value={injuryValue.max}
                        onChange={handleValueChange('max')}
                        type="number"
                    />
                </Box>
            )}
        </Box>
    );
}

export default InjuryCountFilter;
