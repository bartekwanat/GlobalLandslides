import { Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Box } from '@mui/material';

function CategoryFilter({ selectedCategories, setSelectedCategories}) {

    const categories = [
        'landslide', 'debris_flow', 'unknown', 'mudslide',
        'rock_fall', 'snow_avalanche', 'creep', 'complex',
        'earth_flow', 'lahar', 'translational_slide', 'riverbank_collapse',
        'other', 'topple',
    ];

    const handleChange = (event) => {
        setSelectedCategories(event.target.value);
    };

    const handleDelete = (chipToDelete) => () => {
        setSelectedCategories(selectedCategories.filter((chip) => chip !== chipToDelete));
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">Landslide Categories</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                multiple
                value={selectedCategories}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Landslide Categories" />}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 224,
                            width: 250,
                        },
                    },
                }}
            >
                {categories.map((name) => (
                    <MenuItem key={name} value={name} selected={selectedCategories.indexOf(name) > -1}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 2 }}>
                {selectedCategories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        onDelete={handleDelete(category)}
                    />
                ))}
            </Box>
        </FormControl>
    );
}

export default CategoryFilter;
