import { Link } from "@remix-run/react";
import { Menu } from "lucide-react";
import Avatar from "../componentKit/Avatar";


export default function Navbar() {
    return (
        <div className="bg-gray-50 shadow-md p-4 flex justify-between items-center w-full border-b border-gray-600">
            <Link to="/">
                <img src="/logo-dark.png" alt="" className="w-24" />
            </Link>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bell-icon lucide-bell text-gray-600 cursor-pointer"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
                <Avatar />
            </div>
        </div>
    );
}