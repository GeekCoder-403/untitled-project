import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
    { title: "Meta Data" },
    { name: "description", content: "Remix app development" },
]);
const route = () => {
    return (
        <>
            <h1 className='text-xl p-4 text-blue-800'>Meta data</h1>
        </>
    )
}

export default route