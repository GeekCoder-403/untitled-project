export type MutationMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface QueryFetchOptions {
    url: string;
    inputParams?: any;
    token?: string
    baseURL?: string;
    createType?: "platform" | "create" | "vite";
}

export interface MutationFetchOptions {
    url: string;
    method: string;
    body: any;
    baseURL?: string;  // Optional baseURL to override the default
    createType?: "platform" | "create" | "vite";  // Custom createType to dynamically select baseURL
}
export interface MessageResult {
    status?: number;
    message: string;
    data?: any
}

export interface ApiError {
    // httpCode: number;
    // httpStatus: string;
    exceptionName: string;
    message: string;
    errors?: { [key: string]: string };
    status: number;
    detail?: string;
}