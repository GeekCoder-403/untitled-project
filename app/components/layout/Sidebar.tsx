import { useState } from "react";
import { NavLink } from "@remix-run/react";
import { Box, IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";
import {
    ChevronRight,
    ChevronLeft
} from "lucide-react";

const iconMap: Record<string, string> = {
    "Home": "/icons/Home.svg",
    "Connection": "/icons/Connection1.svg",
    "Meta Data": "/icons/MetaData.svg",
    "Business Grocery": "/icons/BusinessGrocery.svg",
    "Lineage": "/icons/Lineage.svg",
    "Data Product": "/icons/DataProduct.svg",
    "Management": "/icons/Management.svg",
};
const navItems = [
    { to: "/home-admin", label: "Home" },
    { to: "/connection", label: "Connection" },
    { to: "/meta-data", label: "Meta Data" },
    { to: "/business-grocery", label: "Business Grocery" },
    { to: "/lineage", label: "Lineage" },
    { to: "/data-product", label: "Data Product" },
    { to: "/management", label: "Management" }
];

export default function Sidebar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Box
            className={clsx(
                "relative bg-gray-50 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-lg p-4",
                expanded ? "w-[18%]" : "w-[7%]"
            )}
        >
            <div className="flex flex-col items-center gap-4">
                {navItems.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            clsx(
                                "flex items-center w-full px-4 py-3 gap-3 rounded-lg transition-colors duration-200",
                                isActive ? "bg-[#85bec3] text-black" : "text-gray-600 hover:bg-gray-100",
                                expanded ? "justify-start" : "justify-center"
                            )
                        }
                    >
                        {!expanded ? (
                            <Tooltip title={label} arrow>
                                <div className="flex flex-col items-center">
                                    <img src={iconMap[label]} alt="Loading..." />
                                </div>
                            </Tooltip>
                        ) : (
                            <div className="flex flex-col items-center">
                                <img src={iconMap[label]} alt="Loading..." />
                            </div>
                        )}
                        {expanded && <span className="text-sm font-medium">{label}</span>}
                    </NavLink>
                ))}
            </div>

            <div
                onClick={() => setExpanded(!expanded)}
                className={clsx(
                    "absolute right-0 bottom-6 z-50",
                    "p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-gray-500 transition-colors duration-200  shadow-md"
                )}
            >
                {expanded ? <img src="/icons/ChevronLeft.svg" alt="Loading..." /> : <img src="/icons/ChevronRight.svg" alt="Loading..." />}
            </div>
        </Box>
    );
}
