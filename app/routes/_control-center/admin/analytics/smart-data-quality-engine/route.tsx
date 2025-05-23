import { MetaFunction } from "@remix-run/react";
import ChatPage from "~/components/componentKit/ChatBox";

export const meta: MetaFunction = () => ([
    { title: "Home | Smart Data Quality Engine" },
    { name: "description", content: "Remix app development" },
]);
const route = () => {
    return (
        <>
            <ChatPage />
        </>
    )
}

export default route