import { useState, useEffect } from "react";
import { NavLink, useLocation } from "@remix-run/react";
import { Box, Tooltip } from "@mui/material";
import clsx from "clsx";
import { ChevronRight, ChevronUp, ChevronLeft } from "lucide-react";

const iconMap: Record<string, string> = {
    Home: "/icons/Home.svg",
    Analytics: "/icons/Connection1.svg",
    "Product Attribute": "/icons/MetaData.svg",
    "Data Pipeline Engine": "/icons/BusinessGlossary.svg",
    "Smart Data Lineage": "/icons/Lineage.svg",
    "Smart Data Quality Engine": "/icons/DataProduct.svg",
    "Smart Map": "/icons/Management.svg",
};

const navItems = [
    { to: "/admin/analytics", label: "Analytics" },
    { to: "/admin/product-attribute", label: "Product Attribute" },
    { to: "/admin/data-pipeline-engine", label: "Data Pipeline Engine" },
    { to: "/admin/smart-data-quality-engine", label: "Smart Data Quality Engine" },
    { to: "/admin/smart-map", label: "Smart Map" },
    {
        label: "Smart Data Lineage",
        icon: "Smart Data Lineage",
        children: [
            { to: "/admin/smart-data-lineage/connection", label: "Connection" },
            { to: "/admin/smart-data-lineage/meta-data", label: "Meta Data" },
            { to: "/admin/smart-data-lineage/business-glossary", label: "Business Glossary" },
            { to: "/admin/smart-data-lineage/lineage", label: "Lineage" },
            { to: "/admin/smart-data-lineage/data-product", label: "Data Product" },
            { to: "/admin/smart-data-lineage/management", label: "Management" },
        ],
    },
];

export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1168);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        navItems.forEach(({ label, children }) => {
            if (children) {
                const isAnyChildActive = children.some((child) =>
                    location.pathname.startsWith(child.to)
                );
                if (isAnyChildActive) {
                    setOpenSubmenus((prev) => ({ ...prev, [label]: true }));
                }
            }
        });
    }, [location.pathname]);

    const handleToggle = () => setExpanded((prev) => !prev);
    const handleNavClick = () => isMobile && setExpanded(false);
    const toggleSubmenu = (label: string) => {
        setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <>
            <Box
                className={clsx(
                    "bg-gray-50 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-lg p-4 z-40",
                    isMobile ? "fixed top-[5.2rem] left-0 h-full" : "relative h-full",
                    isMobile
                        ? expanded
                            ? "sm:w-[30%] translate-x-0"
                            : "w-0 -translate-x-full"
                        : expanded
                            ? "w-[18%]"
                            : "w-[7%]"
                )}
            >
                <Box className="flex flex-col items-center gap-4 overflow-y-auto w-full chat-scrollbar">
                    {navItems.map(({ to, label, children }) => {
                        const isAnyChildActive = children?.some((child) =>
                            location.pathname.startsWith(child.to)
                        );

                        if (children) {
                            const isOpen = openSubmenus[label] ?? isAnyChildActive;

                            return (
                                <div key={label} className="w-full">
                                    <div
                                        onClick={() => toggleSubmenu(label)}
                                        className={clsx(
                                            "flex items-center w-full cursor-pointer sm:px-4 sm:py-3 px-2 py-2 gap-1 rounded-lg transition-colors duration-200",
                                            isAnyChildActive
                                                ? "bg-[#85bec3] text-black"
                                                : "text-gray-600 hover:bg-gray-100",
                                            expanded ? "justify-start" : "justify-center"
                                        )}
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
                                            <>
                                                <span className="text-[0.8rem] sm:text-xs md:text-sm font-medium">
                                                    {label}
                                                </span>
                                                <div className="ml-auto ">
                                                    {isOpen ? <ChevronUp /> : <ChevronRight />}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div
                                        className={clsx(
                                            "transition-all duration-300 ease-in-out overflow-hidden",
                                            isOpen && expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                        )}
                                    >
                                        <div className="ml-6 mt-1 flex flex-col gap-2">
                                            {children.map(({ to, label }) => (
                                                <NavLink
                                                    key={to}
                                                    to={to}
                                                    onClick={handleNavClick}
                                                    className={({ isActive }) =>
                                                        clsx(
                                                            "text-sm px-3 py-1 rounded-md transition-colors",
                                                            isActive
                                                                ? "bg-[#85bec3] text-black"
                                                                : "text-gray-600 hover:bg-gray-100"
                                                        )
                                                    }
                                                >
                                                    {label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                    clsx(
                                        "flex items-center w-full sm:px-4 sm:py-3 px-2 py-2 gap-1 rounded-lg transition-colors duration-200",
                                        isActive
                                            ? "bg-[#85bec3] text-black"
                                            : "text-gray-600 hover:bg-gray-100",
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
                        );
                    })}
                </Box>

                {!isMobile && (
                    <Box
                        onClick={handleToggle}
                        className="absolute right-0 bottom-6 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-500 transition-colors duration-200 shadow-md cursor-pointer"
                    >
                        {expanded ? <ChevronLeft /> : <ChevronRight />}
                    </Box>
                )}
            </Box>

            {isMobile && (
                <Box
                    onClick={handleToggle}
                    className="fixed bottom-6 left-6 z-50 p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-500 transition-colors duration-200 shadow-md cursor-pointer"
                >
                    {expanded ? <ChevronLeft /> : <ChevronRight />}
                </Box>
            )}
        </>
    );
}
