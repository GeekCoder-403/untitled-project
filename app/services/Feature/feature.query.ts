import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { queryFetch } from "../../config/query-client";
import { ApiError } from "../../utils/interfaceCollection/ClientTypeInterfaces";
import { FeatureInterface, GetTermsResponse, Term } from "~/utils/interfaceCollection/featureInterface";

export function getDetails(options?: Partial<UseQueryOptions<FeatureInterface, ApiError>>) {
    return useQuery<FeatureInterface, ApiError>({
        queryKey: ["details"],
        queryFn: async () => {
            const response = await queryFetch<FeatureInterface>({
                url: '/todos/1',
                // baseURL: import.meta.env.URL_PLATFOR_API
            });
            return response;
        },
        ...options,
    });
}

export function getGlossaryDetails(options?: Partial<UseQueryOptions<Term[], ApiError>>) {
    return useQuery<Term[], ApiError>({
        queryKey: ["glossary"],
        queryFn: async () => {
            const response = await queryFetch<GetTermsResponse>({
                url: '/api/v1/terms',
                baseURL: import.meta.env.URL_API,
            });
            return response.terms;
        },
        ...options,
    });
}
