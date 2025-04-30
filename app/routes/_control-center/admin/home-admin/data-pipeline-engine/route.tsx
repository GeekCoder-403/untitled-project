// This example page is for showing how the multiple apis is going to call 
// This page will be removed in future
import { Box, Typography } from "@mui/material";
import { MetaFunction } from "@remix-run/react";
import { useState } from "react";
import { postWithBodyExample, updateWithBodyExample, deleteWithBodyExample } from "~/services/Feature/feature.mutation";
import { MessageResult } from "~/utils/interfaceCollection/ClientTypeInterfaces";

export const meta: MetaFunction = () => ([
    { title: "Home | Data Pipeline Engine" },
    { name: "description", content: "Remix app development" },
]);


const Route = () => {
    const [response, setResponse] = useState<MessageResult | null>(null);

    const { mutate: postMutate } = postWithBodyExample({
        onSuccess: (data) => {
            setResponse(data);

        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    // PUT Mutation
    const { mutate: putMutate } = updateWithBodyExample({
        onSuccess: (data) => {
            setResponse(data);
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    // DELETE Mutation
    const { mutate: deleteMutate } = deleteWithBodyExample({
        onSuccess: (data) => {
            setResponse(data);
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    const handlePostClick = () => {
        postMutate({ name: "Samsung" });
    };

    const handlePutClick = () => {
        putMutate({ name: "Updated Samsung" });
    };

    const handleDeleteClick = () => {
        deleteMutate({ name: "Samsung" });
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography className="text-xl p-4 text-red-400 flex items-center justify-center capitalize">
                No item found
            </Typography>

            {/* Button to trigger POST */}
            <button
                onClick={handlePostClick}
                className="px-4 py-2 bg-blue-500 text-white rounded m-2"
            >
                Submit Data (POST)
            </button>

            {/* Button to trigger PUT */}
            <button
                onClick={handlePutClick}
                className="px-4 py-2 bg-green-500 text-white rounded m-2"
            >
                Update Data (PUT)
            </button>

            {/* Button to trigger DELETE */}
            <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-500 text-white rounded m-2"
            >
                Delete Data (DELETE)
            </button>

            {/* Displaying Response */}
            {response && (
                <Box className="mt-4 text-gray-600">
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </Box>
            )}
        </Box>
    );
};

export default Route;
