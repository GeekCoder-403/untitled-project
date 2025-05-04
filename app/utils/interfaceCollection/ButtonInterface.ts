import { ButtonProps } from "@mui/material";

export interface UIButtonProps extends ButtonProps {
    href?: string;
    asLink?: boolean;
    loading?: boolean;
    loadingText?: string;
    target?: string;
    rel?: string;
}