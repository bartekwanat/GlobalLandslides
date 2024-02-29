import { FormControl, InputLabel, Select, MenuItem, TextField, Box } from '@mui/material';

const FatalityCountFilter = ({fatalityComparisonType, setFatalityComparisonType, fatalityValue, setFatalityValue}) => {

    const handleComparisonChange = (event) => {
        setFatalityComparisonType(event.target.value);
        setFatalityValue({ minOrSingleValue: '', max: '' });
    };

    const handleValueChange = (prop) => (event) => {
        setFatalityValue({ ...fatalityValue, [prop]: event.target.value });
    };

    const boxStyle = {
        border: '1px solid #bbb ',
        borderRadius: '5px',
        padding: '5px 5px 5px 5px'
    }
    return (
        <Box style={boxStyle}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="comparison-type-label">Fatality count</InputLabel>
                <Select
                    labelId="comparison-type-label"
                    value={fatalityComparisonType}
                    label="Comparison Type"
                    onChange={handleComparisonChange}
                >
                    <MenuItem value="equal">Equal To</MenuItem>
                    <MenuItem value="lessThan">Less Than</MenuItem>
                    <MenuItem value="greaterThan">Greater Than</MenuItem>
                    <MenuItem value="between">Between</MenuItem>
                </Select>
            </FormControl>
            {fatalityComparisonType !== 'between' ? (
                <TextField
                    fullWidth
                    label={fatalityComparisonType === 'equal' ? 'Value' : 'Value'}
                    margin="normal"
                    value={fatalityComparisonType === 'equal' || fatalityComparisonType === 'lessThan' || fatalityComparisonType === 'greaterThan' ? fatalityValue.minOrSingleValue : ''}
                    onChange={handleValueChange('minOrSingleValue')}
                    type="number"
                />
            ) : (
                <Box display="flex" gap={2}>
                    <TextField
                        fullWidth
                        label="Minimum"
                        margin="normal"
                        value={fatalityValue.minOrSingleValue}
                        onChange={handleValueChange('minOrSingleValue')}
                        type="number"
                    />
                    <TextField
                        fullWidth
                        label="Maximum"
                        margin="normal"
                        value={fatalityValue.max}
                        onChange={handleValueChange('max')}
                        type="number"
                    />
                </Box>
            )}
        </Box>
    );
};

export default FatalityCountFilter;
