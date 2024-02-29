
import { Box, FormControlLabel, Checkbox } from '@mui/material';

const ImageFilter = ({hasPhoto, setHasPhoto}) => {

    const handleChange = (event) => {
        setHasPhoto(event.target.checked);
    };

    return (
        <Box padding={2}>
            <FormControlLabel
                style={{color: 'rgba(0, 0, 0, 0.7)'}}
                control={
                    <Checkbox
                        checked={hasPhoto}
                        onChange={handleChange}
                        name="imageAvailable"
                        color="primary"
                    />
                }
                label="Show only data with available images"
            />
        </Box>
    );
};

export default ImageFilter;
