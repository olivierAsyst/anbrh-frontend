import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Register from './pages/Register'

function App() {

  return (
    <>
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </>
  )
}

export default App