import { NavLink } from "@remix-run/react";
import { Home, Settings, File, ShoppingBag, GitBranch, Layers, Command } from "lucide-react"; // Import different Lucide icons
import { Box, Tooltip } from "@mui/material";

// Define the type for the iconMap to ensure it's safe to access with label
type IconMap = {
    [key: string]: JSX.Element;
};

// Map route labels to corresponding icons
const iconMap: IconMap = {
    "Home": <Home className="w-6 h-6" />,
    "Connection": <Settings className="w-6 h-6" />,
    "Meta Data": <File className="w-6 h-6" />,
    "Business Grocery": <ShoppingBag className="w-6 h-6" />,
    "Lineage": <GitBranch className="w-6 h-6" />,
    "Data Product": <Layers className="w-6 h-6" />,
    "Management": <Command className="w-6 h-6" />,
};

const navItems = [
    { to: "/home-admin", label: "Home" },
    { to: "/connection", label: "Connection" },
    { to: "/meta-data", label: "Meta Data" },
    { to: "/business-grocery", label: "Business Grocery" },
    { to: "/lineage", label: "Lineage" },
    { to: "/data-product", label: "Data Product" },
    { to: "/management", label: "Management" },
];

export default function Sidebar() {
    return (
        <Box className="bg-gray-50 w-[7%] px-4 py-6 flex flex-col items-center shadow-lg gap-4">
            {navItems.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        `flex flex-col items-center text-center w-full p-4 rounded-lg transition-colors duration-200 ${isActive ? "bg-emerald-100 text-gray-800" : "text-gray-500 hover:bg-gray-100"
                        }`
                    }
                >
                    <Tooltip title={label} arrow>
                        <div className="flex flex-col items-center">
                            {iconMap[label]}
                        </div>
                    </Tooltip>
                </NavLink>
            ))}
        </Box>
    );
}
