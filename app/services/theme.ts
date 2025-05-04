import {
    createTheme,
    responsiveFontSizes,
    PaletteMode,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        neutral?: { main: string; contrastText?: string };
        surface?: { main: string };
    }
    interface PaletteOptions {
        neutral?: { main: string; contrastText?: string };
        surface?: { main: string };
    }
}

// Function to fetch palette based on mode
const getPalette = (mode: PaletteMode) => ({
    mode,
    primary: {
        main: "#85bec3",
        contrastText: "#ffffff",
    },
    secondary: {
        main: "#e6fbf7",
        contrastText: "#ffffff",
    },
    neutral: {
        main: "#a1a1a1",
        contrastText: "#ffffff",
    },
    tertiary: {
        main: "#6b7280",
        contrastText: "#ffffff",
    },
    error: {
        main: "#f44336",
        contrastText: "#ffffff",
    },
    warning: {
        main: "#ff9800",
        contrastText: "#ffffff",
    },
    info: {
        main: "#2196f3",
        contrastText: "#ffffff",
    },
    success: {
        main: "#4caf50",
        contrastText: "#ffffff",
    },
    text: {
        primary: mode === "dark" ? "#ffffff" : "#121212",
        secondary: mode === "dark" ? "#a1a1a1" : "#666666",
        disabled:
            mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
    },
    background: {
        default: mode === "dark" ? "#121212" : "#f5f5f5",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
    },
    surface: {
        main: mode === "dark" ? "#2b2b2b" : "#e0e0e0",
    },
});

const theme = createTheme({
    palette: getPalette("dark"),
    typography: {
        fontFamily: `"Inter", "Roboto", "Poppins", Arial, sans-serif`,
        allVariants: {
            color: "#ffffff",
        },
        h1: {
            fontSize: "6rem",
            fontWeight: 700,
            lineHeight: 1.167,
            fontFamily: `"Poppins", "Inter", "Roboto", Arial, sans-serif`,
        },
        h2: {
            fontSize: "3.75rem",
            fontWeight: 600,
            lineHeight: 1.2,
            fontFamily: `"Poppins", "Inter", "Roboto", Arial, sans-serif`,
        },
        h3: {
            fontSize: "2.125rem",
            fontWeight: 500,
            lineHeight: 1.235,
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.5,
            fontFamily: `"Roboto", "Inter", "Poppins", Arial, sans-serif`,
        },
        body2: {
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: 1.43,
            fontFamily: `"Roboto", "Inter", "Poppins", Arial, sans-serif`,
        },
        button: {
            fontWeight: 600,
            textTransform: "uppercase",
            fontFamily: `"Inter", "Roboto", Arial, sans-serif`,
        },
    },
    components: {
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    // Add global styles for ButtonGroup root
                    '& .MuiButtonGroup-grouped': {
                        minWidth: 90,
                        borderRadius: 0,
                        textTransform: 'none',
                    },
                    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                        borderRightColor: 'divider',
                    },
                    '& .MuiButtonGroup-grouped:first-of-type': {
                        borderTopLeftRadius: 2,
                        borderBottomLeftRadius: 2,
                    },
                    '& .MuiButtonGroup-grouped:last-of-type': {
                        borderTopRightRadius: 2,
                        borderBottomRightRadius: 2,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    "& .MuiPaginationItem-root": {
                        color: "#000",
                        backgroundColor: "tertiary.main",
                        borderColor: "#ddd",
                        "&:hover": {
                            backgroundColor: "tertiary.main",
                        },
                    },
                    "& .Mui-selected": {
                        backgroundColor: "primary.main",
                        borderColor: "primary.main",
                        "&:hover": {
                            backgroundColor: "primary.main",
                        },
                    },
                },
            },
        },
    },
});

export default responsiveFontSizes(theme);