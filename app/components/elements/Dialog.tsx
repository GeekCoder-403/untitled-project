import * as React from 'react';
import { styled } from '@mui/material/styles';
import { X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    DialogProps,
} from '@mui/material';
import Button from '../elements/Button';

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSubmit?: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    maxWidth?: DialogProps['maxWidth'];
    dividers?: boolean;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiPaper-root': {
        backgroundColor: '#ffffff', // ✅ paper bg white
    },
}));

const CustomDialog: React.FC<CustomDialogProps> = ({
    open,
    onClose,
    title,
    children,
    onSubmit,
    submitLabel = 'Add',
    cancelLabel = 'Cancel',
    maxWidth = 'sm',
    dividers = true,
}) => {
    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth={maxWidth}
            fullWidth
        >
            {/* ✅ Title + Icon background */}
            <Box
                sx={{
                    m: 0,
                    p: 2,
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <DialogTitle
                    id="customized-dialog-title"
                    sx={{
                        m: 0,
                        p: 0,
                        flexGrow: 1,
                        color: 'tertiary.main',
                        fontSize: '1.25rem',
                        fontWeight: 500,
                    }}
                >
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'tertiary.main',
                    }}
                >
                    <X />
                </IconButton>
            </Box>

            <DialogContent dividers={dividers} >{children}</DialogContent>

            {/* Footer */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderTop: '1px solid #e0e0e0',
                }}
            >
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{
                        backgroundColor: 'neutral.main',
                    }}
                >
                    {cancelLabel}
                </Button>
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    sx={{
                        minWidth: 100,
                    }}
                >
                    {submitLabel}
                </Button>
            </Box>
        </BootstrapDialog>
    );
};

export default CustomDialog;
