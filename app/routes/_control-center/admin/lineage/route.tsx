import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => ([
    { title: "Lineage" },
    { name: "description", content: "Remix app development" },
]);

const route = () => {
    return (
        <>
            <h1 className='text-xl p-4 text-emerald-600'>Lineage</h1>
        </>
    )
}

export default route