import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React from "react";

type AvatarProps = {
    name?: string;
};

export default function AccountMenu({ name }: AvatarProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar />
                    </IconButton>
                </Tooltip>
                <Typography variant="body1" sx={{ ml: 1 }} color="text.secondary">
                    {name}
                </Typography>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar sx={{ width: 32, height: 32, padding: 3 }}>RK</Avatar> <span className="font-semibold"> {name}</span>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <img src="/icons/CirclePlus.svg" alt="Loading..." />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <img src="/icons/Settings.svg" alt="Loading..." />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <img src="/icons/Logout.svg" alt="Loading..." />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
