import { Link } from "@remix-run/react";
import Avatar from "../componentKit/Avatar";
import { useEffect, useState } from "react";


export default function Navbar() {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (!storedName) {
            localStorage.setItem("userName", "Raj Kumar");
            setName("Raj Kumar");
        } else {
            setName(storedName);
        }
    }, []);

    return (
        <div className="bg-gray-50 shadow-md p-4 flex justify-between items-center w-full border-b border-gray-600">
            <Link to="/">
                <img src="/logo-dark.png" alt="" className="w-24" />
            </Link>
            <div className="flex items-center">
                <img src="/icons/Bell.svg" alt="Loading..." />
                <Avatar name={name} />
            </div>
        </div>
    );
}