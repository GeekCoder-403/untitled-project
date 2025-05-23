import { Link, useNavigate } from "@remix-run/react";
import Avatar from "../elements/Avatar";
import { useEffect, useState } from "react";


export default function Navbar() {
    const [name, setName] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (!storedName) {
            localStorage.setItem("userName", "Raj Kumar");
            setName("Raj Kumar");
            navigate('/');
        } else {
            setName(storedName);
            navigate('/admin/analytics');
        }
    }, [navigate]);


    return (
        <div className="bg-gray-50 shadow-md p-4 flex justify-between items-center w-full border-b border-gray-600">
            <Link to="/">
                <img src="/logo-dark.png" alt="Loading..." className="w-24" />
            </Link>
            <div className="flex items-center">
                <img src="/icons/Bell.svg" alt="Loading..." />
                <Avatar name={name} />
            </div>
        </div>
    );
}