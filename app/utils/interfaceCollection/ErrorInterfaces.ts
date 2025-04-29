export interface ErrorAction {
    name: string;
    link: string;
}

export interface ErrorCardProps {
    errorCode: string;
    errorTitle: string;
    errorMessage: string;
    actions: ErrorAction[];
}