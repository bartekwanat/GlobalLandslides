import { Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Box } from '@mui/material';

const TriggerFilter = ( {selectedTriggers, setSelectedTriggers}) => {
    const triggers = [
        'monsoon', 'freeze_thaw', 'dam_embankment_collapse', 'construction',
        'no_apparent_trigger', 'tropical_cyclone', 'leaking_pipe', 'unknown',
        'earthquake', 'continuous_rain', 'rain', 'flooding',
        'vibration', 'mining', 'downpour', 'volcano',
        'other', 'snowfall_snowmelt',
    ];

    const handleChange = (event) => {
        setSelectedTriggers(event.target.value);
    };

    const handleDelete = (triggerToDelete) => () => {
        setSelectedTriggers(selectedTriggers.filter((trigger) => trigger !== triggerToDelete));
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="trigger-multiple-chip-label">Landslide Trigger</InputLabel>
            <Select
                labelId="trigger-multiple-chip-label"
                multiple
                value={selectedTriggers}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip-trigger" label="Landslide Trigger" />}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 224,
                            width: 250,
                        },
                    },
                }}
            >
                {triggers.map((trigger) => (
                    <MenuItem key={trigger} value={trigger}>
                        {trigger}
                    </MenuItem>
                ))}
            </Select>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 2 }}>
                {selectedTriggers.map((trigger) => (
                    <Chip
                        key={trigger}
                        label={trigger}
                        onDelete={handleDelete(trigger)}
                    />
                ))}
            </Box>
        </FormControl>
    );
};

export default TriggerFilter;
