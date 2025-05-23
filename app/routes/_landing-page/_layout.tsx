import { MetaFunction, Outlet } from "@remix-run/react";
import Navbar from "~/components/layout/Navbar";
import Sidebar from "~/components/layout/Sidebar";

export const meta: MetaFunction = () => ([
    { title: "Remix Application" },
    { name: "description", content: "Remix app development" },
]);
export default function HomeLayout() {

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-auto p-4 bg-gray-300 shadow-md">
                    <div className=" w-full h-screen bg-white shadow-md rounded-md">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}