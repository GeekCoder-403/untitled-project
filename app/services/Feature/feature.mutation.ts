import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { mutationFetch } from "../../config/query-client";
import { ApiError, MessageResult } from "~/utils/interfaceCollection/ClientTypeInterfaces";
import { createResponce, Term } from "~/utils/interfaceCollection/featureInterface";

interface ExampleBody {
    name: string;
}

export function createGlossary(
    options?: UseMutationOptions<MessageResult, ApiError, createResponce>
) {
    return useMutation<MessageResult, ApiError, createResponce>({
        mutationFn: async (body) => {
            return await mutationFetch({
                url: "/api/v1/terms",
                method: "POST",
                body: body,
                baseURL: import.meta.env.URL_API,
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