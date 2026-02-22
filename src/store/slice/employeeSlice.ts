import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Employee } from "../../type/employee";
import { fetchEmployees } from "../../services/employeeService";

interface EmployeeState{
    employees: Employee[]
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
    loading: boolean
    error: string | null
}

const initialState: EmployeeState = {
    employees: [],
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    loading: false,
    error: null
}

export const getEmployees = createAsyncThunk(
    "employees/getAll",
    async (params: { page?: number; size?: number }, { rejectWithValue }) => {
        try{
            return await fetchEmployees(params.page, params.size)
        }catch(error: any){
            return rejectWithValue(
                error.response?.data?.message || "Erreur chargement employes"
            )
        }
    }
)

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployees.pending, (state) => {
                state.loading = true
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false

                state.employees = action.payload.content
                state.pageNumber = action.payload.pageNumber
                state.pageSize = action.payload.pageSize
                state.totalElements = action.payload.totalElements
                state.totalPages = action.payload.totalPages
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export default employeeSlice.reducer