import React from 'react';
import { Box, TextField, Typography, TextFieldProps } from '@mui/material';

interface LabeledTextFieldProps extends React.ComponentProps<typeof TextField> {
    label: string;
    required?: boolean;
    value: string;
    autoResize?: boolean; // ✅ New prop to enable auto-resize
}

const LabeledTextField: React.FC<LabeledTextFieldProps> = ({
    label,
    required = false,
    value,
    multiline,
    autoResize = false,
    ...textFieldProps
}) => {
    const isError = required && value.trim() === '';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <Typography variant="body1" sx={{ color: 'neutral.main', display: 'flex', alignItems: 'center' }}>
                {label}
                {required && (
                    <span
                        style={{
                            color: isError ? 'red' : 'inherit',
                            marginLeft: '4px',
                        }}
                    >
                        *
                    </span>
                )}
            </Typography>

            <TextField
                fullWidth
                size="small"
                value={value}
                required={required}
                multiline={multiline}
                minRows={autoResize && multiline ? 3 : undefined}
                maxRows={autoResize && multiline ? Infinity : undefined}
                {...textFieldProps}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        color: 'tertiary.main',
                        '& fieldset': {
                            borderColor: 'tertiary.main',
                        },
                        '&:hover fieldset': {
                            borderColor: 'tertiary.main',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'tertiary.main',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: 'tertiary.main',
                    },
                    ...textFieldProps.sx,
                }}
            />
        </Box>
    );
};

export default LabeledTextField;
