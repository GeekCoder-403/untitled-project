import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { mutationFetch } from "../../config/query-client";
import { ApiError, MessageResult } from "~/utils/interfaceCollection/ClientTypeInterfaces";
import { useParams } from "@remix-run/react";
import { GlossaryItem, GlossaryResponse } from "~/utils/interfaceCollection/businessGlossaryInterfaces";

export function createGlossary(
    options?: UseMutationOptions<MessageResult, ApiError, GlossaryItem>
) {
    return useMutation({
        mutationFn: async (body) => {
            return await mutationFetch({
                url: "/api/v1/terms",
                method: "POST",
                body,
                baseURL: import.meta.env.URL_API,
            });
        },
        ...options,
    });
}

export function updateGlossary(
    options?: UseMutationOptions<MessageResult, ApiError, { id: string; term: string; description: string }>
) {
    return useMutation({
        mutationFn: async ({ id, term, description }) => {
            return await mutationFetch({
                url: `/api/v1/terms/${id}`,
                method: "PUT",
                body: { term, description },
                baseURL: import.meta.env.URL_API,
            });
        },
        ...options,
    });
}

export function deleteGlossary(
    options?: UseMutationOptions<MessageResult, ApiError, string>
) {
    return useMutation({
        mutationFn: async (id) => {
            return await mutationFetch({
                url: `/api/v1/terms/${id}`,
                method: "DELETE",
                body: {},
                baseURL: import.meta.env.URL_API,
            });
        },
        ...options,
    });
}
