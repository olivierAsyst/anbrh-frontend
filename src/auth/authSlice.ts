import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthUser } from "../type/auth"
import registerUser from "../services/authService"

interface AuthState{
    accessToken: string | null
    refreshToken: string | null
    user: AuthUser | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null,
    loading: false,
    error: null
}

export const register = createAsyncThunk(
    "/v1/auth/register",
    async (data:any, {rejectWithValue}) =>{
        try{
            const response = await registerUser(data)
            return response.data
        }catch(error: any){
            return rejectWithValue(
                error.response?.data?.message || "Echec d'enregistrement"
            )
        }
    }
)

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

            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("user")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) =>{
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) =>{
                state.loading = false

                state.accessToken = action.payload.accessToken
                state.refreshToken = action.payload.refreshToken
                
                state.user = {
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    roles: action.payload.roles,
                    permissions: action.payload.permissions                    
                }
                localStorage.setItem("accessToken", action.payload.accessToken)
                localStorage.setItem("refreshToken", action.payload.refreshToken)
                localStorage.setItem("user", JSON.stringify(state.user))
            })
            .addCase(register.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload as string
            })
        }
})



export const { setCredentials, updateAccessToken, logout } = authSlice.actions
export default authSlice.reducer