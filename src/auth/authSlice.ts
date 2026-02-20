import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthUser } from "../type/auth"
import { jwtDecode } from "jwt-decode"

interface AuthState{
    accessToken: string | null
    refreshToken: string | null
    user: AuthUser | null
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials:(
            state,
            action: PayloadAction<{
                accessToken: string
                refreshToken: string
                user: AuthUser
            }>
        )=>{
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.user = action.payload.user

            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
            localStorage.setItem('accessToken', action.payload)
        },
        logout: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.user = null
            localStorage.clear()
        }
    }
})

export const { setCredentials, updateAccessToken, logout } = authSlice.actions
export default authSlice.reducer