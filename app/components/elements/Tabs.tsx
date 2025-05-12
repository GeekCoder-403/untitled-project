import React from "react";
import { Box, Tab, Tabs } from "@mui/material";

interface TabItem {
    label: string;
    content: React.ReactNode;
}

interface CustomMuiTabsProps {
    tabs: TabItem[];
    className?: string;
}

function CustomMuiTabs({ tabs, className = "" }: CustomMuiTabsProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box className={className}>
            <Box
                className="border rounded-sm p-1 max-w-fit"
                sx={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": {
                        height: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ccc",
                        borderRadius: "3px",
                    },
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="responsive scrollable tabs"
                    TabIndicatorProps={{ style: { display: "none" } }}
                    sx={{
                        minHeight: 0,
                        "& .MuiTabs-flexContainer": {
                            gap: 1,
                            flexWrap: "nowrap",
                        },
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            disableRipple
                            sx={{
                                fontFamily: "sans-serif",
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                px: 2,
                                py: 1,
                                minHeight: 0,
                                borderRadius: "2px",
                                color: "#85bec3",
                                whiteSpace: "nowrap",
                                "&.Mui-selected": {
                                    color: "#ffffff",
                                    backgroundColor: "#85bec3",
                                },
                                "&:hover": {
                                    backgroundColor: "#85bec3",
                                    color: "#ffffff",
                                },
                                "&.Mui-disabled": {
                                    cursor: "not-allowed",
                                    color: "#ccc",
                                },
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    role="tabpanel"
                    hidden={value !== index}
                    id={`custom-tabpanel-${index}`}
                    aria-labelledby={`custom-tab-${index}`}
                >
                    {value === index && <Box>{tab.content}</Box>}
                </div>
            ))}
        </Box>
    );
}

export default CustomMuiTabs;
