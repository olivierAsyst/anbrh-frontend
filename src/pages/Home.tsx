import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const openLogin = () =>{
    navigate("/login")
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
            <img
            src="images/logo_acceuil.png"
            className="max-w-sm rounded-lg"
            />
            <div>
            <h1 className="text-5xl font-bold bg-linear-to-r from-violet-700 to-orange-300 bg-clip-text text-transparent">Gestion des ressources humaines!</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button onClick={openLogin} className="btn bg-violet-700 text-white">Connectez vous</button>
            </div>
        </div>    
    </div>
  )
}

export default Home
