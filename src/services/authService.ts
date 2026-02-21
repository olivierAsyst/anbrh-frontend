import API from "../api/axios";
import type { ApiResponse, AuthResponse, RegisterRequest } from "../type/auth";

const registerUser = async (data: RegisterRequest) => {
    const response = await API.post<ApiResponse<AuthResponse>>(
        '/auth/register',
        data
    )
    return response.data
}

export default {
    registerUser
}