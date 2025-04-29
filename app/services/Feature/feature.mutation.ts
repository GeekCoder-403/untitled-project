import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { mutationFetch } from "../../config/query-client";
import { ApiError, MessageResult } from "~/utils/interfaceCollection/ClientTypeInterfaces";

interface ExampleBody {
    key1: string;
    key2: string;
}

export function postWithBodyExample(
    options?: UseMutationOptions<MessageResult, ApiError, ExampleBody>
) {
    return useMutation<MessageResult, ApiError, ExampleBody>({
        mutationFn: async (body) => {
            return await mutationFetch({
                url: "/path/to/endpoint",
                method: "POST",
                body: {
                    key1: body.key1,
                    key2: body.key2,
                },
            });
        },
        ...options,
    });
}