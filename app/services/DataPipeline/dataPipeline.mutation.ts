import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { mutationFetch } from "../../config/query-client";
import { ApiError, MessageResult } from "~/utils/interfaceCollection/ClientTypeInterfaces";
import { Rule, UpdatePayload } from "~/utils/interfaceCollection/DataPipelineInterfaces";


export function useUpdateRules(
    options?: UseMutationOptions<MessageResult, ApiError, UpdatePayload>
) {
    return useMutation({
        mutationFn: async ({ id, ...body }) => {
            return await mutationFetch({
                url: `/api/v1/rules/${id}`,
                method: "PUT",
                body,
                baseURL: import.meta.env.URL_API,
            });
        },
        ...options,
    });
}
