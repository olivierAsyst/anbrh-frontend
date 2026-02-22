import API from "../api/axios"
import type { Employee } from "../type/employee"
import type { PagedResponse } from "../type/pagination"

interface ApiResponse<T> {
    succes: boolean
    message: string
    data: T
}

export const fetchEmployees = async (
    page = 0,
    size = 10,
    sortedBy = "id",
    direction = "ASC"
) => {
    const response = await API.get<ApiResponse<PagedResponse<Employee>>>(
        "/employees",
        {
            params: { page, size, sortedBy, direction }
        }
    )
    return response.data.data
}