import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
import { Link } from "@remix-run/react";
import { SxProps, Theme } from "@mui/material";
import { UIButtonProps } from "~/utils/interfaceCollection/ButtonInterface";


const Button: React.FC<UIButtonProps> = ({
    href,
    asLink = false,
    children,
    startIcon,
    endIcon,
    loading = false,
    loadingText = "Loading...",
    sx,
    target,
    rel,
    variant = "contained",
    ...props
}) => {
    if (asLink && !href) {
        throw new Error("UIButton: 'asLink' is true but no 'href' is provided.");
    }

    const defaultStyles: SxProps<Theme> = {

        ...sx,
    };

    return (
        <MuiButton
            component={asLink ? Link : href ? "a" : "button"}
            to={asLink ? href : undefined}
            href={!asLink ? href : undefined}
            target={href && target ? target : undefined}
            rel={href && target ? rel || "noopener noreferrer" : undefined}
            startIcon={!loading && startIcon}
            endIcon={!loading && endIcon}
            disabled={loading || props.disabled}
            aria-busy={loading}
            aria-disabled={loading || props.disabled}
            sx={defaultStyles}
            variant={variant} // Apply default and custom styles
            {...props}
        >
            {loading ? (
                <>
                    <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ marginRight: loadingText ? 1 : 0 }}
                    />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </MuiButton>
    );
};

export default Button;