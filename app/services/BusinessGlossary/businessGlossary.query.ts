
import { useQuery } from "@tanstack/react-query";
import { queryFetch } from "~/config/query-client";
import { GlossaryDetailsResponse, GlossaryItem, GlossaryResponse } from "~/utils/interfaceCollection/businessGlossaryInterfaces";
import { ApiError } from "~/utils/interfaceCollection/ClientTypeInterfaces";

export function getAllDetails() {
    return useQuery<GlossaryResponse, ApiError>({
        queryKey: ["glossary-all"],
        queryFn: async () =>
            await queryFetch<GlossaryResponse>({
                url: "/api/v1/terms",
                baseURL: import.meta.env.URL_API,
            }),
    });
}

export async function getDetailsById(id: string): Promise<GlossaryDetailsResponse> {
    if (!id) throw new Error("Glossary ID is required");
    return await queryFetch<GlossaryDetailsResponse>({
        url: `/api/v1/terms/${id}`,
        baseURL: import.meta.env.URL_API,
    });
}


