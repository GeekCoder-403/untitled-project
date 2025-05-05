export interface FeatureInterface {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export interface Term {
    _id: string;
    term: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetTermsResponse {
    success: boolean;
    terms: Term[];
}

export interface createResponce {
    term: string;
    description: string;
}