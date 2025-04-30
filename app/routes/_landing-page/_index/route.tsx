import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
    { title: "Landing Page" },
    { name: "description", content: "Remix app development" },
]);
const route = () => {
    return (
        <>
            <h1 className='text-xl p-4 text-blue-400'>Welcome to Landing Page</h1>
        </>
    )
}

export default route