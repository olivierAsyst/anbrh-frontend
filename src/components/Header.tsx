import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import API from '../api/axios'
import { useDispatch } from 'react-redux'
import { logout } from '../auth/authSlice'

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useAppSelector(state => state.auth.user)

  const handleLogout = async () => {
    try {
      await API.post('/v1/auth/logout')
    } catch (error) {
      console.log("Erreur logout backend", error);
    }finally{
      dispatch(logout())
      navigate('/login')
    }
  }
  
  return (
    <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
            <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current text-violet-700"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
            </button>
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl p-2 rounded text-violet-700">
           Anubis<span className='bg-violet-700 text-white px-2 py-1 rounded'>RH</span>
          </Link>
        </div>
        {user ? (
          <div className="flex gap-4 items-center">
            <span>{user.firstName} - {user.lastName}</span>
            <button onClick={handleLogout} className="btn btn-ghost text-violet-700">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button className="btn btn-ghost text-violet-700">
              Login
            </button>
            <button className="btn btn-ghost text-violet-700">
              Register
          </button>
          </div>
        )}
        <div className="flex-none">
            <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current text-violet-700"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
            </button>
        </div>
    </div>
  )
}

export default Header
