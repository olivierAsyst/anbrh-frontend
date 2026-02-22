export interface Employee{
    id: number,
    employeeNumber: string,
    firstName: string
    middleName?: string
    lastName: string
    email: string
    phoneNumber?: string
    departmentId?: number
    departmentName?: string
    jobTitle: string
    status: string
    hireDate: string
    salary?: number
    currency?: string
    fullName?: string
}