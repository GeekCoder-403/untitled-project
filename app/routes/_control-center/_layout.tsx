import { Outlet } from "@remix-run/react";
import Navbar from "~/components/layout/Navbar";
import Sidebar from "~/components/layout/Sidebar";

export default function HomeLayout() {

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-auto p-4 bg-gray-300 shadow-md">
                    <div className=" w-full min-h-screen bg-white shadow-md rounded-md">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}