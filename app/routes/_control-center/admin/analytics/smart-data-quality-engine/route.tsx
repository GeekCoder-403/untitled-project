import { MetaFunction } from "@remix-run/react";
import ChatApp from "~/components/componentKit/ChatApp";

export const meta: MetaFunction = () => ([
    { title: "Home | Smart Data Quality Engine" },
    { name: "description", content: "Remix app development" },
]);
const route = () => {
    return (
        <>
            <ChatApp />
        </>
    )
}

export default route