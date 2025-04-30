import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
    { title: "Data Product" },
    { name: "description", content: "Remix app development" },
]);
const route = () => {
    return (
        <>
            <h1 className='text-xl p-4 text-red-400'>Data Product</h1>
        </>
    )
}

export default route