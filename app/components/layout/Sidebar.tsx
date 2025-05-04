import { useState, useEffect } from "react";
import { NavLink } from "@remix-run/react";
import { Box, Tooltip } from "@mui/material";
import clsx from "clsx";

const iconMap: Record<string, string> = {
    "Home": "/icons/Home.svg",
    "Connection": "/icons/Connection1.svg",
    "Meta Data": "/icons/MetaData.svg",
    "Business Glossary": "/icons/BusinessGlossary.svg",
    "Lineage": "/icons/Lineage.svg",
    "Data Product": "/icons/DataProduct.svg",
    "Management": "/icons/Management.svg",
};

const navItems = [
    { to: "/admin/home-admin", label: "Home" },
    { to: "/admin/connection", label: "Connection" },
    { to: "/admin/meta-data", label: "Meta Data" },
    { to: "/admin/business-glossary", label: "Business Glossary" },
    { to: "/admin/lineage", label: "Lineage" },
    { to: "/admin/data-product", label: "Data Product" },
    { to: "/admin/management", label: "Management" }
];

export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1168);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggle = () => {
        setExpanded((prev) => !prev);
    };

    const handleNavClick = () => {
        if (isMobile) {
            setExpanded(false);
        }
    };

    return (
        <>
            <Box
                className={clsx(
                    "bg-gray-50 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-lg p-4 z-40",
                    isMobile
                        ? "fixed top-[5.2rem] left-0 h-full"
                        : "relative h-full",
                    isMobile
                        ? expanded
                            ? "sm:w-[30%] translate-x-0"
                            : "w-0 -translate-x-full"
                        : expanded
                            ? "w-[18%]"
                            : "w-[7%]"
                )}
                style={{ transition: "all 0.3s ease-in-out" }}
            >
                <div className="flex flex-col items-center gap-4 overflow-y-auto">
                    {navItems.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={handleNavClick}
                            className={({ isActive }) =>
                                clsx(
                                    "flex items-center w-full sm:px-4 sm:py-3 px-2 py-2 gap-1 rounded-lg transition-colors duration-200",
                                    isActive ? "bg-[#85bec3] text-black" : "text-gray-600 hover:bg-gray-100",
                                    expanded ? "justify-start" : "justify-center"
                                )
                            }
                        >
                            <Tooltip title={label} arrow disableHoverListener={expanded}>
                                <div className="flex flex-col items-center">
                                    <img
                                        src={iconMap[label]}
                                        alt={label}
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                    />
                                </div>
                            </Tooltip>
                            {expanded && (
                                <span className="text-[0.8rem] sm:text-xs md:text-sm font-medium">
                                    {label}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </div>

                {!isMobile && (
                    <div
                        onClick={handleToggle}
                        className={clsx(
                            "absolute right-0 bottom-6 z-50",
                            "p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-500 transition-colors duration-200 shadow-md cursor-pointer"
                        )}
                    >
                        {expanded ? (
                            <img src="/icons/ChevronLeft.svg" alt="Collapse" />
                        ) : (
                            <img src="/icons/ChevronRight.svg" alt="Expand" />
                        )}
                    </div>
                )}
            </Box>

            {isMobile && (
                <div
                    onClick={handleToggle}
                    className={clsx(
                        "fixed bottom-6 left-6 z-50",
                        "p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-500 transition-colors duration-200 shadow-md cursor-pointer"
                    )}
                >
                    {expanded ? (
                        <img src="/icons/ChevronLeft.svg" alt="Collapse" />
                    ) : (
                        <img src="/icons/ChevronRight.svg" alt="Expand" />
                    )}
                </div>
            )}
        </>
    );
}
