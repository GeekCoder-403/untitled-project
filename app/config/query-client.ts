import axios from "axios";
import qs from "qs";
import { QueryClient } from "@tanstack/react-query";
import {
    QueryFetchOptions,
    ApiError,
    MutationFetchOptions,
} from "../utils/interfaceCollection/ClientTypeInterfaces";

// Shared Axios instance (used for all requests)
export const client = axios.create({
    baseURL: import.meta.env.URL_PLATFORM_API,
});

// Setup or remove the Authorization header globally
export function setupToken(token?: string): void {
    if (token) {
        client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete client.defaults.headers.common["Authorization"];
    }
}

// GET query with optional baseURL
export async function queryFetch<T>({
    url,
    inputParams,
    baseURL,
}: QueryFetchOptions): Promise<T> {
    let params = inputParams ? qs.stringify(inputParams) : "";
    let fetchUrl = url + (params ? `?${params}` : "");

    return new Promise(async (resolve, reject) => {
        try {
            const res = await client.get(fetchUrl, {
                ...(baseURL && { baseURL }),
            });
            resolve(res.data);
        } catch (error: any) {
            reject(error.response as ApiError);
        }
    });
}

// POST/PUT/PATCH/DELETE with optional baseURL
export async function mutationFetch<T>({
    url,
    method,
    body,
    baseURL,
}: MutationFetchOptions): Promise<T> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await client.request({
                ...(baseURL && { baseURL }),
                url,
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                data: body,
            });

            resolve(res.data);
        } catch (error: any) {
            reject({
                status: error.response?.status || 500,
                detail: error.response?.data?.detail || "Something went wrong",
            });
        }
    });
}

// FormData mutation with optional baseURL
export async function mutationFormData<T>({
    url,
    body,
    method,
    baseURL,
}: MutationFetchOptions): Promise<T> {
    return new Promise(async (resolve, reject) => {
        try {
            const form = new FormData();
            for (const key in body) {
                form.append(key, body[key]);
            }

            const res = await client.request({
                ...(baseURL && { baseURL }),
                url,
                method,
                data: form,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            resolve(res.data);
        } catch (error: any) {
            reject(error.response?.data as ApiError);
        }
    });
}

// Server-side query (e.g., for SSR/React Server Component) with optional baseURL
export async function queryFetchServer<T>({
    url,
    inputParams,
    token,
    baseURL,
}: QueryFetchOptions): Promise<{
    data: T | undefined;
    isError: boolean;
    error: ApiError | null;
}> {
    let data: T | undefined = undefined;
    let isError = false;
    let error: ApiError | null = null;
    let endpoint = url + (inputParams ? `?${qs.stringify(inputParams)}` : "");

    try {
        const response = await client.get(endpoint, {
            ...(baseURL && { baseURL }),
            headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });
        data = response.data;
    } catch (err: any) {
        isError = true;
        error = err.response?.data ?? null;
    }

    return { data, isError, error };
}

// QueryClient instance for React Query
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});
