import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import type { ApiResponse, AuthResponse } from '../type/auth'
import { setCredentials } from '../auth/authSlice'
import { useAppSelector } from '../hooks'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = useAppSelector(state => state.auth.accessToken)
    const [messageError, setMessageError] = useState<string | null>(null)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(accessToken) {
            navigate("/dashboard")
        }
    }, [accessToken, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        try{
        e.preventDefault()
        const response = await API.post<ApiResponse<AuthResponse>>(
            "/v1/auth/login",
            { username, password }
        )
        const data = response.data.data
        dispatch(
            setCredentials({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                user: {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    roles: data.roles,
                    permissions: data.permissions
                }
            })
        )
        navigate("/dashboard")
        
        } catch (error: any) {
            if(error.response?.data) {
                const backendError = error.response.data
                let message = backendError.message
                if(backendError.error?.validationErrors){
                    const validationErrors = backendError.error.validationErrors
                    message = Object.values(validationErrors).join(", ")
                }else if(backendError.error?.details){
                    message = backendError.error.details
                }else{
                    message = "Erreur non implementé"
                }
                setMessageError(message)
            }else{
                setMessageError("Une erreur inattendue est survenue")
            }
        }
    }

  return (
    <div className="min-h-screen flex justify-center items-center">
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>
        {messageError && (
            <div className="alert alert-error mb-4">
                <span className='text-white'>{messageError}</span>
            </div>
        )}
        <label className="label">Utilisateur</label>
        <input 
            type="text" 
            className="input"
            name='username'
            placeholder="Nom utilisateur" 
            onChange={(e) => setUsername(e.target.value)}
        />
        <label className="label">Password</label>
        <input 
            type="password" 
            className="input" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn bg-violet-700 text-white mt-4" onClick={handleSubmit}>Login</button>
    </fieldset>
    </div>
  )
}

export default Login
