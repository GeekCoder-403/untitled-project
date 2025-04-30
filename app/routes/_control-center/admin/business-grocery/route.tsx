import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
    { title: "Business Grocery" },
    { name: "description", content: "Remix app development" },
]);

const route = () => {
    return (
        <>
            <h1 className='text-xl p-4 text-green-400'>Business Grocery</h1>
        </>
    )
}

export default route