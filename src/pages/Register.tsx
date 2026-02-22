import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../auth/authSlice'

const Register = () => {
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        username:"",
        email:"",
        password:"",
        firstName:"",
        lastName:"",
        phoneNumber:""
    })

    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try{
            await dispatch(register(form)).unwrap()
            navigate("/dashboard")
        }catch(err: any){
            setError(err)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-lg bg-base-100 shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Creer un compte</h2>
            {error && (<div className="alert alert-error mb-4">
                <span>{error}</span>
            </div> )}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input 
                    type="text" 
                    name="username"
                    placeholder="Username"
                    className="input input-bordered w-full"
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text"
                    name="firstName"
                    placeholder="Prenom"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text"
                    name="lastName"
                    placeholder="Nom de famille"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text"
                    name="phoneNumber"
                    placeholder="Telephone (optionnel)"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    required
                />
                <button className="btn btn-primary w-full">
                    S'inscrire
                </button>
            </form>
        </div>
    </div>
  )
}

export default Register
