import { Box, Typography } from '@mui/material';
import nasaLogo from '../assets/nasa.png';
const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%',
                color: 'text.secondary',
                p: 3,
                position: 'fixed',
                bottom: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >

            <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="body1">
                    Global landslides application
                </Typography>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '20px', flex: 1 }}>
                <Typography variant="body2" sx={{ marginRight: '10px' }}>
                    Powered by NASA dataset
                </Typography>
                <img
                    src={nasaLogo}
                    alt="NASA Logo"
                    style={{ height: '75px' }}
                />
            </Box>
        </Box>
    );
};


export default Footer;
