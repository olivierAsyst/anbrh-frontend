import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import type { ApiResponse, AuthResponse } from '../type/auth'
import { setCredentials } from '../auth/authSlice'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = 

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await API.post<ApiResponse<AuthResponse>>(
            "/v1/auth/login",
            { username, password }
        )
        const data = response.data.data
        console.log(data);
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
        
    }

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>
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
  )
}

export default Login
