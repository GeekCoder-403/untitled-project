// ReusableMenu.tsx

import * as React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { EllipsisVertical } from 'lucide-react';

export interface MenuOption {
    label: string;
    action: (row: any) => void;
    icon?: React.ReactNode;
}

interface ReusableMenuProps {
    options: MenuOption[];
    row: any;
}

const ITEM_HEIGHT = 48;

const ReusableMenu: React.FC<ReusableMenuProps> = ({ options, row }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
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
                open={open}
                anchorEl={anchorEl}
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
                            marginTop: -10,
                        },
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            option.action(row);
                            handleClose();
                        }}
                        sx={{
                            backgroundColor: "#ffffff",
                            '&:hover': {
                                backgroundColor: "secondary.main",
                            },
                        }}
                    >
                        <ListItemText
                            primary={option.label}
                            primaryTypographyProps={{ color: "#000000" }}
                        />
                    </MenuItem>

                ))
                }
            </Menu >
        </div >
    );
};

export default ReusableMenu;
