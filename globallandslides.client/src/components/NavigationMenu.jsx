import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '5vh',
                position: 'fixed',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                paddingLeft: '20px',
                paddingRight: '20px',
                fontSize: '1.3rem',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                '& a': {
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: '#0B3E91',
                    marginLeft: '30px',
                    position: 'relative',
                    fontWeight: 'normal',
                    fontSize: 'inherit',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0',
                        height: '2px',
                        bottom: 0,
                        left: 0,
                        bgcolor: '#eee',
                        transition: 'width 0.3s',
                    },
                    '&:hover::after': {
                        width: '100%',
                    },
                },
            }}
        >
            <NavLink
                to="/"
                style={({ isActive }) =>
                    isActive ? { color: '#eee', fontWeight: 'bold', fontSize: '1.5rem' } : undefined
                }
            >
                Map
            </NavLink>
            <NavLink
                to="/create-chart"
                style={({ isActive }) =>
                    isActive ? { color: '#eee', fontWeight: 'bold', fontSize: '1.5rem' } : undefined
                }
            >
                Chart
            </NavLink>
        </Box>
    );
};

export default NavigationMenu;
