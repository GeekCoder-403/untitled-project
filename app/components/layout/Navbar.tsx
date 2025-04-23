import { Link } from "@remix-run/react";
import { Menu } from "lucide-react";
import Avatar from "../componentKit/Avatar";


export default function Navbar() {
    return (
        <div className="bg-gray-50 shadow-md p-4 flex justify-between items-center w-full border-b border-gray-600">
            <Link to="/">
                <img src="/logo-dark.png" alt="" className="w-24" />
            </Link>
            <div className="flex items-center space-x-2">
                <Avatar />
            </div>
        </div>
    );
}