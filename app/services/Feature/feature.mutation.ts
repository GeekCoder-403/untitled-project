import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { mutationFetch } from "../../config/query-client";
import { ApiError, MessageResult } from "~/utils/interfaceCollection/ClientTypeInterfaces";

interface ExampleBody {
    name: string;
}

export function postWithBodyExample(
    options?: UseMutationOptions<MessageResult, ApiError, ExampleBody>
) {
    return useMutation<MessageResult, ApiError, ExampleBody>({
        mutationFn: async (body) => {
            return await mutationFetch({
                url: "/objects",
                method: "POST",
                body: body,
                baseURL: import.meta.env.URL_CREATE_API,
            });
        },
        ...options,
    });
}

export function updateWithBodyExample(
    options?: UseMutationOptions<MessageResult, ApiError, ExampleBody>
) {
    return useMutation<MessageResult, ApiError, ExampleBody>({
        mutationFn: async (body) => {
            return await mutationFetch({
                url: "/objects/ff808181932badb60196881412fb1b3a",
                method: "PUT",
                body: body,
                baseURL: import.meta.env.URL_CREATE_API,
            });
        },
        ...options,
    });
}

export function deleteWithBodyExample(
    options?: UseMutationOptions<MessageResult, ApiError, ExampleBody>
) {
    return useMutation<MessageResult, ApiError, ExampleBody>({
        mutationFn: async (body) => {
            return await mutationFetch({
                url: "/objects/ff808181932badb60196881412fb1b3a",
                method: "DELETE",
                body: body,
                baseURL: import.meta.env.URL_CREATE_API,
            });
        },
        ...options,
    });
}