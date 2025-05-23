import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
    { title: "Home | Analytics" },
    { name: "description", content: "Remix app development" },
]);
const route = () => {
    return (
        <>
            <h1 className='text-xl p-4 text-red-400 flex items-center justify-center capitalize'>No item found</h1>
        </>
    )
}

export default route