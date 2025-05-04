import React from "react";
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    SelectChangeEvent,
} from "@mui/material";

interface DropdownProps {
    id: string;
    name: string;
    label?: string;
    options?: { value: string | number; label: string }[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    size?: "small" | "medium";
    style?: React.CSSProperties;
    isMulti?: boolean;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    id,
    name,
    label,
    options = [],
    value = "",
    onChange,
    onBlur,
    placeholder = "None",
    size = "medium",
    style,
    isMulti = false,
    className = "",
}) => {
    const safeValue = isMulti ? (Array.isArray(value) ? value : []) : (value as string);

    const handleChange = (event: SelectChangeEvent<string | string[]>) => {
        const selectedValues = event.target.value;
        const normalizedValue = isMulti ? (selectedValues as string[]) : (selectedValues as string);

        if (onChange) {
            onChange(normalizedValue);
        }
    };

    return (
        <FormControl
            sx={{
                backgroundColor: "#ffffff",
                width: 200,

            }}
            size={size}
            className={className}
        >
            <Select
                labelId={`${name}-label`}
                id={`${name}-select`}
                name={name}
                multiple={isMulti}
                value={safeValue}
                onChange={handleChange}
                onBlur={onBlur}
                displayEmpty
                sx={{
                    borderRadius: 0,
                    color: "tertiary.main",
                    '& .MuiSelect-select': {
                        color: "#000000",
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: "tertiary.main",
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "tertiary.main",
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "tertiary.main",
                    },
                    '.MuiSelect-icon': {
                        color: "tertiary.main",
                    },
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: "#ffffff",
                            padding: 0,
                        },
                    },
                }}
            >
                {placeholder && (
                    <MenuItem
                        value=""
                        sx={{
                            color: "tertiary.main",
                            backgroundColor: "#fff",
                            '&.Mui-selected': {
                                color: "#000000",
                                backgroundColor: "secondary.main",
                            },
                            '&.Mui-selected:hover': {
                                color: "#000000",
                                backgroundColor: "secondary.main",
                            },
                            '&:hover': {
                                color: "#000000",
                                backgroundColor: "secondary.main",
                            },
                        }}
                    >
                        <em>{placeholder}</em>
                    </MenuItem>
                )}
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        sx={{
                            color: "tertiary.main",
                            backgroundColor: "#ffffff",
                            '&.Mui-selected': {
                                color: "#000000",
                                backgroundColor: "secondary.main",
                            },
                            '&.Mui-selected:hover': {
                                color: "#000000",
                                backgroundColor: "secondary.main",
                            },
                            '&:hover': {
                                color: "#000000",
                                backgroundColor: "secondary.main",
                            },
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
