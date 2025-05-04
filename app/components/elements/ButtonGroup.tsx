import * as React from 'react';
import { Button, ButtonGroup } from '@mui/material';

type ButtonGroupItem = {
    label: string;
    value: string;
    disabled?: boolean;
};

type ReusableButtonGroupProps<T extends string> = {
    buttons: { label: string; value: T; disabled?: boolean }[];
    selected: T;
    onChange: (value: T) => void;
    orientation?: 'horizontal' | 'vertical';
    ariaLabel?: string;
};

export default function ReusableButtonGroup<T extends string>({
    buttons,
    selected,
    onChange,
    orientation = 'horizontal',
    ariaLabel = 'button group',
}: ReusableButtonGroupProps<T>) {
    return (
        <ButtonGroup
            variant="outlined"
            orientation={orientation}
            aria-label={ariaLabel}
        // sx={{
        //     '& .MuiButtonGroup-grouped': {
        //         minWidth: 90,
        //         borderRadius: 0,
        //         textTransform: 'none',
        //     },
        //     '& .MuiButtonGroup-grouped:not(:last-of-type)': {
        //         borderRightColor: 'divider',
        //     },
        //     '& .MuiButtonGroup-grouped:first-of-type': {
        //         borderTopLeftRadius: 2,
        //         borderBottomLeftRadius: 2,
        //     },
        //     '& .MuiButtonGroup-grouped:last-of-type': {
        //         borderTopRightRadius: 2,
        //         borderBottomRightRadius: 2,
        //     },
        // }}
        >
            {buttons.map((btn, idx) => {
                const isSelected = selected === btn.value;
                return (
                    <Button
                        key={idx}
                        onClick={() => onChange(btn.value)}
                        disabled={btn.disabled}
                        sx={{
                            border: 0,
                            backgroundColor: isSelected ? 'primary.main' : 'transparent',
                            color: isSelected ? 'white' : 'primary.main',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        {btn.label}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
}
