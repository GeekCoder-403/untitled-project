// ~/components/IOSSwitch.tsx
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';


const IOSSwitch = styled(Switch)(({ theme }) => ({
    width: 37,
    height: 20,
    padding: 0,
    display: 'flex',
    '&:active .MuiSwitch-thumb': {
        width: 16,
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#85bec3',
                opacity: 1,
                border: 0,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 16,
        height: 16,
        borderRadius: 10,
    },
    '& .MuiSwitch-track': {
        borderRadius: 11,
        opacity: 1,
        backgroundColor: '#a1a1a1',
        boxSizing: 'border-box',
    },
}));

export default IOSSwitch;
