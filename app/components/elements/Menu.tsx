import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { EllipsisVertical } from 'lucide-react';

interface ReusableMenuProps {
    options: string[];
    onSelect: (option: string) => void;
}

const ITEM_HEIGHT = 48;

const ReusableMenu: React.FC<ReusableMenuProps> = ({ options, onSelect }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (option: string) => {
        onSelect(option);
        handleClose();
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                    padding: 0.1,
                    color: "#000000",
                    borderRadius: 0,
                    backgroundColor: "primary.main",
                }}
            >
                <EllipsisVertical />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                    disablePadding: true,
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            padding: '0',
                            borderRadius: '0',
                            border: '1px solid #6b7280',
                            backgroundColor: "#ffffff",
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                            boxShadow: 'none',
                            marginTop: -18,
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={() => handleSelect(option)}
                        sx={{
                            color: "#000000",
                            backgroundColor: "#ffffff",
                            '&:hover': {
                                backgroundColor: "secondary.main",
                                color: "#000000",
                            },
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ReusableMenu;
