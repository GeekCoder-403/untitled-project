import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
    { title: "Management" },
    { name: "description", content: "Remix app development" },
]);
const route = () => {
    return (
        <>
            <h1 className='text-xl p-4 text-blue-800'>Management</h1>
        </>
    )
}

export default route