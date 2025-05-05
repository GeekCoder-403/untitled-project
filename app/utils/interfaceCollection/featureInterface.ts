export interface FeatureInterface {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export interface EmployeeApiResponse {
    status: string;
    data: EmployeeInterface[];
}

export interface EmployeeInterface {
    id: number,
    employee_name: string,
    employee_salary: number,
    employee_age: number,
    profile_image: string
}