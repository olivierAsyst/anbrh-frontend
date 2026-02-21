export interface RegisterRequest{
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber?: string
  roles?: string[]
}

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  permissions: string[]
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  type: string
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  permissions: string[]
}
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}