export interface GlossaryItem {
    _id: string;
    term: string;
    description: string;
}

export interface GlossaryResponse {
    term: GlossaryItem[];
}
export interface GlossaryDetailsResponse {
    term: GlossaryItem;
}
