import { useQuery } from "@tanstack/react-query";
import { queryFetch } from "~/config/query-client";
import { ApiError } from "~/utils/interfaceCollection/ClientTypeInterfaces";
import { Rule, RuleListResponse } from "~/utils/interfaceCollection/DataPipelineInterfaces";

export function getAllPipelineDetails(status?: string) {
    const url = status ? `/api/v1/rules/Status/${status}` : `/api/v1/rules`;

    return useQuery<RuleListResponse, ApiError>({
        queryKey: ["pipeline-rules", status || "all"],
        queryFn: () =>
            queryFetch<RuleListResponse>({
                url,
                baseURL: import.meta.env.URL_API,
            }),
        staleTime: 30000, // optional: avoid too frequent refetches
    });
}

export async function getRulesById(id: string): Promise<{ success: boolean; data: Rule }> {
    if (!id) throw new Error("Rule ID is required");
    return await queryFetch<{ success: boolean; data: Rule }>({
        url: `/api/v1/rules/${id}`,
        baseURL: import.meta.env.URL_API,
    });
}


