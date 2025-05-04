import React from "react";
import { Autocomplete, Box, SxProps, TextField, Theme } from "@mui/material";

interface Option {
    value: string;
    label: string;
}

interface AutocompleteDropdownProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    value: Option | null;
    onChange: (value: Option | null) => void;
    options: Option[];
    size?: "small" | "medium";
    sx?: SxProps<Theme>;
}

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
    id,
    name,
    label,
    placeholder = "Select an option",
    value,
    onChange,
    options,
    size = "small",
    sx = {},
}) => {
    return (
        <Autocomplete
            id={id}
            options={options}
            value={value}
            onChange={(_event, newValue) => onChange(newValue)}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, val) => option.value === val?.value}
            size={size}
            sx={sx}
            ListboxProps={{
                sx: {
                    padding: 0,
                }
            }}
            renderOption={(props, option, { selected }) => (
                <Box
                    component="li"
                    {...props}
                    className="capitalize hover:bg-[#e6f6f7] hover:text-[#000000] "
                    sx={{
                        backgroundColor: 'white',
                        color: 'neutral.main',
                        '&[aria-selected="true"]': {
                            backgroundColor: 'secondary.main',
                            color: '#000000',
                        },
                        cursor: 'pointer',
                        px: 2,
                        py: 1,
                    }}
                >
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={name}
                    variant="outlined"
                    size={size}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        ...params.inputProps,
                        placeholder,
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "2px",
                            color: "neutral.main",
                            "& fieldset": {
                                borderColor: "neutral.main",
                            },
                            "&:hover fieldset": {
                                borderColor: "neutral.main",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                            },
                        },
                        "& .MuiAutocomplete-endAdornment svg": {
                            color: "neutral.main",
                        },
                    }}
                />
            )}
        />
    );
};

export default AutocompleteDropdown;
